import React, { useState } from 'react';
import { Plus, Calculator } from 'lucide-react';
import { Student } from '../../types';
import { calculateBilling, formatCurrency, generateInvoiceNumber } from '../../utils/calculations';

interface BillingFormProps {
  onAddStudent: (student: Student) => void;
}

export const BillingForm: React.FC<BillingFormProps> = ({ onAddStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courseName: '',
    baseFee: ''
  });
  const [preview, setPreview] = useState<ReturnType<typeof calculateBilling> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'baseFee' && value) {
      const fee = parseFloat(value);
      if (!isNaN(fee)) {
        setPreview(calculateBilling(fee));
      }
    } else if (name === 'baseFee' && !value) {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const baseFee = parseFloat(formData.baseFee);
      const billing = calculateBilling(baseFee);
      
      const student: Student = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        courseName: formData.courseName,
        baseFee: billing.baseFee,
        lmsFee: billing.lmsFee,
        gst: billing.gst,
        totalFee: billing.total,
        createdAt: new Date().toISOString(),
        invoiceNumber: generateInvoiceNumber()
      };

      onAddStudent(student);
      
      // Reset form
      setFormData({ name: '', email: '', courseName: '', baseFee: '' });
      setPreview(null);
    } catch (error) {
      console.error('Error adding student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 rounded-lg p-2">
          <Plus className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Add New Student</h3>
          <p className="text-sm text-gray-600">Create a new billing entry with automatic tax calculation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Student Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter student's full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="student@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-2">
              Course Name *
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="e.g., Advanced React Development"
              required
            />
          </div>

          <div>
            <label htmlFor="baseFee" className="block text-sm font-medium text-gray-700 mb-2">
              Course Base Fee (₹) *
            </label>
            <input
              type="number"
              id="baseFee"
              name="baseFee"
              value={formData.baseFee}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="25000"
              min="0"
              step="1"
              required
            />
          </div>
        </div>

        {preview && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Calculator className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-medium text-blue-900">Fee Breakdown Preview</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Course Fee</p>
                <p className="font-semibold text-gray-900">{formatCurrency(preview.baseFee)}</p>
              </div>
              <div>
                <p className="text-gray-600">LMS Fee</p>
                <p className="font-semibold text-gray-900">{formatCurrency(preview.lmsFee)}</p>
              </div>
              <div>
                <p className="text-gray-600">GST (18%)</p>
                <p className="font-semibold text-gray-900">{formatCurrency(preview.gst)}</p>
              </div>
              <div>
                <p className="text-blue-600 font-medium">Total Amount</p>
                <p className="font-bold text-blue-900 text-lg">{formatCurrency(preview.total)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              setFormData({ name: '', email: '', courseName: '', baseFee: '' });
              setPreview(null);
            }}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !preview}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding Student...' : 'Add Student & Generate Invoice'}
          </button>
        </div>
      </form>
    </div>
  );
};