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
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Wallet,
  CreditCard,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sample financial data
const financialData = {
  overview: {
    totalRevenue: { value: 2450000, change: 12.5, trend: "up" },
    totalExpenses: { value: 1850000, change: -3.2, trend: "down" },
    netProfit: { value: 600000, change: 18.7, trend: "up" },
    cashFlow: { value: 450000, change: 8.3, trend: "up" },
  },
  
  monthlyData: [
    { month: "Jan", revenue: 180000, expenses: 140000, profit: 40000 },
    { month: "Feb", revenue: 195000, expenses: 145000, profit: 50000 },
    { month: "Mar", revenue: 210000, expenses: 150000, profit: 60000 },
    { month: "Apr", revenue: 225000, expenses: 155000, profit: 70000 },
    { month: "May", revenue: 240000, expenses: 160000, profit: 80000 },
    { month: "Jun", revenue: 255000, expenses: 165000, profit: 90000 },
  ],
  
  expenseBreakdown: [
    { name: "Production", value: 45, amount: 832500 },
    { name: "Marketing", value: 20, amount: 370000 },
    { name: "Operations", value: 15, amount: 277500 },
    { name: "Logistics", value: 12, amount: 222000 },
    { name: "Other", value: 8, amount: 148000 },
  ],
  
  cashFlowData: [
    { month: "Jan", inflow: 200000, outflow: 160000, net: 40000 },
    { month: "Feb", inflow: 215000, outflow: 165000, net: 50000 },
    { month: "Mar", inflow: 230000, outflow: 170000, net: 60000 },
    { month: "Apr", inflow: 245000, outflow: 175000, net: 70000 },
    { month: "May", inflow: 260000, outflow: 180000, net: 80000 },
    { month: "Jun", inflow: 275000, outflow: 185000, net: 90000 },
  ],
  
  budgetComparison: [
    { category: "Production", budgeted: 850000, actual: 832500, variance: -17500 },
    { category: "Marketing", budgeted: 350000, actual: 370000, variance: 20000 },
    { category: "Operations", budgeted: 280000, actual: 277500, variance: -2500 },
    { category: "Logistics", budgeted: 230000, actual: 222000, variance: -8000 },
  ],
};

const COLORS = ["#00796B", "#8BC34A", "#B3E5FC", "#FFCCBC", "#F8BBD9"];

export default function FinancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
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
    <div ref={pageRef} className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Financial Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive financial overview and analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectItem value="1month" className="dark:hover:bg-gray-700">Last Month</SelectItem>
              <SelectItem value="3months" className="dark:hover:bg-gray-700">Last 3 Months</SelectItem>
              <SelectItem value="6months" className="dark:hover:bg-gray-700">Last 6 Months</SelectItem>
              <SelectItem value="1year" className="dark:hover:bg-gray-700">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div ref={kpiRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="kpi-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${financialData.overview.totalRevenue.value.toLocaleString()}
                </div>
                <div className={`flex items-center text-sm ${
                  financialData.overview.totalRevenue.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}>
                  {financialData.overview.totalRevenue.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {financialData.overview.totalRevenue.change}%
                </div>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                financialData.overview.totalRevenue.trend === "up" 
                  ? "bg-green-100 dark:bg-green-900/20" 
                  : "bg-red-100 dark:bg-red-900/20"
              }`}>
                <ArrowUpRight className={`h-6 w-6 ${
                  financialData.overview.totalRevenue.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Expenses
            </CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${financialData.overview.totalExpenses.value.toLocaleString()}
                </div>
                <div className={`flex items-center text-sm ${
                  financialData.overview.totalExpenses.trend === "down" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}>
                  {financialData.overview.totalExpenses.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(financialData.overview.totalExpenses.change)}%
                </div>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                financialData.overview.totalExpenses.trend === "down" 
                  ? "bg-green-100 dark:bg-green-900/20" 
                  : "bg-red-100 dark:bg-red-900/20"
              }`}>
                <ArrowDownRight className={`h-6 w-6 ${
                  financialData.overview.totalExpenses.trend === "down" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Net Profit
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${financialData.overview.netProfit.value.toLocaleString()}
                </div>
                <div className={`flex items-center text-sm ${
                  financialData.overview.netProfit.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}>
                  {financialData.overview.netProfit.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {financialData.overview.netProfit.change}%
                </div>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                financialData.overview.netProfit.trend === "up" 
                  ? "bg-green-100 dark:bg-green-900/20" 
                  : "bg-red-100 dark:bg-red-900/20"
              }`}>
                <ArrowUpRight className={`h-6 w-6 ${
                  financialData.overview.netProfit.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Cash Flow
            </CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${financialData.overview.cashFlow.value.toLocaleString()}
                </div>
                <div className={`flex items-center text-sm ${
                  financialData.overview.cashFlow.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`}>
                  {financialData.overview.cashFlow.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {financialData.overview.cashFlow.change}%
                </div>
              </div>
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                financialData.overview.cashFlow.trend === "up" 
                  ? "bg-green-100 dark:bg-green-900/20" 
                  : "bg-red-100 dark:bg-red-900/20"
              }`}>
                <ArrowUpRight className={`h-6 w-6 ${
                  financialData.overview.cashFlow.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <DollarSign className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <Wallet className="h-4 w-4" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="cashflow" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <CreditCard className="h-4 w-4" />
            Cash Flow
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
            <PiggyBank className="h-4 w-4" />
            Budget
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Revenue & Profit Trends</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Monthly financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={financialData.monthlyData}>
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
                        dataKey="revenue"
                        name="Revenue"
                        stroke="#00796B"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        name="Profit"
                        stroke="#8BC34A"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Monthly Comparison</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Revenue vs Expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData.monthlyData}>
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
                      <Bar dataKey="revenue" name="Revenue" fill="#00796B" />
                      <Bar dataKey="expenses" name="Expenses" fill="#8BC34A" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Expense Breakdown</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={financialData.expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {financialData.expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                          color: 'var(--foreground)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Expense Details</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Breakdown by amount</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialData.expenseBreakdown.map((expense, index) => (
                    <div key={expense.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: COLORS[index] }} />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{expense.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {expense.value}% of total expenses
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">${expense.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cash Flow Tab */}
        <TabsContent value="cashflow">
          <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Cash Flow Analysis</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Monthly cash inflow and outflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={financialData.cashFlowData}>
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
                    <Area
                      type="monotone"
                      dataKey="inflow"
                      stackId="1"
                      name="Cash Inflow"
                      stroke="#00796B"
                      fill="#00796B"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="outflow"
                      stackId="2"
                      name="Cash Outflow"
                      stroke="#8BC34A"
                      fill="#8BC34A"
                      fillOpacity={0.6}
                    />
                    <Line
                      type="monotone"
                      dataKey="net"
                      name="Net Cash Flow"
                      stroke="#B3E5FC"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget">
          <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Budget vs Actual</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Performance against budget</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialData.budgetComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                      <XAxis dataKey="category" stroke="#6b7280" className="dark:stroke-gray-400" />
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
                      <Bar dataKey="budgeted" name="Budgeted" fill="#00796B" />
                      <Bar dataKey="actual" name="Actual" fill="#8BC34A" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {financialData.budgetComparison.map((item) => (
                    <div key={item.category} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{item.category}</h4>
                        <div className="flex items-center gap-1">
                          {item.variance < 0 ? (
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          )}
                          <span className={`text-sm font-medium ${
                            item.variance < 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                          }`}>
                            {item.variance < 0 ? "Under" : "Over"} Budget
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Budgeted:</span>
                          <span className="font-medium text-gray-900 dark:text-white">${item.budgeted.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Actual:</span>
                          <span className="font-medium text-gray-900 dark:text-white">${item.actual.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Variance:</span>
                          <span className={`font-medium ${
                            item.variance < 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                          }`}>
                            ${Math.abs(item.variance).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}