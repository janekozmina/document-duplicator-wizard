
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CodeBlock } from "@/components/CodeBlock";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, FileText, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentReturnReversal = () => {
  const [inputMethod, setInputMethod] = useState<"xml" | "form">("form");
  const [xmlInput, setXmlInput] = useState<string>(defaultXml);
  const [returnType, setReturnType] = useState<"return" | "reversal">("return");
  const [formData, setFormData] = useState({
    msgId: "RETURN-" + Date.now(),
    originalMsgId: "ORIG-123456789",
    originalEndToEndId: "E2E-123456789",
    returnReason: "AC04",
    returnReasonText: "Insufficient funds",
    debtorName: "John Doe",
    debtorAccount: "GB29NWBK60161331926819",
    creditorName: "Alice Smith",
    creditorAccount: "GB29NWBK60161331926820",
    amount: "100.00",
    currency: "EUR",
  });
  const [result, setResult] = useState<null | { 
    status: "success" | "error", 
    code: string, 
    message: string, 
    responseXml?: string 
  }>(null);

  const generateXmlFromForm = () => {
    // In a real app this would generate valid XML based on the form data
    const messageType = returnType === "return" ? "pacs.004.001.09" : "camt.056.001.08";
    
    if (returnType === "return") {
      return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.004.001.09">
  <PmtRtr>
    <GrpHdr>
      <MsgId>${formData.msgId}</MsgId>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <TtlRtrdIntrBkSttlmAmt Ccy="${formData.currency}">${formData.amount}</TtlRtrdIntrBkSttlmAmt>
    </GrpHdr>
    <OrgnlGrpInf>
      <OrgnlMsgId>${formData.originalMsgId}</OrgnlMsgId>
      <OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>
    </OrgnlGrpInf>
    <TxInf>
      <OrgnlEndToEndId>${formData.originalEndToEndId}</OrgnlEndToEndId>
      <RtrRsnInf>
        <Rsn>
          <Cd>${formData.returnReason}</Cd>
        </Rsn>
        <AddtlInf>${formData.returnReasonText}</AddtlInf>
      </RtrRsnInf>
      <RtrdIntrBkSttlmAmt Ccy="${formData.currency}">${formData.amount}</RtrdIntrBkSttlmAmt>
      <OrgnlTxRef>
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
      </OrgnlTxRef>
    </TxInf>
  </PmtRtr>
</Document>`;
    } else {
      return `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.056.001.08">
  <FIToFIPmtCxlReq>
    <Assgnmt>
      <Id>${formData.msgId}</Id>
      <Assgnr>
        <Agt>
          <FinInstnId>
            <BICFI>BANKGB2L</BICFI>
          </FinInstnId>
        </Agt>
      </Assgnr>
      <Assgne>
        <Agt>
          <FinInstnId>
            <BICFI>BANKDE2X</BICFI>
          </FinInstnId>
        </Agt>
      </Assgne>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
    </Assgnmt>
    <Undrlyg>
      <TxInf>
        <CxlId>${formData.msgId}</CxlId>
        <OrgnlGrpInf>
          <OrgnlMsgId>${formData.originalMsgId}</OrgnlMsgId>
          <OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>
        </OrgnlGrpInf>
        <OrgnlEndToEndId>${formData.originalEndToEndId}</OrgnlEndToEndId>
        <OrgnlIntrBkSttlmAmt Ccy="${formData.currency}">${formData.amount}</OrgnlIntrBkSttlmAmt>
        <CxlRsnInf>
          <Rsn>
            <Cd>${formData.returnReason}</Cd>
          </Rsn>
          <AddtlInf>${formData.returnReasonText}</AddtlInf>
        </CxlRsnInf>
        <OrgnlTxRef>
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
        </OrgnlTxRef>
      </TxInf>
    </Undrlyg>
  </FIToFIPmtCxlReq>
</Document>`;
    }
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
      const isSuccess = Math.random() > 0.25; // 75% success rate for demo
      const responseDocType = returnType === "return" ? "pacs.002.001.10" : "camt.029.001.09";
      const responseStatus = isSuccess ? "ACSC" : "RJCT";
      const responseMessage = isSuccess ? 
        (returnType === "return" ? "AcceptedSettlementCompleted" : "AcceptedCancellationRequest") : 
        "Rejected";
      const responseReason = isSuccess ? "" : "Invalid original transaction reference";
      
      if (isSuccess) {
        setResult({
          status: "success",
          code: responseStatus,
          message: responseMessage,
          responseXml: returnType === "return" ? 
          `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.002.001.10">
  <FIToFIPmtStsRpt>
    <GrpHdr>
      <MsgId>RESP-${Date.now()}</MsgId>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
    </GrpHdr>
    <OrgnlGrpInfAndSts>
      <OrgnlMsgId>${formData.msgId}</OrgnlMsgId>
      <OrgnlMsgNmId>pacs.004.001.09</OrgnlMsgNmId>
      <GrpSts>ACSC</GrpSts>
    </OrgnlGrpInfAndSts>
  </FIToFIPmtStsRpt>
</Document>` :
          `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.029.001.09">
  <RsltnOfInvstgtn>
    <Assgnmt>
      <Id>RESP-${Date.now()}</Id>
      <Assgnr>
        <Agt>
          <FinInstnId>
            <BICFI>BANKDE2X</BICFI>
          </FinInstnId>
        </Agt>
      </Assgnr>
      <Assgne>
        <Agt>
          <FinInstnId>
            <BICFI>BANKGB2L</BICFI>
          </FinInstnId>
        </Agt>
      </Assgne>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
    </Assgnmt>
    <Sts>
      <Conf>ACSC</Conf>
    </Sts>
    <CxlDtls>
      <TxInfAndSts>
        <CxlStsId>CANC-${Date.now()}</CxlStsId>
        <OrgnlEndToEndId>${formData.originalEndToEndId}</OrgnlEndToEndId>
        <TxCxlSts>CNCL</TxCxlSts>
        <CxlStsRsnInf>
          <Rsn>
            <Prtry>Payment Cancelled</Prtry>
          </Rsn>
        </CxlStsRsnInf>
      </TxInfAndSts>
    </CxlDtls>
  </RsltnOfInvstgtn>
</Document>`
        });
        toast.success(`${returnType === "return" ? "Return" : "Reversal"} processed successfully`);
      } else {
        setResult({
          status: "error",
          code: responseStatus,
          message: responseMessage,
          responseXml: returnType === "return" ?
          `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.002.001.10">
  <FIToFIPmtStsRpt>
    <GrpHdr>
      <MsgId>RESP-${Date.now()}</MsgId>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
    </GrpHdr>
    <OrgnlGrpInfAndSts>
      <OrgnlMsgId>${formData.msgId}</OrgnlMsgId>
      <OrgnlMsgNmId>pacs.004.001.09</OrgnlMsgNmId>
      <GrpSts>RJCT</GrpSts>
      <StsRsnInf>
        <Rsn>
          <Cd>AM05</Cd>
        </Rsn>
        <AddtlInf>Original Transaction Not Found</AddtlInf>
      </StsRsnInf>
    </OrgnlGrpInfAndSts>
  </FIToFIPmtStsRpt>
</Document>` :
          `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:camt.029.001.09">
  <RsltnOfInvstgtn>
    <Assgnmt>
      <Id>RESP-${Date.now()}</Id>
      <Assgnr>
        <Agt>
          <FinInstnId>
            <BICFI>BANKDE2X</BICFI>
          </FinInstnId>
        </Agt>
      </Assgnr>
      <Assgne>
        <Agt>
          <FinInstnId>
            <BICFI>BANKGB2L</BICFI>
          </FinInstnId>
        </Agt>
      </Assgne>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
    </Assgnmt>
    <Sts>
      <Conf>RJCT</Conf>
    </Sts>
    <CxlDtls>
      <TxInfAndSts>
        <CxlStsId>CANC-${Date.now()}</CxlStsId>
        <OrgnlEndToEndId>${formData.originalEndToEndId}</OrgnlEndToEndId>
        <TxCxlSts>RJCR</TxCxlSts>
        <CxlStsRsnInf>
          <Rsn>
            <Prtry>Original Transaction Not Found</Prtry>
          </Rsn>
        </CxlStsRsnInf>
      </TxInfAndSts>
    </CxlDtls>
  </RsltnOfInvstgtn>
</Document>`
        });
        toast.error(`${returnType === "return" ? "Return" : "Reversal"} processing failed`);
      }
    }, 1500);

    toast.info(`Processing ${returnType === "return" ? "payment return" : "payment reversal"}...`);
  };

  const returnReasonCodes = [
    { code: "AC01", description: "Incorrect Account Number" },
    { code: "AC04", description: "Closed Account Number" },
    { code: "AC06", description: "Blocked Account" },
    { code: "AG01", description: "Transaction Forbidden" },
    { code: "AM04", description: "Insufficient Funds" },
    { code: "CUST", description: "Requested by Customer" },
    { code: "DUPL", description: "Duplicate Payment" },
    { code: "FF01", description: "Invalid File Format" },
  ];

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

            <h1 className="text-2xl font-bold">Payment Return / Reversal</h1>
            <p className="text-muted-foreground">
              Simulate payment return (pacs.004) or payment reversal request (camt.056) for a previous transaction.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Return / Reversal Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RadioGroup 
                    defaultValue="return" 
                    className="flex space-x-4" 
                    value={returnType}
                    onValueChange={(value) => setReturnType(value as "return" | "reversal")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="return" id="return" />
                      <Label htmlFor="return">Payment Return (pacs.004)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reversal" id="reversal" />
                      <Label htmlFor="reversal">Payment Reversal (camt.056)</Label>
                    </div>
                  </RadioGroup>
                  
                  <RadioGroup 
                    defaultValue="form" 
                    className="flex space-x-4" 
                    value={inputMethod}
                    onValueChange={(value) => setInputMethod(value as "xml" | "form")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="form" id="input-form" />
                      <Label htmlFor="input-form">Form input</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="xml" id="input-xml" />
                      <Label htmlFor="input-xml">XML input</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {inputMethod === "form" ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Original Transaction Details</CardTitle>
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
                          <Label htmlFor="originalMsgId">Original Message ID</Label>
                          <Input 
                            id="originalMsgId" 
                            name="originalMsgId" 
                            value={formData.originalMsgId} 
                            onChange={handleFormInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="originalEndToEndId">Original End to End ID</Label>
                          <Input 
                            id="originalEndToEndId" 
                            name="originalEndToEndId" 
                            value={formData.originalEndToEndId} 
                            onChange={handleFormInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount</Label>
                          <Input 
                            id="amount" 
                            name="amount" 
                            value={formData.amount} 
                            onChange={handleFormInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Input 
                          id="currency" 
                          name="currency" 
                          value={formData.currency} 
                          onChange={handleFormInputChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Return / Reversal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="returnReason">Reason Code</Label>
                        <Select 
                          value={formData.returnReason} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, returnReason: value }))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a reason code" />
                          </SelectTrigger>
                          <SelectContent>
                            {returnReasonCodes.map(reason => (
                              <SelectItem key={reason.code} value={reason.code}>
                                {reason.code} - {reason.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="returnReasonText">Reason Description</Label>
                        <Input 
                          id="returnReasonText" 
                          name="returnReasonText" 
                          value={formData.returnReasonText} 
                          onChange={handleFormInputChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="debtorName">Original Debtor Name</Label>
                        <Input 
                          id="debtorName" 
                          name="debtorName" 
                          value={formData.debtorName} 
                          onChange={handleFormInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="debtorAccount">Original Debtor Account</Label>
                        <Input 
                          id="debtorAccount" 
                          name="debtorAccount" 
                          value={formData.debtorAccount} 
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
                  <CardTitle>XML Message ({returnType === "return" ? "pacs.004" : "camt.056"})</CardTitle>
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
                Simulate {returnType === "return" ? "Return" : "Reversal"}
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
                        filename={returnType === "return" ? "pacs.002.001.10" : "camt.029.001.09"}
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
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.004.001.09">
  <PmtRtr>
    <GrpHdr>
      <MsgId>RETURN-20230608001</MsgId>
      <CreDtTm>2023-06-08T14:07:00Z</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <TtlRtrdIntrBkSttlmAmt Ccy="EUR">100.00</TtlRtrdIntrBkSttlmAmt>
    </GrpHdr>
    <OrgnlGrpInf>
      <OrgnlMsgId>ORIG-123456789</OrgnlMsgId>
      <OrgnlMsgNmId>pacs.008.001.08</OrgnlMsgNmId>
    </OrgnlGrpInf>
    <TxInf>
      <OrgnlEndToEndId>E2E-123456789</OrgnlEndToEndId>
      <RtrRsnInf>
        <Rsn>
          <Cd>AC04</Cd>
        </Rsn>
        <AddtlInf>Insufficient funds</AddtlInf>
      </RtrRsnInf>
      <RtrdIntrBkSttlmAmt Ccy="EUR">100.00</RtrdIntrBkSttlmAmt>
      <OrgnlTxRef>
        <Dbtr>
          <Nm>John Doe</Nm>
        </Dbtr>
        <DbtrAcct>
          <Id>
            <IBAN>GB29NWBK60161331926819</IBAN>
          </Id>
        </DbtrAcct>
        <Cdtr>
          <Nm>Alice Smith</Nm>
        </Cdtr>
        <CdtrAcct>
          <Id>
            <IBAN>GB29NWBK60161331926820</IBAN>
          </Id>
        </CdtrAcct>
      </OrgnlTxRef>
    </TxInf>
  </PmtRtr>
</Document>`;

export default PaymentReturnReversal;
