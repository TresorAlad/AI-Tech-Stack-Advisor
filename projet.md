# AI Tech Stack Advisor

**AI Tech Stack Advisor** est une application web open source développée avec **Next.js** qui aide les développeurs, freelances et startups à concevoir l'architecture technique d'un projet logiciel grâce à l'IA.

À partir d'une simple description en langage naturel, l'application utilise **Ministral 3 3B** (via Rodium AI) pour recommander une stack technique complète, accompagnée d'explications et d'une estimation de la complexité du projet.

---

# Le problème

Le choix des technologies est souvent difficile au début d'un projet.

Les développeurs se demandent notamment :

* Quel langage utiliser ?
* Quelle base de données choisir ?
* Dois-je utiliser Docker ?
* Kubernetes est-il nécessaire ?
* Quel fournisseur cloud est le plus adapté ?
* Combien coûtera l'infrastructure ?
* Quelle architecture adopter ?

Ces décisions influencent directement les performances, la maintenabilité et les coûts du projet.

---

# La solution

L'utilisateur décrit son idée en quelques lignes.

Par exemple :

> Je souhaite créer une plateforme de télémédecine avec une application mobile, un tableau de bord administrateur, des appels vidéo et un chatbot IA. L'objectif est de supporter environ 50 000 utilisateurs.

En quelques secondes, **Ministral 3 3B** génère une recommandation complète.

---

# Résultat généré

## Backend

* Langage recommandé
* Framework
* Justification

---

## Frontend

* Framework
* UI Library
* Justification

---

## Mobile

* Framework
* Pourquoi ce choix

---

## Base de données

* SQL ou NoSQL
* Cache
* Recherche
* Stockage des fichiers

---

## Infrastructure

* Docker
* Kubernetes
* Reverse Proxy
* CDN

---

## Cloud

* AWS
* Azure
* Google Cloud
* DigitalOcean
* OVH

avec une justification.

---

## DevOps

* GitHub Actions
* GitLab CI
* Terraform
* Monitoring
* Logging

---

## IA

Si le projet contient de l'IA :

* LLM recommandé
* Base vectorielle
* Framework RAG
* Outils Agentic

---

## Estimation

Le modèle fournit également :

* 👥 Taille de l'équipe
* ⏱ Temps estimé de développement
* 💰 Budget cloud mensuel
* 📈 Difficulté du projet
* 🚀 Niveau de scalabilité
* 🔒 Niveau de sécurité attendu

---

# Bonus

Le modèle explique chaque recommandation.

Exemple :

> PostgreSQL est recommandé car le projet nécessite des transactions fiables, des relations complexes et une forte cohérence des données.

Au lieu de simplement répondre :

> PostgreSQL

---

# Fonctionnalités

* Détection automatique du type de projet
* Recommandation d'une stack complète
* Justification technique
* Estimation des coûts
* Estimation du temps de développement
* Estimation de la taille de l'équipe
* Export en PDF
* Export en Markdown
* Partage via URL
* Historique des analyses

---

# Technologies

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

## IA

* Rodium AI
* Ministral 3 3B

## Déploiement

* Vercel

---

# Open Source

```
AI-Tech-Stack-Advisor
│
├── app
├── components
├── lib
├── prompts
├── types
├── public
├── README.md
├── LICENSE
└── package.json
```

---

# Ce qui rend le projet intéressant

Ce n'est **pas un simple chatbot**. Il se positionne comme un **assistant d'architecture logicielle** capable d'accompagner les développeurs dès la phase de conception d'un projet.

Tu pourras facilement le présenter sur LinkedIn avec un message du type :

> *"J'ai développé AI Tech Stack Advisor, un assistant open source propulsé par Ministral 3 3B via Rodium AI. À partir d'une simple idée de projet, il recommande une architecture complète (backend, frontend, base de données, cloud, DevOps et IA) avec des justifications techniques et une estimation des coûts et des ressources."*

C'est un projet réaliste, démontrable en quelques minutes et suffisamment original pour mettre en valeur les capacités de raisonnement du modèle.
