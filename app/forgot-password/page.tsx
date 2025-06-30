"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plane as Plant, Key, CheckCircle2, AlertCircle, ArrowLeft, Mail, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_EMAILS = ["admin@agrosiq.com", "test@example.com"];

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (emailInputRef.current && !isEmailSent) {
      emailInputRef.current.focus();
    }
  }, [isEmailSent]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startResendTimer = () => {
    setResendTimer(60);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!DEMO_EMAILS.includes(email)) {
        throw new Error("No account found with this email address");
      }

      setIsEmailSent(true);
      startResendTimer();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      startResendTimer();
    } catch (err) {
      setError("Failed to resend email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-4xl grid md:grid-cols-5 gap-6">
        {/* Left side - Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col space-y-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Plant className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary dark:text-primary-300">Agrosiq</span>
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Reset Your Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Follow these steps to reset your password and regain access to your account.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                !isEmailSent ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}>
                1
              </div>
              <span className={cn(
                "font-medium",
                !isEmailSent ? "text-primary dark:text-primary-300" : "text-gray-600 dark:text-gray-400"
              )}>
                Enter your email address
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                isEmailSent ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}>
                2
              </div>
              <span className={cn(
                "font-medium",
                isEmailSent ? "text-primary dark:text-primary-300" : "text-gray-600 dark:text-gray-400"
              )}>
                Check your email
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                3
              </div>
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Click the reset link
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                4
              </div>
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Create new password
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For demo purposes, use these test emails:
            </p>
            <ul className="mt-2 space-y-1">
              {DEMO_EMAILS.map((email) => (
                <li key={email} className="text-sm text-primary dark:text-primary-300">
                  {email}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side - Form */}
        <Card className="md:col-span-3 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              {isEmailSent ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  Email Sent
                </>
              ) : (
                <>
                  <Key className="h-6 w-6 text-primary" />
                  Reset Password
                </>
              )}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {isEmailSent
                ? "Please check your email for password reset instructions"
                : "Enter your email address to receive password reset instructions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEmailSent ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <p className="text-green-800 dark:text-green-200">
                        We've sent password reset instructions to:
                      </p>
                      <p className="font-medium text-green-900 dark:text-green-100 mt-1">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The reset link will expire in 1 hour. If you don't see the email:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Check your spam folder</li>
                    <li>• Make sure the email address is correct</li>
                    <li>• Wait a few minutes for the email to arrive</li>
                  </ul>
                </div>

                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You can request another email in {resendTimer} seconds
                  </p>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                    onClick={handleResend}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Resend Email"
                    )}
                  </Button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 dark:text-white">Email Address</Label>
                  <Input
                    ref={emailInputRef}
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className={cn(
                      "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
                      error ? "border-red-500" : ""
                    )}
                    disabled={isLoading}
                  />
                  {error && (
                    <Alert variant="destructive" className="py-2 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-800 dark:text-red-200">{error}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Reset Instructions...
                    </>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="border-t border-gray-200 dark:border-gray-800">
            <div className="w-full flex justify-between items-center">
              <Button
                variant="ghost"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                asChild
              >
                <Link href="/sign-in" className="flex items-center gap-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </Button>
              <Link
                href="#"
                className="text-sm text-primary hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Need Help?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}