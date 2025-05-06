
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SimulatorsContent } from "@/components/SimulatorsContent";

const Simulators = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <SimulatorsContent />
        </div>
      </div>
    </div>
  );
};

export default Simulators;
