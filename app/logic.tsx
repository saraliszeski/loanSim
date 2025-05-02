import React, { useState, useEffect } from 'react';
import "./globals.css";
import { Loan } from "../components/Calculation";
import SavingsAccountForm, { SavingsAccount } from '../components/SavingsForm';
import { runSimulationYearlyCompound } from '../components/Calculation';
import SimulationConfiguration, { SimulationParams } from '../components/SimulationConfigurationForm';


const logicFunctions = {
 startButtonHandleClick : (simStarted: boolean, setShowFields: React.Dispatch<React.SetStateAction<boolean>>, 
    setSimStarted: React.Dispatch<React.SetStateAction<boolean>>, setShowCreationButtons: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!simStarted) {
        setShowFields(true);
        setSimStarted(true);
        setShowCreationButtons(true);
    }
},

 handleAddSavings : (account: SavingsAccount, setSavingsAccounts: React.Dispatch<React.SetStateAction<SavingsAccount[]>>, setShowSavingsFieldsButton:  React.Dispatch<React.SetStateAction<boolean>>, setSavingsAccountsPresent:  React.Dispatch<React.SetStateAction<boolean>>) => {
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
},



 handleAddLoan : (loan: Loan, setShowLoanFieldsButton:  React.Dispatch<React.SetStateAction<boolean>>, setLoans: React.Dispatch<React.SetStateAction<Loan[]>> ) => {
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
},
 createLoanHandleClick : (setShowLoanFieldsButton: React.Dispatch<React.SetStateAction<boolean>>) => {
    setShowLoanFieldsButton((prev) => ! prev);
   // setShowCreateLoanButton()
  },
   createSavingsHandleClick : (setShowSavingsFieldsButton: React.Dispatch<React.SetStateAction<boolean>>, showSavingsFields: boolean) => setShowSavingsFieldsButton(!showSavingsFields),

   promptSimulationParameters : (setShowLoanFieldsButton: React.Dispatch<React.SetStateAction<boolean>>, setShowSavingsFieldsButton: React.Dispatch<React.SetStateAction<boolean>>, setShowFields: React.Dispatch<React.SetStateAction<boolean>>,
    setShowSimulationParams: React.Dispatch<React.SetStateAction<boolean>>,setShowSimResult: React.Dispatch<React.SetStateAction<boolean>>,setShowCreationButtons: React.Dispatch<React.SetStateAction<boolean>>) => {
    console.log("done adding accounts clicked, requesting simulation parameters")
    setShowLoanFieldsButton(false);
    setShowSavingsFieldsButton(false)
    setShowFields(false);
    setShowSimulationParams(true);
    setShowSimResult(false);
   // setSimStarted(false);
    setShowCreationButtons(false);
  },

validateLoanPayment : (config: SimulationParams, savingsAccountsPresent: boolean, setShowSimulationParams: React.Dispatch<React.SetStateAction<boolean>>, setShowRunSinButton: React.Dispatch<React.SetStateAction<boolean>>, setSimConfig: React.Dispatch<React.SetStateAction<SimulationParams>>) => {
  
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
  },

   handleAddSimConfig : (simConfig: SimulationParams, savingsAccountsPresent: boolean, setShowSimulationParams: React.Dispatch<React.SetStateAction<boolean>>, setShowRunSinButton: React.Dispatch<React.SetStateAction<boolean>>, setSimConfig: React.Dispatch<React.SetStateAction<SimulationParams>>) => {
    logicFunctions.validateLoanPayment(simConfig, savingsAccountsPresent,setShowSimulationParams,setShowRunSinButton,setSimConfig);
  },

   handleLoanSave : (index: number, updatedLoan: Loan, setLoans: React.Dispatch<React.SetStateAction<Loan[]>> ) => {
    setLoans(prev => {
      const updated = [...prev];
      updated[index] = updatedLoan;
      return updated;
    });
  },
  
   handleLoanDelete : (index: number, setLoans: React.Dispatch<React.SetStateAction<Loan[]>>) => {
    setLoans(prev => prev.filter((_, i) => i !== index));
  },

 handleSavingsSave : (index: number, updatedAccount: SavingsAccount, setSavingsAccounts: React.Dispatch<React.SetStateAction<SavingsAccount[]>>) => {
    setSavingsAccounts(prev => {
      const updated = [...prev];
      updated[index] = updatedAccount;
      return updated;
    });
  },
  
 handleSavingsDelete : (index: number,setSavingsAccounts: React.Dispatch<React.SetStateAction<SavingsAccount[]>>) => {
    setSavingsAccounts(prev => prev.filter((_, i) => i !== index));
  },
  


runSimulation : (loans: Loan[], simConfig: SimulationParams, savingsAccounts: SavingsAccount[], setShowRunSinButton:  React.Dispatch<React.SetStateAction<boolean>>, 
    setSimResult: React.Dispatch<React.SetStateAction<any[]>>, setShowSimResult:  React.Dispatch<React.SetStateAction<boolean>>) => {
    console.log("running simulation yearly compound")
    setShowRunSinButton(false)

    let clonedLoans = JSON.parse(JSON.stringify(loans));
    let clonedSavings = JSON.parse(JSON.stringify(savingsAccounts));

    setSimResult(runSimulationYearlyCompound(clonedLoans, clonedSavings, Number(simConfig.paymentAmount),  Number(simConfig.totalContribution),  Number(simConfig.simulationEndYear) ));
  
    setShowSimResult(true);
  },

   showCurrentLoans : (setShowLoanList:  React.Dispatch<React.SetStateAction<boolean>>) => {
    setShowLoanList((prev) => ! prev);
  },
     showCurrentSavings : (setShowSavingsList:  React.Dispatch<React.SetStateAction<boolean>>) => {
    setShowSavingsList((prev) => ! prev);
  }


};
export default logicFunctions; 
