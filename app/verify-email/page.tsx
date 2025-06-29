"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEmailMutation } from "@/lib/redux/api/authApi";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Shield,
  Bell,
  Key,
  Lock,
  ArrowLeft,
  Plane as Plant,
} from "lucide-react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [verifyEmail] = useVerifyEmailMutation();

  const [verificationState, setVerificationState] = useState<
    "pending" | "verifying" | "verified" | "error"
  >("pending");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (token) {
      console.log("Verifying token:", token);
      handleVerification();
    } else {
      console.warn("Token not found in URL.");
    }
    return () => clearInterval(timerRef.current);
  }, [token]);

  const handleVerification = async () => {
    setVerificationState("verifying");

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 100);

    try {
      const response = await verifyEmail({ token }).unwrap();

      if (response.user && response.access_token) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("accessToken", response.access_token);
      }

      setVerificationState("verified");

      setTimeout(() => {
        router.replace("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Verification error:", err);
      setError("Email verification failed. Your link may be expired or invalid.");
      setVerificationState("error");
    }
  };

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

  const handleResend = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate resend
      startResendTimer();
    } catch {
      setError("Failed to resend verification email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-4xl grid md:grid-cols-5 gap-6">
        {/* Sidebar section */}
        <div className="md:col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Plant className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary dark:text-primary-300">
              Agrosiq
            </span>
          </Link>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Verify Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Follow these steps to verify your email address and access all features.
          </p>

          {["Check your email", "Verify email", "Access dashboard"].map((step, idx) => {
            const active =
              (idx === 0 && verificationState === "pending") ||
              (idx === 1 && verificationState === "verifying") ||
              (idx === 2 && verificationState === "verified");
            return (
              <div key={step} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    active
                      ? "bg-primary text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`font-medium ${
                    active
                      ? "text-primary dark:text-primary-300"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}

          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Benefits of Email Verification
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Secure your account
              </li>
              <li className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" /> Enable notifications
              </li>
              <li className="flex items-center gap-2">
                <Key className="h-4 w-4 text-primary" /> Password recovery
              </li>
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" /> Full access
              </li>
            </ul>
          </div>
        </div>

        {/* Main card section */}
        <Card className="md:col-span-3 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              {verificationState === "verified" ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-500" /> Email Verified
                </>
              ) : verificationState === "verifying" ? (
                <>
                  <Loader2 className="h-6 w-6 text-primary animate-spin" /> Verifying Email
                </>
              ) : (
                <>
                  <Mail className="h-6 w-6 text-primary" /> Verify Your Email
                </>
              )}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {verificationState === "verified"
                ? "Email verified successfully"
                : verificationState === "verifying"
                ? "Verifying your email..."
                : "Click the link in your email to verify your account."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {verificationState === "verifying" ? (
              <div className="space-y-4">
                <Progress value={progress} className="h-2" />
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Verifying...
                </p>
              </div>
            ) : verificationState === "verified" ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900">
                  <p className="text-green-800 dark:text-green-200">
                    Your email was successfully verified.
                  </p>
                </div>
                <Button className="w-full bg-primary text-white hover:bg-primary/90" asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900">
                  <p className="text-blue-800 dark:text-blue-200">
                    We sent a verification link to:{" "}
                    <span className="font-medium text-blue-900 dark:text-blue-100">{email}</span>
                  </p>
                </div>

                {error && (
                  <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <p>Didn’t get the email?</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Check your spam folder</li>
                    <li>Ensure your email is correct</li>
                    <li>Click below to resend</li>
                  </ul>
                </div>

                {resendTimer > 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You can resend in {resendTimer} seconds
                  </p>
                ) : (
                  <Button onClick={handleResend} variant="outline" className="w-full border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                    Resend Verification Email
                  </Button>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t border-gray-200 dark:border-gray-700">
            <div className="w-full flex justify-between items-center">
              <Button variant="ghost" asChild>
                <Link href="/sign-in" className="flex mt-1 items-center gap-2 dark:hover:bg-gray-700">
                  <ArrowLeft className="h-4 w-4" /> Back to Sign In
                </Link>
              </Button>
              <Link href="#" className="text-sm text-primary">
                Need Help?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
