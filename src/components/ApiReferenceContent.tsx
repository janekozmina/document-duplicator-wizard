
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ApiReferenceContent() {
  const [activeEndpoint, setActiveEndpoint] = useState("customer-info");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("request");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      customerId: "12345",
      uidType: "phone", 
      uidValue: "+91987654321"
    }
  });
  
  const authForm = useForm({
    defaultValues: {
      clientId: "test_client_id",
      clientSecret: "test_client_secret"
    }
  });
  
  const handleSelectEndpoint = (endpoint: string) => {
    setActiveEndpoint(endpoint);
    setResponse(null);
  };
  
  const handleAuthenticate = () => {
    const authValues = authForm.getValues();
    setAuthLoading(true);
    
    // Simulate API authentication
    setTimeout(() => {
      if (authValues.clientId === "test_client_id" && authValues.clientSecret === "test_client_secret") {
        setIsAuthenticated(true);
        toast.success("Authentication successful");
      } else {
        toast.error("Authentication failed: Invalid credentials");
      }
      setAuthLoading(false);
    }, 1000);
  };
  
  const handleSendRequest = () => {
    if (!isAuthenticated) {
      toast.error("Please authenticate first");
      return;
    }
    
    setLoading(true);
    const formValues = form.getValues();
    
    // Simulate API call
    setTimeout(() => {
      if (activeEndpoint === "customer-info") {
        if (formValues.customerId === "12345") {
          setResponse({
            status: 200,
            data: {
              customer: {
                id: "12345",
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+91987654321",
                created_at: "2023-06-15T10:30:00Z",
                status: "active"
              }
            }
          });
          toast.success("API request successful");
        } else {
          setResponse({
            status: 404,
            error: {
              code: "CUSTOMER_NOT_FOUND",
              message: "Customer with ID not found"
            }
          });
          toast.error("API request failed: Customer not found");
        }
      } else {
        setResponse({
          status: 200,
          data: {
            merchant: {
              id: "M789012",
              business_name: "Acme Corporation",
              tax_id: "ABCDE1234F",
              status: "active",
              created_at: "2022-10-05T14:20:30Z"
            }
          }
        });
        toast.success("API request successful");
      }
      setLoading(false);
      setActiveTab("response");
    }, 1000);
  };

  const getRequestDetails = () => {
    const formValues = form.getValues();
    
    if (activeEndpoint === "customer-info") {
      return {
        url: `/customers?uidType=${formValues.uidType}&uidValue=${formValues.uidValue}`,
        method: "GET",
        description: "Get customer information from CAS",
        curlCommand: `curl --location --request GET 'https://api.example.com/customers?uidType=${formValues.uidType}&uidValue=${formValues.uidValue}' \\
--header 'Authorization: Bearer YOUR_TOKEN' \\
--header 'Content-Type: application/json'`
      };
    } else {
      return {
        url: "/merchant/info",
        method: "GET",
        description: "Get own legal customer information from CAS",
        curlCommand: `curl --location --request GET 'https://api.example.com/merchant/info' \\
--header 'Authorization: Bearer YOUR_TOKEN' \\
--header 'Content-Type: application/json'`
      };
    }
  };

  const requestDetails = getRequestDetails();
  
  const getResponseColor = (status?: number) => {
    if (!status) return "";
    if (status >= 200 && status < 300) return "text-green-500";
    if (status >= 400 && status < 500) return "text-red-500";
    return "text-orange-500";
  };

  const getResponseBadgeColor = (status?: number) => {
    if (!status) return "";
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800";
    if (status >= 400 && status < 500) return "bg-red-100 text-red-800";
    return "bg-orange-100 text-orange-800";
  };

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-2">API Reference & Sandbox</h1>
        <p className="text-gray-600 mb-8">
          Test API endpoints and view the reference documentation in one place.
        </p>
      </div>

      {!isAuthenticated ? (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">
              Please authenticate to access the API sandbox.
            </p>
            
            <Form {...authForm}>
              <div className="space-y-4">
                <FormField
                  control={authForm.control}
                  name="clientId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client ID</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter client ID" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={authForm.control}
                  name="clientSecret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Secret</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Enter client secret" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button 
                    className="w-full" 
                    onClick={handleAuthenticate}
                    disabled={authLoading}
                  >
                    {authLoading ? "Authenticating..." : "Authenticate"}
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-md mt-4">
                  <p className="font-medium text-blue-800 mb-2">Demo Credentials</p>
                  <p>Client ID: test_client_id</p>
                  <p>Client Secret: test_client_secret</p>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Available Endpoints</h3>
                  <Badge className="bg-green-100 text-green-800">Authenticated</Badge>
                </div>
                <div className="space-y-2">
                  <div 
                    className={`flex items-center p-2 rounded-md cursor-pointer ${activeEndpoint === "customer-info" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"}`}
                    onClick={() => handleSelectEndpoint("customer-info")}
                  >
                    <Badge className="bg-green-100 text-green-800 mr-2">GET</Badge>
                    Get Customer Info
                  </div>
                  <div 
                    className={`flex items-center p-2 rounded-md cursor-pointer ${activeEndpoint === "merchant-info" ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"}`}
                    onClick={() => handleSelectEndpoint("merchant-info")}
                  >
                    <Badge className="bg-green-100 text-green-800 mr-2">GET</Badge>
                    Get Merchant Info
                  </div>
                  <div 
                    className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50`}
                  >
                    <Badge className="bg-yellow-100 text-yellow-800 mr-2">POST</Badge>
                    Register Customer
                  </div>
                  <div 
                    className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-50`}
                  >
                    <Badge className="bg-red-100 text-red-800 mr-2">DELETE</Badge>
                    Delete Customer
                  </div>
                </div>
                
                <h3 className="text-lg font-medium my-4">Sample IDs</h3>
                <div className="space-y-2 text-sm">
                  <div className="p-2 border rounded-md">
                    <div className="font-medium">12345</div>
                    <div className="text-gray-500">Success response (200)</div>
                  </div>
                  <div className="p-2 border rounded-md">
                    <div className="font-medium">99999</div>
                    <div className="text-gray-500">Not found (404)</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setIsAuthenticated(false)}
                  >
                    Log out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">{activeEndpoint === "customer-info" ? "Get Customer Information" : "Get Merchant Information"}</h2>
                  <p className="text-sm text-gray-500">
                    {requestDetails.url}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {requestDetails.description}
                  </p>
                </div>
                
                <Form {...form}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                        Method
                      </FormLabel>
                      <Select 
                        defaultValue={requestDetails.method} 
                        onValueChange={setMethod}
                        disabled
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {activeEndpoint === "customer-info" && (
                      <>
                        <FormField
                          control={form.control}
                          name="customerId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Customer ID</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter customer ID" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="uidType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>UID Type</FormLabel>
                              <Select 
                                defaultValue={field.value} 
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select UID type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="phone">Phone</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="pan">PAN</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="uidValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>UID Value</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter UID value" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                </Form>
                
                <Button 
                  className="w-full mb-6" 
                  onClick={handleSendRequest}
                  disabled={loading}
                >
                  {loading ? "Sending Request..." : "Send Request"}
                </Button>
                
                <Tabs defaultValue="request" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="request" className="space-y-4">
                    <div className="bg-gray-50 rounded-md border">
                      <div className="text-sm font-medium p-4 border-b">cURL</div>
                      <CodeBlock
                        language="bash"
                        code={requestDetails.curlCommand}
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
                          <span className={`ml-2 text-sm font-medium ${getResponseColor(response.status)}`}>
                            {response.status >= 200 && response.status < 300 ? "Success" : "Error"}
                          </span>
                        </div>
                        <div className="bg-gray-50 rounded-md border">
                          <div className="text-sm font-medium p-4 border-b">Response</div>
                          <CodeBlock
                            language="json"
                            code={JSON.stringify(response.status >= 200 && response.status < 300 ? response.data : response.error, null, 2)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 border rounded-md">
                        Click "Send Request" to see the response here
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
