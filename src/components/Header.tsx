
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg">Central Bank</h1>
      </div>
      <div className="relative w-72">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="pl-8 pr-4"
          placeholder="Search documentation..."
          type="search"
        />
      </div>
    </div>
  );
}
