import { z } from "zod";

const levelSchema = z.enum(["low", "medium", "high"]);

const sectionJustification = z.object({
  justification: z.string().min(20).max(500),
});

export const stackRecommendationSchema = z.object({
  projectType: z.string().min(3).max(100),
  backend: sectionJustification.extend({
    language: z.string().min(1),
    framework: z.string().min(1),
  }),
  frontend: sectionJustification.extend({
    framework: z.string().min(1),
    uiLibrary: z.string().min(1),
  }),
  mobile: sectionJustification
    .extend({
      framework: z.string().min(1),
    })
    .optional(),
  database: sectionJustification.extend({
    type: z.string().min(1),
    cache: z.string().optional(),
    search: z.string().optional(),
    fileStorage: z.string().optional(),
  }),
  infrastructure: sectionJustification.extend({
    docker: z.boolean(),
    kubernetes: z.boolean(),
    reverseProxy: z.string().optional(),
    cdn: z.string().optional(),
  }),
  cloud: sectionJustification.extend({
    provider: z.string().min(1),
    alternatives: z.array(z.string()).min(1).max(4),
  }),
  devops: sectionJustification.extend({
    ci: z.string().min(1),
    iac: z.string().optional(),
    monitoring: z.string().min(1),
    logging: z.string().min(1),
  }),
  ai: sectionJustification
    .extend({
      llm: z.string().min(1),
      vectorDb: z.string().optional(),
      ragFramework: z.string().optional(),
      agentTools: z.array(z.string()).optional(),
    })
    .optional(),
  estimation: z.object({
    teamSize: z.string().min(1),
    devTime: z.string().min(1),
    monthlyCloudCost: z.string().min(1),
    difficulty: levelSchema,
    scalability: levelSchema,
    securityLevel: levelSchema,
  }),
});

export type StackRecommendation = z.infer<typeof stackRecommendationSchema>;
export type Level = z.infer<typeof levelSchema>;
