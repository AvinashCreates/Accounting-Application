import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Billing } from './pages/Billing';
import { Expenses } from './pages/Expenses';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Student, Expense } from './types';

const tabTitles = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your accounting data' },
  billing: { title: 'Student Billing', subtitle: 'Manage student enrollments and invoices' },
  expenses: { title: 'Expense Management', subtitle: 'Track and categorize business expenses' },
  reports: { title: 'Reports & Audit', subtitle: 'Generate financial reports and summaries' },
  settings: { title: 'Settings', subtitle: 'Configure your account and business preferences' }
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useLocalStorage<Student[]>('students', []);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);

  const handleAddStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const currentTab = tabTitles[activeTab as keyof typeof tabTitles];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard students={students} expenses={expenses} />;
      case 'billing':
        return <Billing students={students} onAddStudent={handleAddStudent} />;
      case 'expenses':
        return <Expenses expenses={expenses} onAddExpense={handleAddExpense} onDeleteExpense={handleDeleteExpense} />;
      case 'reports':
        return <Reports students={students} expenses={expenses} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard students={students} expenses={expenses} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={currentTab.title} subtitle={currentTab.subtitle} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;