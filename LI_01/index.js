const fs = require("fs");
const { type } = require("os");
const { Date } = require("date-fns");

const transaction = {
  transaction_id: "1",
  transaction_date: "2019-01-01",
  transaction_amount: "100.00",
  transaction_type: "debit",
  transaction_description: "Payment for groceries",
  merchant_name: "SuperMart",
  card_type: "Visa",
};

class TransactionAnalyzer {
  constructor(transactions) {
    this.transactions = transactions;
  }

  addTransaction(transaction) {
    return this.transactions.push(transaction);
  }

  getAllTransaction() {
    return this.transactions;
  }

  getUniqueTransactionType() {
    const UniqueTransactionTypes = new Set();
    this.transactions.forEach((transaction) =>
      UniqueTransactionTypes.add(transaction.transaction_type)
    );
    return Array.from(UniqueTransactionTypes);
  }

  getTransactionByType(type) {
    const TransactionsByType = [];
    this.transactions.forEach((transaction) => {
      if (transaction.transaction_type === type) {
        TransactionsByType.push(transaction);
      }
    });
    return TransactionsByType;
  }

  getTransactionsInDateRange(startDate, endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const transactionsInRange = this.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      return transactionDate >= startDateObj && transactionDate <= endDateObj;
    });

    return transactionsInRange;
  }

  getTransactionsByMerchant(merchantName) {
    const TransactionsByType = [];
    this.transactions.forEach((transaction) => {
      if (transaction.merchant_name === merchantName) {
        TransactionsByType.push(transaction);
      }
    });
    return TransactionsByType;
  }

  getTransactionsByAmountRange(minAmount, maxAmount) {
    const TransactionsByAmountRange = [];
    this.transactions.forEach((transaction) => {
      if (transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount) {
        TransactionsByAmountRange.push(transaction);
      }
    });
    return TransactionsByAmountRange;
}

  getTransactionsBeforeDate(date) {
    const targetDate = new Date(date);

    const transactionsBeforeDate = this.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        return transactionDate < targetDate;
    });

    return transactionsBeforeDate;
}

  calculateTotalAmount() {
    let TotalAmount = 0;
    this.transactions.forEach(
      (transaction) => (TotalAmount += transaction.transaction_amount)
    );
    return TotalAmount;
  }

  calculateTotalDebitAmount() {
    let TotalDebitAmount = 0;

    this.transactions.forEach((transaction) => {
      if (transaction.transaction_type === "debit") {
        TotalDebitAmount += transaction.transaction_amount;
      }
    });

    return TotalDebitAmount;
  }

  calculateTotalAmountByDate(year, month, day) {
    const isTransactionOnDate = (transaction, year, month, day) => {
        if (!year && !month && !day) {
            return true;
        }
        const transactionDate = new Date(transaction.transaction_date);
        if (year && transactionDate.getFullYear() !== year) {
            return false;
        }
        if (month && transactionDate.getMonth() + 1 !== month) {
            return false;
        }
        if (day && transactionDate.getDate() !== day) {
            return false;
        }
        return true;
    };

    const transactionsOnDate = this.transactions.filter(transaction => {
        return isTransactionOnDate(transaction, year, month, day);
    });

    const totalAmount = transactionsOnDate.reduce((total, transaction) => {
        return total + transaction.transaction_amount;
    }, 0);

    return totalAmount;
}

  calculateAverageTransactionAmount() {
    let AverageTransactionAmount = 0;
    let TransactionCounter = 0;

    this.transactions.forEach(() => {
      TransactionCounter++;
    });
    AverageTransactionAmount = this.calculateTotalAmount() / TransactionCounter;

    //calculating average by taking sum and dividing on all transactions
    return AverageTransactionAmount;
  }

  findMostTransactionsMonth() {
    const transactionsByMonth = {};

    this.transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        const month = transactionDate.getMonth() + 1; // months starts from 0 bruh

        if (transactionsByMonth[month]) {
            transactionsByMonth[month]++;
        } else {
            transactionsByMonth[month] = 1;
        }
    });

    let mostTransactionsMonth = null;
    let maxTransactions = 0;
    for (const month in transactionsByMonth) {
        if (transactionsByMonth[month] > maxTransactions) {
            maxTransactions = transactionsByMonth[month];
            mostTransactionsMonth = month;
        }
    }

    return mostTransactionsMonth;
}

  findMostDebitTransactionMonth() {
    const debitTransactionsByMonth = {};

    this.transactions.forEach(transaction => {
        if (transaction.transaction_type === "debit") {
        const transactionDate = new Date(transaction.transaction_date);
        const month = transactionDate.getMonth() + 1; // months starts from 0 bruh

        if (debitTransactionsByMonth[month]) {
            debitTransactionsByMonth[month]++;
        } else {
            debitTransactionsByMonth[month] = 1;
        }
    }
    });

    let mostDebitTransactionsMonth = null;
    let maxTransactions = 0;
    for (const month in debitTransactionsByMonth) {
        if (debitTransactionsByMonth[month] > maxTransactions) {
            maxTransactions = debitTransactionsByMonth[month];
            mostDebitTransactionsMonth = month;
        }
    }

    return mostDebitTransactionsMonth;
  }

  findTransactionById(id) {
    let TransactionById;
    this.transactions.forEach((transaction) => {
      if (transaction.transaction_id == id) {
        TransactionById = transaction;
      }
    });
    return TransactionById;
  }

  mostTransactionTypes() {
    let mostTransactionType = "";
    let DebitTransactionsNumber = 0;
    let CreditTransactionsNumber = 0;

    this.transactions.forEach((transaction) => {
      if (transaction.transaction_type === "debit") {
        DebitTransactionsNumber++;
      } else CreditTransactionsNumber++;
    });
    if (DebitTransactionsNumber > CreditTransactionsNumber) {
      mostTransactionType = "debit";
    } else if (DebitTransactionsNumber < CreditTransactionsNumber) {
      mostTransactionType = "credit";
    } else mostTransactionType = "equal";

    return mostTransactionType;
  }

  mapTransactionDescriptions() {
    let TransactionDescriptions = [];

    this.transactions.forEach((transaction) => {
      TransactionDescriptions.push(transaction.transaction_description);
    });

    return TransactionDescriptions;
  }
}

const transactionsData = fs.readFileSync(
  "USM/JS/USM_JS-TS/LI_01/transaction.json"
);
const transactions = JSON.parse(transactionsData);

// Analizator 3000
const Analyzer = new TransactionAnalyzer(transactions);

// tests 
// by order in class

// console.log(Analyzer.addTransaction()); 
// console.log(Analyzer.getAllTransaction()); 
// console.log(Analyzer.getUniqueTransactionType()); 
// console.log(Analyzer.getTransactionByType('credit')); 
// console.log(Analyzer.getTransactionsInDateRange('2019-01-01', '2019-01-05')); 
// console.log(Analyzer.getTransactionsByMerchant('SuperMart')); 
// console.log(Analyzer.getTransactionsByAmountRange(100, 120));  
// console.log(Analyzer.getTransactionsBeforeDate('2019-02-01')); 
// console.log(Analyzer.calculateTotalAmount());                   // 8000
// console.log(Analyzer.calculateTotalDebitAmount());              // 7180
// console.log(Analyzer.calculateTotalAmountByDate(2019, 1, 1));   // with ints as parameters
// console.log(Analyzer.calculateAverageTransactionAmount());      // 66.66666666666667
// console.log(Analyzer.findMostTransactionsMonth());              // 1
// console.log(Analyzer.findMostDebitTransactionMonth());          // 3
// console.log(Analyzer.findTransactionById(24));                  // set == instead of === for working numbers as parameters
// console.log(Analyzer.mostTransactionTypes());                   // debit
// console.log(Analyzer.mapTransactionDescriptions()); 

//idk why only separate clg launch works because when uncommenting ALL clgs - it throws errors ¯\_(ツ)_/¯