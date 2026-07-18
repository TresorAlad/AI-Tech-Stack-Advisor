import { Skeleton } from "@/components/ui/skeleton";

export function AnalysisLoading() {
  return (
    <div
      className="space-y-6"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="space-y-2">
        <p className="text-lg font-medium">Analyse de votre projet en cours...</p>
        <p className="text-sm text-muted-foreground">
          Cela peut prendre 15 à 30 secondes.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
}
