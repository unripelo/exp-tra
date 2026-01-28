import type { FunctionalComponent } from "preact";

interface Transaction {
  id: number;
  text: string;
  amount: number;
}

interface TransactionListProps {
  transactions: Transaction[];
  deleteTransaction: (id: number) => void;
}

export const TransactionList: FunctionalComponent<TransactionListProps> = ({
  transactions,
  deleteTransaction,
}) => {
  return (
    <>
      <h3>History</h3>
      <ul class="list">
        {transactions.map((transaction) => (
          <li
            class={transaction.amount < 0 ? "minus" : "plus"}
            key={transaction.id}
          >
            {transaction.text}{" "}
            <span>
              {transaction.amount < 0 ? "-" : "+"}$
              {Math.abs(transaction.amount)}
            </span>
            <button
              class="delete-btn"
              onClick={() => deleteTransaction(transaction.id)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
