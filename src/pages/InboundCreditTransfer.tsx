
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CodeBlock } from "@/components/CodeBlock";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, FileText, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InboundCreditTransfer = () => {
  const [inputMethod, setInputMethod] = useState<"xml" | "form">("form");
  const [xmlInput, setXmlInput] = useState<string>(defaultXml);
  const [formData, setFormData] = useState({
    msgId: "MSG-" + Date.now(),
    creditorName: "Your Company",
    creditorAccount: "GB29NWBK60161331926819",
    debtorName: "John Sender",
    debtorAccount: "DE89370400440532013000",
    amount: "250.00",
    currency: "AED",
    endToEndId: "E2E-" + Date.now(),
  });
  const [result, setResult] = useState<null | { 
    status: "success" | "error", 
    code: string, 
    message: string, 
    responseXml?: string 
  }>(null);

  const generateXmlFromForm = () => {
    // In a real app this would generate valid XML based on the form data
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.008.001.08">
  <FIToFICstmrCdtTrf>
    <GrpHdr>
      <MsgId>${formData.msgId}</MsgId>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <SttlmInf>
        <SttlmMtd>CLRG</SttlmMtd>
      </SttlmInf>
    </GrpHdr>
    <CdtTrfTxInf>
      <PmtId>
        <EndToEndId>${formData.endToEndId}</EndToEndId>
      </PmtId>
      <IntrBkSttlmAmt Ccy="${formData.currency}">${formData.amount}</IntrBkSttlmAmt>
      <Dbtr>
        <Nm>${formData.debtorName}</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <IBAN>${formData.debtorAccount}</IBAN>
        </Id>
      </DbtrAcct>
      <Cdtr>
        <Nm>${formData.creditorName}</Nm>
      </Cdtr>
      <CdtrAcct>
        <Id>
          <IBAN>${formData.creditorAccount}</IBAN>
        </Id>
      </CdtrAcct>
    </CdtTrfTxInf>
  </FIToFICstmrCdtTrf>
</Document>`;
    return xml;
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // In a real application, this would send the XML to an API
    const currentXml = inputMethod === "xml" ? xmlInput : generateXmlFromForm();
    
    // Simulate API response
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% success rate for demo
      
      if (isSuccess) {
        setResult({
          status: "success",
          code: "ACCC",
          message: "AcceptedSettlementCompleted",
          responseXml: `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.002.001.10">
  <FIToFIPmtStsRpt>
    <GrpHdr>
      <MsgId>RESP-${Date.now()}</MsgId>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
    </GrpHdr>
    <OrgnlGrpInfAndSts>
      <OrgnlMsgId>${formData.msgId}</OrgnlMsgId>
      <OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>
      <GrpSts>ACCC</GrpSts>
    </OrgnlGrpInfAndSts>
  </FIToFIPmtStsRpt>
</Document>`
        });
        toast.success("Inbound payment processed successfully");
      } else {
        setResult({
          status: "error",
          code: "RJCT",
          message: "Rejected - Unknown creditor account",
          responseXml: `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.002.001.10">
  <FIToFIPmtStsRpt>
    <GrpHdr>
      <MsgId>RESP-${Date.now()}</MsgId>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
    </GrpHdr>
    <OrgnlGrpInfAndSts>
      <OrgnlMsgId>${formData.msgId}</OrgnlMsgId>
      <OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>
      <GrpSts>RJCT</GrpSts>
      <StsRsnInf>
        <Rsn>
          <Cd>AC03</Cd>
        </Rsn>
        <AddtlInf>Invalid Creditor Account</AddtlInf>
      </StsRsnInf>
    </OrgnlGrpInfAndSts>
  </FIToFIPmtStsRpt>
</Document>`
        });
        toast.error("Inbound payment processing failed");
      }
    }, 1500);

    toast.info("Processing inbound payment...");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                asChild
              >
                <Link to="/simulators">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Simulators
                </Link>
              </Button>
            </div>

            <h1 className="text-2xl font-bold">Inbound Customer Credit Transfer</h1>
            <p className="text-muted-foreground">
              Simulate receiving a payment into your account from another bank.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Input method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  defaultValue="form" 
                  className="flex space-x-4" 
                  value={inputMethod}
                  onValueChange={(value) => setInputMethod(value as "xml" | "form")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="form" id="form" />
                    <Label htmlFor="form">Form input</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="xml" id="xml" />
                    <Label htmlFor="xml">XML input</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {inputMethod === "form" ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="msgId">Message ID</Label>
                          <Input 
                            id="msgId" 
                            name="msgId" 
                            value={formData.msgId} 
                            onChange={handleFormInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endToEndId">End to End ID</Label>
                          <Input 
                            id="endToEndId" 
                            name="endToEndId" 
                            value={formData.endToEndId} 
                            onChange={handleFormInputChange} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount</Label>
                          <Input 
                            id="amount" 
                            name="amount" 
                            value={formData.amount} 
                            onChange={handleFormInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">Currency</Label>
                          <Input 
                            id="currency" 
                            name="currency" 
                            value={formData.currency} 
                            onChange={handleFormInputChange}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Party Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="debtorName">Debtor Name (Sender)</Label>
                        <Input 
                          id="debtorName" 
                          name="debtorName" 
                          value={formData.debtorName} 
                          onChange={handleFormInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="debtorAccount">Debtor Account (IBAN)</Label>
                        <Input 
                          id="debtorAccount" 
                          name="debtorAccount" 
                          value={formData.debtorAccount} 
                          onChange={handleFormInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="creditorName">Creditor Name (Your Company)</Label>
                        <Input 
                          id="creditorName" 
                          name="creditorName" 
                          value={formData.creditorName} 
                          onChange={handleFormInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="creditorAccount">Creditor Account (IBAN)</Label>
                        <Input 
                          id="creditorAccount" 
                          name="creditorAccount" 
                          value={formData.creditorAccount} 
                          onChange={handleFormInputChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>XML Message (pacs.008)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    className="font-mono h-[400px]" 
                    value={xmlInput} 
                    onChange={(e) => setXmlInput(e.target.value)}
                  />
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end">
              <Button onClick={handleSubmit} className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Simulate Inbound Payment
              </Button>
            </div>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className={result.status === "success" ? "text-green-600" : "text-red-600"}>
                    {result.status === "success" ? "Success" : "Error"} - {result.code}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{result.message}</p>
                  
                  <Tabs defaultValue="response">
                    <TabsList>
                      <TabsTrigger value="response">
                        <FileText className="mr-2 h-4 w-4" />
                        Response XML
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="response">
                      <CodeBlock
                        language="xml"
                        code={result.responseXml || ""}
                        filename="pacs.002.001.10"
                        className="mt-4"
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const defaultXml = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.008.001.08">
  <FIToFICstmrCdtTrf>
    <GrpHdr>
      <MsgId>MSG-987654321</MsgId>
      <CreDtTm>2023-06-08T14:07:00Z</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <SttlmInf>
        <SttlmMtd>CLRG</SttlmMtd>
      </SttlmInf>
    </GrpHdr>
    <CdtTrfTxInf>
      <PmtId>
        <EndToEndId>E2E-987654321</EndToEndId>
      </PmtId>
      <IntrBkSttlmAmt Ccy="AED">250.00</IntrBkSttlmAmt>
      <Dbtr>
        <Nm>John Sender</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <IBAN>DE89370400440532013000</IBAN>
        </Id>
      </DbtrAcct>
      <Cdtr>
        <Nm>Your Company</Nm>
      </Cdtr>
      <CdtrAcct>
        <Id>
          <IBAN>GB29NWBK60161331926819</IBAN>
        </Id>
      </CdtrAcct>
    </CdtTrfTxInf>
  </FIToFICstmrCdtTrf>
</Document>`;

export default InboundCreditTransfer;
