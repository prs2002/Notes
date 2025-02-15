import React, { useState, useEffect } from 'react';

const App = () => {
  const initialItems = [
    { id: 1, name: 'prs' },
    { id: 2, name: 'jagdish' },
    { id: 3, name: 'shraddha' },
    { id: 4, name: 'shrey' },
    { id: 5, name: 'aman' },
    { id: 6, name: 'anuj' },
    { id: 7, name: 'anmol' },
    { id: 8, name: 'prashant' },
    { id: 9, name: 'praneet' },
    { id: 10, name: 'jp' },
  ];

  const [search, setSearch] = useState('');
  const [items, setItems] = useState(initialItems);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleClear = () => {
    setSearch('');
  };
  const filteredItems = items.filter((item) => {
    return item.name.includes(search);
  });
  return (
    <div>
      <h2>List</h2>
      <input
        type="text"
        placeholder="Search Items"
        value={search}
        onChange={handleSearch}
      />
      <button onClick={handleClear}>Clear</button>
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <li key={item.id}> {item.name}</li>)
        ) : (
          <p>No Items Found </p>
        )}
      </ul>
    </div>
  );
};

export default App;
