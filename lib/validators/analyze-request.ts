import { z } from "zod";

import {
  MAX_CONSTRAINTS_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
} from "@/lib/constants";

export const analyzeRequestSchema = z.object({
  description: z
    .string()
    .trim()
    .min(MIN_DESCRIPTION_LENGTH)
    .max(MAX_DESCRIPTION_LENGTH),
  constraints: z
    .string()
    .trim()
    .max(MAX_CONSTRAINTS_LENGTH)
    .optional(),
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;
