import React, { useState } from 'react';
import { SavingsAccount } from './SavingsForm';
interface SavingsListProps {
  accounts: SavingsAccount[];
  onSave: (index: number, updatedAccount: SavingsAccount) => void;
  onDelete: (index: number) => void;
}

const SavingsList: React.FC<SavingsListProps> = ({ accounts, onSave, onDelete }) => {
  const [editableAccounts, setEditableAccounts] = useState<SavingsAccount[]>(accounts);

  React.useEffect(() => {
    setEditableAccounts(accounts);
  }, [accounts]);

  const handleChange = (index: number, field: keyof SavingsAccount, value: string | number) => {
    setEditableAccounts((prev) => {
        const updated = [...prev];
        const account = { ...updated[index], [field]: value };
    
    
        updated[index] = account;
        return updated;
      });
  };

  const handleSave = (index: number) => {
    onSave(index, editableAccounts[index]);
    alert("Savings Account Updated!");
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {editableAccounts.map((account, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded shadow-sm">
          <div className="flex flex-col gap-2">
            <input
              className="border p-2 rounded"
              type="text"
              value={account.accountName}
              onChange={(e) => handleChange(index, 'accountName', e.target.value)}
              placeholder="Account Name"
            />
            <input
              className="border p-2 rounded"
              type="number"
              value={account.initialAmount}
              onChange={(e) => handleChange(index, 'initialAmount', Number(e.target.value))}
              placeholder="Initial Amount"
            />
            <input
              className="border p-2 rounded"
              type="number"
              value={account.interestRate}
              onChange={(e) => handleChange(index, 'interestRate', Number(e.target.value))}
              placeholder="Interest Rate"
            />
            <input
              className="border p-2 rounded"
              type="text"
              value={account.originationYear}
              onChange={(e) => handleChange(index, 'originationYear', Number(e.target.value))}
              placeholder="Origination Year"
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
                Delete Account
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavingsList;
