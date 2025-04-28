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
import LoanList from '../components/LoanList';
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
  const [showCreationButtons, setShowCreationButtons] = useState(false);
  const [simResult, setSimResult] = useState<any[]>([0, "", ""]);
  const [showSimResult, setShowSimResult] = useState(false);
  const [savingsAccountsPresent, setSavingsAccountsPresent] = useState(false);
  const [showLoanList, setShowLoanList] = useState(false);
 // const [showCreateLoanButton, setShowCreateLoanButton] = useState(false);


  const handleAddSavings = (account: SavingsAccount) => {
    const { initialAmount, interestRate, accountName, originationYear } = account;

    if (initialAmount && interestRate && accountName && originationYear ) {
      if(Number.isNaN(Number(initialAmount)) || Number.isNaN(Number(interestRate)) || Number.isNaN(Number(originationYear)) ){
        alert("Input values must all be numbers")
      }
      else{
      setSavingsAccounts((prev) => [...prev, account]);
      alert("Savings Account Added!");
      setShowSavingsFieldsButton((prev) => ! prev)
      setSavingsAccountsPresent(true);
      }
    } else {
      alert("Insufficient information, account not added");
    }
  };

  const startButtonHandleClick = () => {
    if (!simStarted) {
      setShowFields(true);
      setSimStarted(true);
      setShowCreationButtons(true);
    }
  };

  const [loans, setLoans] = useState<Loan[]>([]);

  const handleAddLoan = (loan: Loan) => {
    const { initialAmount, interestRate, name, originationYear, yearsTilPaymentStart } = loan;
    console.log( "adding loan", loan);

    if (initialAmount && interestRate && name && originationYear && yearsTilPaymentStart) {
      if(Number.isNaN(Number(initialAmount)) || Number.isNaN(Number(interestRate)) || Number.isNaN(Number(originationYear)) || Number.isNaN(Number(yearsTilPaymentStart)) ){
        alert("Input values must all be numbers")
      }
      else{
        setLoans((prev) => [...prev, loan]);
        alert("Loan Added!");
        setShowLoanFieldsButton((prev) => ! prev)
      }
   
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
    setShowLoanFieldsButton((prev) => ! prev);
   // setShowCreateLoanButton()
  }
  const createSavingsHandleClick = () => setShowSavingsFieldsButton(!showSavingsFields);

  const promptSimulationParameters = () => {
    console.log("done adding accounts clicked, requesting simulation parameters")
    setShowLoanFieldsButton(false);
    setShowSavingsFieldsButton(false)
    setShowFields(false);
    setShowSimulationParams(true);
    setShowSimResult(false);
   // setSimStarted(false);
    setShowCreationButtons(false);
  }

  const validateLoanPayment = (config: SimulationParams) => {
    console.log("validating loan payment");
    console.log(savingsAccountsPresent);
    console.log(simConfig);
    console.log(config.paymentAmount != config.totalContribution);
      if(Number.isNaN(Number(config.paymentAmount)) || Number.isNaN(Number(config.simulationEndYear)) || Number.isNaN(Number(config.totalContribution)) ){
        alert("Input values must all be numbers")
      }
      else if(config.paymentAmount > config.totalContribution){
        alert("Payment may not exceed total contribution")
      }
      else if(! savingsAccountsPresent && config.paymentAmount != config.totalContribution){
        alert("No savings accounts present. Payment must match Total Contribution, or savings accounts must be added")
      }
      else{
        console.log("loan payment validated")
        setShowSimulationParams(false);
        setShowRunSinButton(true);
        setSimConfig(config)
      }
  }

  const handleAddSimConfig = (simConfig: SimulationParams) => {
    validateLoanPayment(simConfig);
  }

  const handleLoanSave = (index: number, updatedLoan: Loan) => {
    setLoans(prev => {
      const updated = [...prev];
      updated[index] = updatedLoan;
      return updated;
    });
  };
  
  const handleLoanDelete = (index: number) => {
    setLoans(prev => prev.filter((_, i) => i !== index));
  };
  


  const runSimulation = () => {
    console.log("running simulation yearly compound")
    setShowRunSinButton(false)

    const clonedLoans = JSON.parse(JSON.stringify(loans));
    const clonedSavings = JSON.parse(JSON.stringify(savingsAccounts));


    setSimResult(runSimulationYearlyCompound(clonedLoans, clonedSavings, Number(simConfig.paymentAmount),  Number(simConfig.totalContribution),  Number(simConfig.simulationEndYear) ));
    setShowSimResult(true);
  }

  const showCurrentLoans = () => {
    setShowLoanList((prev) => ! prev);
  }



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start buttonContainer">
      <div className="title-container fixed top-0 bg-white z-10 w-full text-center py-4 shadow-md flex items-center justify-center gap-4">
          <img 
            src="https://www.shutterstock.com/image-vector/atlas-holding-globe-logo-design-600nw-2194317793.jpg" 
            alt="Atlas Holding Globe" 
            className="w-24 h-24 object-cover rounded-full"
          />
           <div className="flex flex-col items-center pr-24"> {/* Padding right to match image size */}
            <h1 className="text-6xl font-bold text-purple-800">Welcome to Atlas!</h1>
            <p className="text-xl text-purple-600">The student loan and savings simulator</p>
          </div>
      </div>

        
        {!simStarted  &&
          <Button text="start loan sim" onClick={startButtonHandleClick} />
        }
        {showCreationButtons && 
  
        <div className="loanSavingsContainer">
          {/* Loan Box */}
          <div className="buttonHolder">
            <Button text="Create Loan" onClick={createLoanHandleClick} /> 
            {showLoanFields && <LoanForm onAddLoan={handleAddLoan} />}
          </div>

          {/* Savings Box */}
          <div className="buttonHolder">
            <Button text="Create Savings Account" onClick={createSavingsHandleClick} />
            {showSavingsFields && <SavingsAccountForm onAddSavings={handleAddSavings} />}
          </div>
        </div>
        }
  
        {showSimulationParams && <SimulationConfiguration onAddConfig={handleAddSimConfig}/>}

        {simStarted && showLoanList && <LoanList loans={loans} onSave={handleLoanSave} onDelete={handleLoanDelete} /> }
        {simStarted &&  <Button className="specialButton" onClick={showCurrentLoans} text="Show Current Loans" /> }


        {showFields && (
            <div className="mt-4">
              <Button text="Done Adding Accounts" onClick={promptSimulationParameters} />
            </div>
        )}
  
        {showRunSimButton && <Button text="Run Simulation" onClick={runSimulation} /> }
  
        {showSimResult && <StringDisplay text={simResult} />}      
        {showSimResult && <Button text="Rerun Simulation" onClick={promptSimulationParameters} /> }
      </main>
    </div>
  );
}
