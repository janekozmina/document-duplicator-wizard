
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Documentation from "./pages/Documentation";
import ApiReference from "./pages/ApiReference";
import Simulators from "./pages/Simulators";
import OutboundCreditTransfer from "./pages/OutboundCreditTransfer";
import InboundCreditTransfer from "./pages/InboundCreditTransfer";
import PaymentReturnReversal from "./pages/PaymentReturnReversal";
import ErrorHandling from "./pages/ErrorHandling";
import CertificationChecklist from "./pages/CertificationChecklist";
import XmlMessages from "./pages/XmlMessages";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/api-reference" element={<ApiReference />} />
          <Route path="/simulators" element={<Simulators />} />
          <Route path="/simulators/outbound-credit-transfer" element={<OutboundCreditTransfer />} />
          <Route path="/simulators/inbound-credit-transfer" element={<InboundCreditTransfer />} />
          <Route path="/simulators/payment-return-reversal" element={<PaymentReturnReversal />} />
          <Route path="/simulators/error-handling" element={<ErrorHandling />} />
          <Route path="/xml-messages" element={<XmlMessages />} />
          <Route path="/certification" element={<CertificationChecklist />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
