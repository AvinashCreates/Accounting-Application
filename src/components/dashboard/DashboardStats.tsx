import React from 'react';
import { TrendingUp, TrendingDown, Users, Receipt } from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, trend, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
              {change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface DashboardStatsProps {
  totalRevenue: number;
  totalExpenses: number;
  totalStudents: number;
  netProfit: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalRevenue,
  totalExpenses,
  totalStudents,
  netProfit
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Revenue"
        value={formatCurrency(totalRevenue)}
        change="+12.5%"
        trend="up"
        icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
        color="bg-emerald-100"
      />
      
      <StatsCard
        title="Total Expenses"
        value={formatCurrency(totalExpenses)}
        change="+8.2%"
        trend="up"
        icon={<Receipt className="w-6 h-6 text-orange-600" />}
        color="bg-orange-100"
      />
      
      <StatsCard
        title="Active Students"
        value={totalStudents.toString()}
        change="+15.3%"
        trend="up"
        icon={<Users className="w-6 h-6 text-blue-600" />}
        color="bg-blue-100"
      />
      
      <StatsCard
        title="Net Profit"
        value={formatCurrency(netProfit)}
        change={netProfit > 0 ? "+18.7%" : "-5.2%"}
        trend={netProfit > 0 ? "up" : "down"}
        icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
        color="bg-purple-100"
      />
    </div>
  );
};