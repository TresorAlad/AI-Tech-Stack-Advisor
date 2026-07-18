import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "@/lib/constants";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function checkRateLimit(ip: string): {
  allowed: boolean;
  retryAfter: number;
} {
  const now = Date.now();
  const entry = buckets.get(ip);

  if (!entry || now >= entry.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  buckets.set(ip, entry);
  return { allowed: true, retryAfter: 0 };
}
