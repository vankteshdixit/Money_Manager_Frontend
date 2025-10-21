import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ExpenseChart from '../components/ExpenseChart.jsx';
import IncomeChart from '../components/IncomeChart.jsx';
import StatCard from '../components/StatCard.jsx';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // This endpoint is defined in your DashboardController
        const response = await api.get('/dashboard');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading Dashboard...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  // The backend provides these keys
  const { 
    totalBalance, 
    totalIncome, 
    toExpense, // Note: backend has a typo 'toExpense'
    recent5Expenses, 
    recent5Incomes,
    recentTransactions 
  } = data;

  return (
    <div style={styles.dashboard}>
      <h2>Dashboard</h2>
      
      {/* 1. Stats Cards */}
      <div style={styles.statsGrid}>
        <StatCard title="Total Balance" value={totalBalance} />
        <StatCard title="Total Income" value={totalIncome} />
        <StatCard title="Total Expense" value={toExpense} />
      </div>
      
      {/* 2. Charts */}
      <div style={styles.chartsGrid}>
        <div style={styles.chartContainer}>
          <h3>Expenses by Category</h3>
          <ExpenseChart data={recent5Expenses} />
        </div>
        <div style={styles.chartContainer}>
          <h3>Recent Incomes</h3>
          <IncomeChart data={recent5Incomes} />
        </div>
      </div>
      
      {/* 3. Recent Transactions List */}
      <div style={styles.listContainer}>
        <h3>Recent Transactions</h3>
        <ul style={styles.list}>
          {recentTransactions.map(t => (
            <li key={`${t.type}-${t.id}`} style={styles.listItem}>
              <span>{t.name} ({t.date})</span>
              <span style={{color: t.type === 'expense' ? 'red' : 'green'}}>
                {t.type === 'expense' ? '-' : '+'}${t.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  dashboard: { padding: '2rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' },
  chartsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', minHeight: '300px' },
  chartContainer: { padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px' },
  listContainer: { /* styles for list */ },
  list: { listStyle: 'none', padding: 0 },
  listItem: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px solid #eee' }
};

export default Dashboard;