"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plane as Plant } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2">
              <Plant className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary dark:text-primary-300">Agrosiq</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">Sign In</CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 dark:text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-gray-900 dark:text-white">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal text-gray-900 dark:text-white">
                  Remember me
                </Label>
              </div>
              <Button className="w-full bg-primary hover:bg-primary-600 text-white" type="submit">
                Sign In
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}