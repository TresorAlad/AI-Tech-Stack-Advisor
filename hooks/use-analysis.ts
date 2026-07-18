"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  clearPendingAnalysis,
  getPendingAnalysis,
  getStoredResult,
  setStoredResult,
} from "@/lib/storage/session-storage";
import type { ApiErrorCode, AnalyzeSuccessResponse } from "@/types/api";
import type { StackRecommendation } from "@/types/stack-recommendation";

type AnalysisState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: StackRecommendation }
  | { status: "error"; error: ApiErrorCode };

interface UseAnalysisReturn {
  state: AnalysisState;
  retry: () => void;
}

export function useAnalysis(): UseAnalysisReturn {
  const [state, setState] = useState<AnalysisState>({ status: "idle" });
  const hasFetched = useRef(false);

  const runAnalysis = useCallback(async (force = false) => {
    const pending = getPendingAnalysis();
    if (!pending?.description) {
      const cached = getStoredResult();
      if (cached && !force) {
        setState({ status: "success", data: cached.data });
        return;
      }
      setState({ status: "error", error: "EMPTY_PENDING" });
      return;
    }

    setState({ status: "loading" });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: pending.description,
          constraints: pending.constraints,
        }),
      });

      const payload = (await response.json()) as
        | AnalyzeSuccessResponse
        | { error: ApiErrorCode };

      if (!response.ok || !("data" in payload)) {
        const error =
          "error" in payload ? payload.error : ("INTERNAL_ERROR" as ApiErrorCode);
        setState({ status: "error", error });
        return;
      }

      setStoredResult({
        data: payload.data,
        description: pending.description,
        generatedAt: payload.meta.generatedAt,
        model: payload.meta.model,
      });
      clearPendingAnalysis();
      setState({ status: "success", data: payload.data });
    } catch {
      setState({ status: "error", error: "LLM_UNAVAILABLE" });
    }
  }, []);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    void runAnalysis();
  }, [runAnalysis]);

  const retry = useCallback(() => {
    void runAnalysis(true);
  }, [runAnalysis]);

  return { state, retry };
}
