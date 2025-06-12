"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Plane as Plant, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordRequirement {
  text: string;
  met: boolean;
}

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirement[]>([
    { text: "At least 8 characters long", met: false },
    { text: "Contains at least one uppercase letter", met: false },
    { text: "Contains at least one lowercase letter", met: false },
    { text: "Contains at least one number", met: false },
    { text: "Contains at least one special character", met: false },
  ]);

  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Step 2: Business Details
    companyName: "",
    businessType: "",
    country: "",
    city: "",
    businessSize: "",
    
    // Step 3: Security
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreeMarketing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePassword = (password: string) => {
    const requirements = [
      { regex: /.{8,}/, index: 0 }, // Length
      { regex: /[A-Z]/, index: 1 }, // Uppercase
      { regex: /[a-z]/, index: 2 }, // Lowercase
      { regex: /[0-9]/, index: 3 }, // Number
      { regex: /[^A-Za-z0-9]/, index: 4 }, // Special character
    ];

    const newRequirements = [...passwordRequirements];
    requirements.forEach(({ regex, index }) => {
      newRequirements[index].met = regex.test(password);
    });
    setPasswordRequirements(newRequirements);

    return newRequirements.every(req => req.met);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "password") {
      validatePassword(value);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone) newErrors.phone = "Phone number is required";
    }
    else if (step === 2) {
      if (!formData.companyName) newErrors.companyName = "Company name is required";
      if (!formData.businessType) newErrors.businessType = "Business type is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.businessSize) newErrors.businessSize = "Business size is required";
    }
    else if (step === 3) {
      if (!formData.password) newErrors.password = "Password is required";
      if (!validatePassword(formData.password)) newErrors.password = "Password does not meet requirements";
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
      if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Handle registration logic here
      console.log(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="w-full max-w-4xl grid md:grid-cols-5 gap-6">
        {/* Left side - Progress and Info */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col space-y-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Plant className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">Agrosiq</span>
            </Link>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Your Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Join our network of agricultural professionals and access global markets.
            </p>
          </div>

          <div className="space-y-4">
            <Progress value={currentStep * 33.33} className="h-2" />
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
                  Personal Information
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
                  Business Details
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                  currentStep >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                )}>
                  3
                </div>
                <span className={cn(
                  "font-medium",
                  currentStep >= 3 ? "text-primary" : "text-gray-600"
                )}>
                  Security Setup
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <Card className="md:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Business Details"}
              {currentStep === 3 && "Security Setup"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Enter your personal contact information"}
              {currentStep === 2 && "Tell us about your business"}
              {currentStep === 3 && "Create a secure password for your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <span className="text-sm text-red-500">{errors.firstName}</span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <span className="text-sm text-red-500">{errors.lastName}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <span className="text-sm text-red-500">{errors.email}</span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <span className="text-sm text-red-500">{errors.phone}</span>
                    )}
                  </div>
                </>
              )}

              {/* Step 2: Business Details */}
              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={errors.companyName ? "border-red-500" : ""}
                    />
                    {errors.companyName && (
                      <span className="text-sm text-red-500">{errors.companyName}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) => handleSelectChange(value, "businessType")}
                    >
                      <SelectTrigger className={errors.businessType ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farmer">Farmer/Producer</SelectItem>
                        <SelectItem value="exporter">Exporter/Trader</SelectItem>
                        <SelectItem value="processor">Processor/Manufacturer</SelectItem>
                        <SelectItem value="distributor">Distributor/Wholesaler</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.businessType && (
                      <span className="text-sm text-red-500">{errors.businessType}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleSelectChange(value, "country")}
                      >
                        <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uae">United Arab Emirates</SelectItem>
                          <SelectItem value="saudi">Saudi Arabia</SelectItem>
                          <SelectItem value="qatar">Qatar</SelectItem>
                          <SelectItem value="kuwait">Kuwait</SelectItem>
                          <SelectItem value="oman">Oman</SelectItem>
                          <SelectItem value="bahrain">Bahrain</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.country && (
                        <span className="text-sm text-red-500">{errors.country}</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <span className="text-sm text-red-500">{errors.city}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessSize">Business Size</Label>
                    <Select
                      value={formData.businessSize}
                      onValueChange={(value) => handleSelectChange(value, "businessSize")}
                    >
                      <SelectTrigger className={errors.businessSize ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select business size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup (1-10 employees)</SelectItem>
                        <SelectItem value="small">Small (11-50 employees)</SelectItem>
                        <SelectItem value="medium">Medium (51-200 employees)</SelectItem>
                        <SelectItem value="large">Large (201+ employees)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.businessSize && (
                      <span className="text-sm text-red-500">{errors.businessSize}</span>
                    )}
                  </div>
                </>
              )}

              {/* Step 3: Security Setup */}
              {currentStep === 3 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-sm text-red-500">{errors.password}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-sm text-red-500">{errors.confirmPassword}</span>
                    )}
                  </div>

                  <div className="space-y-2 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password Requirements:
                    </p>
                    <ul className="space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          {req.met ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-gray-400" />
                          )}
                          <span className={cn(
                            req.met ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                          )}>
                            {req.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                        }
                      />
                      <Label
                        htmlFor="agreeTerms"
                        className={cn(
                          "text-sm font-normal",
                          errors.agreeTerms ? "text-red-500" : ""
                        )}
                      >
                        I agree to the{" "}
                        <Link
                          href="#"
                          className="text-primary hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="#"
                          className="text-primary hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="agreeMarketing"
                        checked={formData.agreeMarketing}
                        onCheckedChange={(checked) =>
                          setFormData(prev => ({ ...prev, agreeMarketing: checked as boolean }))
                        }
                      />
                      <Label htmlFor="agreeMarketing" className="text-sm font-normal">
                        I agree to receive marketing communications
                      </Label>
                    </div>
                  </div>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                type="button"
                className="bg-primary hover:bg-primary-600 ml-auto"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-primary hover:bg-primary-600 ml-auto"
                onClick={handleSubmit}
              >
                Create Account
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}