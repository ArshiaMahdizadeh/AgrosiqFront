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
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  Download,
  Info,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Sample financial data
const financialData = {
  monthly: [
    { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
    { month: "Feb", revenue: 48000, expenses: 34000, profit: 14000 },
    { month: "Mar", revenue: 52000, expenses: 35000, profit: 17000 },
    { month: "Apr", revenue: 55000, expenses: 36000, profit: 19000 },
    { month: "May", revenue: 58000, expenses: 37000, profit: 21000 },
    { month: "Jun", revenue: 62000, expenses: 39000, profit: 23000 },
  ],
  kpis: {
    revenue: { value: 320000, trend: "up", percentage: 8.5 },
    expenses: { value: 213000, trend: "down", percentage: 2.3 },
    profit: { value: 107000, trend: "up", percentage: 12.4 },
    cashFlow: { value: 85000, trend: "up", percentage: 5.8 },
  },
};

export default function FinanceDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [calculatorValues, setCalculatorValues] = useState({
    initialInvestment: "",
    finalValue: "",
    timePeriod: "",
    additionalCosts: "",
  });
  
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards
      gsap.from(".finance-card", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      // Animate charts
      gsap.from(".chart-container", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".chart-container",
          start: "top 80%",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const calculateROI = () => {
    const initial = parseFloat(calculatorValues.initialInvestment) || 0;
    const final = parseFloat(calculatorValues.finalValue) || 0;
    const time = parseFloat(calculatorValues.timePeriod) || 1;
    const costs = parseFloat(calculatorValues.additionalCosts) || 0;

    const totalInvestment = initial + costs;
    const totalReturn = final - totalInvestment;
    const roi = (totalReturn / totalInvestment) * 100;
    const annualizedROI = (Math.pow(1 + roi / 100, 1 / time) - 1) * 100;

    return {
      totalReturn,
      roi: roi.toFixed(2),
      annualizedROI: annualizedROI.toFixed(2),
      status: roi > 20 ? "Excellent" : roi > 10 ? "Good" : roi > 0 ? "Fair" : "Poor",
    };
  };

  const roiResult = calculateROI();

  return (
    <div ref={pageRef} className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Financial Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your financial performance and calculate ROI
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Select defaultValue={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(financialData.kpis).map(([key, data]) => (
          <Card key={key} className="finance-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </CardTitle>
              {key === "revenue" && <DollarSign className="h-4 w-4 text-primary" />}
              {key === "expenses" && <Wallet className="h-4 w-4 text-primary" />}
              {key === "profit" && <PiggyBank className="h-4 w-4 text-primary" />}
              {key === "cashFlow" && <TrendingUp className="h-4 w-4 text-primary" />}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">${data.value.toLocaleString()}</div>
                  <div className={`flex items-center text-sm ${
                    data.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {data.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {data.percentage}%
                  </div>
                </div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  data.trend === "up" 
                    ? "bg-green-100 dark:bg-green-900/20" 
                    : "bg-red-100 dark:bg-red-900/20"
                }`}>
                  {data.trend === "up" ? (
                    <ArrowUpRight className={`h-6 w-6 ${
                      data.trend === "up" ? "text-green-600" : "text-red-600"
                    }`} />
                  ) : (
                    <ArrowDownRight className={`h-6 w-6 ${
                      data.trend === "up" ? "text-green-600" : "text-red-600"
                    }`} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison of revenue and expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={financialData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
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
                    dataKey="expenses"
                    name="Expenses"
                    stroke="#e53935"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="chart-container">
          <CardHeader>
            <CardTitle>Profit Analysis</CardTitle>
            <CardDescription>Monthly profit breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialData.monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="profit" 
                    name="Profit" 
                    fill="#8BC34A" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROI Calculator Section */}
      <Card className="finance-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            ROI Calculator
          </CardTitle>
          <CardDescription>
            Calculate Return on Investment for your agricultural exports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Initial Investment ($)
                </label>
                <Input
                  type="number"
                  value={calculatorValues.initialInvestment}
                  onChange={(e) => setCalculatorValues(prev => ({
                    ...prev,
                    initialInvestment: e.target.value
                  }))}
                  placeholder="Enter initial investment"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Final Value ($)
                </label>
                <Input
                  type="number"
                  value={calculatorValues.finalValue}
                  onChange={(e) => setCalculatorValues(prev => ({
                    ...prev,
                    finalValue: e.target.value
                  }))}
                  placeholder="Enter final value"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time Period (years)
                </label>
                <Input
                  type="number"
                  value={calculatorValues.timePeriod}
                  onChange={(e) => setCalculatorValues(prev => ({
                    ...prev,
                    timePeriod: e.target.value
                  }))}
                  placeholder="Enter time period"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Costs ($)
                </label>
                <Input
                  type="number"
                  value={calculatorValues.additionalCosts}
                  onChange={(e) => setCalculatorValues(prev => ({
                    ...prev,
                    additionalCosts: e.target.value
                  }))}
                  placeholder="Enter additional costs"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">ROI Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Return:</span>
                    <span className="font-semibold">
                      ${roiResult.totalReturn.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">ROI:</span>
                    <span className="font-semibold">{roiResult.roi}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Annualized ROI:</span>
                    <span className="font-semibold">{roiResult.annualizedROI}%</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <Badge
                      variant="outline"
                      className={`${
                        roiResult.status === "Excellent"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : roiResult.status === "Good"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : roiResult.status === "Fair"
                          ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {roiResult.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">ROI Status Guide:</p>
                  <ul className="space-y-1">
                    <li>• Excellent: ROI &gt; 20%</li>
                    <li>• Good: ROI 10-20%</li>
                    <li>• Fair: ROI 0-10%</li>
                    <li>• Poor: ROI &lt; 0%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}