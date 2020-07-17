import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const outcomes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const incomeSum = incomes.reduce((sum, item) => {
      return sum + item.value;
    }, 0);

    const outcomeSum = outcomes.reduce((sum, item) => {
      return sum + item.value;
    }, 0);

    const balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionData): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
