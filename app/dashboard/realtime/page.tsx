"use client";

import { useState, useEffect, useRef } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Cpu,
  Database,
  HardDrive,
  Network,
  Play,
  Pause,
  RefreshCw,
  Settings,
  Signal,
  XCircle,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const initialSystemMetrics = {
  cpu: 45,
  memory: 62,
  disk: 78,
  network: 92,
};

const initialMarketPrices = {
  saffron: 1250.80,
  pistachio: 14.50,
  dates: 7.20,
  pomegranate: 4.80,
};

const initialServiceStatus = {
  mainServer: "healthy",
  database: "healthy",
  websocket: "healthy",
  api: "healthy",
};

export default function Realtime() {
  const [systemMetrics, setSystemMetrics] = useState(initialSystemMetrics);
  const [marketPrices, setMarketPrices] = useState(initialMarketPrices);
  const [serviceStatus, setServiceStatus] = useState(initialServiceStatus);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: "success" | "warning" | "error";
    message: string;
    timestamp: Date;
  }>>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [updateFrequency, setUpdateFrequency] = useState("5");
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected");
  const [priceHistory, setPriceHistory] = useState<Array<{
    timestamp: string;
    saffron: number;
    pistachio: number;
    dates: number;
    pomegranate: number;
  }>>([]);

  const pageRef = useRef<HTMLDivElement>(null);
  const streamInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".metrics-card", {
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
        delay: 0.3,
        ease: "power2.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isStreaming) {
      startDataStream();
    } else {
      stopDataStream();
    }

    return () => stopDataStream();
  }, [isStreaming, updateFrequency]);

  const startDataStream = () => {
    stopDataStream();
    const frequency = parseInt(updateFrequency) * 1000;

    streamInterval.current = setInterval(() => {
      setSystemMetrics(prev => ({
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() * 10 - 5))),
        memory: Math.min(100, Math.max(0, prev.memory + (Math.random() * 8 - 4))),
        disk: Math.min(100, Math.max(0, prev.disk + (Math.random() * 6 - 3))),
        network: Math.min(100, Math.max(0, prev.network + (Math.random() * 12 - 6))),
      }));

      const newPrices = {
        saffron: marketPrices.saffron * (1 + (Math.random() * 0.02 - 0.01)),
        pistachio: marketPrices.pistachio * (1 + (Math.random() * 0.02 - 0.01)),
        dates: marketPrices.dates * (1 + (Math.random() * 0.02 - 0.01)),
        pomegranate: marketPrices.pomegranate * (1 + (Math.random() * 0.02 - 0.01)),
      };
      setMarketPrices(newPrices);

      setPriceHistory(prev => {
        const newHistory = [...prev, {
          timestamp: new Date().toLocaleTimeString(),
          ...newPrices,
        }];
        return newHistory.slice(-20);
      });

      if (Math.random() < 0.2) {
        const notificationTypes = ["success", "warning", "error"] as const;
        const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const messages = {
          success: ["New market data available", "Connection optimized", "Cache updated"],
          warning: ["High system load detected", "Network latency increasing", "Memory usage high"],
          error: ["Data stream interrupted", "API response delayed", "Cache miss detected"],
        };
        const message = messages[type][Math.floor(Math.random() * messages[type].length)];
        
        setNotifications(prev => [{
          id: Date.now().toString(),
          type,
          message,
          timestamp: new Date(),
        }, ...prev].slice(0, 5));
      }

      if (Math.random() < 0.1) {
        const services = ["mainServer", "database", "websocket", "api"] as const;
        const service = services[Math.floor(Math.random() * services.length)];
        const statuses = ["healthy", "degraded", "error"] as const;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        setServiceStatus(prev => ({
          ...prev,
          [service]: status,
        }));
      }
    }, frequency);
  };

  const stopDataStream = () => {
    if (streamInterval.current) {
      clearInterval(streamInterval.current);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "degraded":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getNotificationIcon = (type: "success" | "warning" | "error") => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div ref={pageRef} className="space-y-8 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Real-time Monitoring
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Live system metrics and market data
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={updateFrequency} onValueChange={setUpdateFrequency}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Update frequency" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectItem value="1" className="dark:hover:bg-gray-700">Every 1 second</SelectItem>
              <SelectItem value="5" className="dark:hover:bg-gray-700">Every 5 seconds</SelectItem>
              <SelectItem value="10" className="dark:hover:bg-gray-700">Every 10 seconds</SelectItem>
              <SelectItem value="30" className="dark:hover:bg-gray-700">Every 30 seconds</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsStreaming(!isStreaming)}
            className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
          >
            {isStreaming ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size="icon" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Card className="metrics-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Signal className="h-5 w-5 text-primary" />
              <span className="font-medium text-gray-900 dark:text-white">Connection Status</span>
            </div>
            <Badge
              variant={connectionStatus === "connected" ? "default" : "destructive"}
              className="flex items-center gap-1"
            >
              <span className={`h-2 w-2 rounded-full ${
                connectionStatus === "connected" ? "bg-green-500" : "bg-red-500"
              }`} />
              {connectionStatus === "connected" ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metrics-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Cpu className="h-4 w-4 text-primary" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {systemMetrics.cpu.toFixed(1)}%
              </div>
              <Progress value={systemMetrics.cpu} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="metrics-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Activity className="h-4 w-4 text-primary" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {systemMetrics.memory.toFixed(1)}%
              </div>
              <Progress value={systemMetrics.memory} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="metrics-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <HardDrive className="h-4 w-4 text-primary" />
              Disk Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {systemMetrics.disk.toFixed(1)}%
              </div>
              <Progress value={systemMetrics.disk} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="metrics-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Network className="h-4 w-4 text-primary" />
              Network Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {systemMetrics.network.toFixed(1)}%
              </div>
              <Progress value={systemMetrics.network} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Prices Chart */}
      <Card className="chart-container bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Market Price Trends</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Real-time price updates for key products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                <XAxis dataKey="timestamp" stroke="#6b7280" className="dark:stroke-gray-400" />
                <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    color: 'var(--foreground)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="saffron"
                  name="Saffron"
                  stroke="#00796B"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="pistachio"
                  name="Pistachio"
                  stroke="#8BC34A"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="dates"
                  name="Dates"
                  stroke="#FFC107"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="pomegranate"
                  name="Pomegranate"
                  stroke="#FF5722"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Service Status and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="metrics-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Database className="h-5 w-5 text-primary" />
              Service Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(serviceStatus).map(([service, status]) => (
                <div
                  key={service}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    <span className="capitalize text-gray-900 dark:text-white">{service.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                  <Badge
                    variant={
                      status === "healthy"
                        ? "default"
                        : status === "degraded"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="metrics-card bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <AlertCircle className="h-5 w-5 text-primary" />
              Live Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge
                    variant={
                      notification.type === "success"
                        ? "default"
                        : notification.type === "warning"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {notification.type}
                  </Badge>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No notifications yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}