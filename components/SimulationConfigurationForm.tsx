'use client';
import React, { useState } from 'react';

interface SimulationProps {
  onAddConfig: (simConfig: SimulationParams) => void;
}

export interface SimulationParams {
    paymentAmount: string,
    totalContribution: string,
    simulationEndYear: string
}

export default function SimulationConfiguration({ onAddConfig }: SimulationProps) {
  const [formData, setFormData] = useState<SimulationParams>({
    paymentAmount: "",
    totalContribution: "",
    simulationEndYear: ""
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
    console.log("config form data", formData);
    onAddConfig(formData); // pass the loan back to parent
    setFormData({
        paymentAmount: formData.paymentAmount,
        totalContribution: formData.totalContribution,
        simulationEndYear: formData.simulationEndYear
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="string"
        name="paymentAmount"
        placeholder="loan payment amount PER YEAR"
        value={formData.paymentAmount}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="string"
        name="totalContribution"
        placeholder="total contribution (savings + loans) PER YEAR"
        value={formData.totalContribution}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="string"
        name="simulationEndYear"
        placeholder="End Year"
        value={formData.simulationEndYear}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Simulation Configuration
      </button>
    </form>
  );
}
