import React from 'react';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { Student, Expense } from '../types';

interface DashboardProps {
  students: Student[];
  expenses: Expense[];
}

export const Dashboard: React.FC<DashboardProps> = ({ students, expenses }) => {
  const totalRevenue = students.reduce((sum, student) => sum + student.totalFee, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  // Generate mock data for the last 6 months
  const chartData = [
    { month: 'Aug', revenue: 145000, expenses: 95000, profit: 50000 },
    { month: 'Sep', revenue: 180000, expenses: 110000, profit: 70000 },
    { month: 'Oct', revenue: 220000, expenses: 125000, profit: 95000 },
    { month: 'Nov', revenue: 195000, expenses: 115000, profit: 80000 },
    { month: 'Dec', revenue: 240000, expenses: 130000, profit: 110000 },
    { month: 'Jan', revenue: totalRevenue || 280000, expenses: totalExpenses || 140000, profit: netProfit || 140000 },
  ];

  return (
    <div className="space-y-8">
      <DashboardStats
        totalRevenue={totalRevenue}
        totalExpenses={totalExpenses}
        totalStudents={students.length}
        netProfit={netProfit}
      />
      
      <RevenueChart data={chartData} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {students.slice(-5).map((student, index) => (
              <div key={student.id} className="flex items-center space-x-3">
                <div className="bg-emerald-100 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-emerald-600 text-sm font-medium">₹</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    New billing: {student.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {student.courseName} • ₹{student.totalFee.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            {expenses.slice(-3).map((expense) => (
              <div key={expense.id} className="flex items-center space-x-3">
                <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-orange-600 text-sm font-medium">-</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Expense: {expense.category}
                  </p>
                  <p className="text-xs text-gray-500">
                    ₹{expense.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Add New Student</div>
              <div className="text-sm text-gray-500">Create billing and generate invoice</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Record Expense</div>
              <div className="text-sm text-gray-500">Add a new business expense</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Generate Report</div>
              <div className="text-sm text-gray-500">Export monthly audit summary</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};