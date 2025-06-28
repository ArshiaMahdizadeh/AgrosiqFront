"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useVerifyEmailMutation } from "@/lib/redux/api/authApi";
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
  Lock,
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
    if (token) handleVerification();
    return () => clearInterval(timerRef.current);
  }, [token]);

  const handleVerification = async () => {
    setVerificationState("verifying");

    // Optional loading progress bar
    let val = 0;
    const interval = setInterval(() => {
      val += 5;
      setProgress(val);
      if (val >= 100) clearInterval(interval);
    }, 100);

    try {
      // The API call now returns an object with token and user properties
      const response = await verifyEmail({ token }).unwrap();

      // --- THIS IS THE UPDATED LOGIC ---
      // 1. Save the user object to local storage
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      // 2. Save the access token to local storage (or your state management)
      if (response.access_token) {
        localStorage.setItem("accessToken", response.access_token);
      }
      // ---------------------------------

      setVerificationState("verified");

      // Now, this will work correctly because an access token is present!
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch {
      setError(
        "Email verification failed. Your link may be expired or invalid."
      );
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
      // Replace with actual resend logic if implemented
      await new Promise((resolve) => setTimeout(resolve, 1500));
      startResendTimer();
    } catch {
      setError("Failed to resend verification email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-4xl grid md:grid-cols-5 gap-6">
        {/* Left side - Info */}
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
            Follow these steps to verify your email address and access all
            features.
          </p>

          <div className="space-y-4">
            {["Check your email", "Verify email", "Access all features"].map(
              (text, idx) => {
                const step = idx + 1;
                const active =
                  (step === 1 && verificationState === "pending") ||
                  (step === 2 && verificationState === "verifying") ||
                  (step === 3 && verificationState === "verified");
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        active
                          ? "bg-primary text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {step}
                    </div>
                    <span
                      className={`font-medium ${
                        active
                          ? "text-primary dark:text-primary-300"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {text}
                    </span>
                  </div>
                );
              }
            )}
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Benefits of Email Verification
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-primary" />
                Enhanced account security
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Bell className="h-4 w-4 text-primary" />
                Important notifications
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Key className="h-4 w-4 text-primary" />
                Password recovery access
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Lock className="h-4 w-4 text-primary" />
                Full platform features
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - Status */}
        <Card className="md:col-span-3 shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
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
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {verificationState === "verified"
                ? "Your email has been successfully verified"
                : verificationState === "verifying"
                ? "Please wait while we verify your email"
                : "Check your email and click the verification link"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {verificationState === "verifying" ? (
              <div className="space-y-4">
                <Progress value={progress} className="h-2" />
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Verifying your email address...
                </p>
              </div>
            ) : verificationState === "verified" ? (
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
                <Button
                  className="w-full bg-primary hover:bg-primary-600 text-white"
                  asChild
                >
                  <Link href="/dashboard">Continue to Dashboard</Link>
                </Button>
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
                  <Alert
                    variant="destructive"
                    className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-red-800 dark:text-red-200">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    If you didn’t receive the email:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Check your spam folder</li>
                    <li>• Make sure the email address is correct</li>
                    <li>• Try resending the email</li>
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
                  >
                    Resend Verification Email
                  </Button>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="border-t border-gray-200 dark:border-gray-700">
            <div className="w-full flex justify-between items-center">
              <Button
                variant="ghost"
                className="text-gray-600 dark:text-gray-400"
                asChild
              >
                <Link
                  href="/sign-in"
                  className="flex mt-1 items-center gap-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                >
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
