# AI Tech Stack Advisor

Assistant open source qui recommande une stack technique complete a partir d une description de projet en langage naturel.

Propulse par **Ministral 3 3B** via **Rodium AI**.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Zod
- Rodium AI

## Demarrage local

### Prerequis

- Node.js 20+
- Compte Rodium AI avec une clé API

### Installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

### Variables d environnement

| Variable | Requis | Description |
|----------|--------|-------------|
| `RODIUMAI_API_KEY` | Oui | Cle API Rodium AI (serveur uniquement) |
| `RODIUMAI_MODEL` | Non | Defaut `mistral/ministral-3-3b-instruct` |

L'application ne fonctionne pas sans clé Rodium AI valide.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Licence

MIT

