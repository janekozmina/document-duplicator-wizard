
import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocContentCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

export function DocContentCard({
  title,
  description,
  icon,
  buttonText,
  buttonLink,
  className,
}: DocContentCardProps) {
  return (
    <div className={cn("rounded-lg border p-6", className)}>
      <div className="flex items-center mb-4 text-gray-700">
        {icon}
        <h3 className="text-xl font-medium ml-2">{title}</h3>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <Button asChild variant="outline" className="group">
        <a href={buttonLink}>
          {buttonText}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </Button>
    </div>
  );
}
