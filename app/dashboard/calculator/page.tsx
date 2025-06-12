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
import { Label } from "@/components/ui/label";
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
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  BarChart3,
  PieChart,
  Download,
  Save,
  RefreshCw,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Calculator interfaces
interface ROICalculation {
  totalReturn: number;
  roi: number;
  annualizedROI: number;
  status: string;
  statusColor: string;
}

interface ProfitabilityCalculation {
  grossProfit: number;
  netProfit: number;
  grossMargin: number;
  netMargin: number;
  status: string;
  statusColor: string;
}

interface BreakEvenCalculation {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  status: string;
  statusColor: string;
}

interface ExportMarginCalculation {
  totalCosts: number;
  exportMargin: number;
  marginPercentage: number;
  profitPerUnit: number;
  status: string;
  statusColor: string;
}

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState("roi");
  
  // ROI Calculator State
  const [roiData, setRoiData] = useState({
    initialInvestment: "",
    finalValue: "",
    timePeriod: "",
    additionalCosts: "",
  });

  // Profitability Calculator State
  const [profitabilityData, setProfitabilityData] = useState({
    revenue: "",
    costOfGoods: "",
    operatingExpenses: "",
    units: "",
  });

  // Break-even Calculator State
  const [breakEvenData, setBreakEvenData] = useState({
    fixedCosts: "",
    variableCostPerUnit: "",
    sellingPricePerUnit: "",
  });

  // Export Margin Calculator State
  const [exportData, setExportData] = useState({
    sellingPrice: "",
    productCost: "",
    shippingCost: "",
    insuranceCost: "",
    customsCost: "",
    marketingCost: "",
    units: "",
  });

  const pageRef = useRef<HTMLDivElement>(null);

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
      
      // Cards animation
      gsap.from(".calculator-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      });
    });
    
    return () => ctx.revert();
  }, []);

  // ROI Calculations
  const calculateROI = (): ROICalculation => {
    const initial = parseFloat(roiData.initialInvestment) || 0;
    const final = parseFloat(roiData.finalValue) || 0;
    const time = parseFloat(roiData.timePeriod) || 1;
    const costs = parseFloat(roiData.additionalCosts) || 0;

    const totalInvestment = initial + costs;
    const totalReturn = final - totalInvestment;
    const roi = totalInvestment > 0 ? (totalReturn / totalInvestment) * 100 : 0;
    const annualizedROI = time > 0 ? (Math.pow(1 + roi / 100, 1 / time) - 1) * 100 : 0;

    let status = "Poor";
    let statusColor = "text-red-600";
    
    if (roi > 20) {
      status = "Excellent";
      statusColor = "text-green-600";
    } else if (roi > 10) {
      status = "Good";
      statusColor = "text-blue-600";
    } else if (roi > 0) {
      status = "Fair";
      statusColor = "text-yellow-600";
    }

    return {
      totalReturn,
      roi,
      annualizedROI,
      status,
      statusColor,
    };
  };

  // Profitability Calculations
  const calculateProfitability = (): ProfitabilityCalculation => {
    const revenue = parseFloat(profitabilityData.revenue) || 0;
    const cogs = parseFloat(profitabilityData.costOfGoods) || 0;
    const opex = parseFloat(profitabilityData.operatingExpenses) || 0;

    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - opex;
    const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
    const netMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

    let status = "Poor";
    let statusColor = "text-red-600";
    
    if (netMargin > 15) {
      status = "Excellent";
      statusColor = "text-green-600";
    } else if (netMargin > 10) {
      status = "Good";
      statusColor = "text-blue-600";
    } else if (netMargin > 5) {
      status = "Fair";
      statusColor = "text-yellow-600";
    }

    return {
      grossProfit,
      netProfit,
      grossMargin,
      netMargin,
      status,
      statusColor,
    };
  };

  // Break-even Calculations
  const calculateBreakEven = (): BreakEvenCalculation => {
    const fixedCosts = parseFloat(breakEvenData.fixedCosts) || 0;
    const variableCost = parseFloat(breakEvenData.variableCostPerUnit) || 0;
    const sellingPrice = parseFloat(breakEvenData.sellingPricePerUnit) || 0;

    const contributionMargin = sellingPrice - variableCost;
    const contributionMarginRatio = sellingPrice > 0 ? (contributionMargin / sellingPrice) * 100 : 0;
    const breakEvenUnits = contributionMargin > 0 ? fixedCosts / contributionMargin : 0;
    const breakEvenRevenue = breakEvenUnits * sellingPrice;

    let status = "Poor";
    let statusColor = "text-red-600";
    
    if (contributionMarginRatio > 50) {
      status = "Excellent";
      statusColor = "text-green-600";
    } else if (contributionMarginRatio > 30) {
      status = "Good";
      statusColor = "text-blue-600";
    } else if (contributionMarginRatio > 15) {
      status = "Fair";
      statusColor = "text-yellow-600";
    }

    return {
      breakEvenUnits,
      breakEvenRevenue,
      contributionMargin,
      contributionMarginRatio,
      status,
      statusColor,
    };
  };

  // Export Margin Calculations
  const calculateExportMargin = (): ExportMarginCalculation => {
    const sellingPrice = parseFloat(exportData.sellingPrice) || 0;
    const productCost = parseFloat(exportData.productCost) || 0;
    const shipping = parseFloat(exportData.shippingCost) || 0;
    const insurance = parseFloat(exportData.insuranceCost) || 0;
    const customs = parseFloat(exportData.customsCost) || 0;
    const marketing = parseFloat(exportData.marketingCost) || 0;
    const units = parseFloat(exportData.units) || 1;

    const totalCosts = productCost + shipping + insurance + customs + marketing;
    const profitPerUnit = sellingPrice - totalCosts;
    const exportMargin = profitPerUnit * units;
    const marginPercentage = sellingPrice > 0 ? (profitPerUnit / sellingPrice) * 100 : 0;

    let status = "Poor";
    let statusColor = "text-red-600";
    
    if (marginPercentage > 25) {
      status = "Excellent";
      statusColor = "text-green-600";
    } else if (marginPercentage > 15) {
      status = "Good";
      statusColor = "text-blue-600";
    } else if (marginPercentage > 5) {
      status = "Fair";
      statusColor = "text-yellow-600";
    }

    return {
      totalCosts,
      exportMargin,
      marginPercentage,
      profitPerUnit,
      status,
      statusColor,
    };
  };

  const roiResult = calculateROI();
  const profitabilityResult = calculateProfitability();
  const breakEvenResult = calculateBreakEven();
  const exportResult = calculateExportMargin();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Excellent":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Good":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case "Fair":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div ref={pageRef} className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Financial Calculator Suite
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive financial analysis tools for agricultural exports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Results
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Calculator Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
          <TabsTrigger value="roi" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            ROI Calculator
          </TabsTrigger>
          <TabsTrigger value="profitability" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Profitability
          </TabsTrigger>
          <TabsTrigger value="breakeven" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Break-even
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Export Margin
          </TabsTrigger>
        </TabsList>

        {/* ROI Calculator */}
        <TabsContent value="roi">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="calculator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  ROI Calculator
                </CardTitle>
                <CardDescription>
                  Calculate return on investment for your agricultural projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
                  <Input
                    id="initialInvestment"
                    type="number"
                    value={roiData.initialInvestment}
                    onChange={(e) => setRoiData(prev => ({
                      ...prev,
                      initialInvestment: e.target.value
                    }))}
                    placeholder="Enter initial investment"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="finalValue">Final Value ($)</Label>
                  <Input
                    id="finalValue"
                    type="number"
                    value={roiData.finalValue}
                    onChange={(e) => setRoiData(prev => ({
                      ...prev,
                      finalValue: e.target.value
                    }))}
                    placeholder="Enter final value"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timePeriod">Time Period (years)</Label>
                  <Input
                    id="timePeriod"
                    type="number"
                    value={roiData.timePeriod}
                    onChange={(e) => setRoiData(prev => ({
                      ...prev,
                      timePeriod: e.target.value
                    }))}
                    placeholder="Enter time period"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalCosts">Additional Costs ($)</Label>
                  <Input
                    id="additionalCosts"
                    type="number"
                    value={roiData.additionalCosts}
                    onChange={(e) => setRoiData(prev => ({
                      ...prev,
                      additionalCosts: e.target.value
                    }))}
                    placeholder="Enter additional costs"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="calculator-card">
              <CardHeader>
                <CardTitle>ROI Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Return</p>
                    <p className="text-xl font-bold">
                      ${roiResult.totalReturn.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">ROI</p>
                    <p className="text-xl font-bold">{roiResult.roi.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Annualized ROI</p>
                    <p className="text-xl font-bold">{roiResult.annualizedROI.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(roiResult.status)}
                      <span className={`font-bold ${roiResult.statusColor}`}>
                        {roiResult.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-medium mb-1">ROI Interpretation:</p>
                      <ul className="space-y-1">
                        <li>• Excellent: ROI &gt; 20%</li>
                        <li>• Good: ROI 10-20%</li>
                        <li>• Fair: ROI 0-10%</li>
                        <li>• Poor: ROI &lt; 0%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profitability Calculator */}
        <TabsContent value="profitability">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="calculator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Profitability Analysis
                </CardTitle>
                <CardDescription>
                  Analyze gross and net profit margins for your products
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Total Revenue ($)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={profitabilityData.revenue}
                    onChange={(e) => setProfitabilityData(prev => ({
                      ...prev,
                      revenue: e.target.value
                    }))}
                    placeholder="Enter total revenue"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costOfGoods">Cost of Goods Sold ($)</Label>
                  <Input
                    id="costOfGoods"
                    type="number"
                    value={profitabilityData.costOfGoods}
                    onChange={(e) => setProfitabilityData(prev => ({
                      ...prev,
                      costOfGoods: e.target.value
                    }))}
                    placeholder="Enter cost of goods sold"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operatingExpenses">Operating Expenses ($)</Label>
                  <Input
                    id="operatingExpenses"
                    type="number"
                    value={profitabilityData.operatingExpenses}
                    onChange={(e) => setProfitabilityData(prev => ({
                      ...prev,
                      operatingExpenses: e.target.value
                    }))}
                    placeholder="Enter operating expenses"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="units">Units Sold</Label>
                  <Input
                    id="units"
                    type="number"
                    value={profitabilityData.units}
                    onChange={(e) => setProfitabilityData(prev => ({
                      ...prev,
                      units: e.target.value
                    }))}
                    placeholder="Enter units sold"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="calculator-card">
              <CardHeader>
                <CardTitle>Profitability Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gross Profit</p>
                    <p className="text-xl font-bold">
                      ${profitabilityResult.grossProfit.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Net Profit</p>
                    <p className="text-xl font-bold">
                      ${profitabilityResult.netProfit.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gross Margin</p>
                    <p className="text-xl font-bold">{profitabilityResult.grossMargin.toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Net Margin</p>
                    <p className="text-xl font-bold">{profitabilityResult.netMargin.toFixed(2)}%</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Profitability Status</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(profitabilityResult.status)}
                      <span className={`font-bold ${profitabilityResult.statusColor}`}>
                        {profitabilityResult.status}
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(profitabilityResult.netMargin, 100)} 
                    className="h-2"
                  />
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div className="text-sm text-green-800 dark:text-green-200">
                      <p className="font-medium mb-1">Margin Benchmarks:</p>
                      <ul className="space-y-1">
                        <li>• Excellent: Net Margin &gt; 15%</li>
                        <li>• Good: Net Margin 10-15%</li>
                        <li>• Fair: Net Margin 5-10%</li>
                        <li>• Poor: Net Margin &lt; 5%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Break-even Calculator */}
        <TabsContent value="breakeven">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="calculator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Break-even Analysis
                </CardTitle>
                <CardDescription>
                  Determine the break-even point for your agricultural products
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fixedCosts">Fixed Costs ($)</Label>
                  <Input
                    id="fixedCosts"
                    type="number"
                    value={breakEvenData.fixedCosts}
                    onChange={(e) => setBreakEvenData(prev => ({
                      ...prev,
                      fixedCosts: e.target.value
                    }))}
                    placeholder="Enter fixed costs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variableCostPerUnit">Variable Cost per Unit ($)</Label>
                  <Input
                    id="variableCostPerUnit"
                    type="number"
                    value={breakEvenData.variableCostPerUnit}
                    onChange={(e) => setBreakEvenData(prev => ({
                      ...prev,
                      variableCostPerUnit: e.target.value
                    }))}
                    placeholder="Enter variable cost per unit"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellingPricePerUnit">Selling Price per Unit ($)</Label>
                  <Input
                    id="sellingPricePerUnit"
                    type="number"
                    value={breakEvenData.sellingPricePerUnit}
                    onChange={(e) => setBreakEvenData(prev => ({
                      ...prev,
                      sellingPricePerUnit: e.target.value
                    }))}
                    placeholder="Enter selling price per unit"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="calculator-card">
              <CardHeader>
                <CardTitle>Break-even Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Break-even Units</p>
                    <p className="text-xl font-bold">
                      {Math.round(breakEvenResult.breakEvenUnits).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Break-even Revenue</p>
                    <p className="text-xl font-bold">
                      ${breakEvenResult.breakEvenRevenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Contribution Margin</p>
                    <p className="text-xl font-bold">
                      ${breakEvenResult.contributionMargin.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Margin Ratio</p>
                    <p className="text-xl font-bold">
                      {breakEvenResult.contributionMarginRatio.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Business Viability</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(breakEvenResult.status)}
                      <span className={`font-bold ${breakEvenResult.statusColor}`}>
                        {breakEvenResult.status}
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(breakEvenResult.contributionMarginRatio, 100)} 
                    className="h-2"
                  />
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <p className="font-medium mb-1">Contribution Margin Guide:</p>
                      <ul className="space-y-1">
                        <li>• Excellent: Margin Ratio &gt; 50%</li>
                        <li>• Good: Margin Ratio 30-50%</li>
                        <li>• Fair: Margin Ratio 15-30%</li>
                        <li>• Poor: Margin Ratio &lt; 15%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Export Margin Calculator */}
        <TabsContent value="export">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="calculator-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Export Margin Calculator
                </CardTitle>
                <CardDescription>
                  Calculate profit margins for international agricultural exports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sellingPrice">Selling Price per Unit ($)</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    value={exportData.sellingPrice}
                    onChange={(e) => setExportData(prev => ({
                      ...prev,
                      sellingPrice: e.target.value
                    }))}
                    placeholder="Enter selling price"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productCost">Product Cost per Unit ($)</Label>
                  <Input
                    id="productCost"
                    type="number"
                    value={exportData.productCost}
                    onChange={(e) => setExportData(prev => ({
                      ...prev,
                      productCost: e.target.value
                    }))}
                    placeholder="Enter product cost"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingCost">Shipping Cost per Unit ($)</Label>
                  <Input
                    id="shippingCost"
                    type="number"
                    value={exportData.shippingCost}
                    onChange={(e) => setExportData(prev => ({
                      ...prev,
                      shippingCost: e.target.value
                    }))}
                    placeholder="Enter shipping cost"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceCost">Insurance Cost per Unit ($)</Label>
                  <Input
                    id="insuranceCost"
                    type="number"
                    value={exportData.insuranceCost}
                    onChange={(e) => setExportData(prev => ({
                      ...prev,
                      insuranceCost: e.target.value
                    }))}
                    placeholder="Enter insurance cost"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customsCost">Customs & Duties per Unit ($)</Label>
                  <Input
                    id="customsCost"
                    type="number"
                    value={exportData.customsCost}
                    onChange={(e) => setExportData(prev => ({
                      ...prev,
                      customsCost: e.target.value
                    }))}
                    placeholder="Enter customs cost"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marketingCost">Marketing Cost per Unit ($)</Label>
                  <Input
                    id="marketingCost"
                    type="number"
                    value={exportData.marketingCost}
                    onChange={(e) => setExportData(prev => ({
                      ...prev,
                      marketingCost: e.target.value
                    }))}
                    placeholder="Enter marketing cost"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exportUnits">Number of Units</Label>
                  <Input
                    id="exportUnits"
                    type="number"
                    value={exportData.units}
                    onChange={(e) => setExportData(prev => ({
                      ...prev,
                      units: e.target.value
                    }))}
                    placeholder="Enter number of units"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="calculator-card">
              <CardHeader>
                <CardTitle>Export Margin Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Costs per Unit</p>
                    <p className="text-xl font-bold">
                      ${exportResult.totalCosts.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Profit per Unit</p>
                    <p className="text-xl font-bold">
                      ${exportResult.profitPerUnit.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Export Margin</p>
                    <p className="text-xl font-bold">
                      ${exportResult.exportMargin.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Margin Percentage</p>
                    <p className="text-xl font-bold">
                      {exportResult.marginPercentage.toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Export Profitability</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(exportResult.status)}
                      <span className={`font-bold ${exportResult.statusColor}`}>
                        {exportResult.status}
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(Math.max(exportResult.marginPercentage, 0), 100)} 
                    className="h-2"
                  />
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div className="text-sm text-purple-800 dark:text-purple-200">
                      <p className="font-medium mb-1">Export Margin Guide:</p>
                      <ul className="space-y-1">
                        <li>• Excellent: Margin &gt; 25%</li>
                        <li>• Good: Margin 15-25%</li>
                        <li>• Fair: Margin 5-15%</li>
                        <li>• Poor: Margin &lt; 5%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}