"use client";

import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ApiErrorCode } from "@/types/api";

const ERROR_MESSAGES: Record<ApiErrorCode, string> = {
  INVALID_INPUT: "Votre description est trop courte ou invalide.",
  METHOD_NOT_ALLOWED: "Méthode non autorisée.",
  INVALID_LLM_OUTPUT: "Erreur de génération. Réessayez.",
  RATE_LIMIT: "Trop de requêtes. Réessayez dans quelques minutes.",
  INTERNAL_ERROR: "Une erreur est survenue. Réessayez.",
  LLM_UNAVAILABLE: "Service IA temporairement indisponible.",
  TIMEOUT: "L'analyse a pris trop de temps. Réessayez.",
  EMPTY_PENDING:
    "Aucune description trouvée. Revenez à l'accueil pour saisir votre projet.",
};

interface AnalysisErrorProps {
  error: ApiErrorCode;
  onRetry?: () => void;
}

export function AnalysisError({ error, onRetry }: AnalysisErrorProps) {
  return (
    <div className="space-y-4">
      <Alert variant="destructive" role="alert">
        <AlertTitle>Analyse impossible</AlertTitle>
        <AlertDescription>
          {ERROR_MESSAGES[error] ?? ERROR_MESSAGES.INTERNAL_ERROR}
        </AlertDescription>
      </Alert>
      <div className="flex flex-col gap-3 sm:flex-row">
        {onRetry && error !== "EMPTY_PENDING" ? (
          <Button type="button" onClick={onRetry}>
            Réessayer
          </Button>
        ) : null}
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          Modifier ma description
        </Link>
      </div>
    </div>
  );
}
