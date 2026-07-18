export const MIN_DESCRIPTION_LENGTH = 50;
export const MAX_DESCRIPTION_LENGTH = 2000;
export const MAX_CONSTRAINTS_LENGTH = 500;
export const MAX_BODY_BYTES = 4096;

export const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX ?? 5);
export const RATE_LIMIT_WINDOW_MS = Number(
  process.env.RATE_LIMIT_WINDOW_MS ?? 600_000,
);

export const LLM_TIMEOUT_MS = 25_000;
export const LLM_MAX_TOKENS = 2048;
export const LLM_TEMPERATURE = 0.3;
export const DEFAULT_MODEL =
  process.env.RODIUMAI_MODEL ?? "mistral/ministral-3-3b-instruct";

export const SESSION_PENDING_KEY = "atsa:pending";
export const SESSION_RESULT_KEY = "atsa:result";

export const EXAMPLE_TELEMEDICINE = `Je souhaite creer une plateforme de telemedecine avec une application mobile, un tableau de bord administrateur, des appels video et un chatbot IA. L'objectif est de supporter environ 50 000 utilisateurs.`;
