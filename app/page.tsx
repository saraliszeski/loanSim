'use client'; // Ensure this is also at the top of the page using Button
import React, { useState, useEffect } from 'react';
import "./globals.css";
import { Loan } from "../components/Calculation";
import LoanForm from "../components/LoanForm";
import SavingsAccountForm, { SavingsAccount } from '../components/SavingsForm';
import Button from "../components/Button";
import { runSimulationYearlyCompound } from '../components/Calculation';
import SimulationConfiguration, { SimulationParams } from '../components/SimulationConfigurationForm';
import StringDisplay from '../components/StringDisplay';
import SafeStringDisplay from '../components/SafeStringDisplay';

export default function Home() {
  const [showFields, setShowFields] = useState(false);
  const [showLoanFields, setShowLoanFieldsButton] = useState(false);
  const [showSavingsFields, setShowSavingsFieldsButton] = useState(false);
  const [simStarted, setSimStarted] = useState(false);
  const [savingsAccounts, setSavingsAccounts] = useState<SavingsAccount[]>([]);
  const [showSimulationParams, setShowSimulationParams] = useState(false);
  const [showRunSimButton, setShowRunSinButton] = useState(false);
  const [simConfig, setSimConfig] = useState<SimulationParams>({
    simulationEndYear: "",
    paymentAmount: "",
    totalContribution:"",
  });
  const [simResult, setSimResult] = useState<any[]>([0, "", ""]);
  const [showSimResult, setShowSimResult] = useState(false);


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
    const { initialAmount, interestRate, name, originationYear, yearsTilPaymentStart } = loan;
    console.log( "adding loan", loan);
    if (initialAmount && interestRate && name && originationYear && yearsTilPaymentStart) {
      setLoans((prev) => [...prev, loan]);
      alert("Loan Added!");
      setShowLoanFieldsButton((prev) => ! prev)
   
    } else {
      console.log(initialAmount);
      console.log(interestRate);
      console.log(name);
      console.log(originationYear);
      console.log(yearsTilPaymentStart);

      alert("Insufficient information, loan not added");
    }
  };

  useEffect(() => {
    console.log("current loans in pre sim:");
    console.log(loans);
  }, [loans]);

  const createLoanHandleClick = () => {
    setShowLoanFieldsButton(true);
  }
  const createSavingsHandleClick = () => setShowSavingsFieldsButton(!showSavingsFields);

  const promptSimulationParameters = () => {
    console.log("done adding accounts clicked, requesting simulation parameters")
    setShowLoanFieldsButton(false);
    setShowSavingsFieldsButton(false)
    setShowFields(false);
    setShowSimulationParams(true);
  }

  const handleAddSimConfig = (simConfig: SimulationParams) => {
    setShowSimulationParams(false);
    setShowRunSinButton(true);
    setSimConfig(simConfig)
  
  }
  const runSimulation = () => {
    console.log("running simulation yearly compound")
    setShowRunSinButton(false)
    setSimResult(runSimulationYearlyCompound(loans, savingsAccounts, Number(simConfig.paymentAmount),  Number(simConfig.totalContribution),  Number(simConfig.simulationEndYear) ));
    setShowSimResult(true);
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
        {showSimulationParams && <SimulationConfiguration onAddConfig={handleAddSimConfig}/>}
        {showRunSimButton && <Button text="Run Simulation" onClick={runSimulation} /> }
        {showSimResult && (
                  <h1> TOTAL AMOUNT PAID:  {simResult[0]} <br></br>
                  {simResult[1]}  <br></br>
                  {simResult[2]}
                  </h1>
        )}      
      </main>
    </div>
  );
}
