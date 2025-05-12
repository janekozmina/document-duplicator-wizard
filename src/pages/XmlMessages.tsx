
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { XmlMessagesContent } from "@/components/XmlMessagesContent";

const XmlMessages = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <XmlMessagesContent />
        </div>
      </div>
    </div>
  );
};

export default XmlMessages;
