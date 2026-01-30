import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

interface AddTransactionProps {
  addTransaction: (transaction: {
    id: number;
    text: string;
    amount: number;
  }) => void;
}

export const AddTransaction: FunctionalComponent<AddTransactionProps> = ({
  addTransaction,
}) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState<string>("");

  const onSubmit = (e: Event) => {
    e.preventDefault();

    if (!text || !amount) return;

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div class="form-control">
          <label htmlFor="text">Description</label>
          <input
            type="text"
            value={text}
            onInput={(e) => setText((e.target as HTMLInputElement).value)}
            placeholder="Enter description..."
          />
        </div>
        <div class="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onInput={(e) => setAmount((e.target as HTMLInputElement).value)}
            placeholder="Enter amount..."
          />
        </div>
        <button class="btn">Add transaction</button>
      </form>
    </>
  );
};
