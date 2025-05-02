'use client'; // Ensure this is also at the top of the page using Button
import React, { useState, useEffect } from 'react';
import "./globals.css";
import { Loan } from "../components/Calculation";
import LoanForm from "../components/LoanForm";
import SavingsAccountForm, { SavingsAccount } from '../components/SavingsForm';
import Button from "../components/Button";
import SimulationConfiguration, { SimulationParams } from '../components/SimulationConfigurationForm';
import StringDisplay from '../components/StringDisplay';
import LoanList from '../components/LoanList';
import SavingsList from '../components/SavingsList';
import CustomHeader from '../components/CustomHeader';
import DebtChart from '../components/DebtChart';
import logicFunctions from './logic';

export default function Home() {
  const OPEN = "Open";
  const CLOSE = "Close";

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
  const [simResult, setSimResult] = useState<any[]>([]);
  const [showSimResult, setShowSimResult] = useState(false);
  const [savingsAccountsPresent, setSavingsAccountsPresent] = useState(false);
  const [showLoanList, setShowLoanList] = useState(false);
  const [showSavingsList, setShowSavingsList] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([]);


  
  useEffect(() => {
    console.log("current loans in pre sim:");
    console.log(loans);
  }, [loans]);

  

  return (
    <div className="custom-grid grid grid-rows-[20px_1fr_20px]   min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="custom-main sm:items-start buttonContainer">
      <CustomHeader/>

        
        {!simStarted  &&
          <Button text="start loan sim" onClick={() => logicFunctions.startButtonHandleClick(simStarted, setShowFields, setSimStarted, setShowCreationButtons)} />
        }
        {showCreationButtons && 
  
        <div className="loanSavingsContainer">
          {/* Loan Box */}
          <div className="buttonHolder">
            <Button text="Create Loan" onClick={() => logicFunctions.createLoanHandleClick(setShowLoanFieldsButton)} /> 
            {showLoanFields && <LoanForm onAddLoan={(loan) => logicFunctions.handleAddLoan(loan, setShowLoanFieldsButton, setLoans)} />}
          </div>

          {/* Savings Box */}
          <div className="buttonHolder">
            <Button text="Create Savings Account" onClick={() => logicFunctions.createSavingsHandleClick(setShowSavingsFieldsButton, showSavingsFields)} />
            {showSavingsFields && <SavingsAccountForm onAddSavings={(savingsAccount) => logicFunctions.handleAddSavings(savingsAccount, setSavingsAccounts, setShowSavingsFieldsButton, setSavingsAccountsPresent)} />}
          </div>
        </div>
        }
  
        {showSimulationParams && <SimulationConfiguration onAddConfig={() => logicFunctions.handleAddSimConfig(simConfig, savingsAccountsPresent, setShowSimulationParams, setShowRunSinButton, setSimConfig)}/>}

        <div className="editableObjects">
        <div className="editableSection">
          {simStarted && showLoanList && (
            <LoanList loans={loans} onSave={(index, loan) => logicFunctions.handleLoanSave(index, loan, setLoans)} onDelete={(index) => logicFunctions.handleLoanDelete(index, setLoans)} />
          )}
          {simStarted && (
            <Button
              className="specialButton"
              onClick={ () => logicFunctions.showCurrentLoans(setShowLoanList)}
              text={(showLoanList ? CLOSE : OPEN) + " Current loans"}
            />
          )}
        </div>

        <div className="editableSection">
          {simStarted && showSavingsList && (
            <SavingsList accounts={savingsAccounts} onSave={(index, savingsAccount) => logicFunctions.handleSavingsSave(index, savingsAccount, setSavingsAccounts)} onDelete={(index) => logicFunctions.handleSavingsDelete(index, setSavingsAccounts)} />
          )}
          {simStarted && (
            <Button
              className="specialButton"
              onClick={() => logicFunctions.showCurrentSavings(setShowSavingsList)}
              text={(showSavingsList ? CLOSE : OPEN) + " Current savings accounts"}
            />
          )}
        </div>
      </div>

        {showFields && (
            <div className="mt-4">
              <Button text="Done Adding Accounts" onClick={() => logicFunctions.promptSimulationParameters(setShowLoanFieldsButton, setShowSavingsFieldsButton, setShowFields, setShowSimulationParams, setShowSimResult, setShowCreationButtons)} className="done-adding-accounts" />
            </div>
        )}
  
        {showRunSimButton && <Button text="Run Simulation" onClick={() => logicFunctions.runSimulation(loans, simConfig, savingsAccounts, setShowRunSinButton, setSimResult, setShowSimResult)} /> }
  
        {showSimResult && <StringDisplay text={simResult} />}   
        {showSimResult && <DebtChart debtArray={simResult[3]} />}
   
        {showSimResult && <Button text="Rerun Simulation" onClick={() => logicFunctions.promptSimulationParameters(setShowLoanFieldsButton, setShowSavingsFieldsButton, setShowFields, setShowSimulationParams, setShowSimResult, setShowCreationButtons)} className="done-adding-accounts" />}
      </main>
    </div>
  );
}
