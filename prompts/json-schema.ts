export const STACK_JSON_SCHEMA = `{
  "projectType": "string - type detecte (ex. SaaS B2B, Marketplace, API REST)",
  "backend": {
    "language": "string",
    "framework": "string",
    "justification": "string min 20 chars"
  },
  "frontend": {
    "framework": "string",
    "uiLibrary": "string",
    "justification": "string min 20 chars"
  },
  "mobile": {
    "framework": "string",
    "justification": "string min 20 chars"
  },
  "database": {
    "type": "string",
    "cache": "string optional",
    "search": "string optional",
    "fileStorage": "string optional",
    "justification": "string min 20 chars"
  },
  "infrastructure": {
    "docker": "boolean",
    "kubernetes": "boolean",
    "reverseProxy": "string optional",
    "cdn": "string optional",
    "justification": "string min 20 chars"
  },
  "cloud": {
    "provider": "string",
    "alternatives": ["string min 1, max 4"],
    "justification": "string min 20 chars"
  },
  "devops": {
    "ci": "string",
    "iac": "string optional",
    "monitoring": "string",
    "logging": "string",
    "justification": "string min 20 chars"
  },
  "ai": {
    "llm": "string",
    "vectorDb": "string optional",
    "ragFramework": "string optional",
    "agentTools": ["string optional"],
    "justification": "string min 20 chars"
  },
  "estimation": {
    "teamSize": "string",
    "devTime": "string",
    "monthlyCloudCost": "string",
    "difficulty": "low | medium | high",
    "scalability": "low | medium | high",
    "securityLevel": "low | medium | high"
  }
}`;
