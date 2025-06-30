"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  Leaf,
  Package,
  MapPin,
  Scale,
  Award,
  FileText,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import gsap from "gsap";

const productOptions = [
  { value: "saffron", label: "Saffron", icon: "🌸" },
  { value: "pistachio", label: "Pistachio", icon: "🥜" },
  { value: "dates", label: "Dates", icon: "🌴" },
  { value: "pomegranate", label: "Pomegranate", icon: "🍎" },
  { value: "citrus", label: "Citrus Fruits", icon: "🍊" },
  { value: "herbs", label: "Herbs & Spices", icon: "🌿" },
  { value: "other", label: "Other", icon: "📦" },
];

const weightUnits = [
  { value: "gram", label: "Gram (g)" },
  { value: "kg", label: "Kilogram (kg)" },
  { value: "ton", label: "Ton (t)" },
  { value: "pound", label: "Pound (lb)" },
];

const qualityGrades = [
  { value: "premium", label: "Premium Grade" },
  { value: "grade-a", label: "Grade A" },
  { value: "grade-b", label: "Grade B" },
  { value: "standard", label: "Standard" },
];

const certificationTypes = [
  "Organic",
  "Fair Trade",
  "Non-GMO",
  "HACCP",
  "ISO 22000",
  "Global GAP",
  "BRC",
  "FDA Approved",
  "Halal",
  "Kosher",
];

export default function ProductRegistration() {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [formData, setFormData] = useState({
    // Basic Information
    productType: "",
    customProduct: "",
    productName: "",
    description: "",
    
    // Origin & Cultivation
    cultivationLocation: "",
    region: "",
    country: "",
    harvestDate: null as Date | null,
    
    // Quantity & Quality
    weight: "",
    weightUnit: "kg",
    qualityGrade: "",
    moistureContent: "",
    
    // Certifications
    isOrganic: "",
    selectedCertifications: [] as string[],
    certificationFiles: [] as File[],
    
    // Images & Documents
    productImages: [] as File[],
    additionalDocuments: [] as File[],
    
    // Additional Information
    storageConditions: "",
    shelfLife: "",
    packagingType: "",
    specialHandling: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page entrance animation
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });
      
      // Step cards animation
      gsap.from(".step-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      });
    });
    
    return () => ctx.revert();
  }, []);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.productType) newErrors.productType = "Please select a product type";
      if (formData.productType === "other" && !formData.customProduct) {
        newErrors.customProduct = "Please enter the product name";
      }
      if (!formData.productName) newErrors.productName = "Product name is required";
      if (!formData.description) newErrors.description = "Product description is required";
    }
    else if (step === 2) {
      if (!formData.cultivationLocation) newErrors.cultivationLocation = "Cultivation location is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.harvestDate) newErrors.harvestDate = "Harvest date is required";
    }
    else if (step === 3) {
      if (!formData.weight) newErrors.weight = "Weight is required";
      else {
        const weight = parseFloat(formData.weight);
        if (isNaN(weight) || weight <= 0) {
          newErrors.weight = "Please enter a valid weight";
        }
      }
      if (!formData.qualityGrade) newErrors.qualityGrade = "Quality grade is required";
    }
    else if (step === 4) {
      if (!formData.isOrganic) newErrors.isOrganic = "Please select certification status";
      if (formData.isOrganic === "yes" && formData.certificationFiles.length === 0) {
        newErrors.certificationFiles = "Please upload at least one certification document";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCurrentStep(5);
      setShowSuccess(true);
      
      // Auto redirect after success
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleFileUpload = (files: FileList | null, type: 'certification' | 'images' | 'documents') => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      const isValidType = type === 'images' 
        ? file.type.startsWith('image/')
        : file.type === 'application/pdf' || file.type.startsWith('image/');
      return isValidSize && isValidType;
    });

    if (validFiles.length !== fileArray.length) {
      setErrors({ 
        ...errors, 
        [type]: "Some files were rejected. Please ensure files are under 10MB and in correct format." 
      });
    }

    setFormData(prev => ({
      ...prev,
      [type === 'certification' ? 'certificationFiles' : 
       type === 'images' ? 'productImages' : 'additionalDocuments']: [
        ...prev[type === 'certification' ? 'certificationFiles' : 
               type === 'images' ? 'productImages' : 'additionalDocuments'],
        ...validFiles
      ]
    }));
  };

  const removeFile = (index: number, type: 'certification' | 'images' | 'documents') => {
    const fieldName = type === 'certification' ? 'certificationFiles' : 
                     type === 'images' ? 'productImages' : 'additionalDocuments';
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }));
  };

  const addCertification = (cert: string) => {
    if (!formData.selectedCertifications.includes(cert)) {
      setFormData(prev => ({
        ...prev,
        selectedCertifications: [...prev.selectedCertifications, cert]
      }));
    }
  };

  const removeCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCertifications: prev.selectedCertifications.filter(c => c !== cert)
    }));
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return Package;
      case 2: return MapPin;
      case 3: return Scale;
      case 4: return Award;
      case 5: return CheckCircle2;
      default: return Package;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Product Details";
      case 2: return "Origin & Cultivation";
      case 3: return "Quantity & Quality";
      case 4: return "Certifications";
      case 5: return "Review & Submit";
      default: return "Product Details";
    }
  };

  const renderFileUploadZone = (
    type: 'certification' | 'images' | 'documents',
    title: string,
    description: string,
    accept: string,
    icon: React.ElementType
  ) => {
    const Icon = icon;
    const files = type === 'certification' ? formData.certificationFiles :
                 type === 'images' ? formData.productImages : formData.additionalDocuments;
    
    return (
      <div className="space-y-4">
        <Label className="text-base font-medium text-gray-900 dark:text-white">{title}</Label>
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
            dragActive 
              ? "border-primary bg-primary/5 dark:bg-primary/10" 
              : "border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary",
            "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            handleFileUpload(e.dataTransfer.files, type);
          }}
          onClick={() => document.getElementById(`${type}-upload`)?.click()}
        >
          <input
            id={`${type}-upload`}
            type="file"
            className="hidden"
            multiple
            accept={accept}
            onChange={(e) => handleFileUpload(e.target.files, type)}
          />
          
          <Icon className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {description}
          </p>
          <Button variant="outline" type="button" className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600">
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Uploaded Files ({files.length})
            </Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-900 dark:text-white truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                      ({(file.size / 1024 / 1024).toFixed(1)} MB)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index, type)}
                    className="h-6 w-6 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {errors[type] && (
          <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {errors[type]}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Register New Product
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Register your agricultural products for export tracking and verification
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => {
              const StepIcon = getStepIcon(step);
              const isActive = currentStep === step;
              const isCompleted = currentStep > step;
              
              return (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all",
                      isActive
                        ? "bg-primary border-primary text-white"
                        : isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <StepIcon className="h-6 w-6" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs mt-2 text-center max-w-20",
                      isActive || isCompleted
                        ? "text-gray-900 dark:text-white font-medium"
                        : "text-gray-500 dark:text-gray-400"
                    )}
                  >
                    {getStepTitle(step)}
                  </span>
                </div>
              );
            })}
          </div>
          <Progress value={(currentStep / 5) * 100} className="h-2" />
        </div>

        {/* Form Content */}
        <Card className="step-card shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 dark:text-white">
              {getStepTitle(currentStep)}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {currentStep === 1 && "Enter basic information about your product"}
              {currentStep === 2 && "Provide details about cultivation and origin"}
              {currentStep === 3 && "Specify quantity and quality parameters"}
              {currentStep === 4 && "Upload certifications and documentation"}
              {currentStep === 5 && "Review your information and submit"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Product Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="productType" className="text-gray-900 dark:text-white">Product Type</Label>
                    <Select
                      value={formData.productType}
                      onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, productType: value }));
                        setErrors(prev => ({ ...prev, productType: "" }));
                      }}
                    >
                      <SelectTrigger className={cn(
                        "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white",
                        errors.productType ? "border-red-500" : ""
                      )}>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        {productOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-gray-900 dark:text-white">
                            <div className="flex items-center gap-2">
                              <span>{option.icon}</span>
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.productType && (
                      <span className="text-sm text-red-500">{errors.productType}</span>
                    )}
                  </div>

                  {formData.productType === "other" && (
                    <div className="space-y-2">
                      <Label htmlFor="customProduct" className="text-gray-900 dark:text-white">Custom Product Name</Label>
                      <Input
                        id="customProduct"
                        value={formData.customProduct}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, customProduct: e.target.value }));
                          setErrors(prev => ({ ...prev, customProduct: "" }));
                        }}
                        className={cn(
                          "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
                          errors.customProduct ? "border-red-500" : ""
                        )}
                        placeholder="Enter custom product name"
                      />
                      {errors.customProduct && (
                        <span className="text-sm text-red-500">{errors.customProduct}</span>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="productName" className="text-gray-900 dark:text-white">Product Name</Label>
                    <Input
                      id="productName"
                      value={formData.productName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, productName: e.target.value }));
                        setErrors(prev => ({ ...prev, productName: "" }));
                      }}
                      className={cn(
                        "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
                        errors.productName ? "border-red-500" : ""
                      )}
                      placeholder="e.g., Premium Organic Saffron"
                    />
                    {errors.productName && (
                      <span className="text-sm text-red-500">{errors.productName}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-900 dark:text-white">Product Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, description: e.target.value }));
                        setErrors(prev => ({ ...prev, description: "" }));
                      }}
                      className={cn(
                        "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-[100px]",
                        errors.description ? "border-red-500" : ""
                      )}
                      placeholder="Describe your product, its characteristics, and unique features..."
                    />
                    {errors.description && (
                      <span className="text-sm text-red-500">{errors.description}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Origin & Cultivation */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cultivationLocation" className="text-gray-900 dark:text-white">Cultivation Location</Label>
                      <Input
                        id="cultivationLocation"
                        value={formData.cultivationLocation}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, cultivationLocation: e.target.value }));
                          setErrors(prev => ({ ...prev, cultivationLocation: "" }));
                        }}
                        className={cn(
                          "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
                          errors.cultivationLocation ? "border-red-500" : ""
                        )}
                        placeholder="e.g., Kerman Province"
                      />
                      {errors.cultivationLocation && (
                        <span className="text-sm text-red-500">{errors.cultivationLocation}</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-gray-900 dark:text-white">Region/State</Label>
                      <Input
                        id="region"
                        value={formData.region}
                        onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                        className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        placeholder="e.g., Fars"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-gray-900 dark:text-white">Country</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, country: value }));
                        setErrors(prev => ({ ...prev, country: "" }));
                      }}
                    >
                      <SelectTrigger className={cn(
                        "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white",
                        errors.country ? "border-red-500" : ""
                      )}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <SelectItem value="iran" className="text-gray-900 dark:text-white">Iran</SelectItem>
                        <SelectItem value="turkey" className="text-gray-900 dark:text-white">Turkey</SelectItem>
                        <SelectItem value="spain" className="text-gray-900 dark:text-white">Spain</SelectItem>
                        <SelectItem value="italy" className="text-gray-900 dark:text-white">Italy</SelectItem>
                        <SelectItem value="greece" className="text-gray-900 dark:text-white">Greece</SelectItem>
                        <SelectItem value="morocco" className="text-gray-900 dark:text-white">Morocco</SelectItem>
                        <SelectItem value="other" className="text-gray-900 dark:text-white">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <span className="text-sm text-red-500">{errors.country}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">Harvest Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600",
                            !formData.harvestDate && "text-gray-500 dark:text-gray-400",
                            errors.harvestDate && "border-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.harvestDate ? (
                            format(formData.harvestDate, "PPP")
                          ) : (
                            <span>Pick harvest date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.harvestDate || undefined}
                          onSelect={(date) => {
                            setFormData(prev => ({ ...prev, harvestDate: date }));
                            setErrors(prev => ({ ...prev, harvestDate: "" }));
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("2020-01-01")
                          }
                          initialFocus
                          className="bg-white dark:bg-gray-800"
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.harvestDate && (
                      <span className="text-sm text-red-500">{errors.harvestDate}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Quantity & Quality */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-gray-900 dark:text-white">Weight/Quantity</Label>
                      <div className="flex gap-2">
                        <Input
                          id="weight"
                          type="number"
                          value={formData.weight}
                          onChange={(e) => {
                            setFormData(prev => ({ ...prev, weight: e.target.value }));
                            setErrors(prev => ({ ...prev, weight: "" }));
                          }}
                          className={cn(
                            "flex-1 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
                            errors.weight ? "border-red-500" : ""
                          )}
                          placeholder="Enter quantity"
                          step="0.1"
                        />
                        <Select
                          value={formData.weightUnit}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, weightUnit: value }))}
                        >
                          <SelectTrigger className="w-32 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                            {weightUnits.map((unit) => (
                              <SelectItem key={unit.value} value={unit.value} className="text-gray-900 dark:text-white">
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      {errors.weight && (
                        <span className="text-sm text-red-500">{errors.weight}</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualityGrade" className="text-gray-900 dark:text-white">Quality Grade</Label>
                      <Select
                        value={formData.qualityGrade}
                        onValueChange={(value) => {
                          setFormData(prev => ({ ...prev, qualityGrade: value }));
                          setErrors(prev => ({ ...prev, qualityGrade: "" }));
                        }}
                      >
                        <SelectTrigger className={cn(
                          "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white",
                          errors.qualityGrade ? "border-red-500" : ""
                        )}>
                          <SelectValue placeholder="Select quality grade" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          {qualityGrades.map((grade) => (
                            <SelectItem key={grade.value} value={grade.value} className="text-gray-900 dark:text-white">
                              {grade.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.qualityGrade && (
                        <span className="text-sm text-red-500">{errors.qualityGrade}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="moistureContent" className="text-gray-900 dark:text-white">Moisture Content (%)</Label>
                      <Input
                        id="moistureContent"
                        type="number"
                        value={formData.moistureContent}
                        onChange={(e) => setFormData(prev => ({ ...prev, moistureContent: e.target.value }))}
                        className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        placeholder="e.g., 12.5"
                        step="0.1"
                        min="0"
                        max="100"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shelfLife" className="text-gray-900 dark:text-white">Shelf Life (months)</Label>
                      <Input
                        id="shelfLife"
                        type="number"
                        value={formData.shelfLife}
                        onChange={(e) => setFormData(prev => ({ ...prev, shelfLife: e.target.value }))}
                        className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        placeholder="e.g., 24"
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storageConditions" className="text-gray-900 dark:text-white">Storage Conditions</Label>
                    <Textarea
                      id="storageConditions"
                      value={formData.storageConditions}
                      onChange={(e) => setFormData(prev => ({ ...prev, storageConditions: e.target.value }))}
                      className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      placeholder="Describe optimal storage conditions (temperature, humidity, etc.)"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Certifications */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium text-gray-900 dark:text-white">Organic Certification</Label>
                    <RadioGroup
                      value={formData.isOrganic}
                      onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, isOrganic: value }));
                        setErrors(prev => ({ ...prev, isOrganic: "" }));
                      }}
                      className={cn("grid grid-cols-2 gap-4", errors.isOrganic && "border-red-500")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="organic-yes" />
                        <Label htmlFor="organic-yes" className="text-gray-900 dark:text-white">Yes, certified organic</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="organic-no" />
                        <Label htmlFor="organic-no" className="text-gray-900 dark:text-white">No, conventional</Label>
                      </div>
                    </RadioGroup>
                    {errors.isOrganic && (
                      <span className="text-sm text-red-500">{errors.isOrganic}</span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-medium text-gray-900 dark:text-white">Additional Certifications</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {certificationTypes.map((cert) => (
                        <Button
                          key={cert}
                          type="button"
                          variant={formData.selectedCertifications.includes(cert) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            if (formData.selectedCertifications.includes(cert)) {
                              removeCertification(cert);
                            } else {
                              addCertification(cert);
                            }
                          }}
                          className={cn(
                            "justify-start text-left h-auto py-2 px-3",
                            formData.selectedCertifications.includes(cert)
                              ? "bg-primary text-white"
                              : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                          )}
                        >
                          {formData.selectedCertifications.includes(cert) && (
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                          )}
                          {cert}
                        </Button>
                      ))}
                    </div>
                    
                    {formData.selectedCertifications.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {formData.selectedCertifications.map((cert) => (
                          <Badge
                            key={cert}
                            variant="secondary"
                            className="flex items-center gap-1 bg-primary/10 text-primary border-primary/20"
                          >
                            {cert}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeCertification(cert)}
                              className="h-4 w-4 p-0 hover:bg-transparent"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {formData.isOrganic === "yes" && (
                    <div className="space-y-4">
                      {renderFileUploadZone(
                        'certification',
                        'Certification Documents',
                        'Upload organic and other certification documents (PDF, JPG, PNG)',
                        '.pdf,.jpg,.jpeg,.png',
                        Award
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    {renderFileUploadZone(
                      'images',
                      'Product Images',
                      'Upload high-quality images of your product',
                      'image/*',
                      ImageIcon
                    )}
                  </div>

                  <div className="space-y-4">
                    {renderFileUploadZone(
                      'documents',
                      'Additional Documents',
                      'Upload any additional documents (lab reports, quality certificates, etc.)',
                      '.pdf,.jpg,.jpeg,.png,.doc,.docx',
                      FileText
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 5 && !showSuccess && (
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Review Your Product Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Product Type</Label>
                          <p className="text-gray-900 dark:text-white">
                            {productOptions.find(p => p.value === formData.productType)?.label || formData.customProduct}
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Product Name</Label>
                          <p className="text-gray-900 dark:text-white">{formData.productName}</p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Origin</Label>
                          <p className="text-gray-900 dark:text-white">
                            {formData.cultivationLocation}, {formData.country}
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Quantity</Label>
                          <p className="text-gray-900 dark:text-white">
                            {formData.weight} {formData.weightUnit}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Quality Grade</Label>
                          <p className="text-gray-900 dark:text-white">
                            {qualityGrades.find(g => g.value === formData.qualityGrade)?.label}
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Harvest Date</Label>
                          <p className="text-gray-900 dark:text-white">
                            {formData.harvestDate ? format(formData.harvestDate, "PPP") : "Not specified"}
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Organic Status</Label>
                          <p className="text-gray-900 dark:text-white">
                            {formData.isOrganic === "yes" ? "Certified Organic" : "Conventional"}
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Certifications</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {formData.selectedCertifications.length > 0 ? (
                              formData.selectedCertifications.map((cert) => (
                                <Badge key={cert} variant="secondary" className="text-xs">
                                  {cert}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-gray-500 dark:text-gray-400 text-sm">None selected</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</Label>
                      <p className="text-gray-900 dark:text-white mt-1">{formData.description}</p>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Product Images ({formData.productImages.length})
                        </Label>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Certification Documents ({formData.certificationFiles.length})
                        </Label>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Additional Documents ({formData.additionalDocuments.length})
                        </Label>
                      </div>
                    </div>
                  </div>

                  {isSubmitting && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span className="text-gray-900 dark:text-white">Uploading and processing your product registration...</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Progress: {uploadProgress}%
                      </p>
                    </div>
                  )}

                  {errors.submit && (
                    <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-red-800 dark:text-red-200">
                        {errors.submit}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {/* Success State */}
              {currentStep === 5 && showSuccess && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Product Registered Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Your product has been registered and is now being processed. You'll receive a confirmation email shortly with your product ID and tracking information.
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => router.push("/dashboard")}
                      className="bg-primary hover:bg-primary-600 text-white"
                    >
                      Go to Dashboard
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Redirecting automatically in a few seconds...
                    </p>
                  </div>
                </div>
              )}
            </form>
          </CardContent>

          {currentStep < 5 && !showSuccess && (
            <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary-600 text-white"
                >
                  Next
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Register Product
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}