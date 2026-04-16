import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './Components/TransactionList';
import AddTransaction from './Components/AddTransaction';

function App() {
  // 1. Initialize state from LocalStorage to prevent data loss on refresh
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem('expensy_v3_data');
    return savedData ? JSON.parse(savedData) : [
      { id: 1, title: 'Freelance Project', amount: 3000, type: 'income', category: 'Work', date: '2024-03-01' },
      { id: 2, title: 'Monthly Rent', amount: 1200, type: 'expense', category: 'Housing', date: '2024-03-05' },
      { id: 3, title: 'Grocery Store', amount: 150, type: 'expense', category: 'Food', date: '2024-03-10' }
    ];
  });

  // 2. Sync state to LocalStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('expensy_v3_data', JSON.stringify(transactions));
  }, [transactions]);

  // 3. Logic to add a new transaction with a unique ID
  const addTransaction = (newTx) => {
    const transactionWithId = { ...newTx, id: Date.now() };
    setTransactions((prev) => [...prev, transactionWithId]);
  };

  // 4. Logic to delete a transaction by ID
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content Area: Offset by sidebar width (ml-60 = 240px) */}
        <main className="ml-60 flex-1 p-10 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard transactions={transactions} />} 
              />
              <Route 
                path="/transactions" 
                element={<Transactions transactions={transactions} onDelete={deleteTransaction} />} 
              />
              <Route 
                path="/add" 
                element={<AddTransaction onAdd={addTransaction} />} 
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
