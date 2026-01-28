import { useState } from "preact/hooks";
import "./app.css";
import { Header } from "./components/Header";
import { Balance } from "./components/Balance";
import { IncomeExpenses } from "./components/IncomeExpenses";
import { TransactionList } from "./components/TransactionList";
import { AddTransaction } from "./components/AddTransaction";

interface Transaction {
  id: number;
  text: string;
  amount: number;
}

export function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
  ]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id),
    );
  };

  return (
    <div className="container">
      <Header />
      <Balance transactions={transactions} />
      <IncomeExpenses transactions={transactions} />
      <TransactionList
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
      <AddTransaction addTransaction={addTransaction} />
    </div>
  );
}
