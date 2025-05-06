
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center">
        <div className="text-green-600 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24" 
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </div>
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
