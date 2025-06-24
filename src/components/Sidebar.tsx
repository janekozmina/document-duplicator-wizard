
import React from "react";
import { SidebarNav } from "@/components/SidebarNav";

export function Sidebar() {
  return (
    <div className="w-[260px] border-r bg-white">
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4">Onboarding Portal</h2>
        <SidebarNav />
      </div>
    </div>
  );
}
