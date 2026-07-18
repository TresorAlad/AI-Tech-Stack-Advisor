export type AnalyzeErrorCode =
  | "INVALID_LLM_OUTPUT"
  | "LLM_UNAVAILABLE"
  | "TIMEOUT"
  | "INTERNAL_ERROR";

export class AnalyzeError extends Error {
  readonly code: AnalyzeErrorCode;
  readonly details?: unknown;

  constructor(code: AnalyzeErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = "AnalyzeError";
    this.code = code;
    this.details = details;
  }
}
