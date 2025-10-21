import React from 'react';

// A simple component to display a title and a value
const StatCard = ({ title, value }) => {
  return (
    <div style={styles.card}>
      <h4 style={styles.title}>{title}</h4>
      <div style={styles.value}>
        ${value ? value.toLocaleString() : '0.00'}
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  title: {
    margin: 0,
    fontSize: '1rem',
    color: '#666',
    fontWeight: '600',
  },
  value: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginTop: '0.5rem',
  },
};

export default StatCard;