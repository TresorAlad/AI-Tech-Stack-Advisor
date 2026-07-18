import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StackSectionCardProps {
  title: string;
  icon: LucideIcon;
  fields: { label: string; value: string | boolean }[];
  justification: string;
}

export function StackSectionCard({
  title,
  icon: Icon,
  fields,
  justification,
}: StackSectionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="size-5" aria-hidden />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="grid gap-3 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label} className="space-y-1">
              <dt className="text-xs text-muted-foreground">{field.label}</dt>
              <dd className="text-sm font-medium">
                {typeof field.value === "boolean" ? (
                  <Badge variant={field.value ? "default" : "secondary"}>
                    {field.value ? "Oui" : "Non"}
                  </Badge>
                ) : (
                  field.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <CardDescription className="text-sm leading-relaxed">
          {justification}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
