import { Trash2 } from 'lucide-react';

const Transactions = ({ transactions, onDelete }) => (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
    <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
        <tr>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4 text-right">Action</th>
        </tr>
        </thead>
        <tbody className="divide-y">
        {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 font-medium">{t.title}</td>
            <td className="px-6 py-4 text-gray-500">{t.category}</td>
            <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {t.type === 'income' ? '+' : '-'}${t.amount}
            </td>
            <td className="px-6 py-4 text-right">
                <button onClick={() => onDelete(t.id)} className="text-gray-400 hover:text-rose-600 transition-colors">
                <Trash2 size={18} />
                </button>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);

export default Transactions;
