import { usePortfolio } from "../../../context/PortafolioContext";

export const TransactionsTable = () => {
    const { transactions } = usePortfolio();
    const recentTransactions = transactions.slice(0, 5);

    return (
        <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Transacciones Recientes</h2>
            <div className="bg-gradient-to-br from-[#1a1d24] to-[#14161a] border border-white/10 rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Empresa</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Acciones</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Precio</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        No hay transacciones recientes
                                    </td>
                                </tr>
                            ) : (
                                recentTransactions.map((transaction, index) => (
                                    <tr key={index} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {transaction.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${transaction.type === "compra"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-red-500/20 text-red-400"
                                                }`}>
                                                {transaction.type === "compra" ? "Compra" : "Venta"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-white">{transaction.ticker}</span>
                                                <span className="text-xs text-gray-400">{transaction.company}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {transaction.shares}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            C$ {transaction.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                                            C$ {transaction.total.toLocaleString("es-NI", { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
