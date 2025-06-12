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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search as SearchIcon,
  Filter,
  Star,
  Clock,
  TrendingUp,
  Save,
  Download,
  Package,
  Users,
  LineChart,
  FileText,
  Building2,
  Globe,
  ChevronDown,
  ChevronUp,
  Loader2,
  History,
  Bookmark,
  BarChart2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sample search results data
const searchResults = [
  {
    id: 1,
    type: "product",
    title: "Premium Saffron",
    category: "Products",
    relevance: 98,
    timestamp: "2025-03-15",
    tags: ["Spices", "Premium", "Export"],
    description: "High-quality Persian saffron with premium grade certification",
    icon: Package,
  },
  {
    id: 2,
    type: "competitor",
    title: "AgriGlobal Corp",
    category: "Competitors",
    relevance: 95,
    timestamp: "2025-03-14",
    tags: ["Enterprise", "Global"],
    description: "Major competitor in agricultural exports market",
    icon: Users,
  },
  {
    id: 3,
    type: "market",
    title: "European Market Analysis",
    category: "Markets",
    relevance: 92,
    timestamp: "2025-03-13",
    tags: ["Europe", "Analysis", "Trends"],
    description: "Comprehensive analysis of European agricultural market trends",
    icon: Globe,
  },
  {
    id: 4,
    type: "report",
    title: "Q1 2025 Export Report",
    category: "Reports",
    relevance: 88,
    timestamp: "2025-03-12",
    tags: ["Quarterly", "Financial"],
    description: "Detailed export performance report for Q1 2025",
    icon: FileText,
  },
  {
    id: 5,
    type: "opportunity",
    title: "New Market Opportunity",
    category: "Opportunities",
    relevance: 85,
    timestamp: "2025-03-11",
    tags: ["Growth", "Strategic"],
    description: "Emerging market opportunity in Southeast Asia",
    icon: TrendingUp,
  },
];

// Sample search history
const searchHistory = [
  { query: "market analysis europe", timestamp: "2025-03-15 14:30" },
  { query: "competitor pricing strategy", timestamp: "2025-03-14 16:45" },
  { query: "export regulations 2025", timestamp: "2025-03-13 09:15" },
];

// Sample saved searches
const savedSearches = [
  { name: "European Markets", query: "market europe trends", filters: "Markets, Last 3 months" },
  { name: "Competitor Analysis", query: "competitor analysis global", filters: "Competitors, Active" },
  { name: "Export Reports", query: "export reports quarterly", filters: "Reports, 2025" },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [dateRange, setDateRange] = useState("all");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"results" | "analytics">("results");
  
  const pageRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Search bar animation
      gsap.from(searchRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
      
      // Results animation
      gsap.from(".search-result", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: resultsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, pageRef);
    
    return () => ctx.revert();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div ref={pageRef} className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Advanced Search
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Search across products, markets, competitors, and more
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            Saved
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <Card ref={searchRef} className="border-none shadow-md">
        <CardContent className="p-4 space-y-4">
          {/* Main Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products, markets, competitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-primary hover:bg-primary-600"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Products
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Markets
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Competitors
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
              Reports
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Advanced Filters
              {showAdvancedFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="markets">Markets</SelectItem>
                    <SelectItem value="competitors">Competitors</SelectItem>
                    <SelectItem value="reports">Reports</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price Range</Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="verified">Verified Only</Label>
                  <Switch
                    id="verified"
                    checked={showVerifiedOnly}
                    onCheckedChange={setShowVerifiedOnly}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="trending">Trending Only</Label>
                  <Switch
                    id="trending"
                    checked={showTrendingOnly}
                    onCheckedChange={setShowTrendingOnly}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Tabs */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800">
        <Button
          variant={activeTab === "results" ? "default" : "ghost"}
          onClick={() => setActiveTab("results")}
          className={activeTab === "results" ? "bg-primary text-white" : ""}
        >
          Search Results
        </Button>
        <Button
          variant={activeTab === "analytics" ? "default" : "ghost"}
          onClick={() => setActiveTab("analytics")}
          className={activeTab === "analytics" ? "bg-primary text-white" : ""}
        >
          Search Analytics
        </Button>
      </div>

      {activeTab === "results" ? (
        /* Search Results */
        <div ref={resultsRef} className="space-y-4">
          {searchResults.map((result) => (
            <Card key={result.id} className="search-result hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <result.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {result.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {result.relevance}%
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <Badge variant="secondary">{result.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        {result.timestamp}
                      </div>
                      <div className="flex gap-2">
                        {result.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Search Analytics */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary" />
                Search Performance
              </CardTitle>
              <CardDescription>
                Analytics and insights from your search patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Most Searched Categories</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Products</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "75%" }} />
                        </div>
                        <span className="text-sm">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Markets</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "60%" }} />
                        </div>
                        <span className="text-sm">60%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Competitors</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: "45%" }} />
                        </div>
                        <span className="text-sm">45%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Recent Search History</h4>
                  <div className="space-y-2">
                    {searchHistory.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.query}</span>
                        <span className="text-xs text-gray-500">{item.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Saved Searches</h4>
                  <div className="space-y-2">
                    {savedSearches.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <span className="text-sm font-medium">{item.name}</span>
                          <p className="text-xs text-gray-500">{item.filters}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <SearchIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Search Trends
              </CardTitle>
              <CardDescription>
                Trending topics and search patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Trending Searches</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span>European market analysis</span>
                      <Badge variant="outline" className="ml-auto">+45%</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span>Organic certification</span>
                      <Badge variant="outline" className="ml-auto">+32%</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span>Export regulations</span>
                      <Badge variant="outline" className="ml-auto">+28%</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Popular Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Last 30 days</Badge>
                    <Badge variant="secondary">Verified only</Badge>
                    <Badge variant="secondary">Europe</Badge>
                    <Badge variant="secondary">Premium</Badge>
                    <Badge variant="secondary">Reports</Badge>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium mb-2">Search Quality</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Relevance Score</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: "92%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Response Time</span>
                        <span className="font-medium">0.8s</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: "85%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}