
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ApiReferenceContent } from "@/components/ApiReferenceContent";

const ApiReference = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <ApiReferenceContent />
        </div>
      </div>
    </div>
  );
};

export default ApiReference;
