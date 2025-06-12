"use client";

import { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, TrendingUp, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sample data
const priceData = {
  "1M": [
    { name: "Week 1", price: 1420, demand: 240 },
    { name: "Week 2", price: 1450, demand: 255 },
    { name: "Week 3", price: 1480, demand: 275 },
    { name: "Week 4", price: 1500, demand: 290 },
  ],
  "3M": [
    { name: "Jan", price: 1400, demand: 230 },
    { name: "Feb", price: 1450, demand: 250 },
    { name: "Mar", price: 1500, demand: 290 },
  ],
  "6M": [
    { name: "Jan", price: 1350, demand: 220 },
    { name: "Feb", price: 1400, demand: 240 },
    { name: "Mar", price: 1450, demand: 260 },
    { name: "Apr", price: 1470, demand: 280 },
    { name: "May", price: 1490, demand: 285 },
    { name: "Jun", price: 1510, demand: 295 },
  ],
  "1Y": [
    { name: "Q1", price: 1320, demand: 210 },
    { name: "Q2", price: 1380, demand: 240 },
    { name: "Q3", price: 1450, demand: 260 },
    { name: "Q4", price: 1510, demand: 290 },
  ],
};

const highDemandRegions = [
  { 
    region: "European Union", 
    status: "High", 
    change: 8.2,
    products: ["Pistachio", "Saffron"] 
  },
  { 
    region: "Middle East", 
    status: "Medium", 
    change: 4.5,
    products: ["Dates", "Pistachio"] 
  },
  { 
    region: "East Asia", 
    status: "Very High", 
    change: 12.3,
    products: ["Saffron", "Citrus"] 
  },
  { 
    region: "North America", 
    status: "Medium", 
    change: 3.1,
    products: ["Pistachio", "Dates"] 
  },
];

export default function DashboardPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const regionsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
      
      // Chart and regions staggered animation
      gsap.from([chartRef.current, regionsRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Market Intelligence Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real-time agricultural export analytics and forecasting to help you make
            data-driven decisions for your exports.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart Section */}
          <Card ref={chartRef} className="shadow-md overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold flex justify-between items-center">
                <span>Price & Demand Trends</span>
                <Badge variant="outline" className="font-normal">Live Data</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="1M">
              <TabsList className="grid grid-cols-4 mb-6 bg-gray-100 dark:bg-gray-800">
  <TabsTrigger 
    value="1M"
    className="data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white dark:text-gray-300"
  >
    1M
  </TabsTrigger>
  <TabsTrigger 
    value="3M"
    className="data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white dark:text-gray-300"
  >
    3M
  </TabsTrigger>
  <TabsTrigger 
    value="6M"
    className="data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white dark:text-gray-300"
  >
    6M
  </TabsTrigger>
  <TabsTrigger 
    value="1Y"
    className="data-[state=active]:bg-white data-[state=active]:text-primary dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white dark:text-gray-300"
  >
    1Y
  </TabsTrigger>
</TabsList>
                
                {Object.entries(priceData).map(([period, data]) => (
                  <TabsContent key={period} value={period} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#00796B" />
                        <YAxis yAxisId="right" orientation="right" stroke="#8BC34A" />
                        <Tooltip />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="price"
                          name="Price ($/ton)"
                          stroke="#00796B"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="demand"
                          name="Demand (tons)"
                          stroke="#8BC34A"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* High Demand Regions */}
          <Card ref={regionsRef} className="shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold">
                High-Demand Regions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highDemandRegions.map((region, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {region.region}
                        </h4>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          {region.products.map((product, pIdx) => (
                            <Badge key={pIdx} variant="outline" className="text-xs bg-secondary/10 text-secondary-700 dark:text-secondary-300 border-secondary-200">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${
                          region.status === "Very High"
                            ? "bg-accent-700 text-white"
                            : region.status === "High"
                            ? "bg-primary text-white"
                            : "bg-secondary text-white"
                        }`}
                      >
                        {region.status}
                      </Badge>
                      <div className="flex items-center gap-1 mt-2 justify-end">
                        {region.change > 0 ? (
                          <ArrowUp className="h-3 w-3 text-green-600" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-red-600" />
                        )}
                        <span className={`text-xs font-medium ${
                          region.change > 0 ? "text-green-600" : "text-red-600"
                        }`}>
                          {region.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}