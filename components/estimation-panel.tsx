import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Level, StackRecommendation } from "@/types/stack-recommendation";
import { cn } from "@/lib/utils";

interface EstimationPanelProps {
  estimation: StackRecommendation["estimation"];
}

function levelBadgeClass(level: Level): string {
  if (level === "low") return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200";
  if (level === "medium") return "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200";
  return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200";
}

function LevelBadge({ label, level }: { label: string; level: Level }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <Badge className={cn("capitalize", levelBadgeClass(level))}>{level}</Badge>
    </div>
  );
}

export function EstimationPanel({ estimation }: EstimationPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Estimations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Equipe</p>
            <p className="text-sm font-medium">{estimation.teamSize}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Duree</p>
            <p className="text-sm font-medium">{estimation.devTime}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Cout cloud mensuel</p>
            <p className="text-sm font-medium">{estimation.monthlyCloudCost}</p>
          </div>
          <LevelBadge label="Difficulte" level={estimation.difficulty} />
          <LevelBadge label="Scalabilite" level={estimation.scalability} />
          <LevelBadge label="Securite" level={estimation.securityLevel} />
        </div>
      </CardContent>
    </Card>
  );
}
