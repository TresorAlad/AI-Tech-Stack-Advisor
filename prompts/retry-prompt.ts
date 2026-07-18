export function buildRetryPrompt(zodErrorSummary: string): string {
  return `Ta réponse précédente n'est pas un JSON valide conforme au schéma.
Erreur de validation : ${zodErrorSummary}

Corrige et renvoie UNIQUEMENT le JSON valide complet, sans markdown.
Garde les mêmes recommandations si possible, corrige uniquement la structure.`;
}
