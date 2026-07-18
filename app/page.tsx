import { Layers3, Scale, Timer } from "lucide-react";

import { ProjectInputForm } from "@/components/project-input-form";

export default function HomePage() {
  return (
    <div className="space-y-6 md:space-y-7">
      <section className="relative space-y-2.5 text-center sm:text-left">
        <p className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em] text-teal-700 uppercase dark:text-teal-300">
          AI Tech Stack Advisor
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Concevez une architecture
          <span className="block text-teal-800 dark:text-teal-200">
            technique fiable, en quelques secondes
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mx-0 md:text-base">
          Décrivez votre projet ou dictez-le au micro. Ministral 3 3B, via Rodium AI,
          recommande une stack complète et justifiée, avec une estimation d&apos;équipe,
          de durée et de coût.
        </p>
      </section>

      <section className="relative overflow-hidden rounded-xl border border-border/60 bg-background/70 p-4 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.4)] backdrop-blur-md md:p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-14 size-44 rounded-full bg-teal-400/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-8 size-40 rounded-full bg-sky-400/10 blur-3xl"
        />
        <div className="relative">
          <ProjectInputForm />
        </div>
      </section>

      <section className="grid gap-4 border-t border-border/50 pt-5 sm:grid-cols-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-200">
            <Layers3 className="size-4" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold">
              Stack complète
            </h2>
          </div>
          <p className="text-sm leading-snug text-muted-foreground">
            Backend, frontend, mobile, données, infrastructure, cloud et DevOps.
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-200">
            <Scale className="size-4" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold">
              Choix justifiés
            </h2>
          </div>
          <p className="text-sm leading-snug text-muted-foreground">
            Chaque recommandation s&apos;accompagne d&apos;une explication technique claire.
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-200">
            <Timer className="size-4" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold">
              Estimations utiles
            </h2>
          </div>
          <p className="text-sm leading-snug text-muted-foreground">
            Dimensionnez équipe, délai, budget cloud et niveau de complexité.
          </p>
        </div>
      </section>
    </div>
  );
}
