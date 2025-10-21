import React from 'react';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div style={styles.filterBar}>
      <input
        type="text"
        name="keyword"
        placeholder="Search by name..."
        value={filters.keyword}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={handleChange}
        style={styles.input}
      />
      <select
        name="sortField"
        value={filters.sortField}
        onChange={handleChange}
        style={styles.input}
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
        <option value="name">Sort by Name</option>
      </select>
      <select
        name="sortOrder"
        value={filters.sortOrder}
        onChange={handleChange}
        style={styles.input}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
};

const styles = {
  filterBar: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  input: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    flex: '1',
  },
};

export default FilterBar;