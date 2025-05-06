
import React from "react";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CodeBlockProps {
  language: string;
  code: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  language,
  code,
  filename,
  className,
}: CodeBlockProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className={cn("rounded-md overflow-hidden border", className)}>
      <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-500">{language}</span>
          {filename && (
            <span className="text-sm text-gray-400">{filename}</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleCopy}
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy code</span>
        </Button>
      </div>
      <pre className="bg-gray-900 text-gray-50 p-4 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
