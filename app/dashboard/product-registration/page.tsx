"use client";

import { useState, useRef } from "react";
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const productOptions = [
  { value: "saffron", label: "Saffron" },
  { value: "pistachio", label: "Pistachio" },
  { value: "dates", label: "Dates" },
  { value: "pomegranate", label: "Pomegranate" },
  { value: "other", label: "Other" },
];

const weightUnits = [
  { value: "gram", label: "Gram" },
  { value: "kg", label: "Kilogram" },
  { value: "ton", label: "Ton" },
];

export default function ProductRegistration() {
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    productType: "",
    customProduct: "",
    location: "",
    harvestDate: null as Date | null,
    weight: "",
    weightUnit: "kg",
    isOrganic: "",
    certificationFile: null as File | null,
    productImage: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productType) {
      newErrors.productType = "Please select a product type";
    }
    if (formData.productType === "other" && !formData.customProduct) {
      newErrors.customProduct = "Please enter the product name";
    }
    if (!formData.location) {
      newErrors.location = "Please enter the cultivation location";
    }
    if (!formData.harvestDate) {
      newErrors.harvestDate = "Please select the harvest date";
    }
    if (!formData.weight) {
      newErrors.weight = "Please enter the weight";
    } else {
      const weight = parseFloat(formData.weight);
      if (isNaN(weight) || weight <= 0 || weight > 10000) {
        newErrors.weight = "Weight must be between 0.1 and 10,000";
      }
    }
    if (!formData.isOrganic) {
      newErrors.isOrganic = "Please select certification status";
    }
    if (formData.isOrganic === "yes" && !formData.certificationFile) {
      newErrors.certificationFile = "Please upload certification document";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          productType: "",
          customProduct: "",
          location: "",
          harvestDate: null,
          weight: "",
          weightUnit: "kg",
          isOrganic: "",
          certificationFile: null,
          productImage: null,
        });
      }, 3000);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'certification' | 'image') => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === 'certification') {
        setFormData(prev => ({ ...prev, certificationFile: file }));
        setErrors(prev => ({ ...prev, certificationFile: "" }));
      } else {
        setFormData(prev => ({ ...prev, productImage: file }));
      }
    }
  };

  return (
    <div ref={pageRef} className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Register New Product
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Register your agricultural products for export tracking and verification
          </p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Enter the details of your agricultural product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productType">Product Type</Label>
                <Select
                  value={formData.productType}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, productType: value }));
                    setErrors(prev => ({ ...prev, productType: "" }));
                  }}
                >
                  <SelectTrigger className={errors.productType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
                  <Label htmlFor="customProduct">Product Name</Label>
                  <Input
                    id="customProduct"
                    value={formData.customProduct}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, customProduct: e.target.value }));
                      setErrors(prev => ({ ...prev, customProduct: "" }));
                    }}
                    className={errors.customProduct ? "border-red-500" : ""}
                    placeholder="Enter product name"
                  />
                  {errors.customProduct && (
                    <span className="text-sm text-red-500">{errors.customProduct}</span>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="location">Cultivation Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, location: e.target.value }));
                    setErrors(prev => ({ ...prev, location: "" }));
                  }}
                  className={errors.location ? "border-red-500" : ""}
                  placeholder="Enter cultivation location"
                />
                {errors.location && (
                  <span className="text-sm text-red-500">{errors.location}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label>Harvest Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.harvestDate && "text-muted-foreground",
                        errors.harvestDate && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.harvestDate ? (
                        format(formData.harvestDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
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
                    />
                  </PopoverContent>
                </Popover>
                {errors.harvestDate && (
                  <span className="text-sm text-red-500">{errors.harvestDate}</span>
                )}
              </div>

              <div className="space-y-2">
                <Label>Product Weight</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, weight: e.target.value }));
                      setErrors(prev => ({ ...prev, weight: "" }));
                    }}
                    className={cn("flex-1", errors.weight && "border-red-500")}
                    placeholder="Enter weight"
                    step="0.1"
                  />
                  <Select
                    value={formData.weightUnit}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, weightUnit: value }))}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {weightUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
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
                <Label>Organic Certification</Label>
                <RadioGroup
                  value={formData.isOrganic}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, isOrganic: value }));
                    setErrors(prev => ({ ...prev, isOrganic: "" }));
                  }}
                  className={cn("mt-2", errors.isOrganic && "border-red-500")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="organic-yes" />
                    <Label htmlFor="organic-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="organic-no" />
                    <Label htmlFor="organic-no">No</Label>
                  </div>
                </RadioGroup>
                {errors.isOrganic && (
                  <span className="text-sm text-red-500">{errors.isOrganic}</span>
                )}
              </div>

              {formData.isOrganic === "yes" && (
                <div className="space-y-2">
                  <Label>Upload Certification</Label>
                  <div className="mt-2">
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors",
                        errors.certificationFile && "border-red-500"
                      )}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Click to upload certification document
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        PDF, JPG, or PNG up to 5MB
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, 'certification')}
                    />
                    {formData.certificationFile && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.certificationFile.name}
                      </p>
                    )}
                    {errors.certificationFile && (
                      <span className="text-sm text-red-500">{errors.certificationFile}</span>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Product Image (Optional)</Label>
                <div
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload product image
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    JPG or PNG up to 5MB
                  </p>
                </div>
                <input
                  ref={imageInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image')}
                />
                {formData.productImage && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {formData.productImage.name}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering Product...
                </>
              ) : (
                "Register Product"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Product registered successfully
        </div>
      )}
    </div>
  );
}