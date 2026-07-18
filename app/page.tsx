import { Layers3, Scale, Timer } from "lucide-react";

import { ProjectInputForm } from "@/components/project-input-form";

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16">
      <section className="relative space-y-5 pt-2 text-center sm:pt-6 sm:text-left">
        <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-teal-700 uppercase dark:text-teal-300">
          AI Tech Stack Advisor
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl leading-[1.08] font-semibold tracking-tight text-balance md:text-6xl">
          Votre architecture,
          <span className="block text-teal-800 dark:text-teal-200">
            pensee en quelques secondes
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:mx-0 md:text-lg">
          Decrivez votre idee - ou dictez-la au micro. Ministral 3 3B via Rodium AI
          recommande une stack complete, justifiee, avec estimations equipe,
          duree et cout.
        </p>
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur-md md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-teal-400/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-10 size-48 rounded-full bg-sky-400/10 blur-3xl"
        />
        <div className="relative">
          <ProjectInputForm />
        </div>
      </section>

      <section className="grid gap-6 border-t border-border/50 pt-8 sm:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-200">
            <Layers3 className="size-4" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold">
              Stack complete
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Backend, frontend, mobile, data, infra, cloud et DevOps.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-200">
            <Scale className="size-4" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold">
              Justifiee
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Chaque choix technologique est explique clairement.
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-teal-800 dark:text-teal-200">
            <Timer className="size-4" aria-hidden />
            <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold">
              Estimee
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Equipe, duree, cout cloud et niveaux de complexite.
          </p>
        </div>
      </section>
    </div>
  );
}
