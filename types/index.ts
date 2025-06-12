// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  origin: string;
  certifications: string[];
  trend: 'up' | 'down';
  percentage: number;
}

// Chart Data Types
export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface LineChartPoint {
  name: string;
  price?: number;
  demand?: number;
  export?: number;
}

export interface PieChartPoint {
  name: string;
  value: number;
}

// Region Types
export interface Region {
  region: string;
  status: 'Very High' | 'High' | 'Medium' | 'Low';
  change: number;
  products: string[];
}

// Auth Types
export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  agreeTerms: boolean;
}