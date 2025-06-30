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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Calendar,
  BarChart2,
  PieChart,
  Activity,
  Globe,
  Users,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const competitors = [
  {
    id: 1,
    name: "AgriGlobal Corp",
    logo: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
    marketShare: 28,
    revenue: "1.2B",
    growth: 12.5,
    threatLevel: "high",
    region: "Global",
    segment: "Enterprise",
    recentActivity: [
      { date: "2025-03-15", event: "Launched new export platform" },
      { date: "2025-03-10", event: "Expanded to South American market" },
      { date: "2025-03-01", event: "Quarterly revenue up 15%" },
    ],
  },
  {
    id: 2,
    name: "FarmTech Solutions",
    logo: "https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg",
    marketShare: 22,
    revenue: "850M",
    growth: -2.3,
    threatLevel: "medium",
    region: "North America",
    segment: "Mid-Market",
    recentActivity: [
      { date: "2025-03-12", event: "Released sustainability report" },
      { date: "2025-03-05", event: "New partnership announcement" },
      { date: "2025-02-28", event: "Product line expansion" },
    ],
  },
  {
    id: 3,
    name: "EcoHarvest Inc",
    logo: "https://images.pexels.com/photos/2382904/pexels-photo-2382904.jpeg",
    marketShare: 18,
    revenue: "620M",
    growth: 8.7,
    threatLevel: "medium",
    region: "Europe",
    segment: "Enterprise",
    recentActivity: [
      { date: "2025-03-14", event: "Acquired regional distributor" },
      { date: "2025-03-08", event: "Launched organic certification program" },
      { date: "2025-03-02", event: "Opened new logistics center" },
    ],
  },
  {
    id: 4,
    name: "AgroTrade Plus",
    logo: "https://images.pexels.com/photos/1112014/pexels-photo-1112014.jpeg",
    marketShare: 15,
    revenue: "450M",
    growth: 15.2,
    threatLevel: "low",
    region: "Asia",
    segment: "Mid-Market",
    recentActivity: [
      { date: "2025-03-13", event: "Digital transformation initiative" },
      { date: "2025-03-07", event: "Market expansion plans announced" },
      { date: "2025-03-03", event: "New CEO appointment" },
    ],
  },
];

const performanceData = [
  { metric: "Market Share", us: 25, competitor1: 28, competitor2: 22 },
  { metric: "Revenue Growth", us: 18, competitor1: 12.5, competitor2: -2.3 },
  { metric: "Customer Satisfaction", us: 92, competitor1: 88, competitor2: 85 },
  { metric: "Product Range", us: 85, competitor1: 90, competitor2: 75 },
  { metric: "Global Presence", us: 80, competitor1: 95, competitor2: 70 },
];

const marketTrendsData = [
  { month: "Jan", us: 82, competitor1: 85, competitor2: 78 },
  { month: "Feb", us: 84, competitor1: 83, competitor2: 80 },
  { month: "Mar", us: 86, competitor1: 84, competitor2: 79 },
  { month: "Apr", us: 89, competitor1: 86, competitor2: 82 },
  { month: "May", us: 88, competitor1: 85, competitor2: 83 },
  { month: "Jun", us: 90, competitor1: 87, competitor2: 85 },
];

export default function Competitors() {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".competitor-card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.from(".chart-container", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const filteredCompetitors = competitors.filter(competitor => {
    const matchesRegion = selectedRegion === "all" || competitor.region === selectedRegion;
    const matchesSegment = selectedSegment === "all" || competitor.segment === selectedSegment;
    const matchesSearch = competitor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSegment && matchesSearch;
  });

  return (
    <div ref={pageRef} className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Competitor Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and analyze your competitors' performance and market position
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-none shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search competitors..."
                  className="pl-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all" className="dark:hover:bg-gray-700">All Regions</SelectItem>
                <SelectItem value="Global" className="dark:hover:bg-gray-700">Global</SelectItem>
                <SelectItem value="North America" className="dark:hover:bg-gray-700">North America</SelectItem>
                <SelectItem value="Europe" className="dark:hover:bg-gray-700">Europe</SelectItem>
                <SelectItem value="Asia" className="dark:hover:bg-gray-700">Asia</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Select segment" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <SelectItem value="all" className="dark:hover:bg-gray-700">All Segments</SelectItem>
                <SelectItem value="Enterprise" className="dark:hover:bg-gray-700">Enterprise</SelectItem>
                <SelectItem value="Mid-Market" className="dark:hover:bg-gray-700">Mid-Market</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCompetitors.map((competitor) => (
          <Card key={competitor.id} className="competitor-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src={competitor.logo}
                      alt={competitor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">{competitor.name}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">{competitor.region}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    competitor.threatLevel === "high"
                      ? "destructive"
                      : competitor.threatLevel === "medium"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {competitor.threatLevel}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Market Share</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{competitor.marketShare}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">${competitor.revenue}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Growth</p>
                  <div className={`flex items-center ${
                    competitor.growth > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}>
                    {competitor.growth > 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {Math.abs(competitor.growth)}%
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2 text-gray-900 dark:text-white">Recent Activity</p>
                <div className="space-y-2">
                  {competitor.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">{activity.event}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Comparison */}
        <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Performance Comparison</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Key metrics comparison with top competitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-600" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#6b7280' }} />
                  <PolarRadiusAxis tick={{ fill: '#6b7280' }} />
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

        {/* Market Trends */}
        <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Market Trends</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Performance trends over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                  <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-400" />
                  <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      color: 'var(--foreground)'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="us"
                    name="Our Company"
                    stroke="#00796B"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="competitor1"
                    name="Competitor 1"
                    stroke="#8BC34A"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="competitor2"
                    name="Competitor 2"
                    stroke="#B3E5FC"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Markets
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Active Competitors
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Market Size
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">$8.2B</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Growth Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">+12.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}