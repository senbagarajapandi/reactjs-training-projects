import React, { useState, useEffect } from 'react';
import { Entry } from './components/interfaces';
import { calculateTotals, aggregateByMonth } from './components/utils';
import Chart from './components/Chart'

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [editEntry, setEditEntry] = useState<Entry | null>(null);

  useEffect(() => {
    if (editEntry) {
      setDescription(editEntry.description);
      setAmount(editEntry.amount);
      setType(editEntry.type);
    }
  }, [editEntry]);

  const handleAddEntry = () => {
    if (!editEntry) {
      const newEntry: Entry = {
        id: Math.random().toString(36).substr(2, 9),
        description,
        amount,
        type,
        date: new Date().toISOString(),
      };
      setEntries([...entries, newEntry]);
    } else {
      handleEditEntry(editEntry.id, {id:editEntry.id, 
        description,
        amount,
        type,
        date: new Date().toISOString()})
      setEditEntry(null);
    }
    setDescription('');
    setAmount(0);
    setType('income');
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleEditEntry = (id: string, UpdatedEntry: Entry) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? UpdatedEntry : entry
      )
    );
  };

  const totals = calculateTotals(entries);
  const monthlyData = aggregateByMonth(entries);
  console.log(monthlyData);
  

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className='entry'>
        <div className='left'>
          <h2>{editEntry ? "Edit Entry":"Add Entry"}</h2>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Amount"
          />
          <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button onClick={handleAddEntry}>{editEntry ? "Edit":"Add"}</button>
        </div>
        <div className='right'>
          <h2>Summary</h2>
          <div>
            <p>Total Income: ₹{totals.totalIncome}</p>
            <p>Total Expense: ₹{totals.totalExpense}</p>
            <p>Balance: ₹{totals.balance}</p>
          </div>
        </div>
      </div>
      <div className='entry'>
        <div className='left'>
          <h2>Entries</h2>
          <ul>
            { 
              entries.length ? (entries.map((entry) => (
                <li key={entry.id}>
                  <p>{entry.description}: ₹{entry.amount} ({entry.type})</p>
                  <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
                  <button
                    onClick={() => setEditEntry(entry)}>Edit</button>
              </li>
            ))) : (<p>No Entries</p>)
            }
          </ul>
        </div>
        <div className='right'>
          <h2>Monthly Trend</h2>
          <Chart entries={entries} />
        </div>
      </div>
    </div>
  );
};

export default App;