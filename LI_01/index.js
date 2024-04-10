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

  /**
   * Adds adittional transaction to the given array of transactions (this.transactions)
   * @param {object} transaction
   * @returns {object}
   */
  addTransaction(transaction) {
    return this.transactions.push(transaction);
  }

  /**
   * Returns object containing all transactions
   * @returns {object}
   */
  getAllTransaction() {
    return this.transactions;
  }

  /**
   * Returns array of Set of unique transaction types
   * @returns {array}
   */
  getUniqueTransactionType() {
    const uniqueTransactionTypes = new Set();
    this.transactions.forEach((transaction) =>
      uniqueTransactionTypes.add(transaction.transaction_type)
    );
    return Array.from(uniqueTransactionTypes);
  }

  /**
   * Returns transaction with type given via parameter
   * @param {string} type
   * @returns {object}
   */
  getTransactionByType(type) {
    const transactionsByType = [];
    this.transactions.forEach((transaction) => {
      if (transaction.transaction_type === type) {
        transactionsByType.push(transaction);
      }
    });
    return transactionsByType;
  }

  /**
   * Returns transaction in certain date range
   * @param {any} startDate
   * @param {any} endDate
   * @returns {object}
   */
  getTransactionsInDateRange(startDate, endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const transactionsInRange = this.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      return transactionDate >= startDateObj && transactionDate <= endDateObj;
    });

    return transactionsInRange;
  }

  /**
   * Returns transaction with merchant given via parameter
   * @param {string} merchantName
   * @returns {object}
   */
  getTransactionsByMerchant(merchantName) {
    const transactionsByType = [];
    this.transactions.forEach((transaction) => {
      if (transaction.merchant_name === merchantName) {
        transactionsByType.push(transaction);
      }
    });
    return transactionsByType;
  }

  /**
   * Returns transactions with amount in given range
   * @param {number} minAmount
   * @param {number} maxAmount
   * @returns {array}
   */
  getTransactionsByAmountRange(minAmount, maxAmount) {
    const transactionsByAmountRange = [];
    this.transactions.forEach((transaction) => {
      if (transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount) {
        transactionsByAmountRange.push(transaction);
      }
    });
    return transactionsByAmountRange;
}

  /**
   * Returns certain transaction that are in given date range
   * @param {any} date
   * @returns {array}
   */
  getTransactionsBeforeDate(date) {
    const targetDate = new Date(date);

    const transactionsBeforeDate = this.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.transaction_date);
        return transactionDate < targetDate;
    });

    return transactionsBeforeDate;
}

  /**
   * Calculates total amount of all transactions
   * @returns {number}
   */
  calculateTotalAmount() {
    let totalAmount = 0;
    this.transactions.forEach(
      (transaction) => (totalAmount += transaction.transaction_amount)
    );
    return totalAmount;
  }

  /**
   * Calculates total amount of debit transactions
   * @returns {any}
   */
  calculateTotalDebitAmount() {
    let totalDebitAmount = 0;

    this.transactions.forEach((transaction) => {
      if (transaction.transaction_type === "debit") {
        totalDebitAmount += transaction.transaction_amount;
      }
    });

    return totalDebitAmount;
  }

  /**
   * Calculates total amount of transaction in given date range. year, month and day aren't necessary. If one's out - calculates using other params.
   * @param {any} year
   * @param {any} month
   * @param {any} day
   * @returns {array}
   */
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

  /**
   * Calculates average transaction amount (total amount divided by number of all transactions)
   * @returns {number}
   */
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

  /**
   * Returns month that had most of the transactions
   * @returns {string}
   */
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

  /**
   * Returns month that had most of the debit transactions
   * @returns {string}
   */
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

  /**
   * Get transaction by its ID
   * @param {number} id
   * @returns {object}
   */
  findTransactionById(id) {
    let TransactionById;
    this.transactions.forEach((transaction) => {
      if (transaction.transaction_id == id) {
        TransactionById = transaction;
      }
    });
    return TransactionById;
  }

  /**
   * Returns most used type of transactions
   * @returns {any}
   */
  mostTransactionTypes() {
    let mostTransactionType = "";
    let debitTransactionsNumber = 0;
    let creditTransactionsNumber = 0;

    this.transactions.forEach((transaction) => {
      if (transaction.transaction_type === "debit") {
        debitTransactionsNumber++;
      } else creditTransactionsNumber++;
    });
    if (debitTransactionsNumber > creditTransactionsNumber) {
      mostTransactionType = "debit";
    } else if (debitTransactionsNumber < creditTransactionsNumber) {
      mostTransactionType = "credit";
    } else mostTransactionType = "equal";

    return mostTransactionType;
  }

  /**
   * Returns array with only transactions.descriptions
   * @returns {any}
   */
  mapTransactionDescriptions() {
    let transactionDescriptions = [];

    this.transactions.forEach((transaction) => {
      transactionDescriptions.push(transaction.transaction_description);
    });

    return transactionDescriptions;
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