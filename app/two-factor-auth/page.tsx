"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clsx as cn } from "clsx";
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
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plane as Plant,
  Shield,
  Smartphone,
  QrCode,
  Mail,
  Copy,
  Download,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import gsap from "gsap";

// Demo verification codes
const VALID_CODES = ["123456", "000000", "111111"];
const EMAIL_VALID_CODES = ["654321", "999999", "222222"];

// Demo backup codes
const generateBackupCodes = () => {
  const codes = [];
  for (let i = 0; i < 8; i++) {
    codes.push(Math.random().toString(36).substring(2, 10).toUpperCase());
  }
  return codes;
};

const countryCodes = [
  { value: "98", label: "Iran (+98)" },
  { value: "971", label: "UAE (+971)" },
  { value: "974", label: "Qatar (+974)" },
];

const authenticatorApps = [
  {
    name: "Google Authenticator",
    icon: "🔐",
    link: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
  },
  {
    name: "Authy",
    icon: "🛡️",
    link: "https://authy.com/download/",
  },
  {
    name: "Microsoft Authenticator",
    icon: "🔒",
    link: "https://www.microsoft.com/en-us/security/mobile-authenticator-app",
  },
];

export default function TwoFactorAuthSetup() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [backupCodesConfirmed, setBackupCodesConfirmed] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  
  const secretKey = "HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ"; // Demo secret key
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Agrosiq:user@example.com?secret=" + secretKey;
  
  const pageRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page entrance animation
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      });
      
      // Cards animation
      gsap.from(".method-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
      });
    });
    
    return () => ctx.revert();
  }, []);

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

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setCurrentStep(2);
    if (method === "backup") {
      setBackupCodes(generateBackupCodes());
    }
  };

  const handleVerifyCode = async () => {
    setError("");
    setIsVerifying(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const validCodes = selectedMethod === "email" ? EMAIL_VALID_CODES : VALID_CODES;
      if (validCodes.includes(verificationCode)) {
        if (["sms", "authenticator", "email"].includes(selectedMethod)) {
          setCurrentStep(3);
          setBackupCodes(generateBackupCodes());
        } else {
          setSetupComplete(true);
        }
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      startResendTimer();
    } catch (err) {
      setError("Failed to resend code");
    }
  };

  const handleCopySecretKey = () => {
    navigator.clipboard.writeText(secretKey);
  };

  const handleDownloadBackupCodes = () => {
    const text = backupCodes.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-codes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleComplete = () => {
    if (!backupCodesConfirmed) {
      setError("Please confirm that you have saved your backup codes");
      return;
    }
    setSetupComplete(true);
  };

  return (
    <div ref={pageRef} className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="w-full max-w-4xl grid md:grid-cols-5 gap-6">
        {/* Left side - Progress */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col space-y-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Plant className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">Agrosiq</span>
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Two-Factor Authentication
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enhance your account security by setting up two-factor authentication.
            </p>
          </div>

          <div className="space-y-4">
            <Progress value={currentStep * 25} className="h-2" />
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                  currentStep >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                )}>
                  {currentStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : "1"}
                </div>
                <span className={cn(
                  "font-medium",
                  currentStep >= 1 ? "text-primary" : "text-gray-600"
                )}>
                  Choose Method
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                  currentStep >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                )}>
                  {currentStep > 2 ? <CheckCircle2 className="h-5 w-5" /> : "2"}
                </div>
                <span className={cn(
                  "font-medium",
                  currentStep >= 2 ? "text-primary" : "text-gray-600"
                )}>
                  Setup
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                  currentStep >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                )}>
                  {currentStep > 3 ? <CheckCircle2 className="h-5 w-5" /> : "3"}
                </div>
                <span className={cn(
                  "font-medium",
                  currentStep >= 3 ? "text-primary" : "text-gray-600"
                )}>
                  Backup Codes
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                  setupComplete ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                )}>
                  4
                </div>
                <span className={cn(
                  "font-medium",
                  setupComplete ? "text-primary" : "text-gray-600"
                )}>
                  Complete
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Why use 2FA?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-primary" />
                <span>Additional layer of security</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-primary" />
                <span>Protect against unauthorized access</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-primary" />
                <span>Secure your agricultural exports</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - Setup Process */}
        <Card className="md:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Choose Authentication Method"}
              {currentStep === 2 && selectedMethod === "authenticator" && "Set Up Authenticator App"}
              {currentStep === 2 && selectedMethod === "sms" && "Set Up SMS Authentication"}
              {currentStep === 2 && selectedMethod === "email" && "Set Up Email Authentication"}
              {currentStep === 3 && "Save Backup Codes"}
              {setupComplete && "Setup Complete"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Select your preferred two-factor authentication method"}
              {currentStep === 2 && selectedMethod === "authenticator" && "Scan the QR code or enter the secret key manually"}
              {currentStep === 2 && selectedMethod === "sms" && "Enter your phone number to receive verification codes"}
              {currentStep === 2 && selectedMethod === "email" && "Enter your email to receive verification codes"}
              {currentStep === 3 && "Save these backup codes in a secure location"}
              {setupComplete && "Two-factor authentication is now enabled"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-4">
                <Card
                  className="method-card cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleMethodSelect("authenticator")}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <QrCode className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Authenticator App</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Use an authenticator app like Google Authenticator or Authy
                      </p>
                      <Badge className="mt-2" variant="secondary">Recommended</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="method-card cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleMethodSelect("sms")}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Smartphone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">SMS Authentication</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive codes via SMS on your phone
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="method-card cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleMethodSelect("email")}
                >
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Email Authentication</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive codes via email as a backup method
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 2 && selectedMethod === "authenticator" && (
              <div className="space-y-6">
                <Tabs defaultValue="qr">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="qr">QR Code</TabsTrigger>
                    <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="qr" className="space-y-4">
                    <div className="flex justify-center py-4">
                      <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        1. Open your authenticator app
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        2. Tap the + or Add button
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        3. Scan this QR code
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="manual" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Secret Key</Label>
                      <div className="relative">
                        <Input
                          type={showSecretKey ? "text" : "password"}
                          value={secretKey}
                          readOnly
                          className="pr-24"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowSecretKey(!showSecretKey)}
                          >
                            {showSecretKey ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCopySecretKey}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Recommended Apps</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {authenticatorApps.map((app) => (
                          <a
                            key={app.name}
                            href={app.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <span>{app.icon}</span>
                            <span className="text-sm">{app.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="space-y-2">
                    <Label>Enter Verification Code</Label>
                    <Input
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => {
                        setVerificationCode(e.target.value.replace(/\D/g, ""));
                        setError("");
                      }}
                      className={error ? "border-red-500" : ""}
                    />
                    {error && (
                      <p className="text-sm text-red-500">{error}</p>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6 || isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Code"
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    For demo purposes, use these test codes: 123456, 000000, 111111
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && selectedMethod === "sms" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Label>Country Code</Label>
                      <Select value={countryCode} onValueChange={setCountryCode}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryCodes.map((code) => (
                            <SelectItem key={code.value} value={code.value}>
                              {code.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2">
                      <Label>Phone Number</Label>
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    disabled={!countryCode || phoneNumber.length < 10 || resendTimer > 0}
                    onClick={handleResendCode}
                  >
                    {resendTimer > 0 ? (
                      `Resend code in ${resendTimer}s`
                    ) : (
                      "Send Verification Code"
                    )}
                  </Button>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="space-y-2">
                    <Label>Enter Verification Code</Label>
                    <Input
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => {
                        setVerificationCode(e.target.value.replace(/\D/g, ""));
                        setError("");
                      }}
                      className={error ? "border-red-500" : ""}
                    />
                    {error && (
                      <p className="text-sm text-red-500">{error}</p>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6 || isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Code"
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    For demo purposes, use these test codes: 123456, 000000, 111111
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && selectedMethod === "email" && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full"
                    disabled={!isValidEmail(email) || resendTimer > 0}
                    onClick={handleResendCode}
                  >
                    {resendTimer > 0 ? (
                      `Resend code in ${resendTimer}s`
                    ) : (
                      "Send Verification Code"
                    )}
                  </Button>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="space-y-2">
                    <Label>Enter Verification Code</Label>
                    <Input
                      type="text"
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => {
                        setVerificationCode(e.target.value.replace(/\D/g, ""));
                        setError("");
                      }}
                      className={error ? "border-red-500" : ""}
                    />
                    {error && (
                      <p className="text-sm text-red-500">{error}</p>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6 || isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify Code"
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    For demo purposes, use these test codes: 654321, 999999, 222222
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                        Important:
                      </p>
                      <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                        Save these backup codes in a secure location. You'll need them if you
                        lose access to your primary 2FA method.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {backupCodes.map((code, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg font-mono text-center"
                    >
                      {code}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDownloadBackupCodes}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Backup Codes
                </Button>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="confirm-backup"
                    checked={backupCodesConfirmed}
                    onCheckedChange={(checked) => setBackupCodesConfirmed(checked as boolean)}
                  />
                  <Label htmlFor="confirm-backup" className="text-sm">
                    I have saved these backup codes in a secure location
                  </Label>
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>
            )}

            {setupComplete && (
              <div className="space-y-6">
                <div className="flex flex-col items-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Setup Complete!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    Two-factor authentication has been successfully enabled for your account.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <h4 className="font-medium mb-2">What's Next?</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li>• You'll be asked for a verification code when signing in</li>
                      <li>• Keep your backup codes safe</li>
                      <li>• You can manage 2FA settings in your account dashboard</li>
                    </ul>
                  </div>

                  <Button className="w-full" onClick={() => router.push("/dashboard")}>
                    Continue to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter>
            <div className="w-full flex justify-between items-center">
              {currentStep > 1 && !setupComplete ? (
                <Button
                  variant="ghost"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  asChild
                  className="flex items-center gap-2"
                >
                  <Link href="/dashboard">Skip for now</Link>
                </Button>
              )}

              {currentStep === 3 && !setupComplete && (
                <Button onClick={handleComplete} className="flex items-center gap-2">
                  Complete Setup
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}