
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ApiSandboxContent } from "@/components/ApiSandboxContent";

const ApiSandbox = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <ApiSandboxContent />
        </div>
      </div>
    </div>
  );
};

export default ApiSandbox;
