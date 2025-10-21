import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const IncomeChart = ({ data }) => {
  // Data is already {name, amount, date}, which is perfect for a bar chart
  const chartData = data.map(item => ({
      name: `${item.name.substring(0, 10)}... (${item.date})`, // Shorten name
      amount: item.amount 
  })).reverse(); // Show oldest first

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeChart;