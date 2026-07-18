import {
  SESSION_PENDING_KEY,
  SESSION_RESULT_KEY,
} from "@/lib/constants";
import type {
  PendingAnalysis,
  StoredAnalysisResult,
} from "@/types/api";

function canUseSessionStorage(): boolean {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

export function setPendingAnalysis(pending: PendingAnalysis): void {
  if (!canUseSessionStorage()) return;
  sessionStorage.setItem(SESSION_PENDING_KEY, JSON.stringify(pending));
}

export function getPendingAnalysis(): PendingAnalysis | null {
  if (!canUseSessionStorage()) return null;
  const raw = sessionStorage.getItem(SESSION_PENDING_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PendingAnalysis;
  } catch {
    return null;
  }
}

export function clearPendingAnalysis(): void {
  if (!canUseSessionStorage()) return;
  sessionStorage.removeItem(SESSION_PENDING_KEY);
}

export function setStoredResult(result: StoredAnalysisResult): void {
  if (!canUseSessionStorage()) return;
  sessionStorage.setItem(SESSION_RESULT_KEY, JSON.stringify(result));
}

export function getStoredResult(): StoredAnalysisResult | null {
  if (!canUseSessionStorage()) return null;
  const raw = sessionStorage.getItem(SESSION_RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredAnalysisResult;
  } catch {
    return null;
  }
}

export function clearStoredResult(): void {
  if (!canUseSessionStorage()) return;
  sessionStorage.removeItem(SESSION_RESULT_KEY);
}
