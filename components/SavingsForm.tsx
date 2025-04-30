'use client';
import React, { useState } from 'react';

export interface SavingsAccount {
    accountName: string;
    originationYear: number;
    interestRate: number;
    initialAmount: number;
    value: number;
  }

interface SavingsFormProps {
  onAddSavings: (account: SavingsAccount) => void;
}

export default function SavingsForm({ onAddSavings }: SavingsFormProps) {
  const [formData, setFormData] = useState<SavingsAccount>({
    accountName: '',
    originationYear: NaN,
    interestRate: NaN,
    initialAmount: NaN,
    value: NaN
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
      originationYear: NaN,
      interestRate: NaN,
      initialAmount: NaN,
      value: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-objects-holder">
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
        <button type="submit" className="create-objects-button">
        Add Account
      </button>    </form>
  );
}
