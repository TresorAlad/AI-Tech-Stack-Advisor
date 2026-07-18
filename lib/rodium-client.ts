import OpenAI from "openai";

import { DEFAULT_MODEL, LLM_TIMEOUT_MS } from "@/lib/constants";

export function createRodiumClient(): OpenAI {
  const apiKey = process.env.RODIUMAI_API_KEY;
  if (!apiKey) {
    throw new Error("RODIUMAI_API_KEY is not set");
  }

  return new OpenAI({
    apiKey,
    baseURL: "https://api.rodiumai.io/v1",
    timeout: LLM_TIMEOUT_MS,
  });
}

export function getConfiguredModel(): string {
  return DEFAULT_MODEL;
}
