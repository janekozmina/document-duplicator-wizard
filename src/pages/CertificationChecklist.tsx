
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { CertificationContent } from "@/components/CertificationContent";

const CertificationChecklist = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <CertificationContent />
        </div>
      </div>
    </div>
  );
};

export default CertificationChecklist;
