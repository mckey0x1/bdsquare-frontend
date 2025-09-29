"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
    }, 1000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-black">
                <Store className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-black">BDSQUARE ADMIN</h1>
          </div>

          <Card className="border-black">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-black mb-2">
                  Check Your Email
                </h2>
                <p className="text-black mb-4">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-black mb-6">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setSuccess(false)}
                  variant="outline"
                  className="w-full border-black text-black hover:bg-gray-100">
                  Try Different Email
                </Button>
                <Link href="/admin/auth/login">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-black">
              <Store className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-black">BDSQUARE ADMIN</h1>
          <p className="text-black mt-2">Reset your password</p>
        </div>

        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-center text-black">
              Forgot Password
            </CardTitle>
            <p className="text-center text-sm text-black">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@clothingstore.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-black"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={isLoading}>
                {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/admin/auth/login"
                className="inline-flex items-center text-sm text-black hover:underline">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
