import React, { useState } from 'react';
import { Loan } from '../components/Calculation'; // Adjust import if needed

interface LoanListProps {
  loans: Loan[];
  onSave: (index: number, updatedLoan: Loan) => void;
  onDelete: (index: number) => void;
}

const LoanList: React.FC<LoanListProps> = ({ loans, onSave, onDelete }) => {
  const [editableLoans, setEditableLoans] = useState<Loan[]>(loans);

  // If loans prop updates, update local editableLoans too
  React.useEffect(() => {
    setEditableLoans(loans);
  }, [loans]);

  const handleChange = (index: number, field: keyof Loan, value: string | number) => {
    setEditableLoans((prev) => {
        const updated = [...prev];
        const loan = { ...updated[index], [field]: value };
    
        // If editing initialAmount, also update currentPrincipal
        if (field === 'initialAmount' && typeof value === 'number') {
          loan.currentPrincipal = value;
        }
    
        updated[index] = loan;
        return updated;
      });
  };

  const handleSave = (index: number) => {
    onSave(index, editableLoans[index]);
    alert("Loan Updated!");
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {editableLoans.map((loan, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
          <div className="flex flex-col gap-2">
            <input
              className="border p-2 rounded"
              type="text"
              value={loan.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Loan Name"
            />
            <input
              className="border p-2 rounded"
              type="number"
              value={loan.initialAmount}
              onChange={(e) => handleChange(index, 'initialAmount', Number(e.target.value))}
              placeholder="Initial Amount"
            />
            <input
              className="border p-2 rounded"
              type="number"
              value={loan.interestRate}
              onChange={(e) => handleChange(index, 'interestRate', Number(e.target.value))}
              placeholder="Interest Rate"
            />
            <input
              className="border p-2 rounded"
              type="text"
              value={loan.originationYear}
              onChange={(e) => handleChange(index, 'originationYear', Number(e.target.value))}
              placeholder="Origination Year"
            />
            <input
              className="border p-2 rounded"
              type="number"
              value={loan.yearsTilPaymentStart}
              onChange={(e) => handleChange(index, 'yearsTilPaymentStart', Number(e.target.value))}
              placeholder="Years Til Payment Start"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleSave(index)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => onDelete(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete Loan
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanList;
