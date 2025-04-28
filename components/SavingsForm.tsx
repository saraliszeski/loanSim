'use client';
import React, { useState } from 'react';
import Button from './Button'; // assuming you already have a custom Button component

export interface SavingsAccount {
    accountName: string;
    originationYear: string;
    interestRate: string;
    initialAmount: string;
  }

interface SavingsFormProps {
  onAddSavings: (account: SavingsAccount) => void;
}

export default function SavingsForm({ onAddSavings }: SavingsFormProps) {
  const [formData, setFormData] = useState<SavingsAccount>({
    accountName: '',
    originationYear: '',
    interestRate: '',
    initialAmount: '',
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
    onAddSavings(formData);
    setFormData({
      accountName: '',
      originationYear: '',
      interestRate: '',
      initialAmount: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input
        type="text"
        name="accountName"
        placeholder="Account Name"
        value={formData.accountName}
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Account
      </button>    </form>
  );
}
