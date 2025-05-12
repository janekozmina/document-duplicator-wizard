
import React from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  PlayCircle, 
  Clock, 
  CheckCircle, 
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Welcome to Sandbox Portal</h1>
                <p className="text-gray-600 mt-1">
                  Access development documentation, test APIs, and run simulations
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Demo
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="api">
                      <TabsList className="mb-4">
                        <TabsTrigger value="api">API Tests</TabsTrigger>
                        <TabsTrigger value="simulations">Simulations</TabsTrigger>
                        <TabsTrigger value="all">All Activity</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="api">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>API</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Time</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">GET /accounts/balance</TableCell>
                              <TableCell className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                Successful
                              </TableCell>
                              <TableCell className="text-muted-foreground">10 mins ago</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">POST /payments/transfer</TableCell>
                              <TableCell className="flex items-center">
                                <XCircle className="h-4 w-4 text-red-500 mr-2" />
                                Failed
                              </TableCell>
                              <TableCell className="text-muted-foreground">25 mins ago</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">GET /transactions/history</TableCell>
                              <TableCell className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                Successful
                              </TableCell>
                              <TableCell className="text-muted-foreground">1 hour ago</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TabsContent>
                      
                      <TabsContent value="simulations">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Simulation</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Time</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Outbound Credit Transfer</TableCell>
                              <TableCell className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                Completed
                              </TableCell>
                              <TableCell className="text-muted-foreground">2 hours ago</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Inbound Credit Transfer</TableCell>
                              <TableCell className="flex items-center">
                                <Clock className="h-4 w-4 text-amber-500 mr-2" />
                                In Progress
                              </TableCell>
                              <TableCell className="text-muted-foreground">3 hours ago</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Payment Return</TableCell>
                              <TableCell className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                Completed
                              </TableCell>
                              <TableCell className="text-muted-foreground">Yesterday</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TabsContent>
                      
                      <TabsContent value="all">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-gray-500 mr-2" />
                              <div>
                                <p className="font-medium">API Documentation updated</p>
                                <p className="text-sm text-muted-foreground">Payment Return section updated with new examples</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">2 hours ago</p>
                          </div>
                          
                          <div className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-gray-500 mr-2" />
                              <div>
                                <p className="font-medium">Simulator run completed</p>
                                <p className="text-sm text-muted-foreground">Outbound Credit Transfer simulation completed successfully</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">5 hours ago</p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 text-gray-500 mr-2" />
                              <div>
                                <p className="font-medium">API test failure</p>
                                <p className="text-sm text-muted-foreground">POST /payments/transfer failed with error code 400</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">Yesterday</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                {/* Recently Viewed Documentation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Recently Viewed Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <p className="font-medium">API Authentication Guide</p>
                            <p className="text-sm text-muted-foreground">Learn how to authenticate with the API</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/documentation">View</Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <p className="font-medium">Error Codes Reference</p>
                            <p className="text-sm text-muted-foreground">Complete list of API error codes and solutions</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/documentation">View</Link>
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <p className="font-medium">Payment Message Format</p>
                            <p className="text-sm text-muted-foreground">ISO20022 message format specifications</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to="/documentation">View</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Side panel - 1/3 width */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start" asChild>
                      <Link to="/simulators/outbound-credit-transfer">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Run Outbound Transfer
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" asChild>
                      <Link to="/simulators/inbound-credit-transfer">
                        <ArrowDownRight className="mr-2 h-4 w-4" />
                        Simulate Inbound Transfer
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" asChild>
                      <Link to="/api-reference">
                        <FileText className="mr-2 h-4 w-4" />
                        View API Reference
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link to="/certification">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Start Certification
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Certification Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Certification Progress</CardTitle>
                    <CardDescription>1 of 5 items completed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/certification">
                        View Checklist
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
