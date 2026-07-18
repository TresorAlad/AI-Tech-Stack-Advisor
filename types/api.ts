import type { StackRecommendation } from "@/types/stack-recommendation";

export type ApiErrorCode =
  | "INVALID_INPUT"
  | "METHOD_NOT_ALLOWED"
  | "INVALID_LLM_OUTPUT"
  | "RATE_LIMIT"
  | "INTERNAL_ERROR"
  | "LLM_UNAVAILABLE"
  | "TIMEOUT"
  | "EMPTY_PENDING";

export interface AnalyzeSuccessResponse {
  data: StackRecommendation;
  meta: {
    model: string;
    generatedAt: string;
  };
}

export interface AnalyzeErrorResponse {
  error: ApiErrorCode;
  details?: unknown;
  retryAfter?: number;
}

export interface PendingAnalysis {
  description: string;
  constraints?: string;
}

export interface StoredAnalysisResult {
  data: StackRecommendation;
  description: string;
  generatedAt: string;
  model: string;
}
