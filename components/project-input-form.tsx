"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Mic, MicOff, Sparkles } from "lucide-react";

import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  EXAMPLE_TELEMEDICINE,
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
} from "@/lib/constants";
import { setPendingAnalysis } from "@/lib/storage/session-storage";
import { cn } from "@/lib/utils";

export function ProjectInputForm() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [interim, setInterim] = useState("");
  const baseBeforeSpeechRef = useRef("");

  const handleTranscript = useCallback((text: string, isFinal: boolean) => {
    if (isFinal) {
      const base = baseBeforeSpeechRef.current;
      const next = `${base}${base && !base.endsWith(" ") ? " " : ""}${text.trim()}`.slice(
        0,
        MAX_DESCRIPTION_LENGTH,
      );
      baseBeforeSpeechRef.current = next;
      setDescription(next);
      setInterim("");
      return;
    }

    setInterim(text);
  }, []);

  const { isListening, isSupported, error, toggle, stop, clearError } =
    useSpeechRecognition({
      lang: "fr-FR",
      onTranscript: handleTranscript,
    });

  const displayValue = interim
    ? `${description}${description && !description.endsWith(" ") ? " " : ""}${interim}`
    : description;

  const length = displayValue.trim().length;
  const isValid =
    length >= MIN_DESCRIPTION_LENGTH && length <= MAX_DESCRIPTION_LENGTH;

  function handleExample() {
    if (isListening) stop();
    setInterim("");
    setDescription(EXAMPLE_TELEMEDICINE);
    clearError();
  }

  function handleMicToggle() {
    if (!isListening) {
      baseBeforeSpeechRef.current = description;
      setInterim("");
      clearError();
    }
    toggle();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;
    if (isListening) stop();

    setPendingAnalysis({ description: displayValue.trim() });
    router.push("/result");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-3">
        <Label htmlFor="description" className="text-sm font-medium">
          Decrivez votre projet
        </Label>

        <div
          className={cn(
            "rounded-2xl border border-border/80 bg-background/90 shadow-sm backdrop-blur-sm transition-[box-shadow,border-color]",
            "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
            isListening && "border-red-400/70 ring-3 ring-red-400/20",
          )}
        >
          <Textarea
            id="description"
            name="description"
            rows={5}
            value={displayValue}
            onChange={(event) => {
              if (isListening) stop();
              setInterim("");
              setDescription(event.target.value);
              clearError();
            }}
            placeholder="Ex. Une marketplace B2B pour artisans, avec paiements, messagerie et tableau de bord admin. Objectif : 10 000 utilisateurs en annee 1..."
            maxLength={MAX_DESCRIPTION_LENGTH}
            className="min-h-32 resize-none border-0 bg-transparent px-4 pt-4 pb-2 text-base shadow-none focus-visible:border-0 focus-visible:ring-0"
          />

          <div className="flex items-center justify-between gap-2 px-2 pb-2">
            <div className="min-h-8 flex items-center px-2 text-xs text-muted-foreground">
              {isListening ? (
                <span className="flex items-center gap-2 font-medium text-red-600 dark:text-red-400">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                  </span>
                  Ecoute en cours...
                </span>
              ) : (
                <span className="tabular-nums">
                  {length}/{MAX_DESCRIPTION_LENGTH}
                </span>
              )}
            </div>

            {isSupported ? (
              <button
                type="button"
                onClick={handleMicToggle}
                aria-pressed={isListening}
                aria-label={
                  isListening ? "Arreter la dictee" : "Dicter avec le micro"
                }
                title={isListening ? "Arreter" : "Parler"}
                className={cn(
                  "inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
                  isListening
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {isListening ? (
                  <MicOff className="size-4" aria-hidden />
                ) : (
                  <Mic className="size-4" aria-hidden />
                )}
              </button>
            ) : null}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {error
            ? error
            : isListening
              ? "Parlez clairement. Cliquez sur le micro pour arreter."
              : `Minimum ${MIN_DESCRIPTION_LENGTH} caracteres. Utilisez le micro pour dicter.`}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="button"
          variant="ghost"
          onClick={handleExample}
          className="justify-start text-muted-foreground sm:justify-center"
        >
          Essayer l&apos;exemple telemedecine
        </Button>
        <Button
          type="submit"
          disabled={!isValid}
          size="lg"
          className="gap-2 sm:ml-auto"
        >
          <Sparkles className="size-4" aria-hidden />
          Analyser mon projet
        </Button>
      </div>
    </form>
  );
}
