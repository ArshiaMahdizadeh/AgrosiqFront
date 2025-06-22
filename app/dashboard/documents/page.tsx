"use client";

import { useState, useRef, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
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
  FileText,
  Upload,
  Eye,
  Share2,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Download,
  Filter,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sample document types
const documentTypes = [
  "Certificate of Origin",
  "Invoice",
  "Organic Certificate",
  "Quality Certificate",
  "Phytosanitary Certificate",
  "Export License",
];

// Sample documents data
const initialDocuments = [
  {
    id: "doc1",
    name: "Certificate of Origin - Saffron Export",
    type: "Certificate of Origin",
    uploadDate: "2025-03-15",
    status: "approved",
    size: "2.4 MB",
    preview: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
  },
  {
    id: "doc2",
    name: "Export Invoice #2025-001",
    type: "Invoice",
    uploadDate: "2025-03-14",
    status: "pending",
    size: "1.8 MB",
    preview: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
  },
  {
    id: "doc3",
    name: "Organic Certification 2025",
    type: "Organic Certificate",
    uploadDate: "2025-03-13",
    status: "approved",
    size: "3.2 MB",
    preview: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg",
  },
  {
    id: "doc4",
    name: "Quality Assurance Report",
    type: "Quality Certificate",
    uploadDate: "2025-03-12",
    status: "rejected",
    size: "1.5 MB",
    preview: "https://images.pexels.com/photos/590037/pexels-photo-590037.jpeg",
  },
  {
    id: "doc5",
    name: "Phytosanitary Certificate",
    type: "Phytosanitary Certificate",
    uploadDate: "2025-03-11",
    status: "approved",
    size: "2.1 MB",
    preview: "https://images.pexels.com/photos/590045/pexels-photo-590045.jpeg",
  },
  {
    id: "doc6",
    name: "Export License 2025",
    type: "Export License",
    uploadDate: "2025-03-10",
    status: "pending",
    size: "1.9 MB",
    preview: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg",
  },
];

export default function DocumentManagement() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 3,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 16 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate cards
      gsap.from(".document-card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, pageRef);
    
    return () => ctx.revert();
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    setUploadError("");
    
    // Validate files
    const invalidFiles = files.filter(
      file => 
        !["application/pdf", "image/jpeg", "image/png"].includes(file.type) ||
        file.size > 10 * 1024 * 1024 // 10MB limit
    );

    if (invalidFiles.length > 0) {
      setUploadError("Invalid file type or size exceeds 10MB limit");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add new documents
    const newDocs = files.map((file, index) => ({
      id: `doc${Date.now() + index}`,
      name: file.name,
      type: documentTypes[Math.floor(Math.random() * documentTypes.length)],
      uploadDate: new Date().toISOString().split("T")[0],
      status: "pending",
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      preview: URL.createObjectURL(file),
    }));

    setDocuments(prev => [...newDocs, ...prev]);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesType = selectedType === "all" || doc.type === selectedType;
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "rejected":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div ref={pageRef} className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Document Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and manage your export-related documents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
            <Download className="h-4 w-4" />
            Export List
          </Button>
        </div>
      </div>

      {/* Upload Section */}
      <Card className="border-dashed">
        <CardContent className="p-6">
          <div
            ref={dropZoneRef}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-gray-200 dark:border-gray-800"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
            />
            
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Drop files here or click to upload
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Supports PDF, JPG, PNG up to 10MB
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
              >
                Select Files
              </Button>
            </div>

            {isUploading && (
              <div className="mt-4">
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}

            {uploadError && (
              <p className="text-sm text-red-500 mt-4">
                {uploadError}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents..."
                  className="pl-9 dark:bg-gray-700 dark:text-white dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[180px] dark:bg-gray-700 dark:text-white dark:border-gray-700">
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="dark:hover:bg-gray-700" value="all">All Types</SelectItem>
                {documentTypes.map((type) => (
                  <SelectItem className="dark:hover:bg-gray-700" key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px] dark:bg-gray-700 dark:text-white dark:border-gray-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="dark:hover:bg-gray-700">All Status</SelectItem>
                <SelectItem value="approved" className="dark:hover:bg-gray-700">Approved</SelectItem>
                <SelectItem value="pending" className="dark:hover:bg-gray-700">Pending</SelectItem>
                <SelectItem value="rejected" className="dark:hover:bg-gray-700">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Carousel */}
            <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="keen-slider__slide h-full">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-base truncate">
                          {doc.name}
                        </CardTitle>
                        <CardDescription className="truncate">
                          {doc.type}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={`flex items-center gap-1 ${getStatusColor(doc.status)}`}>
                      {getStatusIcon(doc.status)}
                      <span className="capitalize">{doc.status}</span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-1">
                  <div className="flex-1 space-y-4">
                    <div className="aspect-[3/2] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={doc.preview}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Uploaded: {doc.uploadDate}</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>

                  {/* Buttons fixed at bottom */}
                  <div className="mt-auto pt-4">
                    <div className="flex items-center gap-2 w-full">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-xs px-2 py-1 h-8 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1.5" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-xs px-2 py-1 h-8 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                      >
                        <Share2 className="h-3.5 w-3.5 mr-1.5" />
                        Share
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-xs px-2 py-1 h-8 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-red-700 hover:text-gray-900 dark:hover:text-gray-200"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Document</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this document?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => setDocuments(prev => prev.filter(d => d.id !== doc.id))}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {filteredDocuments.length > 0 && (
          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => instanceRef.current?.prev()}
              disabled={currentSlide === 0}
              className="rounded-full border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => instanceRef.current?.next()}
              disabled={
                currentSlide ===
                instanceRef.current?.track.details.slides.length - 1
              }
              className="rounded-full border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}