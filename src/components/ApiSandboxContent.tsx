
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CodeBlock } from "@/components/CodeBlock";
import { AlertCircle, CheckCircle, Play, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function ApiSandboxContent() {
  const [endpoint, setEndpoint] = useState("gst-return");
  const [method, setMethod] = useState("GET");
  const [gstin, setGstin] = useState("24AAACJ3770E2ZV");
  const [financialYear, setFinancialYear] = useState("2019-20");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("request");
  
  const requestUrl = `https://api.sandbox.co.in/gsp/public/gstr?gstin=${gstin}&financial_year=${financialYear}`;
  
  const requestCode = `curl --request GET \\
  --url "${requestUrl}" \\
  --header "accept: application/json" \\
  --header "x-api-version: 1.0"`;

  const handleTryIt = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (gstin === "24AAACJ3770E2ZV") {
        setResponse({
          status: 200,
          data: {
            response: "Success",
            gst_return: {
              financial_year: financialYear,
              gstin: gstin,
              details: {
                tax_paid: 12500,
                total_turnover: 450000,
                filing_date: "2020-05-15"
              }
            }
          }
        });
        toast.success("API request successful");
      } else if (gstin === "08AAACS8577K1ZP") {
        setResponse({
          status: 503,
          error: {
            message: "Source Unavailable response",
            code: "SOURCE_UNAVAILABLE"
          }
        });
        toast.error("API request failed: Source Unavailable");
      } else {
        setResponse({
          status: 400,
          error: {
            message: "Invalid GSTIN",
            code: "INVALID_GSTIN"
          }
        });
        toast.error("API request failed: Invalid GSTIN");
      }
      setLoading(false);
    }, 1000);
  };

  const getResponseColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-500";
    if (status >= 400 && status < 500) return "text-red-500";
    return "text-orange-500";
  };

  const getResponseBadgeColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800";
    if (status >= 400 && status < 500) return "bg-red-100 text-red-800";
    return "bg-orange-100 text-orange-800";
  };

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-2">API Sandbox</h1>
        <p className="text-gray-600 mb-8">
          Test our APIs directly in the browser with different parameters and see live responses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Available APIs</h3>
              <div className="space-y-2">
                <div className="flex items-center p-2 bg-green-50 text-green-700 rounded-md font-medium">
                  <Badge className="bg-green-100 text-green-800 mr-2">GET</Badge>
                  GST Return
                </div>
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <Badge className="bg-blue-100 text-blue-800 mr-2">POST</Badge>
                  Search GSTIN by PAN
                </div>
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <Badge className="bg-green-100 text-green-800 mr-2">GET</Badge>
                  Taxpayer API
                </div>
                <div className="flex items-center p-2 hover:bg-gray-50 rounded-md">
                  <Badge className="bg-green-100 text-green-800 mr-2">GET</Badge>
                  Bank API
                </div>
              </div>
              
              <h3 className="text-lg font-medium my-4">Sample GSTINs</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 border rounded-md">
                  <div className="font-medium">24AAACJ3770E2ZV</div>
                  <div className="text-gray-500">Success response (200)</div>
                </div>
                <div className="p-2 border rounded-md">
                  <div className="font-medium">08AAACS8577K1ZP</div>
                  <div className="text-gray-500">Source Unavailable (503)</div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <Play className="mr-2 h-4 w-4" />
                  Run in Postman
                </Button>
              </div>
              
              <div className="mt-3">
                <Button variant="outline" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Track GST Return</h2>
                <p className="text-sm text-gray-500">
                  {requestUrl}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Track GST return for a financial year
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Method
                  </label>
                  <Select defaultValue="GET" onValueChange={setMethod}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GSTIN
                  </label>
                  <Input 
                    placeholder="Enter GSTIN" 
                    value={gstin} 
                    onChange={(e) => setGstin(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Financial Year
                  </label>
                  <Select defaultValue="2019-20" onValueChange={setFinancialYear}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select financial year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2019-20">FY 2019-20</SelectItem>
                      <SelectItem value="2020-21">FY 2020-21</SelectItem>
                      <SelectItem value="2021-22">FY 2021-22</SelectItem>
                      <SelectItem value="2022-23">FY 2022-23</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button 
                className="w-full mb-6" 
                onClick={handleTryIt}
                disabled={loading}
              >
                {loading ? "Sending..." : "Try It!"}
              </Button>
              
              <Tabs defaultValue="request" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="request">Request</TabsTrigger>
                  <TabsTrigger value="response">Response</TabsTrigger>
                </TabsList>
                
                <TabsContent value="request" className="space-y-4">
                  <div className="bg-gray-50 p-2 rounded-md">
                    <div className="text-sm font-medium mb-2">cURL</div>
                    <CodeBlock
                      language="bash"
                      code={requestCode}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="response" className="space-y-4">
                  {response ? (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Badge className={getResponseBadgeColor(response.status)}>
                          {response.status}
                        </Badge>
                        <span className="ml-2 text-sm">
                          {response.status >= 200 && response.status < 300 ? "Success" : "Error"}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-md">
                        <CodeBlock
                          language="json"
                          code={JSON.stringify(response.status >= 200 && response.status < 300 ? response.data : response.error, null, 2)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Click "Try It!" to see the response here
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">GST Pattern Validation</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Type</th>
                        <th className="text-left py-2 font-medium">Regular Expression</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 pr-4">GSTIN</td>
                        <td className="py-2 font-mono text-xs overflow-hidden">
                          ^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 p-4 border-l-4 border-yellow-400 bg-yellow-50">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                    <p className="text-sm text-gray-700">
                      Please note that GSTINs other than the ones mentioned will result in an Invalid response when testing in Test Environment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
