
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DocContentCard } from "@/components/DocContentCard";
import { FileText, PlayCircle, Code } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome to the Sandbox Portal</h1>
                <p className="text-gray-600">
                  Access development documentation, test APIs, and run simulations
                  for various financial flows.
                </p>
              </div>
              <div className="flex-shrink-0">
                <img 
                  src="/lovable-uploads/b001a1da-cd91-4b8c-9381-3570f4f36e9c.png" 
                  alt="Logo" 
                  className="h-32"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DocContentCard
                title="Documentation"
                description="Access comprehensive guides and reference materials"
                icon={<FileText className="h-6 w-6" />}
                buttonText="View Documentation"
                buttonLink="/documentation"
              />
              
              <DocContentCard
                title="Simulators"
                description="Test complete payment scenarios"
                icon={<PlayCircle className="h-6 w-6" />}
                buttonText="Launch Simulators"
                buttonLink="/simulators"
              />
              
              <DocContentCard
                title="API Sandbox"
                description="Test API endpoints with custom parameters"
                icon={<Code className="h-6 w-6" />}
                buttonText="Open API Sandbox"
                buttonLink="/api-sandbox"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
