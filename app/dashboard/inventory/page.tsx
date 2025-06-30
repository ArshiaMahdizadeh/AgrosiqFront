"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  Search,
  Filter,
  Download,
  AlertTriangle,
  Warehouse,
  BarChart2,
  RefreshCcw,
  Plus,
  QrCode,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const inventoryData = {
  summary: {
    totalItems: 1250,
    totalValue: 185000,
    lowStock: 28,
    outOfStock: 12,
    capacity: 75,
  },
  categories: [
    { name: "Spices", count: 450, value: 65000 },
    { name: "Nuts", count: 320, value: 48000 },
    { name: "Dates", count: 280, value: 42000 },
    { name: "Oils", count: 200, value: 30000 },
  ],
  warehouses: [
    { name: "Main Warehouse", capacity: 80, items: 950 },
    { name: "Export Center", capacity: 65, items: 300 },
  ],
  products: [
    {
      id: "P001",
      name: "Premium Saffron",
      sku: "SAF-001",
      category: "Spices",
      warehouse: "Main Warehouse",
      inStock: 85,
      minStock: 50,
      maxStock: 200,
      value: 12500,
      status: "In Stock",
      lastUpdated: "2025-03-15",
    },
    {
      id: "P002",
      name: "Persian Pistachios",
      sku: "NUT-001",
      category: "Nuts",
      warehouse: "Export Center",
      inStock: 120,
      minStock: 100,
      maxStock: 500,
      value: 18000,
      status: "Low Stock",
      lastUpdated: "2025-03-14",
    },
    {
      id: "P003",
      name: "Organic Dates",
      sku: "DAT-001",
      category: "Dates",
      warehouse: "Main Warehouse",
      inStock: 0,
      minStock: 50,
      maxStock: 300,
      value: 0,
      status: "Out of Stock",
      lastUpdated: "2025-03-13",
    },
    {
      id: "P004",
      name: "Rose Water",
      sku: "OIL-001",
      category: "Oils",
      warehouse: "Export Center",
      inStock: 45,
      minStock: 40,
      maxStock: 200,
      value: 2250,
      status: "Low Stock",
      lastUpdated: "2025-03-15",
    },
  ],
};

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  const pageRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(".summary-card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.from(".warehouse-card", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: "power2.out",
      });

      gsap.from(tableRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const filteredProducts = inventoryData.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesWarehouse = selectedWarehouse === "all" || product.warehouse === selectedWarehouse;
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesWarehouse && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "Low Stock":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
      case "Out of Stock":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div ref={pageRef} className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Inventory Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your product inventory across warehouses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary-600">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div ref={summaryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="summary-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{inventoryData.summary.totalItems}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Across all warehouses
            </p>
          </CardContent>
        </Card>

        <Card className="summary-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Value
            </CardTitle>
            <BarChart2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ${inventoryData.summary.totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Current inventory value
            </p>
          </CardContent>
        </Card>

        <Card className="summary-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Low Stock Items
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {inventoryData.summary.lowStock}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Items below minimum stock
            </p>
          </CardContent>
        </Card>

        <Card className="summary-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Out of Stock
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {inventoryData.summary.outOfStock}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Items requiring immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {inventoryData.warehouses.map((warehouse, index) => (
          <Card key={index} className="warehouse-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Warehouse className="h-5 w-5 text-primary" />
                  {warehouse.name}
                </CardTitle>
                <Badge variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                  {warehouse.items} Items
                </Badge>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Storage capacity utilization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Progress value={warehouse.capacity} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {warehouse.capacity}% Used
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {100 - warehouse.capacity}% Available
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all" className="dark:hover:bg-gray-700">All Categories</SelectItem>
                <SelectItem value="Spices" className="dark:hover:bg-gray-700">Spices</SelectItem>
                <SelectItem value="Nuts" className="dark:hover:bg-gray-700">Nuts</SelectItem>
                <SelectItem value="Dates" className="dark:hover:bg-gray-700">Dates</SelectItem>
                <SelectItem value="Oils" className="dark:hover:bg-gray-700">Oils</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
              <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Warehouse" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all" className="dark:hover:bg-gray-700">All Warehouses</SelectItem>
                <SelectItem value="Main Warehouse" className="dark:hover:bg-gray-700">Main Warehouse</SelectItem>
                <SelectItem value="Export Center" className="dark:hover:bg-gray-700">Export Center</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all" className="dark:hover:bg-gray-700">All Status</SelectItem>
                <SelectItem value="In Stock" className="dark:hover:bg-gray-700">In Stock</SelectItem>
                <SelectItem value="Low Stock" className="dark:hover:bg-gray-700">Low Stock</SelectItem>
                <SelectItem value="Out of Stock" className="dark:hover:bg-gray-700">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card ref={tableRef} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Inventory Items</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Manage and track your product inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="text-gray-900 dark:text-white">Product</TableHead>
                <TableHead className="text-gray-900 dark:text-white">SKU</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Category</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Warehouse</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Stock Level</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Value</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Last Updated</TableHead>
                <TableHead className="text-right text-gray-900 dark:text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-gray-200 dark:border-gray-700">
                  <TableCell className="font-medium text-gray-900 dark:text-white">{product.name}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{product.sku}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{product.category}</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{product.warehouse}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-900 dark:text-white">{product.inStock}</span>
                        <span className="text-gray-500">/ {product.maxStock}</span>
                      </div>
                      <Progress 
                        value={(product.inStock / product.maxStock) * 100} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-white">${product.value.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">{product.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button className="dark:hover:bg-gray-700" variant="ghost" size="icon">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}