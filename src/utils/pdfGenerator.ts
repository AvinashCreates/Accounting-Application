import jsPDF from 'jspdf';
import { Student } from '../types';
import { formatCurrency } from './calculations';

export const generateInvoicePDF = (student: Student) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(37, 99, 235);
  doc.text('Training Company', 20, 30);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Invoice', 20, 45);
  
  // Invoice details
  doc.text(`Invoice #: ${student.invoiceNumber}`, 20, 60);
  doc.text(`Date: ${new Date(student.createdAt).toLocaleDateString()}`, 20, 70);
  
  // Student details
  doc.text('Bill To:', 20, 90);
  doc.text(student.name, 20, 100);
  doc.text(student.email, 20, 110);
  
  // Course details
  doc.text('Course Details:', 20, 130);
  doc.text(`Course: ${student.courseName}`, 20, 140);
  
  // Billing breakdown
  let yPos = 160;
  doc.text('Billing Breakdown:', 20, yPos);
  yPos += 15;
  
  doc.text(`Course Fee: ${formatCurrency(student.baseFee)}`, 20, yPos);
  yPos += 10;
  doc.text(`LMS Fee: ${formatCurrency(student.lmsFee)}`, 20, yPos);
  yPos += 10;
  doc.text(`Subtotal: ${formatCurrency(student.baseFee + student.lmsFee)}`, 20, yPos);
  yPos += 10;
  doc.text(`GST (18%): ${formatCurrency(student.gst)}`, 20, yPos);
  yPos += 15;
  
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Amount: ${formatCurrency(student.totalFee)}`, 20, yPos);
  
  // Footer
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Thank you for choosing our training courses!', 20, 280);
  
  return doc;
};