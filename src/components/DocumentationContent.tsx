
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/CodeBlock";
import { FileText, Server, Terminal, Code } from "lucide-react";

export function DocumentationContent() {
  const [activeTab, setActiveTab] = useState("getting-started");

  const curlCode = `curl https://api.example.com/v1/charges \\
  -u sk_test_4eC39HqLyjWDarjtT1zdp7dc: \\
  -d amount=2000 \\
  -d currency=usd \\
  -d source=tok_mastercard \\
  -d description="My First Test Charge (created for API docs)"`;

  const jsCode = `import { ExampleClient } from '@example/client';

const client = new ExampleClient('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

async function createCharge() {
  const charge = await client.charges.create({
    amount: 2000,
    currency: 'usd',
    source: 'tok_mastercard',
    description: 'My First Test Charge (created for API docs)',
  });
  
  console.log(charge);
}

createCharge();`;

  const pythonCode = `import example

example.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

charge = example.Charge.create(
  amount=2000,
  currency="usd",
  source="tok_mastercard",
  description="My First Test Charge (created for API docs)",
)

print(charge)`;

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
        <p className="text-gray-600 mb-8">
          Complete reference documentation for integrating with our payment APIs.
        </p>
      </div>

      <Tabs defaultValue="getting-started" className="w-full"
        onValueChange={(value) => setActiveTab(value)}>
        <TabsList className="mb-6 grid grid-cols-4 w-full">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="errors">Error Handling</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold">Getting Started</h2>
            <p>
              Welcome to our API documentation. This guide will help you get started with 
              integrating our payment processing system into your application.
            </p>
            
            <h3 className="text-xl font-medium mt-6">What You'll Need</h3>
            <ul>
              <li>An API key (sign up for an account to get one)</li>
              <li>A basic understanding of RESTful APIs</li>
              <li>Your preferred programming language's HTTP client</li>
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-medium mb-4">Making Your First API Request</h3>
            <p className="mb-4">
              Here's a simple example of creating a charge using our API:
            </p>
            
            <Tabs defaultValue="curl" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curl">
                <CodeBlock
                  language="bash"
                  code={curlCode}
                  className="mt-2"
                />
              </TabsContent>
              
              <TabsContent value="javascript">
                <CodeBlock
                  language="javascript"
                  code={jsCode}
                  className="mt-2"
                />
              </TabsContent>
              
              <TabsContent value="python">
                <CodeBlock
                  language="python"
                  code={pythonCode}
                  className="mt-2"
                />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold">Authentication</h2>
            <p>
              Authentication to the API is performed via HTTP Basic Auth. Provide your
              API key as the basic auth username value. You do not need to provide a password.
            </p>
            
            <h3 className="text-xl font-medium mt-6">API Keys</h3>
            <p>
              Your API keys carry many privileges, so be sure to keep them secure! Do not share your
              secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.
            </p>
            
            <h4 className="text-lg font-medium mt-4">Test Mode vs Live Mode</h4>
            <p>
              Test mode API keys are prefixed with <code>sk_test_</code> and live mode API keys are 
              prefixed with <code>sk_live_</code>. Use test mode for development and testing, 
              and live mode for processing real transactions.
            </p>
          </div>
          
          <CodeBlock
            language="bash"
            code="curl https://api.example.com/v1/balance \\\n  -H \"Authorization: Bearer sk_test_4eC39HqLyjWDarjtT1zdp7dc\""
            className="mt-6"
          />
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold">API Endpoints</h2>
            <p>
              Our API is organized around REST. All URLs are relative to the base URL:
              <code>https://api.example.com/v1/</code>. We support standard HTTP methods for 
              our resources.
            </p>
          </div>
          
          <div className="divide-y border rounded-md">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">GET</span>
                    <code className="text-sm font-mono ml-2">/v1/charges</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">List all charges</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">POST</span>
                    <code className="text-sm font-mono ml-2">/v1/charges</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Create a new charge</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">GET</span>
                    <code className="text-sm font-mono ml-2">/v1/charges/{"{charge_id}"}</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Retrieve a specific charge</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">POST</span>
                    <code className="text-sm font-mono ml-2">/v1/charges/{"{charge_id}"}/capture</code>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Capture an authorized payment</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold">Error Handling</h2>
            <p>
              Our API uses conventional HTTP response codes to indicate the success or failure of an API request.
              In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error that
              resulted from the provided information (e.g., a required parameter was missing), and codes in
              the 5xx range indicate an error with our servers.
            </p>
            
            <h3 className="text-xl font-medium mt-6">Error Response Format</h3>
            <p>
              When an error occurs, you will receive a response with the following structure:
            </p>
          </div>
          
          <CodeBlock
            language="json"
            code={`{
  "error": {
    "type": "invalid_request_error",
    "message": "Missing required parameter: amount",
    "param": "amount",
    "code": "parameter_missing"
  }
}`}
            className="mt-2"
          />
          
          <div className="mt-6">
            <h3 className="text-xl font-medium mb-4">Common Error Codes</h3>
            
            <div className="divide-y border rounded-md">
              <div className="p-4">
                <div className="font-medium">400 - Bad Request</div>
                <p className="text-sm text-gray-600">The request was unacceptable, often due to missing a required parameter.</p>
              </div>
              
              <div className="p-4">
                <div className="font-medium">401 - Unauthorized</div>
                <p className="text-sm text-gray-600">No valid API key provided.</p>
              </div>
              
              <div className="p-4">
                <div className="font-medium">402 - Request Failed</div>
                <p className="text-sm text-gray-600">The parameters were valid but the request failed.</p>
              </div>
              
              <div className="p-4">
                <div className="font-medium">404 - Not Found</div>
                <p className="text-sm text-gray-600">The requested resource doesn't exist.</p>
              </div>
              
              <div className="p-4">
                <div className="font-medium">429 - Too Many Requests</div>
                <p className="text-sm text-gray-600">Too many requests hit the API too quickly.</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
