
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ErrorHandlingContent } from "@/components/ErrorHandlingContent";

const ErrorHandling = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <ErrorHandlingContent />
        </div>
      </div>
    </div>
  );
};

export default ErrorHandling;
