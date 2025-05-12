
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CodeBlock } from "@/components/CodeBlock";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function XmlMessagesContent() {
  const [activeTab, setActiveTab] = useState("validate");
  const [xmlContent, setXmlContent] = useState("");
  const [validationResult, setValidationResult] = useState<{success: boolean; message: string} | null>(null);
  const [messageType, setMessageType] = useState("pacs.008");
  const [generatedXml, setGeneratedXml] = useState("");
  
  // Sample XML templates for different message types
  const xmlTemplates = {
    "pacs.008": `<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.008.001.09">
  <FIToFICstmrCdtTrf>
    <GrpHdr>
      <MsgId>RAAST008001001</MsgId>
      <CreDtTm>2023-01-01T10:00:00</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <TtlIntrBkSttlmAmt Ccy="PKR">100.00</TtlIntrBkSttlmAmt>
      <IntrBkSttlmDt>2023-01-01</IntrBkSttlmDt>
    </GrpHdr>
    <CdtTrfTxInf>
      <PmtId>
        <InstrId>RAAST008001001/1</InstrId>
        <EndToEndId>RAAST008001001/E2E/1</EndToEndId>
        <TxId>RAAST008001001/TX/1</TxId>
      </PmtId>
      <PmtTpInf>
        <SvcLvl>
          <Cd>SDVA</Cd>
        </SvcLvl>
      </PmtTpInf>
      <IntrBkSttlmAmt Ccy="PKR">100.00</IntrBkSttlmAmt>
      <ChrgBr>SLEV</ChrgBr>
      <Dbtr>
        <Nm>SENDER NAME</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <Othr>
            <Id>92001234567890</Id>
          </Othr>
        </Id>
      </DbtrAcct>
      <DbtrAgt>
        <FinInstnId>
          <BICFI>SCBLPKKX</BICFI>
        </FinInstnId>
      </DbtrAgt>
      <CdtrAgt>
        <FinInstnId>
          <BICFI>MEZNPKKA</BICFI>
        </FinInstnId>
      </CdtrAgt>
      <Cdtr>
        <Nm>RECIPIENT NAME</Nm>
      </Cdtr>
      <CdtrAcct>
        <Id>
          <Othr>
            <Id>92009876543210</Id>
          </Othr>
        </Id>
      </CdtrAcct>
      <RmtInf>
        <Ustrd>Invoice payment</Ustrd>
      </RmtInf>
    </CdtTrfTxInf>
  </FIToFICstmrCdtTrf>
</Document>`,
    "pacs.004": `<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.004.001.09">
  <PmtRtr>
    <GrpHdr>
      <MsgId>RAAST004001001</MsgId>
      <CreDtTm>2023-01-02T10:00:00</CreDtTm>
      <NbOfTxs>1</NbOfTxs>
      <TtlRtrdIntrBkSttlmAmt Ccy="PKR">100.00</TtlRtrdIntrBkSttlmAmt>
      <IntrBkSttlmDt>2023-01-02</IntrBkSttlmDt>
    </GrpHdr>
    <TxInf>
      <RtrId>RAAST004001001/1</RtrId>
      <OrgnlGrpInf>
        <OrgnlMsgId>RAAST008001001</OrgnlMsgId>
        <OrgnlMsgNmId>pacs.008.001.09</OrgnlMsgNmId>
      </OrgnlGrpInf>
      <OrgnlInstrId>RAAST008001001/1</OrgnlInstrId>
      <OrgnlEndToEndId>RAAST008001001/E2E/1</OrgnlEndToEndId>
      <OrgnlTxId>RAAST008001001/TX/1</OrgnlTxId>
      <RtrdIntrBkSttlmAmt Ccy="PKR">100.00</RtrdIntrBkSttlmAmt>
      <RtrRsnInf>
        <Rsn>
          <Cd>AC01</Cd>
        </Rsn>
        <AddtlInf>Account closed</AddtlInf>
      </RtrRsnInf>
    </TxInf>
  </PmtRtr>
</Document>`,
    "pacs.002": `<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pacs.002.001.10">
  <FIToFIPmtStsRpt>
    <GrpHdr>
      <MsgId>RAAST002001001</MsgId>
      <CreDtTm>2023-01-01T10:05:00</CreDtTm>
    </GrpHdr>
    <OrgnlGrpInfAndSts>
      <OrgnlMsgId>RAAST008001001</OrgnlMsgId>
      <OrgnlMsgNmId>pacs.008.001.09</OrgnlMsgNmId>
    </OrgnlGrpInfAndSts>
    <TxInfAndSts>
      <OrgnlInstrId>RAAST008001001/1</OrgnlInstrId>
      <OrgnlEndToEndId>RAAST008001001/E2E/1</OrgnlEndToEndId>
      <OrgnlTxId>RAAST008001001/TX/1</OrgnlTxId>
      <TxSts>ACSC</TxSts>
      <AccptncDtTm>2023-01-01T10:02:00</AccptncDtTm>
      <ClrSysRef>RAAST</ClrSysRef>
    </TxInfAndSts>
  </FIToFIPmtStsRpt>
</Document>`,
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setXmlContent(content);
      };
      reader.readAsText(file);
    }
  };

  const validateXml = () => {
    // Simple validation - check for well-formed XML
    // In a real application, this would use a proper XML validator
    try {
      if (!xmlContent.trim()) {
        setValidationResult({
          success: false,
          message: "Please enter XML content to validate"
        });
        return;
      }
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
      
      // Check for parsing errors
      const parserError = xmlDoc.querySelector("parsererror");
      if (parserError) {
        throw new Error("XML parsing error");
      }
      
      // Basic ISO 20022 validation
      const documentElement = xmlDoc.documentElement;
      let msgType = "";
      
      if (documentElement.nodeName === "Document") {
        const childNodes = Array.from(documentElement.childNodes)
          .filter(node => node.nodeType === 1); // Element nodes only
        
        if (childNodes.length === 1) {
          const rootElement = childNodes[0] as Element;
          msgType = rootElement.nodeName;
        }
      }
      
      setValidationResult({
        success: true,
        message: `Valid XML document. Message type: ${msgType || "Unknown"}`
      });
      toast.success("XML validation successful");
    } catch (error) {
      setValidationResult({
        success: false,
        message: `Invalid XML: ${error instanceof Error ? error.message : String(error)}`
      });
      toast.error("XML validation failed");
    }
  };

  const generateXml = () => {
    const template = xmlTemplates[messageType as keyof typeof xmlTemplates];
    setGeneratedXml(template);
    toast.success(`Generated ${messageType} message template`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedXml);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-2">XML Messages</h1>
        <p className="text-gray-600 mb-8">
          Validate ISO 20022 XML messages or generate sample message templates for testing.
        </p>
      </div>

      <Tabs defaultValue="validate" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="validate">Validate XML</TabsTrigger>
          <TabsTrigger value="generate">Generate XML</TabsTrigger>
        </TabsList>
        
        <TabsContent value="validate" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="xml-input" className="block text-sm font-medium text-gray-700 mb-2">
                    XML Content
                  </label>
                  <Textarea 
                    id="xml-input"
                    value={xmlContent}
                    onChange={(e) => setXmlContent(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="Paste your XML content here or upload a file"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button onClick={validateXml}>
                    Validate XML
                  </Button>
                  
                  <div className="relative">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".xml"
                    />
                    <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                      Upload XML File
                    </Button>
                  </div>
                </div>
                
                {validationResult && (
                  <div className={`p-4 mt-4 rounded-md ${validationResult.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    <div className="font-medium">{validationResult.success ? 'Validation Successful' : 'Validation Failed'}</div>
                    <p className="mt-1 text-sm">{validationResult.message}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="message-type" className="block text-sm font-medium text-gray-700 mb-2">
                    Message Type
                  </label>
                  <Select
                    value={messageType}
                    onValueChange={setMessageType}
                  >
                    <SelectTrigger id="message-type" className="w-full">
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pacs.008">pacs.008 - Credit Transfer</SelectItem>
                      <SelectItem value="pacs.004">pacs.004 - Payment Return</SelectItem>
                      <SelectItem value="pacs.002">pacs.002 - Status Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={generateXml}>
                  Generate XML Template
                </Button>
                
                {generatedXml && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Generated XML</h3>
                      <Button size="sm" variant="outline" onClick={copyToClipboard}>
                        Copy to Clipboard
                      </Button>
                    </div>
                    <div className="bg-gray-50 rounded-md border">
                      <CodeBlock
                        language="xml"
                        code={generatedXml}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
