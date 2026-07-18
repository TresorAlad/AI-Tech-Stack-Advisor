import Link from "next/link";

const GITHUB_REPO_URL = "https://github.com/TresorAlad/AI-Tech-Stack-Advisor";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.91-.01 3.3 0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2.5 md:px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight md:text-base"
        >
          AI Tech Stack Advisor
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <p className="hidden text-xs text-muted-foreground sm:block">
            Ministral 3 3B via Rodium AI
          </p>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir le projet sur GitHub"
            title="Contribuer ou installer depuis GitHub"
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
          >
            <GitHubIcon className="size-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
