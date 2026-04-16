import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, PlusCircle, Wallet } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20}/> },
    { name: 'Transactions', path: '/transactions', icon: <ListOrdered size={20}/> },
    { name: 'Add Transaction', path: '/add', icon: <PlusCircle size={20}/> },
    ];

    return (
    <div className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-gray-200 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10 px-2">
        <Wallet className="text-blue-600" size={28} />
        <h1 className="text-xl font-bold tracking-tight">Expensy</h1>
        </div>

        <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
            <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-100'
            }`}
        >
            {item.icon}
            {item.name}
            </Link>
        ))}
        </nav>
    </div>
    );
};

export default Sidebar;
