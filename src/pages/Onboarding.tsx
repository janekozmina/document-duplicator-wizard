
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  PlayCircle, 
  Code, 
  CheckSquare,
  FileCode,
  Home,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to Participants Portal",
    description: "Let's take a quick tour to help you get started with the platform",
    icon: Home,
    content: "This portal provides everything you need to integrate with our payment system, including documentation, API testing tools, and simulators.",
    action: "Get Started"
  },
  {
    id: 2,
    title: "Explore Documentation",
    description: "Access comprehensive guides and technical documentation",
    icon: FileText,
    content: "Our documentation covers authentication, message formats, error handling, and integration best practices. Start here to understand the system architecture.",
    action: "View Documentation",
    link: "/documentation"
  },
  {
    id: 3,
    title: "Test APIs",
    description: "Use our API reference to test endpoints in real-time",
    icon: Code,
    content: "The API Reference section allows you to authenticate and test all available endpoints with live data. Perfect for development and troubleshooting.",
    action: "Try API Reference",
    link: "/api-reference"
  },
  {
    id: 4,
    title: "Run Simulations",
    description: "Practice with our payment simulators",
    icon: PlayCircle,
    content: "Test different payment scenarios including outbound transfers, inbound transfers, and error handling without affecting real transactions.",
    action: "Start Simulation",
    link: "/simulators"
  },
  {
    id: 5,
    title: "XML Message Tools",
    description: "Validate and generate XML messages",
    icon: FileCode,
    content: "Upload your XML messages for validation or generate sample messages for testing. Supports pacs.008, pacs.004, and pacs.002 formats.",
    action: "Explore XML Tools",
    link: "/xml-messages"
  },
  {
    id: 6,
    title: "Complete Certification",
    description: "Follow our certification checklist",
    icon: CheckSquare,
    content: "Ensure you're ready for production with our comprehensive certification checklist. Track your progress and get certified.",
    action: "Start Certification",
    link: "/certification"
  }
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    navigate("/");
  };

  const completeOnboarding = () => {
    navigate("/");
  };

  const step = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Getting Started</h1>
              <Button variant="ghost" onClick={skipOnboarding}>
                <X className="h-4 w-4 mr-2" />
                Skip Tour
              </Button>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Step {currentStep + 1} of {onboardingSteps.length}
                </span>
                <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="mb-8">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
                <CardDescription className="text-lg">{step.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  {step.content}
                </p>
                
                <div className="flex justify-center gap-4">
                  {currentStep > 0 && (
                    <Button variant="outline" onClick={prevStep}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  
                  {step.link ? (
                    <Button asChild>
                      <Link to={step.link}>
                        {step.action}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  ) : currentStep === onboardingSteps.length - 1 ? (
                    <Button onClick={completeOnboarding}>
                      Complete Tour
                    </Button>
                  ) : (
                    <Button onClick={nextStep}>
                      {step.action}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {onboardingSteps.map((stepItem, index) => (
                <Card 
                  key={stepItem.id}
                  className={`cursor-pointer transition-all ${
                    index === currentStep 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : index < currentStep 
                        ? 'bg-green-50 border-green-200' 
                        : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${
                        index === currentStep 
                          ? 'bg-blue-500 text-white' 
                          : index < currentStep 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                      }`}>
                        <stepItem.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{stepItem.title}</h3>
                        <p className="text-xs text-gray-600">{stepItem.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
