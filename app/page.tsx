'use client'; // Ensure this is also at the top of the page using Button
import React, { useState } from 'react';
import "./globals.css";
import { Loan } from "../components/LoanForm";
import LoanForm from "../components/LoanForm";
import { SavingsAccount } from '../components/SavingsForm';
import SavingsAccountForm from '../components/SavingsForm';
import Button from "../components/Button";

export default function Home() {
  const [showFields, setShowFields] = useState(false);
  const [showLoanFields, setShowLoanFieldsButton] = useState(false);
  const [showSavingsFields, setShowSavingsFieldsButton] = useState(false);
  const [simStarted, setSimStarted] = useState(false);
  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([]);

  const handleAddSavings = (account: SavingsAccount) => {
    const { initialAmount, interestRate, accountName, originationYear } = account;

    if (initialAmount && interestRate && accountName && originationYear ) {
      setSavingsAccounts((prev) => [...prev, account]);
      alert("Savings Account Added!");
      setShowSavingsFieldsButton((prev) => ! prev)
    } else {
      alert("Insufficient information, account not added");
    }
  };

  const startButtonHandleClick = () => {
    if (!simStarted) {
      setShowFields(true);
      setSimStarted(true);
    }
  };

  const [loans, setLoans] = useState<Loan[]>([]);

  const handleAddLoan = (loan: Loan) => {
    const { initialAmount, interestRate, loanName, originationYear, yearsTilPaymentStart } = loan;

    if (initialAmount && interestRate && loanName && originationYear && yearsTilPaymentStart) {
      setLoans((prev) => [...prev, loan]);
      alert("Loan Added!");
      setShowLoanFieldsButton((prev) => ! prev)
    } else {
      alert("Insufficient information, loan not added");
    }
  };

  const createLoanHandleClick = () => {
    setShowLoanFieldsButton(true);
  }
  const createSavingsHandleClick = () => setShowSavingsFieldsButton(!showSavingsFields);

  const promptSimulationParameters = () => {
    setShowLoanFieldsButton(false);
    setShowSavingsFieldsButton(false)
    setShowFields(false);
    alert("implement me!!!");
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1> Welcome to Crushing Debt, the Student Loan Simulator!</h1>
        {!simStarted && 
          <Button text="start loan sim" onClick={startButtonHandleClick} />
        }
        {showFields && (
          <div className="mt-4">
            <Button text="Create Loan" onClick={createLoanHandleClick} />
            {showLoanFields && <LoanForm onAddLoan={handleAddLoan} />}
            <Button text="Create Savings Account" onClick={createSavingsHandleClick} />
            {showSavingsFields && <SavingsAccountForm onAddSavings={handleAddSavings} />}
            <Button text="Done Adding Accounts" onClick={promptSimulationParameters} />
          </div>
        )}
      </main>
    </div>
  );
}
