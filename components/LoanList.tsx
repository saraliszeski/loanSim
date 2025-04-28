import React from 'react';
import { Loan } from '../components/Calculation'; // Adjust the path if needed

interface LoanListProps {
  loans: Loan[];
  onEdit: (index: number, field: keyof Loan, value: string | number) => void;
  onDelete: (index: number) => void;
}

const LoanList: React.FC<LoanListProps> = ({ loans, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {loans.map((loan, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
          <div className="flex flex-col gap-2">
            <input
              className="border p-2 rounded"
              type="text"
              value={loan.name}
              onChange={(e) => onEdit(index, 'name', e.target.value)}
              placeholder="Loan Name"
            />
            <input
              className="border p-2 rounded"
              type="number"
              value={loan.initialAmount}
              onChange={(e) => onEdit(index, 'initialAmount', e.target.value)}
              placeholder="Initial Amount"
            />
            <input
              className="border p-2 rounded"
              type="number"
              value={loan.interestRate}
              onChange={(e) => onEdit(index, 'interestRate', e.target.value)}
              placeholder="Interest Rate"
            />
            <input
              className="border p-2 rounded"
              type="text"
              value={loan.originationYear}
              onChange={(e) => onEdit(index, 'originationYear', e.target.value)}
              placeholder="Origination Year"
            />
            <input
              className="border p-2 rounded"
              type="number"
              value={loan.yearsTilPaymentStart}
              onChange={(e) => onEdit(index, 'yearsTilPaymentStart', e.target.value)}
              placeholder="Years Til Payment Start"
            />
            <button
              onClick={() => onDelete(index)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete Loan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanList;
