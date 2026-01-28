import type { FunctionalComponent } from "preact";

interface BalanceProps {
  transactions: { id: number; text: string; amount: number }[];
}

export const Balance: FunctionalComponent<BalanceProps> = ({
  transactions,
}) => {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
    </>
  );
};
