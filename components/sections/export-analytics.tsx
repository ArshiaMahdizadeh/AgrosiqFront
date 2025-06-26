"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sample data for export analytics
const exportData = {
  "Pistachio": {
    price: 14.5,
    trend: "up",
    percentage: 3.2,
    pieData: [
      { name: "EU", value: 45 },
      { name: "Asia", value: 25 },
      { name: "Americas", value: 20 },
      { name: "Others", value: 10 },
    ],
    barData: [
      { month: "Jan", export: 420 },
      { month: "Feb", export: 380 },
      { month: "Mar", export: 450 },
      { month: "Apr", export: 520 },
      { month: "May", export: 490 },
      { month: "Jun", export: 550 },
    ],
    timestamp: "Updated 5 min ago",
  },
  "Saffron": {
    price: 1250.8,
    trend: "up",
    percentage: 5.7,
    pieData: [
      { name: "EU", value: 35 },
      { name: "Asia", value: 40 },
      { name: "Americas", value: 15 },
      { name: "Others", value: 10 },
    ],
    barData: [
      { month: "Jan", export: 25 },
      { month: "Feb", export: 32 },
      { month: "Mar", export: 30 },
      { month: "Apr", export: 35 },
      { month: "May", export: 40 },
      { month: "Jun", export: 42 },
    ],
    timestamp: "Updated 10 min ago",
  },
  "Dates": {
    price: 7.2,
    trend: "down",
    percentage: 1.3,
    pieData: [
      { name: "EU", value: 20 },
      { name: "Asia", value: 50 },
      { name: "Americas", value: 15 },
      { name: "Others", value: 15 },
    ],
    barData: [
      { month: "Jan", export: 320 },
      { month: "Feb", export: 350 },
      { month: "Mar", export: 310 },
      { month: "Apr", export: 290 },
      { month: "May", export: 280 },
      { month: "Jun", export: 270 },
    ],
    timestamp: "Updated 8 min ago",
  },
  "Citrus": {
    price: 4.8,
    trend: "up",
    percentage: 2.1,
    pieData: [
      { name: "EU", value: 40 },
      { name: "Asia", value: 30 },
      { name: "Americas", value: 25 },
      { name: "Others", value: 5 },
    ],
    barData: [
      { month: "Jan", export: 520 },
      { month: "Feb", export: 480 },
      { month: "Mar", export: 510 },
      { month: "Apr", export: 550 },
      { month: "May", export: 590 },
      { month: "Jun", export: 620 },
    ],
    timestamp: "Updated 3 min ago",
  },
};

// Colors for the pie chart
const COLORS = ["#00796B", "#8BC34A", "#B3E5FC", "#FFCCBC"];

export default function ExportAnalytics() {
  const [selectedProduct, setSelectedProduct] = useState("Pistachio");
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  
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
      
      // Staggered animation for chart and price card
      gsap.from([chartRef.current, priceRef.current], {
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

  const productData = exportData[selectedProduct as keyof typeof exportData];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Export Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track market demand, price trends, and export performance for your
            agricultural products across global markets.
          </p>
        </div>

        <div className="mb-8">
        <Select
  value={selectedProduct}
  onValueChange={setSelectedProduct}
>
  <SelectTrigger 
    className="w-full md:w-[280px] mx-auto bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
    aria-label="Select agricultural product for analytics"
  >
    <SelectValue 
      placeholder="Select a product" 
      className="dark:text-white"
    />
  </SelectTrigger>
  <SelectContent 
    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    position="popper"
  >
    {["Pistachio", "Saffron", "Dates", "Citrus"].map((product) => (
      <SelectItem 
        key={product}
        value={product}
        className="
          hover:bg-gray-100 dark:hover:bg-gray-700 
          focus:bg-gray-100 dark:focus:bg-gray-700 
          dark:text-gray-200
          data-[state=checked]:bg-gray-100 dark:data-[state=checked]:bg-gray-700
        "
        aria-label={`${product} product analytics`}
      >
        {product}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Combined Chart */}
          <div ref={chartRef} className="lg:col-span-2">
            <Card className="shadow-md h-full">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{selectedProduct} Export Data</span>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {productData.timestamp}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Monthly export volume and market distribution
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/3 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productData.barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(31, 41, 55, 0.75)',
                          border: '1px solid #4B5563',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                        itemStyle={{
                          color: '#F9FAFB',
                        }}
                        labelStyle={{
                          color: '#F9FAFB',
                        }}
                      />
                      <Bar dataKey="export" fill="#00796B" name="Export (tons)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/3 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productData.pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {productData.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(31, 41, 55, 0.75)',
                          border: '1px solid #4B5563',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                        itemStyle={{
                          color: '#F9FAFB',
                        }}
                        labelStyle={{
                          color: '#F9FAFB',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Price */}
          <div ref={priceRef} className="lg:col-span-1">
            <Card className="shadow-md h-full">
              <CardHeader>
                <CardTitle>Real-time Price</CardTitle>
                <CardDescription>
                  Current market price and trend analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    ${productData.price}
                    <span className="text-lg font-normal text-gray-600 dark:text-gray-400">
                      /kg
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    {productData.trend === "up" ? (
                      <>
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <span className="text-green-600 font-medium">
                          +{productData.percentage}% this month
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-5 w-5 text-red-600" />
                        <span className="text-red-600 font-medium">
                          -{productData.percentage}% this month
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="w-full p-4 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Market Insight</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedProduct} demand is {productData.trend === "up" ? "increasing" : "decreasing"} in major markets. 
                    Consider {productData.trend === "up" ? "expanding" : "diversifying"} your export strategy.
                  </p>
                </div>

                <Button variant="outline" className="w-full dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200">View Detailed Report</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}