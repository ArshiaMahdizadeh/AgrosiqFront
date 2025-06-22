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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Truck,
  Ship,
  Plane,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Calendar,
  DollarSign,
  Weight,
  Thermometer,
  Shield,
  FileText,
  Navigation,
  Globe,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sample shipping data
const shipments = [
    {
      id: "SH001",
      trackingNumber: "AGR2025001",
      product: "Premium Saffron",
      quantity: "500 kg",
      origin: "Kerman, Iran",
      destination: "Hamburg, Germany",
      carrier: "DHL Express",
      method: "air",
      status: "in-transit",
      progress: 65,
      estimatedDelivery: "2025-03-25",
      actualDelivery: null,
      cost: 2450,
      temperature: "2-8°C",
      humidity: "60-65%",
      lastUpdate: "2025-03-20 14:30",
      milestones: [
        { status: "picked-up", date: "2025-03-18", location: "Kerman, Iran", completed: true },
        { status: "customs-cleared", date: "2025-03-19", location: "Tehran Airport", completed: true },
        { status: "in-transit", date: "2025-03-20", location: "Frankfurt Hub", completed: true },
        { status: "customs-processing", date: "2025-03-24", location: "Hamburg", completed: false },
        { status: "delivered", date: "2025-03-25", location: "Hamburg, Germany", completed: false },
      ],
    },
    {
      id: "SH002",
      trackingNumber: "AGR2025002",
      product: "Organic Pistachios",
      quantity: "2000 kg",
      origin: "Rafsanjan, Iran",
      destination: "Los Angeles, USA",
      carrier: "Maersk Line",
      method: "sea",
      status: "delivered",
      progress: 100,
      estimatedDelivery: "2025-03-15",
      actualDelivery: "2025-03-14",
      cost: 3200,
      temperature: "15-20°C",
      humidity: "55-60%",
      lastUpdate: "2025-03-14 16:45",
      milestones: [
        { status: "picked-up", date: "2025-02-20", location: "Rafsanjan, Iran", completed: true },
        { status: "customs-cleared", date: "2025-02-22", location: "Bandar Abbas Port", completed: true },
        { status: "in-transit", date: "2025-02-25", location: "Persian Gulf", completed: true },
        { status: "customs-processing", date: "2025-03-12", location: "Los Angeles Port", completed: true },
        { status: "delivered", date: "2025-03-14", location: "Los Angeles, USA", completed: true },
      ],
    },
    {
      id: "SH003",
      trackingNumber: "AGR2025003",
      product: "Medjool Dates",
      quantity: "1500 kg",
      origin: "Khuzestan, Iran",
      destination: "Dubai, UAE",
      carrier: "Emirates SkyCargo",
      method: "air",
      status: "pending",
      progress: 0,
      estimatedDelivery: "2025-03-28",
      actualDelivery: null,
      cost: 1800,
      temperature: "18-22°C",
      humidity: "50-55%",
      lastUpdate: "2025-03-20 09:15",
      milestones: [
        { status: "picked-up", date: "2025-03-28", location: "Khuzestan, Iran", completed: false },
        { status: "customs-cleared", date: "2025-03-28", location: "Imam Khomeini Airport", completed: false },
        { status: "in-transit", date: "2025-03-28", location: "Dubai Airport", completed: false },
        { status: "customs-processing", date: "2025-03-28", location: "Dubai", completed: false },
        { status: "delivered", date: "2025-03-28", location: "Dubai, UAE", completed: false },
      ],
    },
    {
      id: "SH004",
      trackingNumber: "AGR2025004",
      product: "Citrus Fruits",
      quantity: "5000 kg",
      origin: "Mazandaran, Iran",
      destination: "Rotterdam, Netherlands",
      carrier: "CMA CGM",
      method: "sea",
      status: "delayed",
      progress: 45,
      estimatedDelivery: "2025-04-02",
      actualDelivery: null,
      cost: 2800,
      temperature: "4-6°C",
      humidity: "85-90%",
      lastUpdate: "2025-03-19 11:20",
      milestones: [
        { status: "picked-up", date: "2025-03-10", location: "Mazandaran, Iran", completed: true },
        { status: "customs-cleared", date: "2025-03-12", location: "Bandar Abbas Port", completed: true },
        { status: "in-transit", date: "2025-03-15", location: "Suez Canal", completed: true },
        { status: "customs-processing", date: "2025-04-01", location: "Rotterdam Port", completed: false },
        { status: "delivered", date: "2025-04-02", location: "Rotterdam, Netherlands", completed: false },
      ],
    },
  ];
  
  const carriers = [
    { name: "DHL Express", type: "air", logo: "✈️" },
    { name: "FedEx", type: "air", logo: "✈️" },
    { name: "Maersk Line", type: "sea", logo: "🚢" },
    { name: "CMA CGM", type: "sea", logo: "🚢" },
    { name: "Emirates SkyCargo", type: "air", logo: "✈️" },
    { name: "MSC", type: "sea", logo: "🚢" },
  ];

export default function ShippingPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMethod, setSelectedMethod] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("shipments");
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  
  const pageRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Page entrance animation
      gsap.from(pageRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
      
      // Summary cards animation
      gsap.from(".summary-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      });
      
      // Table animation
      gsap.from(tableRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      });
    });
    
    return () => ctx.revert();
  }, []);

  const filteredShipments = shipments.filter(shipment => {
    const matchesStatus = selectedStatus === "all" || shipment.status === selectedStatus;
    const matchesMethod = selectedMethod === "all" || shipment.method === selectedMethod;
    const matchesSearch = 
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesMethod && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "in-transit":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "delayed":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "in-transit":
        return <Truck className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "delayed":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "air":
        return <Plane className="h-4 w-4 text-blue-600" />;
      case "sea":
        return <Ship className="h-4 w-4 text-blue-600" />;
      case "land":
        return <Truck className="h-4 w-4 text-blue-600" />;
      default:
        return <Package className="h-4 w-4 text-blue-600" />;
    }
  };

  const summaryStats = {
    total: shipments.length,
    inTransit: shipments.filter(s => s.status === "in-transit").length,
    delivered: shipments.filter(s => s.status === "delivered").length,
    delayed: shipments.filter(s => s.status === "delayed").length,
    totalValue: shipments.reduce((sum, s) => sum + s.cost, 0),
  };

  const handleViewTracking = (shipmentId: string) => {
    setSelectedShipment(shipmentId);
    setActiveTab("tracking"); // Switch to Live Tracking tab
  };

  return (
    <div ref={pageRef} className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Shipping Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your agricultural export shipments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary-600">
            <Plus className="h-4 w-4" />
            New Shipment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div ref={summaryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="summary-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Shipments
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{summaryStats.total}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              All time shipments
            </p>
          </CardContent>
        </Card>

        <Card className="summary-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              In Transit
            </CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{summaryStats.inTransit}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Currently shipping
            </p>
          </CardContent>
        </Card>

        <Card className="summary-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Delivered
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{summaryStats.delivered}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Successfully delivered
            </p>
          </CardContent>
        </Card>

        <Card className="summary-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Delayed
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summaryStats.delayed}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Requiring attention
            </p>
          </CardContent>
        </Card>

        <Card className="summary-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${summaryStats.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Shipment value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <TabsTrigger value="shipments" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Package className="h-4 w-4" />
            Shipments
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Navigation className="h-4 w-4" />
            Live Tracking
          </TabsTrigger>
          <TabsTrigger value="carriers" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Globe className="h-4 w-4" />
            Carriers
          </TabsTrigger>
        </TabsList>

        {/* Shipments Tab */}
        <TabsContent value="shipments">
          {/* Filters */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search shipments..."
                      className="pl-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectItem value="all" className="dark:hover:bg-gray-700">All Status</SelectItem>
                    <SelectItem value="pending" className="dark:hover:bg-gray-700">Pending</SelectItem>
                    <SelectItem value="in-transit" className="dark:hover:bg-gray-700">In Transit</SelectItem>
                    <SelectItem value="delivered" className="dark:hover:bg-gray-700">Delivered</SelectItem>
                    <SelectItem value="delayed" className="dark:hover:bg-gray-700">Delayed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                  <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectItem value="all" className="dark:hover:bg-gray-700">All Methods</SelectItem>
                    <SelectItem value="air" className="dark:hover:bg-gray-700">Air Freight</SelectItem>
                    <SelectItem value="sea" className="dark:hover:bg-gray-700">Sea Freight</SelectItem>
                    <SelectItem value="land" className="dark:hover:bg-gray-700">Land Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Shipments Table */}
          <Card ref={tableRef} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Active Shipments</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Manage and track your export shipments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-200 dark:border-gray-700">
                    <TableHead className="text-gray-900 dark:text-white">Tracking #</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Product</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Route</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Method</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Progress</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">ETA</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Value</TableHead>
                    <TableHead className="text-right text-gray-900 dark:text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id} className="border-gray-200 dark:border-gray-700">
                      <TableCell className="font-medium text-gray-900 dark:text-white">
                        {shipment.trackingNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{shipment.product}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{shipment.quantity}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <div className="text-sm">
                            <div className="text-gray-900 dark:text-white">{shipment.origin}</div>
                            <div className="text-gray-600 dark:text-gray-400">→ {shipment.destination}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getMethodIcon(shipment.method)}
                          <span className="capitalize text-gray-900 dark:text-white">{shipment.method}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`flex items-center gap-1 ${getStatusColor(shipment.status)}`}>
                          {getStatusIcon(shipment.status)}
                          <span className="capitalize">{shipment.status.replace('-', ' ')}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={shipment.progress} className="h-2 w-20" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{shipment.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-white">
                        {shipment.actualDelivery || shipment.estimatedDelivery}
                      </TableCell>
                      <TableCell className="text-gray-900 dark:text-white">
                        ${shipment.cost.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button variant="ghost" className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200" size="icon" onClick={() => handleViewTracking(shipment.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-red-700 hover:text-gray-900 dark:hover:text-gray-200" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Shipment</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this shipment record?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">Cancel</AlertDialogCancel>
                                <AlertDialogAction className="border-gray-300 bg-red-700 dark:bg-red-700 dark:border-gray-600 text-white dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-800 hover:bg-red-800 dark:hover:text-gray-200">Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Tracking Tab */}
        <TabsContent value="tracking">
          {selectedShipment ? (
            <div className="space-y-6">
              {(() => {
                const shipment = shipments.find(s => s.id === selectedShipment);
                if (!shipment) return null;

                return (
                  <>
                    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-gray-900 dark:text-white">
                              Tracking: {shipment.trackingNumber}
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                              {shipment.product} - {shipment.quantity}
                            </CardDescription>
                          </div>
                          <Button variant="outline" className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200" onClick={() => setSelectedShipment(null)}>
                            Back to List
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Shipment Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Carrier:</span>
                                  <span className="text-gray-900 dark:text-white">{shipment.carrier}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Method:</span>
                                  <span className="text-gray-900 dark:text-white capitalize">{shipment.method}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">Cost:</span>
                                  <span className="text-gray-900 dark:text-white">${shipment.cost.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Environmental Conditions</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Thermometer className="h-4 w-4 text-blue-600" />
                                  <span className="text-gray-600 dark:text-gray-400">Temperature:</span>
                                  <span className="text-gray-900 dark:text-white">{shipment.temperature}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Shield className="h-4 w-4 text-green-600" />
                                  <span className="text-gray-600 dark:text-gray-400">Humidity:</span>
                                  <span className="text-gray-900 dark:text-white">{shipment.humidity}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <h4 className="font-medium mb-4 text-gray-900 dark:text-white">Shipment Timeline</h4>
                            <div className="space-y-4">
                              {shipment.milestones.map((milestone, index) => (
                                <div key={index} className="flex items-start gap-4">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    milestone.completed 
                                      ? "bg-green-100 dark:bg-green-900/20" 
                                      : "bg-gray-100 dark:bg-gray-800"
                                  }`}>
                                    {milestone.completed ? (
                                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    ) : (
                                      <Clock className="h-4 w-4 text-gray-400" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h5 className={`font-medium ${
                                          milestone.completed 
                                            ? "text-gray-900 dark:text-white" 
                                            : "text-gray-600 dark:text-gray-400"
                                        }`}>
                                          {milestone.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </h5>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                          {milestone.location}
                                        </p>
                                      </div>
                                      <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {milestone.date}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                );
              })()}
            </div>
          ) : (
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-12 text-center">
                <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select a Shipment to Track
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Choose a shipment from the list to view detailed tracking information
                </p>
                <Button onClick={() => setActiveTab("shipments")}>
                  View Shipments
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Carriers Tab */}
        <TabsContent value="carriers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carriers.map((carrier, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{carrier.logo}</div>
                    <div>
                      <CardTitle className="text-gray-900 dark:text-white">{carrier.name}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400 capitalize">
                        {carrier.type} freight
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active Shipments:</span>
                      <Badge variant="outline">
                        {shipments.filter(s => s.carrier === carrier.name).length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Transit Time:</span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {carrier.type === "air" ? "3-5 days" : "15-25 days"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Reliability:</span>
                      <div className="flex items-center gap-1">
                        <Progress value={Math.floor(Math.random() * 20) + 80} className="h-2 w-16" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {Math.floor(Math.random() * 20) + 80}%
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
