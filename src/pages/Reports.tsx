import React from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import { Student, Expense } from '../types';
import { formatCurrency } from '../utils/calculations';
import jsPDF from 'jspdf';

interface ReportsProps {
  students: Student[];
  expenses: Expense[];
}

export const Reports: React.FC<ReportsProps> = ({ students, expenses }) => {
  const totalRevenue = students.reduce((sum, student) => sum + student.totalFee, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const generateMonthlyReport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235);
    doc.text('Monthly Audit Report', 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Summary
    let yPos = 70;
    doc.setFontSize(16);
    doc.text('Financial Summary', 20, yPos);
    
    yPos += 20;
    doc.setFontSize(12);
    doc.text(`Total Revenue: ${formatCurrency(totalRevenue)}`, 20, yPos);
    yPos += 10;
    doc.text(`Total Expenses: ${formatCurrency(totalExpenses)}`, 20, yPos);
    yPos += 10;
    doc.text(`Net Profit: ${formatCurrency(netProfit)}`, 20, yPos);
    
    // Student breakdown
    yPos += 30;
    doc.setFontSize(16);
    doc.text('Student Billing Breakdown', 20, yPos);
    
    yPos += 15;
    doc.setFontSize(10);
    students.forEach((student, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${index + 1}. ${student.name} - ${student.courseName}: ${formatCurrency(student.totalFee)}`, 20, yPos);
      yPos += 8;
    });
    
    doc.save('Monthly-Audit-Report.pdf');
  };

  const exportStudentCSV = () => {
    const headers = ['Student Name', 'Email', 'Course', 'Base Fee', 'LMS Fee', 'GST', 'Total Fee', 'Invoice Number', 'Date'];
    const csvContent = [
      headers.join(','),
      ...students.map(student => [
        student.name,
        student.email,
        student.courseName,
        student.baseFee,
        student.lmsFee,
        student.gst,
        student.totalFee,
        student.invoiceNumber,
        new Date(student.createdAt).toLocaleDateString()
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student-billing-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportExpenseCSV = () => {
    const headers = ['Date', 'Category', 'Amount', 'Notes', 'Attachments'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(expense => [
        expense.date,
        expense.category,
        expense.amount,
        expense.notes.replace(/,/g, ';'),
        expense.attachments?.length || 0
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expense-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-100 rounded-lg p-2">
              <FileText className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 rounded-lg p-2">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 rounded-lg p-2">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Net Profit</p>
              <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {formatCurrency(netProfit)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-purple-100 rounded-lg p-2">
            <Download className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Export Reports</h3>
            <p className="text-sm text-gray-600">Download comprehensive reports in various formats</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={generateMonthlyReport}
            className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-red-100 rounded-lg p-2">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Monthly Audit Report</p>
              <p className="text-sm text-gray-500">Complete financial summary (PDF)</p>
            </div>
          </button>

          <button
            onClick={exportStudentCSV}
            className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-emerald-100 rounded-lg p-2">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Student Billing Report</p>
              <p className="text-sm text-gray-500">All billing records (CSV)</p>
            </div>
          </button>

          <button
            onClick={exportExpenseCSV}
            className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-orange-100 rounded-lg p-2">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Expense Report</p>
              <p className="text-sm text-gray-500">All expense records (CSV)</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Student Billings</h3>
          <div className="space-y-3">
            {students.slice(-5).map((student) => (
              <div key={student.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.courseName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-600">{formatCurrency(student.totalFee)}</p>
                  <p className="text-xs text-gray-500">{new Date(student.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Expenses</h3>
          <div className="space-y-3">
            {expenses.slice(-5).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{expense.category}</p>
                  <p className="text-xs text-gray-500">{expense.notes || 'No description'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-orange-600">{formatCurrency(expense.amount)}</p>
                  <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};