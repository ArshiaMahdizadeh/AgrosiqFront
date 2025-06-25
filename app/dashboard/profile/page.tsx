"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  Mail,
  Phone,
  Camera,
  Bell,
  LogOut,
  Loader2,
  CheckCircle,
  Lock,
  Shield,
} from "lucide-react";

type AccountType = "farmer" | "exporter";
type Language = "english" | "spanish" | "french";
type NotificationSettings = {
  market: boolean;
  documents: boolean;
  products: boolean;
};

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  accountType: AccountType;
  language: Language;
  notifications: NotificationSettings;
  twoFactorEnabled: boolean;
  avatarUrl?: string;
  tempAvatar?: string; // For preview before saving
}

export default function ProfilePage() {
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<ProfileData>({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    accountType: "farmer",
    language: "english",
    twoFactorEnabled: false,
    notifications: {
      market: true,
      documents: true,
      products: false,
    },
    avatarUrl: undefined,
    tempAvatar: undefined,
  });

  // Animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".profile-card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, profileRef);
    
    return () => ctx.revert();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If there's a temp avatar, set it as the new avatar
      if (formData.tempAvatar) {
        setFormData(prev => ({
          ...prev,
          avatarUrl: prev.tempAvatar,
          tempAvatar: undefined,
        }));
      }
      
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Clear any temporary avatar changes
    setFormData(prev => ({ ...prev, tempAvatar: undefined }));
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    router.push("/sign-in");
  };

  const handleEnable2FA = () => {
    router.push("/two-factor-auth");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          tempAvatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current && isEditing) {
      fileInputRef.current.click();
    }
  };

  const renderFormField = (
    id: keyof ProfileData,
    label: string,
    Icon: React.ComponentType<{ className?: string }>,
    type = "text"
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          id={id}
          type={type}
          value={formData[id] as string}
          onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
          disabled={!isEditing}
          className={`pl-9 ${errors[id] ? "border-red-500" : "dark:bg-gray-700 dark:text-white dark:border-gray-700"}`}
        />
      </div>
      {errors[id] && <p className="text-sm text-red-500">{errors[id]}</p>}
    </div>
  );

  const renderNotificationToggle = (
    id: keyof NotificationSettings,
    label: string
  ) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Bell className="h-4 w-4 text-gray-500" />
        <span>{label}</span>
      </div>
      <Switch
        checked={formData.notifications[id]}
        onCheckedChange={(checked) =>
          setFormData({
            ...formData,
            notifications: { ...formData.notifications, [id]: checked },
          })
        }
      />
    </div>
  );

  return (
    <div ref={profileRef} className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Profile Information Card */}
      <Card className="profile-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your profile information and account settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <div className="relative">
              {formData.tempAvatar || formData.avatarUrl ? (
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={(formData.tempAvatar || formData.avatarUrl) as string}
                    alt="Profile photo"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold">
                  {formData.fullName.split(" ").map(n => n[0]).join("")}
                </div>
              )}
              <Button
                size="icon"
                variant="outline"
                className={`absolute bottom-0 right-0 rounded-full w-8 h-8 ${
                  !isEditing ? "opacity-50 cursor-not-allowed" : "border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
                onClick={triggerFileInput}
                disabled={!isEditing}
              >
                <Camera className="h-4 w-4" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <h3 className="font-medium">{formData.fullName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {formData.accountType}
              </p>
              {formData.tempAvatar && (
                <p className="text-xs text-green-600 mt-1">New photo selected</p>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {renderFormField("fullName", "Full Name", User)}
            {renderFormField("email", "Email", Mail, "email")}
            {renderFormField("phone", "Phone", Phone, "tel")}

            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Select
                value={formData.accountType}
                onValueChange={(value: AccountType) => 
                  setFormData({ ...formData, accountType: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-700">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer" className="dark:hover:bg-gray-700">Farmer</SelectItem>
                  <SelectItem value="exporter" className="dark:hover:bg-gray-700">Exporter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>

      {/* Security & Settings Card */}
      <Card className="profile-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Security & Preferences</CardTitle>
          <CardDescription>
            Manage your security settings and application preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Security Section */}
            <div className="space-y-4">
              <Label>Security</Label>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-background border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formData.twoFactorEnabled 
                        ? "2FA is currently enabled for your account"
                        : "Add an extra layer of security to your account"}
                    </p>
                  </div>
                </div>
                <Button 
                  variant={formData.twoFactorEnabled ? "outline" : "default"}
                  onClick={handleEnable2FA}
                >
                  {formData.twoFactorEnabled ? "Manage 2FA" : "Enable 2FA"}
                </Button>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="space-y-4">
              <Label>Notifications</Label>
              <div className="space-y-4 p-4 border rounded-lg bg-background border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                {renderNotificationToggle("market", "Market Updates")}
                {renderNotificationToggle("documents", "Document Notifications")}
                {renderNotificationToggle("products", "Product Updates")}
              </div>
            </div>

            {/* Account Plan Section */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Current Plan</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Free tier with basic features
                  </p>
                </div>
                <Badge variant="secondary">Free</Badge>
              </div>
              <Button className="w-full mt-4 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200" variant="outline">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone Card */}
      <Card className="profile-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                <AlertDialogDescription>
                  You will be signed out of your account. Continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Confirm Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="h-5 w-5" />
          Profile updated successfully
        </div>
      )}
    </div>
  );
}