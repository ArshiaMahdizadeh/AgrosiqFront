"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sample data for the product charts
const productData = {
  "Pistachio": {
    price: 14.5,
    trend: "up",
    percentage: 3.2,
    chartData: [
      { month: "Jan", price: 13.2 },
      { month: "Feb", price: 13.5 },
      { month: "Mar", price: 13.8 },
      { month: "Apr", price: 14.0 },
      { month: "May", price: 14.2 },
      { month: "Jun", price: 14.5 },
    ],
    certifications: ["Organic", "Non-GMO"],
    origin: "California, USA",
  },
  "Saffron": {
    price: 1250.8,
    trend: "up",
    percentage: 5.7,
    chartData: [
      { month: "Jan", price: 1150.0 },
      { month: "Feb", price: 1180.5 },
      { month: "Mar", price: 1200.0 },
      { month: "Apr", price: 1220.3 },
      { month: "May", price: 1235.0 },
      { month: "Jun", price: 1250.8 },
    ],
    certifications: ["Premium", "Direct Trade"],
    origin: "Granada, Spain",
  },
  "Dates": {
    price: 7.2,
    trend: "down",
    percentage: 1.3,
    chartData: [
      { month: "Jan", price: 7.5 },
      { month: "Feb", price: 7.6 },
      { month: "Mar", price: 7.4 },
      { month: "Apr", price: 7.3 },
      { month: "May", price: 7.2 },
      { month: "Jun", price: 7.2 },
    ],
    certifications: ["Organic"],
    origin: "Medina, Saudi Arabia",
  },
  "Citrus": {
    price: 4.8,
    trend: "up",
    percentage: 2.1,
    chartData: [
      { month: "Jan", price: 4.5 },
      { month: "Feb", price: 4.5 },
      { month: "Mar", price: 4.6 },
      { month: "Apr", price: 4.7 },
      { month: "May", price: 4.7 },
      { month: "Jun", price: 4.8 },
    ],
    certifications: ["Fresh", "Pesticide-Free"],
    origin: "Valencia, Spain",
  },
};

const products = Object.keys(productData);

export default function ProductCharts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.from(".section-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      
      // Staggered cards animation
      gsap.from(".product-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 section-title">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Real-Time Product Charts
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Monitor live market trends and price fluctuations for key agricultural
            products across global markets.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => {
            const data = productData[product as keyof typeof productData];
            
            return (
              <Card key={product} className="shadow-md product-card">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-semibold">{product}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>Origin: {data.origin}</span>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-bold">
                        ${data.price}
                        <span className="text-sm font-normal text-gray-600 dark:text-gray-400">
                          /kg
                        </span>
                      </span>
                      <div className="flex items-center mt-1">
                        {data.trend === "up" ? (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-sm text-green-600">+{data.percentage}%</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                            <span className="text-sm text-red-600">-{data.percentage}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <div className="h-[180px] mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={data.chartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor={data.trend === "up" ? "#00796B" : "#e53935"}
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor={data.trend === "up" ? "#00796B" : "#e53935"}
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke={data.trend === "up" ? "#00796B" : "#e53935"}
                          fillOpacity={1}
                          fill={`url(#color${index})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center pt-0">
                  <div className="flex gap-2">
                    {data.certifications.map((cert, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                  <Button 
  variant="outline" 
  size="sm" 
  className="text-xs border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
>
  <ExternalLink className="h-3 w-3 mr-1" /> 
  More Details
</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}