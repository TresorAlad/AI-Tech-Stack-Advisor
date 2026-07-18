export const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
} as const;

export function jsonResponse(
  body: unknown,
  status = 200,
  extraHeaders?: HeadersInit,
): Response {
  return Response.json(body, {
    status,
    headers: {
      ...SECURITY_HEADERS,
      ...extraHeaders,
    },
  });
}
