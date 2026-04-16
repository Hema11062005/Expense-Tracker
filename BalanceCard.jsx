const BalanceCard = ({ title, amount, type }) => {
const colors = {
    balance: "bg-blue-600 text-white",
    income: "bg-white text-emerald-600 border border-gray-100",
    expense: "bg-white text-rose-600 border border-gray-100"
    };

    return (
    <div className={`p-6 rounded-2xl shadow-sm ${colors[type]}`}>
        <p className={`text-sm font-medium ${type === 'balance' ? 'text-blue-100' : 'text-gray-500'}`}>
        {title}
        </p>
        <h2 className="text-3xl font-bold mt-2">
        ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h2>
    </div>
);
};

export default BalanceCard;
