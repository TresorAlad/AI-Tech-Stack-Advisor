"use client";

import { AnalysisError } from "@/components/analysis-error";
import { AnalysisLoading } from "@/components/analysis-loading";
import { StackResultView } from "@/components/stack-result-view";
import { useAnalysis } from "@/hooks/use-analysis";

export default function ResultPage() {
  const { state, retry } = useAnalysis();

  if (state.status === "idle" || state.status === "loading") {
    return <AnalysisLoading />;
  }

  if (state.status === "error") {
    return <AnalysisError error={state.error} onRetry={retry} />;
  }

  return <StackResultView data={state.data} />;
}
