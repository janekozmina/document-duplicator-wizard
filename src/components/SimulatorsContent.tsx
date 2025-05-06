
import React from "react";
import { ArrowLeftRight, ArrowDownRight, ArrowUpRight, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type SimulatorCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
};

const SimulatorCard = ({ title, description, icon, href }: SimulatorCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <Link to={href}>
        <CardHeader className="pb-2">
          <div className="text-green-600 mb-2">{icon}</div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
};

export function SimulatorsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Simulators</h1>
        <div>
          <Button variant="outline" size="sm" className="mr-2">
            Documentation
          </Button>
          <Button variant="outline" size="sm">
            Learn more
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground">
        Test and simulate various payment flows in a sandbox environment. Select a payment type below to simulate.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SimulatorCard
          title="Outbound Customer Credit Transfer"
          description="Simulate outbound payments with CAS account resolve to VP."
          icon={<ArrowUpRight className="h-8 w-8" />}
          href="/simulators/outbound-credit-transfer"
        />
        
        <SimulatorCard
          title="Inbound Customer Credit Transfer"
          description="Simulate incoming payments to your account."
          icon={<ArrowDownRight className="h-8 w-8" />}
          href="/simulators/inbound-credit-transfer"
        />

        <SimulatorCard
          title="Payment Return / Reversal"
          description="Simulate payment returns and reversal processes."
          icon={<ArrowLeftRight className="h-8 w-8" />}
          href="/simulators/payment-return-reversal"
        />

        <SimulatorCard
          title="Error Handling"
          description="Test various error scenarios and exception handling."
          icon={<AlertCircle className="h-8 w-8" />}
          href="/simulators/error-handling"
        />
      </div>
    </div>
  );
}
