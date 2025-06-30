"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatbotProps {
  className?: string;
}

const SAMPLE_RESPONSES = {
  greeting: [
    "Hello! I'm your Analytics Assistant. I can help you understand your data, identify trends, and provide insights. What would you like to know?",
    "Hi there! I'm here to help you make sense of your agricultural export analytics. Ask me about trends, performance, or any data you see on this dashboard.",
  ],
  revenue: [
    "Your revenue has shown a positive trend with a 12.5% increase this period. The main drivers are increased saffron exports to European markets and improved pricing for premium products.",
    "Revenue performance is strong! I notice your export volume is up 8.3% while maintaining healthy profit margins. Would you like me to break down the performance by product category?",
  ],
  trends: [
    "I'm seeing several positive trends in your data: 1) Saffron demand is increasing in Asia (+18.2% growth), 2) Your customer retention is solid at 87.5%, and 3) Export volumes are consistently growing. The only area to watch is the slight dip in customer retention.",
    "Current market trends show strong demand for organic products and premium agricultural exports. Your positioning in these segments is excellent, particularly with your saffron and pistachio offerings.",
  ],
  recommendations: [
    "Based on your analytics, I recommend: 1) Expanding saffron production given the 18.2% growth in Asian markets, 2) Investigating the 2.1% drop in customer retention, and 3) Consider entering the Southeast Asian market where demand is emerging.",
    "Here are some actionable insights: Focus on the European market where you have 45% market share, optimize your supply chain for the Middle East region showing 22.1% growth, and consider premium packaging for your top-performing products.",
  ],
};

const QUICK_ACTIONS = [
  { label: "Explain revenue trends", icon: TrendingUp, query: "explain my revenue trends" },
  { label: "Market opportunities", icon: BarChart3, query: "what market opportunities do you see" },
  { label: "Performance insights", icon: Lightbulb, query: "give me performance insights" },
  { label: "Risk analysis", icon: AlertCircle, query: "analyze potential risks" },
];

export function Chatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
        addBotMessage(SAMPLE_RESPONSES.greeting[0], [
          "Show me revenue trends",
          "Analyze my performance",
          "What are the market opportunities?",
        ]);
        setHasGreeted(true);
    }
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatbotRef.current) {
      gsap.fromTo(
        chatbotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (content: string, suggestions?: string[]) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "bot",
      content,
      timestamp: new Date(),
      suggestions,
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const generateBotResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("revenue") || message.includes("sales") || message.includes("income")) {
      return {
        content: SAMPLE_RESPONSES.revenue[Math.floor(Math.random() * SAMPLE_RESPONSES.revenue.length)],
        suggestions: ["Show product breakdown", "Compare with last year", "Export performance"],
      };
    }
    
    if (message.includes("trend") || message.includes("pattern") || message.includes("growth")) {
      return {
        content: SAMPLE_RESPONSES.trends[Math.floor(Math.random() * SAMPLE_RESPONSES.trends.length)],
        suggestions: ["Regional analysis", "Product performance", "Seasonal patterns"],
      };
    }
    
    if (message.includes("recommend") || message.includes("suggest") || message.includes("advice") || message.includes("insight")) {
      return {
        content: SAMPLE_RESPONSES.recommendations[Math.floor(Math.random() * SAMPLE_RESPONSES.recommendations.length)],
        suggestions: ["Market expansion", "Product optimization", "Risk mitigation"],
      };
    }
    
    if (message.includes("market") || message.includes("opportunity") || message.includes("demand")) {
      return {
        content: "I see strong market opportunities in your data! The European market shows 14.5% growth, and there's emerging demand in Southeast Asia. Your saffron and pistachio products are particularly well-positioned for expansion.",
        suggestions: ["European strategy", "Asian markets", "Product positioning"],
      };
    }
    
    if (message.includes("risk") || message.includes("problem") || message.includes("concern")) {
      return {
        content: "Based on your analytics, I've identified a few areas to monitor: customer retention has dropped 2.1%, and there's some volatility in the citrus market. However, your overall position is strong with diversified revenue streams.",
        suggestions: ["Customer retention", "Market volatility", "Diversification strategy"],
      };
    }
    
    return {
      content: "I can help you analyze various aspects of your agricultural export data. Would you like me to focus on revenue trends, market opportunities, performance insights, or risk analysis?",
      suggestions: ["Revenue analysis", "Market trends", "Performance metrics", "Risk assessment"],
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addUserMessage(userMessage);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(userMessage);
      addBotMessage(response.content, response.suggestions);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (query: string) => {
    addUserMessage(query);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateBotResponse(query);
      addBotMessage(response.content, response.suggestions);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleQuickAction(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-32 md:bottom-6 left-6 md:left-auto right-auto md:right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary-600 text-white z-50 transition-all duration-300 hover:scale-110",
          className
        )}
        aria-label="Open analytics assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card
      ref={chatbotRef}
      className={cn(
        "fixed bottom-28 md:bottom-6 left-6 md:left-auto right-auto md:right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col border-primary/20",
        isMinimized && "h-16",
        className
      )}
    >
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">Analytics Assistant</CardTitle>
            <p className="text-xs text-white/80">AI-powered insights</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          {/* Messages */}
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Ask me anything about your analytics data!
                    </p>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div
                      className={cn(
                        "flex gap-3",
                        message.type === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.type === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-3 text-sm",
                          message.type === "user"
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                        )}
                      >
                        {message.content}
                      </div>
                      {message.type === "user" && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </div>
                      )}
                    </div>

                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 ml-11">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-7 px-2 border-primary/20 hover:bg-primary/10 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Analyzing...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>

          {/* Quick Actions */}
          {messages.every((m) => m.type !== "user") && (            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Quick actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.query)}
                    className="text-xs h-8 justify-start gap-2 border-gray-200 dark:border-gray-700 border-gray-300 dark:bg-gray-800 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    <action.icon className="h-3 w-3" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your analytics..."
                className="flex-1 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="bg-primary hover:bg-primary-600 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}