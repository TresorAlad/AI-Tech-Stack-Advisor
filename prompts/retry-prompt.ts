export function buildRetryPrompt(zodErrorSummary: string): string {
  return `Ta reponse precedente n est pas un JSON valide conforme au schema.
Erreur de validation : ${zodErrorSummary}

Corrige et renvoie UNIQUEMENT le JSON valide complet, sans markdown.
Garde les memes recommandations si possible, corrige uniquement la structure.`;
}
