import type { FunctionalComponent } from "preact";
import { useMemo } from "preact/hooks";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Transaction } from "../app";

interface ExpensePieChartProps {
  transactions: Transaction[];
}

const COLORS = {
  Transportation: "#FF6384",
  Food: "#36A2EB",
  Entertainment: "#FFCE56",
  Utilities: "#4BC0C0",
  Shopping: "#9966FF",
  Health: "#FF9F40",
  Other: "#C9CBCF",
};

export const ExpensePieChart: FunctionalComponent<ExpensePieChartProps> = ({
  transactions,
}) => {
  const chartData = useMemo(() => {
    const expensesByCategory: Record<string, number> = {};

    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        const category = transaction.category || "Other";
        expensesByCategory[category] =
          (expensesByCategory[category] || 0) + Math.abs(transaction.amount);
      }
    });

    return Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
    }));
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div style={{ marginTop: "20px" }}>
        <h3>Expense Distribution</h3>
        <p style={{ color: "#999" }}>
          No expenses yet. Add some expenses to see the chart.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Expense Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: $${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name as keyof typeof COLORS] || COLORS.Other}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `$${(value as number).toFixed(2)}`}
            labelFormatter={(label) => `Category: ${label}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
