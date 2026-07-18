/**
 * Extract a JSON object string from an LLM response that may include
 * markdown fences or surrounding text.
 */
export function extractJson(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error("Empty LLM response");
  }

  if (trimmed.startsWith("{")) {
    return trimmed;
  }

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  throw new Error("No JSON object found in LLM response");
}
