
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export function ApiReferenceContent() {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-2">API Reference</h1>
        <p className="text-gray-600 mb-8">
          Complete reference for all available API endpoints and methods.
        </p>
      </div>

      {/* "Get customer information" Method */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">"Get customer information" Method</h2>
        
        <p>
          For more details, see <Link to="/api-reference" className="text-blue-600 hover:underline">API Reference</Link>.
        </p>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium bg-gray-50 w-1/6">Description</TableCell>
              <TableCell>Get customer information from CAS</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-gray-50">Client</TableCell>
              <TableCell>Participant's application</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-gray-50">Server</TableCell>
              <TableCell>CAS</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-gray-50">Method</TableCell>
              <TableCell>GET</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-gray-50">URL</TableCell>
              <TableCell className="space-y-4">
                <p className="font-mono text-sm">/customers?uidType=&uidValue=</p>
                <p>OR</p>
                <p className="font-mono text-sm">/customers/{"{id}"} – direct link returned in customer registration request (the "Register customer information" method)</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* "Get customer information" Method for Merchant */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold border-b pb-2">"Get customer information" Method for Merchant</h2>
        
        <p>
          For more details, see <Link to="/api-reference" className="text-blue-600 hover:underline">API Reference</Link>.
        </p>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium bg-gray-50 w-1/6">Description</TableCell>
              <TableCell>Get own legal customer information from CAS</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-gray-50">Client</TableCell>
              <TableCell>Participant's application</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-gray-50">Server</TableCell>
              <TableCell>CAS</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium bg-gray-50">Method</TableCell>
              <TableCell>GET</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-md p-6 bg-white">
            <h4 className="text-lg font-medium mb-2">API Authentication</h4>
            <p className="text-gray-600 mb-4">Learn how to authenticate your API requests using our secure authentication methods.</p>
            <Link to="/documentation" className="text-blue-600 hover:underline">View authentication docs →</Link>
          </div>
          <div className="border rounded-md p-6 bg-white">
            <h4 className="text-lg font-medium mb-2">Test in Sandbox</h4>
            <p className="text-gray-600 mb-4">Try out our APIs in a safe testing environment before going to production.</p>
            <Link to="/api-sandbox" className="text-blue-600 hover:underline">Go to API Sandbox →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
