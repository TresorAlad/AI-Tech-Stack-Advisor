export function buildUserPrompt(
  description: string,
  constraints?: string,
): string {
  let prompt = `Analyse ce projet et recommande une stack technique complète :\n\n${description.trim()}`;

  if (constraints?.trim()) {
    prompt += `\n\nContraintes supplémentaires :\n${constraints.trim()}`;
  }

  return prompt;
}
