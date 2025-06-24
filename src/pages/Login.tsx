
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#C8B5A0' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: '#0F172A' }}>Central Bank</h1>
          <p className="mt-2" style={{ color: '#5A4A3A' }}>Onboarding Portal</p>
        </div>
        
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle style={{ color: '#0F172A' }}>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the Onboarding Portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" style={{ color: '#0F172A' }}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" style={{ color: '#0F172A' }}>Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-sm hover:underline" style={{ color: '#D4AF37' }}>
                  Forgot password?
                </Link>
              </div>
              
              <Button 
                type="submit" 
                className="w-full text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1E3A8A' }}
              >
                Sign In
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/register" className="hover:underline" style={{ color: '#D4AF37' }}>
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
            
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#1E3A8A' }}>
              <h3 className="font-medium mb-2 text-white">Test Credentials:</h3>
              <div className="text-sm space-y-1 text-white">
                <p><strong>Email:</strong> admin@centralbank.gov</p>
                <p><strong>Password:</strong> CentralBank2024!</p>
                <p className="text-xs mt-2 text-white opacity-80">
                  Use these credentials to test the login flow, followed by{" "}
                  <Link to="/mfa" className="underline font-medium" style={{ color: '#D4AF37' }}>
                    MFA verification
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
