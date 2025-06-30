"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Camera,
  QrCode,
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  MapPin,
  Scale,
  Award,
  Link as LinkIcon,
  RefreshCcw,
  Download,
  Share2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sampleProducts = {
  "SF001": {
    name: "Premium Saffron",
    origin: "Khorasan, Iran",
    harvestDate: "2024-02-15",
    weight: "1.5 kg",
    certifications: ["Organic", "Premium Grade", "ISO 22000"],
    blockchainId: "0x7f2b614d9d5963b3e3642b2f45d25f4e874c697a",
    specifications: {
      crocin: "250±5",
      safranal: "35±5",
      moisture: "<12%",
      category: "Grade I",
    },
    status: "verified",
    lastVerified: "2024-03-20 14:30",
    image: "https://images.pexels.com/photos/4197987/pexels-photo-4197987.jpeg",
  },
  "PS002": {
    name: "Akbari Pistachios",
    origin: "Kerman, Iran",
    harvestDate: "2024-01-20",
    weight: "25 kg",
    certifications: ["HACCP", "BRC", "FDA Approved"],
    blockchainId: "0x9e8f7b6c5d4e3a2b1c0f9e8d7c6b5a4f3e2d1c0b",
    specifications: {
      size: "28/30",
      moisture: "<6%",
      splits: "<5%",
      category: "Extra",
    },
    status: "verified",
    lastVerified: "2024-03-19 09:15",
    image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg",
  },
  "DT003": {
    name: "Medjool Dates",
    origin: "Khuzestan, Iran",
    harvestDate: "2024-02-01",
    weight: "10 kg",
    certifications: ["Global GAP", "Organic"],
    blockchainId: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s",
    specifications: {
      size: "Super Jumbo",
      moisture: "20-22%",
      sugar: "65-68%",
      category: "Premium",
    },
    status: "verified",
    lastVerified: "2024-03-18 16:45",
    image: "https://images.pexels.com/photos/4099358/pexels-photo-4099358.jpeg",
  },
};

export default function ProductAuthenticity() {
  const [scanning, setScanning] = useState(false);
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  
  const pageRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
      
      gsap.from([scannerRef.current, resultRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: "power2.out",
      });
    });
    
    return () => ctx.revert();
  }, []);

  const simulateScan = async () => {
    setScanning(true);
    setError("");
    setScanProgress(0);
    
    try {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setScanProgress(i);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const randomProduct = Object.keys(sampleProducts)[
        Math.floor(Math.random() * Object.keys(sampleProducts).length)
      ];
      handleSearch(randomProduct);
    } catch (err) {
      setError("Scanning failed. Please try again or enter product ID manually.");
    } finally {
      setScanning(false);
      setScanProgress(0);
    }
  };

  const handleSearch = (id: string) => {
    setError("");
    const searchId = id || productId;
    
    if (!searchId) {
      setError("Please enter a product ID");
      return;
    }
    
    const foundProduct = sampleProducts[searchId as keyof typeof sampleProducts];
    if (foundProduct) {
      setProduct(foundProduct);
      setProductId(searchId);
      
      if (resultRef.current) {
        gsap.from(resultRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    } else {
      setError("Product not found. Please check the ID and try again.");
      setProduct(null);
    }
  };

  return (
    <div ref={pageRef} className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product Authenticity Tracking
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Verify the authenticity and trace the origin of agricultural products
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <Card ref={scannerRef} className="shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              Product Scanner
            </CardTitle>
            <CardDescription>
              Scan QR code or enter product ID manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Scanner Area */}
            <div 
              className={`relative aspect-square max-w-[320px] mx-auto border-2 ${
                scanning ? "border-primary" : "border-dashed"
              } rounded-lg overflow-hidden`}
            >
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5" />
              
              {scanning ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                  <Progress value={scanProgress} className="w-2/3 h-1" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Scanning... {scanProgress}%
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center px-4">
                    Position the QR code within the frame to scan
                  </p>
                </div>
              )}
              
              {/* Scanning animation */}
              {scanning && (
                <div 
                  className="absolute top-0 left-0 right-0 h-1 bg-primary/50"
                  style={{
                    animation: "scan 2s linear infinite",
                  }}
                />
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Button
                onClick={simulateScan}
                disabled={scanning}
                className="w-full bg-primary hover:bg-primary-600"
              >
                {scanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Camera className="mr-2 h-4 w-4" />
                    Start Scanning
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gray-200 dark:bg-gray-800" />
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-500 dark:text-gray-400 dark:bg-gray-800">
                    or enter product ID manually
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
              <Input
  placeholder="Enter product ID (e.g., SF001)"
  value={productId}
  onChange={(e) => setProductId(e.target.value)}
  className={`${error ? "border-red-500" : ""} dark:bg-gray-700 dark:text-white dark:border-gray-700`}
/>

                <Button
                  variant="outline"
                  onClick={() => handleSearch("")}
                  disabled={scanning}
                  className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {error && (
                <p className="text-sm text-red-500 flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  {error}
                </p>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400">
                For demo purposes, try these IDs: SF001, PS002, DT003
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Product Information */}
        {product && (
          <Card ref={resultRef} className="shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Product Verified
                  </CardTitle>
                  <CardDescription>
                    Last verified: {product.lastVerified}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="font-mono">
                  ID: {productId}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Image */}
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Product Name</p>
                  <p className="font-medium">{product.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Origin</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <p className="font-medium">{product.origin}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Harvest Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <p className="font-medium">{product.harvestDate}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-primary" />
                    <p className="font-medium">{product.weight}</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Certifications
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert: string, index: number) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Blockchain Information */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Blockchain Registration
                </p>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <LinkIcon className="h-4 w-4 text-primary" />
                    <span className="truncate">{product.blockchainId}</span>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quality Specifications
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {key}
                      </p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                  <FileText className="h-4 w-4 mr-2 " />
                  Full Report
                </Button>
                <Button variant="outline" className="flex-1 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Verify Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}