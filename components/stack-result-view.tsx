"use client";

import Link from "next/link";
import {
  Bot,
  Cloud,
  Database,
  HardDrive,
  Layout,
  Server,
  Smartphone,
  Workflow,
} from "lucide-react";

import { EstimationPanel } from "@/components/estimation-panel";
import { StackSectionCard } from "@/components/stack-section-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { StackRecommendation } from "@/types/stack-recommendation";

interface StackResultViewProps {
  data: StackRecommendation;
}

export function StackResultView({ data }: StackResultViewProps) {
  const defaultTab = "backend";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost" }), "w-fit px-0")}
        >
          Nouvelle analyse
        </Link>
        <Badge variant="secondary" className="w-fit text-sm">
          {data.projectType}
        </Badge>
      </div>

      <EstimationPanel estimation={data.estimation} />

      <Alert>
        <AlertDescription>
          Estimations indicatives. À interpréter selon votre contexte, votre équipe et vos contraintes.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          {data.mobile ? <TabsTrigger value="mobile">Mobile</TabsTrigger> : null}
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="infrastructure">Infra</TabsTrigger>
          <TabsTrigger value="cloud">Cloud</TabsTrigger>
          <TabsTrigger value="devops">DevOps</TabsTrigger>
          {data.ai ? <TabsTrigger value="ai">IA</TabsTrigger> : null}
        </TabsList>

        <TabsContent value="backend">
          <StackSectionCard
            title="Backend"
            icon={Server}
            fields={[
              { label: "Langage", value: data.backend.language },
              { label: "Framework", value: data.backend.framework },
            ]}
            justification={data.backend.justification}
          />
        </TabsContent>

        <TabsContent value="frontend">
          <StackSectionCard
            title="Frontend"
            icon={Layout}
            fields={[
              { label: "Framework", value: data.frontend.framework },
              { label: "UI Library", value: data.frontend.uiLibrary },
            ]}
            justification={data.frontend.justification}
          />
        </TabsContent>

        {data.mobile ? (
          <TabsContent value="mobile">
            <StackSectionCard
              title="Mobile"
              icon={Smartphone}
              fields={[{ label: "Framework", value: data.mobile.framework }]}
              justification={data.mobile.justification}
            />
          </TabsContent>
        ) : null}

        <TabsContent value="database">
          <StackSectionCard
            title="Base de données"
            icon={Database}
            fields={[
              { label: "Type", value: data.database.type },
              ...(data.database.cache
                ? [{ label: "Cache", value: data.database.cache }]
                : []),
              ...(data.database.search
                ? [{ label: "Recherche", value: data.database.search }]
                : []),
              ...(data.database.fileStorage
                ? [{ label: "Fichiers", value: data.database.fileStorage }]
                : []),
            ]}
            justification={data.database.justification}
          />
        </TabsContent>

        <TabsContent value="infrastructure">
          <StackSectionCard
            title="Infrastructure"
            icon={HardDrive}
            fields={[
              { label: "Docker", value: data.infrastructure.docker },
              { label: "Kubernetes", value: data.infrastructure.kubernetes },
              ...(data.infrastructure.reverseProxy
                ? [
                    {
                      label: "Reverse proxy",
                      value: data.infrastructure.reverseProxy,
                    },
                  ]
                : []),
              ...(data.infrastructure.cdn
                ? [{ label: "CDN", value: data.infrastructure.cdn }]
                : []),
            ]}
            justification={data.infrastructure.justification}
          />
        </TabsContent>

        <TabsContent value="cloud">
          <StackSectionCard
            title="Cloud"
            icon={Cloud}
            fields={[
              { label: "Provider", value: data.cloud.provider },
              {
                label: "Alternatives",
                value: data.cloud.alternatives.join(", "),
              },
            ]}
            justification={data.cloud.justification}
          />
        </TabsContent>

        <TabsContent value="devops">
          <StackSectionCard
            title="DevOps"
            icon={Workflow}
            fields={[
              { label: "CI", value: data.devops.ci },
              ...(data.devops.iac
                ? [{ label: "IaC", value: data.devops.iac }]
                : []),
              { label: "Monitoring", value: data.devops.monitoring },
              { label: "Logging", value: data.devops.logging },
            ]}
            justification={data.devops.justification}
          />
        </TabsContent>

        {data.ai ? (
          <TabsContent value="ai">
            <StackSectionCard
              title="IA"
              icon={Bot}
              fields={[
                { label: "LLM", value: data.ai.llm },
                ...(data.ai.vectorDb
                  ? [{ label: "Vector DB", value: data.ai.vectorDb }]
                  : []),
                ...(data.ai.ragFramework
                  ? [{ label: "RAG", value: data.ai.ragFramework }]
                  : []),
                ...(data.ai.agentTools?.length
                  ? [
                      {
                        label: "Outils agents",
                        value: data.ai.agentTools.join(", "),
                      },
                    ]
                  : []),
              ]}
              justification={data.ai.justification}
            />
          </TabsContent>
        ) : null}
      </Tabs>
    </div>
  );
}
