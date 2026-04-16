import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTransaction = ({ onAdd }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    title: '', amount: '', category: 'Food', type: 'expense', date: new Date().toISOString().split('T')[0]
    });

    const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, amount: parseFloat(formData.amount) });
    navigate('/transactions');
    };

    return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Add New Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input required type="text" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Grocery shopping..." onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
            <input required type="number" step="0.01" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={e => setFormData({...formData, amount: e.target.value})} />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input type="text" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={e => setFormData({...formData, category: e.target.value})} />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
        </div>
        <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
            Save Transaction
        </button>
        </form>
    </div>
);
};

export default AddTransaction;
