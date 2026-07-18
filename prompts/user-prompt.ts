export function buildUserPrompt(
  description: string,
  constraints?: string,
): string {
  let prompt = `Analyse ce projet et recommande une stack technique complete :\n\n${description.trim()}`;

  if (constraints?.trim()) {
    prompt += `\n\nContraintes supplementaires :\n${constraints.trim()}`;
  }

  return prompt;
}
