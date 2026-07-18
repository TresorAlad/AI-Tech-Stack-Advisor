import { MAX_BODY_BYTES } from "@/lib/constants";
import { jsonResponse } from "@/lib/api-response";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  sanitizeConstraints,
  sanitizeDescription,
} from "@/lib/sanitize";
import { AnalyzeError } from "@/lib/services/analyze-errors";
import { analyzeProject } from "@/lib/services/analyze";
import { analyzeRequestSchema } from "@/lib/validators/analyze-request";
import type { ApiErrorCode } from "@/types/api";

export const runtime = "nodejs";
export const maxDuration = 30;

function mapAnalyzeError(error: AnalyzeError): {
  status: number;
  body: { error: ApiErrorCode; details?: unknown };
} {
  switch (error.code) {
    case "INVALID_LLM_OUTPUT":
      return {
        status: 422,
        body: { error: "INVALID_LLM_OUTPUT", details: error.details },
      };
    case "TIMEOUT":
      return { status: 504, body: { error: "TIMEOUT" } };
    case "LLM_UNAVAILABLE":
      return { status: 502, body: { error: "LLM_UNAVAILABLE" } };
    default:
      return { status: 500, body: { error: "INTERNAL_ERROR" } };
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return jsonResponse(
        { error: "RATE_LIMIT", retryAfter: rate.retryAfter },
        429,
        { "Retry-After": String(rate.retryAfter) },
      );
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "INVALID_INPUT" }, 400);
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "INVALID_INPUT" }, 400);
    }

    const parsed = analyzeRequestSchema.safeParse(body);
    if (!parsed.success) {
      return jsonResponse(
        { error: "INVALID_INPUT", details: parsed.error.flatten() },
        400,
      );
    }

    const description = sanitizeDescription(parsed.data.description);
    const constraints = parsed.data.constraints
      ? sanitizeConstraints(parsed.data.constraints)
      : undefined;

    if (description.length < 50) {
      return jsonResponse({ error: "INVALID_INPUT" }, 400);
    }

    const result = await analyzeProject(description, constraints);

    return jsonResponse({
      data: result.data,
      meta: {
        model: result.model,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof AnalyzeError) {
      console.error("[api/analyze]", error.code, error.message);
      const mapped = mapAnalyzeError(error);
      return jsonResponse(mapped.body, mapped.status);
    }

    console.error("[api/analyze]", error);
    return jsonResponse({ error: "INTERNAL_ERROR" }, 500);
  }
}

export async function GET() {
  return jsonResponse({ error: "METHOD_NOT_ALLOWED" }, 405);
}
