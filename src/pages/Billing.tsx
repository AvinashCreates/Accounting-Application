import React from 'react';
import { BillingForm } from '../components/billing/BillingForm';
import { StudentList } from '../components/billing/StudentList';
import { Student } from '../types';

interface BillingProps {
  students: Student[];
  onAddStudent: (student: Student) => void;
}

export const Billing: React.FC<BillingProps> = ({ students, onAddStudent }) => {
  return (
    <div className="space-y-8">
      <BillingForm onAddStudent={onAddStudent} />
      <StudentList students={students} />
    </div>
  );
};