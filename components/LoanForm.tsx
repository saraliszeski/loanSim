'use client';
import React, { useState } from 'react';

interface LoanFormProps {
  onAddLoan: (loan: Loan) => void;
}

export interface Loan {
  loanName: string;
  originationYear: string;
  interestRate: string;
  initialAmount: string;
  yearsTilPaymentStart: string;
}

export default function LoanForm({ onAddLoan }: LoanFormProps) {
  const [formData, setFormData] = useState<Loan>({
    loanName: '',
    originationYear: '',
    interestRate: '',
    initialAmount: '',
    yearsTilPaymentStart: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLoan(formData); // pass the loan back to parent
    setFormData({
      loanName: '',
      originationYear: '',
      interestRate: '',
      initialAmount: '',
      yearsTilPaymentStart: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="loanName"
        placeholder="Loan Name"
        value={formData.loanName}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="originationYear"
        placeholder="Origination Year"
        value={formData.originationYear}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="interestRate"
        placeholder="Interest Rate"
        value={formData.interestRate}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="initialAmount"
        placeholder="Initial Amount"
        value={formData.initialAmount}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="yearsTilPaymentStart"
        placeholder="Years Til Payment Start"
        value={formData.yearsTilPaymentStart}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Loan
      </button>
    </form>
  );
}
