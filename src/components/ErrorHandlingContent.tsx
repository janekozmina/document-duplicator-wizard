
import React, { useState } from "react";
import { AlertCircle, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function ErrorHandlingContent() {
  const [errorType, setErrorType] = useState("validation");
  const [responseTab, setResponseTab] = useState("result");
  const { toast } = useToast();
  
  const handleSimulate = () => {
    setResponseTab("result");
    toast({
      title: "Error simulation triggered",
      description: `Simulating ${errorType} error scenario`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Error Handling Simulator</h1>
        <div>
          <Button variant="outline" size="sm" className="mr-2">
            Documentation
          </Button>
          <Button variant="outline" size="sm">
            Error Codes
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground">
        Test how your application handles various error scenarios in a sandbox environment.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Simulation Configuration</CardTitle>
              <CardDescription>Select the error scenario you want to simulate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Error Type</label>
                <Select defaultValue="validation" onValueChange={setErrorType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select error type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="validation">Validation Error</SelectItem>
                    <SelectItem value="authorization">Authorization Error</SelectItem>
                    <SelectItem value="timeout">Timeout Error</SelectItem>
                    <SelectItem value="format">Format Error</SelectItem>
                    <SelectItem value="system">System Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Request Payload</label>
                <Textarea 
                  placeholder="Enter your request payload here" 
                  className="h-40 font-mono text-sm"
                  defaultValue={`{\n  "accountId": "INVALID_ACCOUNT",\n  "amount": 100.00,\n  "currency": "PKR",\n  "reference": "TEST_PAYMENT"\n}`}
                />
              </div>
              
              <Button className="w-full" onClick={handleSimulate}>
                Simulate Error
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Response</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={responseTab} onValueChange={setResponseTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="result">Result</TabsTrigger>
                  <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                </TabsList>
                
                <TabsContent value="result" className="space-y-4">
                  <div className="bg-red-50 border border-red-200 p-3 rounded-md flex">
                    <AlertCircle className="text-red-500 mr-2 h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Error Occurred</p>
                      <p className="text-red-600 text-sm">Error code: INVALID_ACCOUNT</p>
                    </div>
                  </div>
                  
                  <Textarea 
                    readOnly 
                    className="h-40 bg-gray-50 font-mono text-sm"
                    value={`{
  "error": {
    "code": "ERR_VALIDATION_FAILED",
    "message": "The account ID provided is invalid or does not exist",
    "details": {
      "field": "accountId",
      "value": "INVALID_ACCOUNT",
      "reason": "Account not found in the system"
    },
    "timestamp": "2025-05-12T10:15:30Z",
    "requestId": "req-8a7b6c5d-9e0f-1a2b-3c4d-5e6f7a8b9c0d"
  }
}`}
                  />
                </TabsContent>
                
                <TabsContent value="headers">
                  <Textarea 
                    readOnly 
                    className="h-64 bg-gray-50 font-mono text-sm"
                    value={`HTTP/1.1 400 Bad Request
Content-Type: application/json
X-Request-ID: req-8a7b6c5d-9e0f-1a2b-3c4d-5e6f7a8b9c0d
Date: Mon, 12 May 2025 10:15:30 GMT
Content-Length: 293
Connection: close`}
                  />
                </TabsContent>
                
                <TabsContent value="curl">
                  <Textarea 
                    readOnly 
                    className="h-64 bg-gray-50 font-mono text-sm"
                    value={`curl -X POST \\
  https://api.sandbox.centralbank.org/payments \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "accountId": "INVALID_ACCOUNT",
    "amount": 100.00,
    "currency": "PKR",
    "reference": "TEST_PAYMENT"
  }'`}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center text-lg">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Validation Errors
            </CardTitle>
            <CardDescription>Error codes 400-422</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Format validation</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Business rule validation</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Field value validation</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="bg-amber-50">
            <CardTitle className="flex items-center text-lg">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              Authorization Errors
            </CardTitle>
            <CardDescription>Error codes 401-403</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Authentication failures</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Permission issues</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Token expiration</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center text-lg">
              <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
              System Errors
            </CardTitle>
            <CardDescription>Error codes 500-503</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Unavailable services</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Timeout scenarios</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Internal server errors</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
