import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [categoryId, setCategoryId] = useState('');

  // Fetch expenses and expense categories
  const fetchData = async () => {
    try {
      setLoading(true);
      const expenseRes = await api.get('/expenses');
      setExpenses(expenseRes.data);
      
      const catRes = await api.get('/categories/expense');
      setCategories(catRes.data);
      if (catRes.data.length > 0) {
        setCategoryId(catRes.data[0].id); // Set default category
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/expenses', { name, amount: parseFloat(amount), date, categoryId: parseInt(categoryId), icon: 'default-icon' });
      // Reset form
      setName('');
      setAmount('');
      // Refresh list
      fetchData();
    } catch (err) {
      setError('Failed to add expense.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/expenses/${id}`);
        fetchData(); // Refresh list
      } catch (err) {
        setError('Failed to delete expense.');
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Add Expense Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Add Expense</h3>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.inputGroup}><label>Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} /></div>
        <div style={styles.inputGroup}><label>Amount</label><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required style={styles.input} /></div>
        <div style={styles.inputGroup}><label>Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={styles.input} /></div>
        <div style={styles.inputGroup}><label>Category</label><select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required style={styles.input}>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
        <button type="submit" style={styles.button}>Add Expense</button>
      </form>

      {/* List Expenses */}
      <div style={styles.listContainer}>
        <h3>This Month's Expenses</h3>
        {loading ? <p>Loading...</p> : (
          <ul style={styles.list}>
            {expenses.map((expense) => (
              <li key={expense.id} style={styles.listItem}>
                <div>
                  <div style={styles.itemName}>{expense.name}</div>
                  <div style={styles.itemDate}>{expense.date} ({expense.categoryName})</div>
                </div>
                <div>
                  <span style={styles.itemAmount}>-${expense.amount}</span>
                  <button onClick={() => handleDelete(expense.id)} style={styles.deleteButton}>X</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Styles (slight change for button and amount color)
const styles = {
  container: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' },
  form: { padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  inputGroup: { marginBottom: '1rem' },
  input: { width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', border: 'none', borderRadius: '4px', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer' },
  error: { color: 'red' },
  listContainer: { padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  list: { listStyle: 'none', padding: 0 },
  listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderBottom: '1px solid #eee' },
  itemName: { fontWeight: 'bold' },
  itemDate: { fontSize: '0.9rem', color: '#666' },
  itemAmount: { color: 'red', fontWeight: 'bold', marginRight: '1rem' },
  deleteButton: { backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default Expenses;