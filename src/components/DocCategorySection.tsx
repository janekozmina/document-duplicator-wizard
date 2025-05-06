
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DocCategorySectionProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function DocCategorySection({
  title,
  description,
  className,
  children,
}: DocCategorySectionProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
