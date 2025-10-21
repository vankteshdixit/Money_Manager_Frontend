import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Function to process data for the chart
const processData = (expenses) => {
  const categoryMap = new Map();

  expenses.forEach(expense => {
    const category = expense.categoryName || 'N/A';
    const amount = categoryMap.get(category) || 0;
    categoryMap.set(category, amount + expense.amount);
  });

  return Array.from(categoryMap, ([name, value]) => ({ name, value }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ExpenseChart = ({ data }) => {
  const chartData = processData(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;