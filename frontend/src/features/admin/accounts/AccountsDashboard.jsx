import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator, DollarSign, CreditCard, Receipt, FileText, FileSpreadsheet,
  TrendingUp, TrendingDown, AlertCircle, Calendar, ArrowUpRight, ArrowDownRight,
  Users, Activity, Clock, History
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';

// --- Mock Data ---
const monthlyData = [
  { name: 'Jan', income: 45000, expenses: 32000 },
  { name: 'Feb', income: 52000, expenses: 38000 },
  { name: 'Mar', income: 48000, expenses: 30000 },
  { name: 'Apr', income: 61000, expenses: 35000 },
  { name: 'May', income: 59000, expenses: 40000 },
  { name: 'Jun', income: 65000, expenses: 42000 },
];

const recentTransactions = [
  { id: 'INV-2023-001', client: 'TechCorp Ltd.', date: 'Today, 10:24 AM', amount: '$4,500', type: 'income', status: 'Paid' },
  { id: 'EXP-1045', client: 'HP Consumables', date: 'Yesterday, 02:15 PM', amount: '$1,200', type: 'expense', status: 'Completed' },
  { id: 'INV-2023-002', client: 'Globex Inc.', date: 'Nov 14, 09:00 AM', amount: '$8,900', type: 'income', status: 'Pending' },
  { id: 'TAX-Q3', client: 'State Tax Dept.', date: 'Nov 10, 11:45 AM', amount: '$5,400', type: 'expense', status: 'Completed' },
];

// --- Components ---
const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {trendValue}
      </div>
    </div>
    <h3 className="text-gray-500 text-sm font-semibold mb-1">{title}</h3>
    <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
  </div>
);

const QuickLink = ({ icon: Icon, label, path, colorClass }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
    >
      <Icon className={`w-8 h-8 mb-3 ${colorClass} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />
      <span className="text-sm font-medium text-gray-700 text-center">{label}</span>
    </button>
  );
};

const AccountsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shadow-inner">
            <Calculator className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Accounts Overview</h1>
            <p className="text-sm text-gray-500 font-medium">Financial summary and quick access links.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/admin/accounts/invoices')}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium shadow-md transition-colors"
          >
            Create Invoice
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue (YTD)" value="$330,000" icon={TrendingUp} trend="up" trendValue="+14%" color="bg-emerald-50 text-emerald-600" />
        <StatCard title="Total Expenses (YTD)" value="$217,000" icon={TrendingDown} trend="down" trendValue="-2%" color="bg-rose-50 text-rose-600" />
        <StatCard title="Outstanding Receivables" value="$42,500" icon={AlertCircle} trend="up" trendValue="+5%" color="bg-amber-50 text-amber-600" />
        <StatCard title="Net Profit" value="$113,000" icon={DollarSign} trend="up" trendValue="+22%" color="bg-blue-50 text-blue-600" />
      </div>

      {/* Quick Links Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-600" />
          Financial Modules
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          <QuickLink icon={FileText} label="Invoices" path="/admin/accounts/invoices" colorClass="text-blue-600" />
          <QuickLink icon={CreditCard} label="Payments" path="/admin/accounts/payments" colorClass="text-emerald-600" />
          <QuickLink icon={AlertCircle} label="Pending" path="/admin/accounts/pending" colorClass="text-amber-500" />
          <QuickLink icon={Receipt} label="Receipts" path="/admin/accounts/receipts" colorClass="text-indigo-500" />
          <QuickLink icon={TrendingUp} label="Credit Notes" path="/admin/accounts/credit-notes" colorClass="text-purple-500" />
          <QuickLink icon={TrendingDown} label="Debit Notes" path="/admin/accounts/debit-notes" colorClass="text-rose-500" />
          <QuickLink icon={Calculator} label="Expenses" path="/admin/accounts/expenses" colorClass="text-orange-500" />
          
          <QuickLink icon={Users} label="Vendor Pays" path="/admin/accounts/vendors" colorClass="text-cyan-600" />
          <QuickLink icon={FileSpreadsheet} label="Taxes" path="/admin/accounts/taxes" colorClass="text-teal-600" />
          <QuickLink icon={FileText} label="GST Reports" path="/admin/accounts/gst" colorClass="text-pink-600" />
          <QuickLink icon={Activity} label="Profit & Loss" path="/admin/accounts/pl" colorClass="text-blue-700" />
          <QuickLink icon={Clock} label="Outstanding" path="/admin/accounts/outstanding" colorClass="text-red-500" />
          <QuickLink icon={FileSpreadsheet} label="Financials" path="/admin/accounts/financial-summary" colorClass="text-emerald-700" />
        </div>
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Income vs Expenses Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            Cash Flow Overview (Last 6 Months)
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `$${value/1000}k`} />
                <RechartsTooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, '']}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="expenses" name="Expenses" fill="#F43F5E" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <History className="w-5 h-5 text-gray-400" />
              Recent Transactions
            </h2>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {tx.type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{tx.client}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>{tx.amount}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    tx.status === 'Paid' || tx.status === 'Completed' ? 'text-emerald-500' : 'text-amber-500'
                  }`}>{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
            View All Transactions
          </button>
        </div>

      </div>
    </div>
  );
};

export default AccountsDashboard;
