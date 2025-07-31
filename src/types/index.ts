export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  courseName: string;
  baseFee: number;
  lmsFee: number;
  gst: number;
  totalFee: number;
  createdAt: string;
  invoiceNumber: string;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  notes: string;
  attachments?: string[];
  createdAt: string;
}

export interface MonthlyAudit {
  month: string;
  year: number;
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}