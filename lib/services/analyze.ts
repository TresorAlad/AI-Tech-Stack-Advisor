import type OpenAI from "openai";
import type { ZodError } from "zod";

import {
  DEFAULT_MODEL,
  LLM_MAX_TOKENS,
  LLM_TEMPERATURE,
} from "@/lib/constants";
import { createRodiumClient, getConfiguredModel } from "@/lib/rodium-client";
import { AnalyzeError } from "@/lib/services/analyze-errors";
import { extractJson } from "@/lib/services/extract-json";
import { stackRecommendationSchema } from "@/lib/validators/stack-recommendation";
import { buildRetryPrompt } from "@/prompts/retry-prompt";
import { buildSystemPrompt } from "@/prompts/system-prompt";
import { buildUserPrompt } from "@/prompts/user-prompt";
import type { StackRecommendation } from "@/types/stack-recommendation";

export interface AnalyzeProjectResult {
  data: StackRecommendation;
  model: string;
}

function summarizeZodError(error: ZodError): string {
  return error.issues
    .slice(0, 8)
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("; ");
}

function parseAndValidate(rawContent: string): StackRecommendation {
  const jsonText = extractJson(rawContent);
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("JSON.parse failed");
  }

  const result = stackRecommendationSchema.safeParse(parsed);
  if (!result.success) {
    throw result.error;
  }

  return result.data;
}

async function completeChat(
  client: OpenAI,
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  model: string,
): Promise<string> {
  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: LLM_TEMPERATURE,
      max_tokens: LLM_MAX_TOKENS,
      response_format: { type: "json_object" },
      messages,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new AnalyzeError(
        "INVALID_LLM_OUTPUT",
        "Empty content from LLM",
      );
    }

    return content;
  } catch (error) {
    if (error instanceof AnalyzeError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    const lower = message.toLowerCase();

    if (
      lower.includes("timeout") ||
      lower.includes("timed out") ||
      lower.includes("aborted")
    ) {
      throw new AnalyzeError("TIMEOUT", message);
    }

    if (
      lower.includes("api key") ||
      lower.includes("401") ||
      lower.includes("403") ||
      lower.includes("429") ||
      lower.includes("500") ||
      lower.includes("502") ||
      lower.includes("503") ||
      lower.includes("network") ||
      lower.includes("fetch")
    ) {
      throw new AnalyzeError("LLM_UNAVAILABLE", message);
    }

    throw new AnalyzeError("LLM_UNAVAILABLE", message);
  }
}

export async function analyzeProject(
  description: string,
  constraints?: string,
): Promise<AnalyzeProjectResult> {
  const model = getConfiguredModel() || DEFAULT_MODEL;
  const client = createRodiumClient();

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: buildSystemPrompt() },
    { role: "user", content: buildUserPrompt(description, constraints) },
  ];

  const firstContent = await completeChat(client, messages, model);

  try {
    const data = parseAndValidate(firstContent);
    return { data, model };
  } catch (firstError) {
    const zodSummary =
      firstError &&
      typeof firstError === "object" &&
      "issues" in firstError
        ? summarizeZodError(firstError as ZodError)
        : firstError instanceof Error
          ? firstError.message
          : "Unknown parse error";

    messages.push({ role: "assistant", content: firstContent });
    messages.push({ role: "user", content: buildRetryPrompt(zodSummary) });

    const retryContent = await completeChat(client, messages, model);

    try {
      const data = parseAndValidate(retryContent);
      return { data, model };
    } catch (retryError) {
      const details =
        retryError &&
        typeof retryError === "object" &&
        "issues" in retryError
          ? (retryError as ZodError).flatten()
          : retryError instanceof Error
            ? retryError.message
            : undefined;

      throw new AnalyzeError(
        "INVALID_LLM_OUTPUT",
        "LLM output invalid after retry",
        details,
      );
    }
  }
}
