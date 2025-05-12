
import React from "react";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "not-started";
};

const checklistItems: ChecklistItem[] = [
  {
    id: "item1",
    title: "API Documentation Review",
    description: "Review all API documentation for accuracy and completeness",
    status: "completed"
  },
  {
    id: "item2",
    title: "Outbound Credit Transfer Testing",
    description: "Complete all outbound credit transfer test cases",
    status: "in-progress"
  },
  {
    id: "item3",
    title: "Inbound Credit Transfer Testing",
    description: "Complete all inbound credit transfer test cases",
    status: "not-started"
  },
  {
    id: "item4",
    title: "Payment Return Testing",
    description: "Complete all payment return test scenarios",
    status: "not-started"
  },
  {
    id: "item5",
    title: "Error Handling Validation",
    description: "Verify proper error handling for all failure scenarios",
    status: "not-started"
  },
];

export function CertificationContent() {
  const renderStatusIcon = (status: ChecklistItem["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Circle className="h-5 w-5 text-amber-500 fill-amber-500 stroke-white" />;
      case "not-started":
        return <Circle className="h-5 w-5 text-gray-300" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Certification Checklist</h1>
        <div>
          <Button variant="outline" size="sm" className="mr-2">
            Export Results
          </Button>
          <Button size="sm">
            Start Certification
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground">
        Complete all the required test cases to achieve certification readiness.
      </p>

      <div className="space-y-4">
        {checklistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-start">
              <div className="mr-2 mt-1">{renderStatusIcon(item.status)}</div>
              <div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              Certification Progress
            </CardTitle>
            <CardDescription>1 of 5 items completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
