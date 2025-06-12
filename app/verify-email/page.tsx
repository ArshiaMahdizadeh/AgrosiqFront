"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Plane as Plant,
  Mail,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Loader2,
  Bell,
  Shield,
  Key,
  Lock
} from "lucide-react";

// Valid demo tokens for testing
const VALID_TOKENS = ["valid-token-123", "demo-token-456", "test-token-789"];

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [token, setToken] = useState(searchParams.get("token") || "");
  const [verificationState, setVerificationState] = useState<"pending" | "verifying" | "verified" | "error">("pending");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    // Auto-verify if token is present
    if (token) {
      handleVerification();
    }
  }, [token]);

  useEffect(() => {
    // Cleanup timer on unmount
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const timerRef = useRef<NodeJS.Timeout>();

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

  const handleVerification = async () => {
    setVerificationState("verifying");
    setError("");

    try {
      // Simulate verification process
      for (let i = 0; i <= 100; i += 20) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProgress(i);
      }

      // Check if token is valid (demo purposes)
      if (VALID_TOKENS.includes(token)) {
        setVerificationState("verified");
      } else {
        throw new Error("Invalid or expired verification token");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
      setVerificationState("error");
    }
  };

  const handleResend = async () => {
    try {
      // Simulate email resend
      await new Promise((resolve) => setTimeout(resolve, 1500));
      startResendTimer();
    } catch (err) {
      setError("Failed to resend verification email");
    }
  };

  const handleDemoVerification = () => {
    setToken("valid-token-123");
    handleVerification();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="w-full max-w-4xl grid md:grid-cols-5 gap-6">
        {/* Left side - Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col space-y-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Plant className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">Agrosiq</span>
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Verify Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Follow these steps to verify your email address and access all features.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                ${verificationState === "pending" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}>
                1
              </div>
              <span className={`font-medium
                ${verificationState === "pending" ? "text-primary" : "text-gray-600"}`}>
                Check your email
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                ${verificationState === "verifying" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}>
                2
              </div>
              <span className={`font-medium
                ${verificationState === "verifying" ? "text-primary" : "text-gray-600"}`}>
                Verify email
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                ${verificationState === "verified" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}>
                3
              </div>
              <span className={`font-medium
                ${verificationState === "verified" ? "text-primary" : "text-gray-600"}`}>
                Access all features
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Benefits of Email Verification
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-primary" />
                <span>Enhanced account security</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Bell className="h-4 w-4 text-primary" />
                <span>Important notifications</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Key className="h-4 w-4 text-primary" />
                <span>Password recovery access</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Lock className="h-4 w-4 text-primary" />
                <span>Full platform features</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - Verification Status */}
        <Card className="md:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {verificationState === "verified" ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  Email Verified
                </>
              ) : verificationState === "verifying" ? (
                <>
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  Verifying Email
                </>
              ) : (
                <>
                  <Mail className="h-6 w-6 text-primary" />
                  Verify Your Email
                </>
              )}
            </CardTitle>
            <CardDescription>
              {verificationState === "verified"
                ? "Your email has been successfully verified"
                : verificationState === "verifying"
                ? "Please wait while we verify your email"
                : "Check your email and click the verification link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {verificationState === "verified" ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <p className="text-green-800 dark:text-green-200">
                        Email verified successfully:
                      </p>
                      <p className="font-medium text-green-900 dark:text-green-100 mt-1">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-400">
                    You now have access to all platform features:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Enhanced account security</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Important notifications</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Password recovery</span>
                    </li>
                  </ul>
                </div>

                <Button className="w-full bg-primary hover:bg-primary-600" asChild>
                  <Link href="/dashboard">Continue to Dashboard</Link>
                </Button>
              </div>
            ) : verificationState === "verifying" ? (
              <div className="space-y-4">
                <Progress value={progress} className="h-2" />
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Verifying your email address...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-blue-800 dark:text-blue-200">
                        We've sent a verification email to:
                      </p>
                      <p className="font-medium text-blue-900 dark:text-blue-100 mt-1">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    The verification link will expire in 24 hours. If you don't see the email:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Check your spam folder</li>
                    <li>• Make sure the email address is correct</li>
                    <li>• Wait a few minutes for the email to arrive</li>
                    <li>• Try resending the verification email</li>
                  </ul>
                </div>

                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You can request another email in {resendTimer} seconds
                  </p>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleResend}
                  >
                    Resend Verification Email
                  </Button>
                )}

                {/* Demo verification button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleDemoVerification}
                  >
                    Simulate Email Verification
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between items-center">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
                asChild
              >
                <Link href="/sign-in" className="flex items-center gap-2">
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