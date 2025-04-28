'use client';
import React, { useState } from 'react';
import { Loan } from "../components/Calculation";

interface LoanFormProps {
  onAddLoan: (loan: Loan) => void;
}


export default function LoanForm({ onAddLoan }: LoanFormProps) {
  const [formData, setFormData] = useState<Loan>({
    name: '',
    originationYear: "",
    interestRate: "",
    initialAmount: "",
    currentPrincipal: 0,
    interest: 0,
    yearsTilPaymentStart: "",
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

    // Convert initialAmount to number and log it
    const initialAmount = Number(formData.initialAmount);
    console.log("initial amount: ", initialAmount);

    // Check if the value is valid and set the currentPrincipal
    const validInitialAmount = isNaN(initialAmount) ? 0 : initialAmount;

    // Update the form data and pass it to the parent
    onAddLoan({
      ...formData,
      currentPrincipal: validInitialAmount, // Ensure currentPrincipal is valid
    });

    // Update formData after submission
    setFormData({
      name: formData.name,
      originationYear: formData.originationYear,
      interestRate: formData.interestRate,
      initialAmount: formData.initialAmount,
      currentPrincipal: validInitialAmount, // Set currentPrincipal with valid number
      interest: formData.interest,
      yearsTilPaymentStart: formData.yearsTilPaymentStart,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="name"
        value={formData.name}
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
