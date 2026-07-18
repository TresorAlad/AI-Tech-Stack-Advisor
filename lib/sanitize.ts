import {
  MAX_CONSTRAINTS_LENGTH,
  MAX_DESCRIPTION_LENGTH,
} from "@/lib/constants";

function stripControlChars(value: string): string {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

export function sanitizeText(value: string, maxLength: number): string {
  return stripControlChars(value).trim().slice(0, maxLength);
}

export function sanitizeDescription(value: string): string {
  return sanitizeText(value, MAX_DESCRIPTION_LENGTH);
}

export function sanitizeConstraints(value: string): string {
  return sanitizeText(value, MAX_CONSTRAINTS_LENGTH);
}
