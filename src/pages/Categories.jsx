import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('expense'); // Default type
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch all categories on component load
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories'); 
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch categories.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/categories', { name, type, icon: 'default-icon' }); // Added icon
      setName(''); // Reset form
      fetchCategories(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Form to Create New Category */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Create New Category</h3>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.inputGroup}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.input}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Create</button>
      </form>

      {/* List of Existing Categories */}
      <div style={styles.listContainer}>
        <h3>Your Categories</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul style={styles.list}>
            {categories.map((cat) => (
              <li key={cat.id} style={styles.listItem}>
                <span>{cat.name}</span>
                <span style={cat.type === 'expense' ? styles.expenseTag : styles.incomeTag}>
                  {cat.type}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' },
  form: { padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  inputGroup: { marginBottom: '1rem' },
  input: { width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' },
  error: { color: 'red' },
  listContainer: { padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  list: { listStyle: 'none', padding: 0 },
  listItem: { display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid #eee' },
  expenseTag: { padding: '0.25rem 0.5rem', borderRadius: '12px', backgroundColor: '#ffebee', color: '#c62828' },
  incomeTag: { padding: '0.25rem 0.5rem', borderRadius: '12px', backgroundColor: '#e8f5e9', color: '#2e7d32' }
};

export default Categories;