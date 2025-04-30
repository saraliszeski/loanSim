// LoanSavingsSimulation.ts
import LoanForm from "../components/LoanForm";
import SavingsAccountForm from '../components/SavingsForm';
import { SavingsAccount } from '../components/SavingsForm';


// types.ts
export interface Loan {
    name: string;
    originationYear: string;
    interestRate: string;
    initialAmount: string;
    currentPrincipal: number;
    interest: number;
    yearsTilPaymentStart: string;
  }
  
// Function to calculate the interest on loans
function calculateInterest(loans: Loan[], paymentAmount: number): number {
  const paymentPerLoan = paymentAmount / loans.length;
  let overPaid = 0;

  loans.forEach(loan => {
    console.log(loan)
    if (Number(loan.yearsTilPaymentStart) <= 0) {
      let interestAfterPayment = Number(loan.interest) - paymentPerLoan;
      if (interestAfterPayment < 0) {
        loan.currentPrincipal += interestAfterPayment;
        interestAfterPayment = 0;
      }
      loan.interest = interestAfterPayment;
    }

    if (loan.currentPrincipal < 0) {
      overPaid += Math.abs(loan.currentPrincipal);
      loan.currentPrincipal = 0;
      loan.interest = 0;
    }

    const currentTotalAmount = loan.currentPrincipal + loan.interest;
    const newInterest = (Number(loan.interestRate) / 100) * currentTotalAmount;
    loan.interest += newInterest;
    loan.yearsTilPaymentStart = (Number(loan.yearsTilPaymentStart)-1).toString();
  });

  return overPaid;
}

// Helper function to determine existing loans
function determineExistingLoans(loans: Loan[], currentYear: number): Loan[] {
  console.log("determining if loan valid", loans)
  console.log("current year: ", currentYear)
  return loans.filter(loan => Number(loan.originationYear) <= currentYear && (loan.currentPrincipal + loan.interest) > 0);
}

// Function to calculate the total owed across all loans
function calculateTotalOwed(loans: Loan[]): number {
  return loans.reduce((total, loan) => total + (loan.currentPrincipal + loan.interest), 0);
}

// Function to calculate the total loan cost (principal only)
function calculateLoanTotalCost(loans: Loan[]): number {
  return loans.reduce((totalCost, loan) => totalCost + Number(loan.initialAmount), 0);
}

// Function to handle overpayment redistribution
function redistributeOverpayment(loans: Loan[], year: number, overpayment: number): number {
  while (overpayment > 0) {
    loans = determineExistingLoans(loans, year);
    if (loans.length === 0) {
      return overpayment;
    }
    overpayment = calculateInterest(loans, overpayment);
  }
  return 0;
}
function validateSavingsAccountsStartYear(simulationStartYear: number, savingsAccounts: SavingsAccount[]): boolean {
  for(let savingsAccount of savingsAccounts){
    if(Number(savingsAccount.originationYear) < simulationStartYear){
      return false;
    }
  }
  return true;
}

// Function to run the simulation
export function runSimulationYearlyCompound(
  loans: Loan[],
  savingsAccounts: SavingsAccount[],
  paymentAmount: number,
  totalContribution: number,
  simulationEndYear: number
): [number, string, string] {

  if (loans.length === 0) {
    alert("No loans added, please add loans before running the simulation.");
    return [0,"", ""];
  }
 


  let amountPaid = 0;
  let year = getStartYear(loans);
  const startYear = year;
  let currentLoans = determineExistingLoans(loans, year);
  const loanPrincipalCost = calculateLoanTotalCost(loans);
  const spendingPerYear: Record<number, number> = {};

  if(! validateSavingsAccountsStartYear(year, savingsAccounts)){
    alert("Savings Accounts created Prior to earliest loan origination not yet supported. Simulation will run with account origination year equal to earliest loan origination. To request this behavior be changed, please contact Sara :)")
  }

  console.log("current loans:")
  console.log(currentLoans)
  if (calculateTotalOwed(loans) === 0) {
    return [amountPaid, "You owe $0 in loans....why are you here???", ""];
  }

  if (calculateTotalOwed(loans) < 0) {
    return [amountPaid, "The government owes YOU money. Pick up your pitchfork and go fight.", ""];
  }

  while (currentLoans.length === 0) {
    year += 1;
    currentLoans = determineExistingLoans(loans, year);
  }

  while (currentLoans.length > 0) {
    if (anyLoansInPaymentProcess(loans)) {
      amountPaid += paymentAmount;
    }

    const overpayment = calculateInterest(currentLoans, paymentAmount);
    const residualOverpayment = redistributeOverpayment(loans, year, overpayment);
    amountPaid -= residualOverpayment;

    spendingPerYear[year] = paymentAmount - residualOverpayment;

    console.log(`YEAR ${year}`);
    console.log(`TOTAL PAID: ${amountPaid}`);
    console.log(`YOU STILL OWE: ${calculateTotalOwed(loans)}`);
    console.log("");

    year += 1;
    if (year - 100 === startYear) {
      return [amountPaid =roundTo(amountPaid, 2), `You have died before paying off your loans. The devil will be your new debt collector for the amount of ${calculateTotalOwed(currentLoans)}`, ""];
    }

    if (year === simulationEndYear) {
      const totalOwed = calculateTotalOwed(loans);
      return [amountPaid =roundTo(amountPaid, 2), `Your debts in year ${year} are ${totalOwed}`, `Your net worth is ${consistentSavings(savingsAccounts, spendingPerYear, totalContribution) - amountPaid - totalOwed}`];
    }

    currentLoans = determineExistingLoans(loans, year);
  }
  amountPaid =roundTo(amountPaid, 2);


  if (savingsAccounts.length > 0) {
    const totalSavings = runNetWorthScenario(savingsAccounts, spendingPerYear, simulationEndYear, paymentAmount);
    return [amountPaid, `Your loans were paid off in year ${year - 1} for the cost of $${amountPaid}. \n You paid $${amountPaid - loanPrincipalCost} in interest`, `Your net worth in year ${simulationEndYear} is ${totalSavings - amountPaid}`];
  }

  return [amountPaid, `Your loans were paid off in year ${year - 1} for the cost of $${amountPaid}. \n You paid $${amountPaid - loanPrincipalCost} in interest`, ""];
}
const roundTo = function(num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};

function getStartYear(loans: Loan[]): number {
  return Math.min(...loans.map(loan => Number(loan.originationYear)));
}

function anyLoansInPaymentProcess(loans: Loan[]): boolean {
  return loans.some(loan => Number(loan.yearsTilPaymentStart) <= 0);
}

// Function to calculate consistent savsings
function consistentSavings(savingsAccounts: SavingsAccount[], spendingPerYear: Record<number, number>, totalContribution: number): number {
  let totalSavings = 0;

  savingsAccounts.forEach(account => {
    let accountValue = account.value;

    Object.keys(spendingPerYear).forEach(year => {
      const yearNum = parseInt(year);
      if (Number(account.originationYear) <= yearNum) {
        const rolloverFromPayments = (totalContribution - spendingPerYear[yearNum]) / savingsAccounts.length;
        accountValue += rolloverFromPayments;

        if (accountValue > 0) {
          accountValue *= (1 + Number(account.interestRate) / 100);
        } else {
          accountValue = 0;
        }
      }
    });

    totalSavings += accountValue;
  });

  return totalSavings;
}

// Function to calculate the net worth scenario
function runNetWorthScenario(savingsAccounts: SavingsAccount[], spendingPerYear: Record<number, number>, endYear: number, totalContribution: number): number {
  const endYearFromSim = Math.max(...Object.keys(spendingPerYear).map(year => parseInt(year)));
  let currYear = endYearFromSim + 1;

  while (currYear <= endYear) {
    spendingPerYear[currYear] = 0;
    currYear += 1;
  }

  return consistentSavings(savingsAccounts, spendingPerYear, totalContribution);
}
