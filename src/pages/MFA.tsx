
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const MFA = () => {
  const [otpValue, setOtpValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 6) return;
    
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      console.log("MFA verification with code:", otpValue);
      setIsVerifying(false);
      // Navigate to dashboard or next step
      navigate("/");
    }, 2000);
  };

  const handleResendCode = () => {
    console.log("Resending verification code");
    // Simulate resending code
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Two-Factor Authentication</h1>
          <p className="text-gray-600 mt-2">Participants Portal</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Enter Verification Code</CardTitle>
            <CardDescription>
              Please enter the 6-digit code sent to your authenticator app or SMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(value) => setOtpValue(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Didn't receive the code?
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleResendCode}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Resend Code
                </Button>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={otpValue.length !== 6 || isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify Code"}
              </Button>
              
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            </form>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Test Credentials:</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Valid OTP:</strong> 123456</p>
                <p><strong>Invalid OTP:</strong> Any other 6-digit code</p>
                <p className="text-xs mt-2 text-blue-600">
                  Use code "123456" to successfully complete MFA verification
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MFA;
