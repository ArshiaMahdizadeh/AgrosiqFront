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
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Globe,
  Users,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  FileText,
  Share2,
  Settings,
  ChevronDown,
  MapPin,
  Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sample analytics data
const analyticsData = {
  kpis: {
    totalRevenue: { value: 2450000, change: 12.5, trend: "up" },
    exportVolume: { value: 15420, change: 8.3, trend: "up" },
    activeMarkets: { value: 42, change: 5.0, trend: "up" },
    customerRetention: { value: 87.5, change: -2.1, trend: "down" },
  },
  
  monthlyTrends: [
    { month: "Jan", revenue: 180000, volume: 1200, customers: 45 },
    { month: "Feb", revenue: 195000, volume: 1350, customers: 48 },
    { month: "Mar", revenue: 210000, volume: 1420, customers: 52 },
    { month: "Apr", revenue: 225000, volume: 1580, customers: 55 },
    { month: "May", revenue: 240000, volume: 1650, customers: 58 },
    { month: "Jun", revenue: 255000, volume: 1720, customers: 62 },
  ],
  
  productPerformance: [
    { name: "Saffron", value: 35, revenue: 875000, growth: 15.2 },
    { name: "Pistachio", value: 28, revenue: 686000, growth: 8.7 },
    { name: "Dates", value: 22, revenue: 539000, growth: 12.1 },
    { name: "Citrus", value: 15, revenue: 367500, growth: 6.3 },
  ],
  
  regionalAnalysis: [
    { region: "Europe", revenue: 980000, volume: 6200, growth: 14.5, countries: 15 },
    { region: "Asia", revenue: 735000, volume: 4800, growth: 18.2, countries: 12 },
    { region: "Americas", revenue: 490000, volume: 3100, growth: 9.8, countries: 8 },
    { region: "Middle East", revenue: 245000, volume: 1320, growth: 22.1, countries: 7 },
  ],
  
  competitiveAnalysis: [
    { metric: "Market Share", us: 25, competitor1: 28, competitor2: 22, competitor3: 15 },
    { metric: "Revenue Growth", us: 18, competitor1: 12, competitor2: 15, competitor3: 8 },
    { metric: "Customer Satisfaction", us: 92, competitor1: 88, competitor2: 85, competitor3: 82 },
    { metric: "Product Range", us: 85, competitor1: 90, competitor2: 75, competitor3: 70 },
    { metric: "Global Presence", us: 80, competitor1: 95, competitor2: 70, competitor3: 65 },
  ],
  
  forecastData: [
    { month: "Jul", actual: 255000, forecast: 270000 },
    { month: "Aug", actual: null, forecast: 285000 },
    { month: "Sep", actual: null, forecast: 295000 },
    { month: "Oct", actual: null, forecast: 310000 },
    { month: "Nov", actual: null, forecast: 325000 },
    { month: "Dec", actual: null, forecast: 340000 },
  ],
};

const COLORS = ["#00796B", "#8BC34A", "#B3E5FC", "#FFCCBC", "#F8BBD9"];

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  
  const pageRef = useRef<HTMLDivElement>(null);
  const kpiRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);

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
      
      // KPI cards animation
      gsap.from(".kpi-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
      });
      
      // Charts animation
      gsap.from(".chart-container", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Advanced Analytics & Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive market intelligence and performance analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px] border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month" className="dark:hover:bg-gray-700">Last Month</SelectItem>
              <SelectItem value="3months" className="dark:hover:bg-gray-700">Last 3 Months</SelectItem>
              <SelectItem value="6months" className="dark:hover:bg-gray-700">Last 6 Months</SelectItem>
              <SelectItem value="1year" className="dark:hover:bg-gray-700">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div ref={kpiRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="kpi-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  ${analyticsData.kpis.totalRevenue.value.toLocaleString()}
                </div>
                <div className={`flex items-center text-sm ${
                  analyticsData.kpis.totalRevenue.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {analyticsData.kpis.totalRevenue.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {analyticsData.kpis.totalRevenue.change}%
                </div>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                analyticsData.kpis.totalRevenue.trend === "up" 
                  ? "bg-green-100 dark:bg-green-900/20" 
                  : "bg-red-100 dark:bg-red-900/20"
              }`}>
                <ArrowUpRight className={`h-6 w-6 ${
                  analyticsData.kpis.totalRevenue.trend === "up" ? "text-green-600" : "text-red-600"
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Export Volume
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {analyticsData.kpis.exportVolume.value.toLocaleString()} tons
                </div>
                <div className={`flex items-center text-sm ${
                  analyticsData.kpis.exportVolume.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {analyticsData.kpis.exportVolume.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {analyticsData.kpis.exportVolume.change}%
                </div>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                analyticsData.kpis.exportVolume.trend === "up" 
                  ? "bg-green-100 dark:bg-green-900/20" 
                  : "bg-red-100 dark:bg-red-900/20"
              }`}>
                <ArrowUpRight className={`h-6 w-6 ${
                  analyticsData.kpis.exportVolume.trend === "up" ? "text-green-600" : "text-red-600"
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Markets
            </CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {analyticsData.kpis.activeMarkets.value}
                </div>
                <div className={`flex items-center text-sm ${
                  analyticsData.kpis.activeMarkets.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {analyticsData.kpis.activeMarkets.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {analyticsData.kpis.activeMarkets.change}%
                </div>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                analyticsData.kpis.activeMarkets.trend === "up" 
                  ? "bg-green-100 dark:bg-green-900/20" 
                  : "bg-red-100 dark:bg-red-900/20"
              }`}>
                <ArrowUpRight className={`h-6 w-6 ${
                  analyticsData.kpis.activeMarkets.trend === "up" ? "text-green-600" : "text-red-600"
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Customer Retention
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">
                  {analyticsData.kpis.customerRetention.value}%
                </div>
                <div className={`flex items-center text-sm ${
                  analyticsData.kpis.customerRetention.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {analyticsData.kpis.customerRetention.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(analyticsData.kpis.customerRetention.change)}%
                </div>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                analyticsData.kpis.customerRetention.trend === "up" 
                  ? "bg-green-100 dark:bg-green-900/20" 
                  : "bg-red-100 dark:bg-red-900/20"
              }`}>
                {analyticsData.kpis.customerRetention.trend === "up" ? (
                  <ArrowUpRight className="h-6 w-6 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white dark:text-gray-300">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white dark:text-gray-300">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="regions" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white dark:text-gray-300">
            <Globe className="h-4 w-4" />
            Regions
          </TabsTrigger>
          <TabsTrigger value="competitive" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white dark:text-gray-300">
            <Target className="h-4 w-4" />
            Competitive
          </TabsTrigger>
          <TabsTrigger value="forecast" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white dark:text-gray-300">
            <TrendingUp className="h-4 w-4" />
            Forecast
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Revenue & Volume Trends</CardTitle>
                <CardDescription>Monthly performance over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData.monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue ($)"
                        stroke="#00796B"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="volume"
                        name="Volume (tons)"
                        stroke="#8BC34A"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
                <CardDescription>Active customer base expansion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="customers"
                        name="Active Customers"
                        stroke="#00796B"
                        fill="#00796B"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Revenue distribution by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.productPerformance}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {analyticsData.productPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Product Growth Rates</CardTitle>
                <CardDescription>Year-over-year growth by product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.productPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="growth" name="Growth %" fill="#00796B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details Table */}
          <Card className="chart-container mt-6">
            <CardHeader>
              <CardTitle>Detailed Product Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.productPerformance.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: COLORS[index] }} />
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {product.value}% market share
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${product.revenue.toLocaleString()}</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">{product.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regions Tab */}
        <TabsContent value="regions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Regional Revenue Distribution</CardTitle>
                <CardDescription>Revenue performance by geographic region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.regionalAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" name="Revenue ($)" fill="#00796B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="chart-container">
              <CardHeader>
                <CardTitle>Regional Growth Rates</CardTitle>
                <CardDescription>Year-over-year growth by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.regionalAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="growth" name="Growth %" fill="#8BC34A" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regional Details */}
          <Card className="chart-container mt-6">
            <CardHeader>
              <CardTitle>Regional Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analyticsData.regionalAnalysis.map((region) => (
                  <div key={region.region} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {region.region}
                      </h4>
                      <Badge variant="outline">{region.countries} countries</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Revenue:</span>
                        <span className="font-medium">${region.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Volume:</span>
                        <span className="font-medium">{region.volume.toLocaleString()} tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Growth:</span>
                        <span className="font-medium text-green-600">+{region.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitive Tab */}
        <TabsContent value="competitive">
          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Competitive Analysis</CardTitle>
              <CardDescription>Performance comparison with key competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={analyticsData.competitiveAnalysis}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Our Company"
                      dataKey="us"
                      stroke="#00796B"
                      fill="#00796B"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Competitor 1"
                      dataKey="competitor1"
                      stroke="#8BC34A"
                      fill="#8BC34A"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Competitor 2"
                      dataKey="competitor2"
                      stroke="#B3E5FC"
                      fill="#B3E5FC"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast">
          <Card className="chart-container">
            <CardHeader>
              <CardTitle>Revenue Forecast</CardTitle>
              <CardDescription>Predictive analytics for the next 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      name="Actual Revenue"
                      stroke="#00796B"
                      strokeWidth={2}
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      name="Forecasted Revenue"
                      stroke="#8BC34A"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Generation Section */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Report Generation
          </CardTitle>
          <CardDescription>
            Generate comprehensive analytics reports in multiple formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-4">
              <h4 className="font-medium">Report Type</h4>
              <Select defaultValue="performance">
                <SelectTrigger className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance" className="dark:hover:bg-gray-700">Performance Report</SelectItem>
                  <SelectItem value="market" className="dark:hover:bg-gray-700">Market Analysis</SelectItem>
                  <SelectItem value="financial" className="dark:hover:bg-gray-700">Financial Report</SelectItem>
                  <SelectItem value="competitive" className="dark:hover:bg-gray-700">Competitive Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Format</h4>
              <Select defaultValue="pdf">
                <SelectTrigger className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf" className="dark:hover:bg-gray-700">PDF Report</SelectItem>
                  <SelectItem value="excel" className="dark:hover:bg-gray-700">Excel Spreadsheet</SelectItem>
                  <SelectItem value="powerpoint" className="dark:hover:bg-gray-700">PowerPoint Presentation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Actions</h4>
              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Generate
                </Button>
                <Button variant="outline" className="border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}