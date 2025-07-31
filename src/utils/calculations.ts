export const calculateBilling = (baseFee: number, lmsFee: number = 5000) => {
  const subtotal = baseFee + lmsFee;
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  
  return {
    baseFee,
    lmsFee,
    subtotal,
    gst,
    total
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const generateInvoiceNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `INV-${year}${month}-${random}`;
};