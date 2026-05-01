import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

interface AddTransactionProps {
  addTransaction: (transaction: {
    id: number;
    text: string;
    amount: number;
    category?: string;
  }) => void;
}

export const AddTransaction: FunctionalComponent<AddTransactionProps> = ({
  addTransaction,
}) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState("Other");

  const onSubmit = (e: Event) => {
    e.preventDefault();

    if (!text || !amount) return;

    const amountNumber = parseFloat(amount);
    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: amountNumber,
      category: amountNumber < 0 ? category : undefined,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");
    setCategory("Other");
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
        {amount && parseFloat(amount) < 0 && (
          <div class="form-control">
            <label htmlFor="category">Category</label>
            <select
              value={category}
              onChange={(e) =>
                setCategory((e.target as HTMLSelectElement).value)
              }
            >
              <option value="Transportation">Transportation</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
        <button class="btn">Add transaction</button>
      </form>
    </>
  );
};
