import { PieChart, Pie,Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import BalanceCard from '../Components/BalanceCard';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Dashboard = ({ transactions }) => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);

  // Data for Pie Chart (Category Breakdown)
    const categoryData = Object.values(expenses.reduce((acc, t) => {
    acc[t.category] = { name: t.category, value: (acc[t.category]?.value || 0) + t.amount };
    return acc;
    }, {}));

  // Data for Line Chart (Monthly Trend)
    const monthlyData = Object.values(expenses.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short' });
    acc[month] = { month, amount: (acc[month]?.amount || 0) + t.amount };
    return acc;
    }, {})).sort((a, b) => new Date(a.month) - new Date(b.month));

    return (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceCard title="Balance" amount={income - totalExpense} type="balance" />
        <BalanceCard title="Income" amount={income} type="income" />
        <BalanceCard title="Expenses" amount={totalExpense} type="expense" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Donut Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold mb-4">Expenses by Category</h3>
            <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            </div>
        </div>

        {/* Monthly Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <h3 className="font-bold mb-4">Monthly Spending Trend</h3>
            <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Dashboard;
