"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
} from "lucide-react";
import gsap from "gsap";

const revenueData = [
  { month: "Jan", actual: 45000, budget: 42000 },
  { month: "Feb", actual: 52000, budget: 45000 },
  { month: "Mar", actual: 49000, budget: 48000 },
  { month: "Apr", actual: 58000, budget: 50000 },
  { month: "May", actual: 55000, budget: 52000 },
  { month: "Jun", actual: 62000, budget: 55000 },
];

const inventoryData = {
  total: 1250,
  outOfStock: 12,
  lowStock: 28,
  value: 185000,
  capacity: 75,
  categories: [
    { name: "Spices", value: 35 },
    { name: "Nuts", value: 45 },
    { name: "Oils", value: 20 },
  ],
};

export default function Dashboard() {
  const [user, setUser] = useState<{ full_name: string; email: string; avatar_url: string } | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dashboard-card", {
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

  return (
    <div ref={pageRef} className="space-y-8 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.full_name || "User"}
          </p>
        </div>
        <Select defaultValue="thisMonth">
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectItem value="thisMonth" className="dark:hover:bg-gray-700">
              This Month
            </SelectItem>
            <SelectItem value="lastMonth" className="dark:hover:bg-gray-700">
              Last Month
            </SelectItem>
            <SelectItem value="sixMonths" className="dark:hover:bg-gray-700">
              Last 6 Months
            </SelectItem>
            <SelectItem value="year" className="dark:hover:bg-gray-700">
              This Year
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Financial KPIs */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Revenue",
            icon: <DollarSign className="h-4 w-4 text-primary" />,
            amount: "$62,000",
            trend: "+12.5%",
            trendIcon: <ArrowUpRight className="h-6 w-6 text-primary" />,
            color: "text-green-600 dark:text-green-400",
          },
          {
            title: "Net Profit",
            icon: <PiggyBank className="h-4 w-4 text-primary" />,
            amount: "$18,600",
            trend: "+8.2%",
            trendIcon: <ArrowUpRight className="h-6 w-6 text-primary" />,
            color: "text-green-600 dark:text-green-400",
          },
          {
            title: "Expenses",
            icon: <Wallet className="h-4 w-4 text-primary" />,
            amount: "$43,400",
            trend: "-2.4%",
            trendIcon: <ArrowDownRight className="h-6 w-6 text-red-600 dark:text-red-400" />,
            color: "text-red-600 dark:text-red-400",
          },
          {
            title: "Cash Flow",
            icon: <DollarSign className="h-4 w-4 text-primary" />,
            amount: "$24,800",
            trend: "+5.8%",
            trendIcon: <ArrowUpRight className="h-6 w-6 text-primary" />,
            color: "text-green-600 dark:text-green-400",
          },
        ].map((kpi, idx) => (
          <Card key={idx} className="dashboard-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {kpi.title}
              </CardTitle>
              {kpi.icon}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.amount}</div>
                  <div className={`flex items-center text-sm ${kpi.color}`}>
                    {kpi.trendIcon}
                    <span className="ml-1">{kpi.trend}</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                  {kpi.trendIcon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Revenue vs Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                  <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-400" />
                  <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                  <Tooltip contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--foreground)'
                  }} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" name="Actual Revenue" stroke="#00796B" strokeWidth={2} />
                  <Line type="monotone" dataKey="budget" name="Budget" stroke="#8BC34A" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                  <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-400" />
                  <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(31, 41, 55, 0.75)',
                      border: '1px solid #4B5563',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    itemStyle={{ color: '#F9FAFB' }}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Legend />
                  <Bar dataKey="actual" name="Revenue" fill="#00796B" />
                  <Bar dataKey="budget" name="Budget" fill="#8BC34A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="dashboard-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <AlertCircle className="h-5 w-5 text-primary" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                  Low Stock Alert
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Pistachio stock is below reorder point
                </p>
              </div>
              <Badge variant="outline" className="ml-auto border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300">
                Inventory
              </Badge>
            </div>

            <div className="flex items-center gap-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Revenue Increase
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Revenue has increased 12% compared to last month
                </p>
              </div>
              <Badge variant="outline" className="ml-auto border-green-300 dark:border-green-700 text-green-700 dark:text-green-300">
                Finance
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
