import React from 'react';
import { ExpenseForm } from '../components/expenses/ExpenseForm';
import { ExpenseList } from '../components/expenses/ExpenseList';
import { Expense } from '../types';

interface ExpensesProps {
  expenses: Expense[];
  onAddExpense: (expense: Expense) => void;
  onDeleteExpense: (expenseId: string) => void;
}

export const Expenses: React.FC<ExpensesProps> = ({ expenses, onAddExpense, onDeleteExpense }) => {
  return (
    <div className="space-y-8">
      <ExpenseForm onAddExpense={onAddExpense} />
      <ExpenseList expenses={expenses} onDeleteExpense={onDeleteExpense} />
    </div>
  );
};