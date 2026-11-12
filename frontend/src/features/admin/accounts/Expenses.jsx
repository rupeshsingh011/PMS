import React, { useState } from 'react';
import { Calendar, Download, Wallet, TrendingUp, TrendingDown, DollarSign, ChevronDown, Activity } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const areaData = [
    { name: '1 May', value: 12000 },
    { name: '6 May', value: 9000 },
    { name: '11 May', value: 14000 },
    { name: '16 May', value: 8000 },
    { name: '21 May', value: 16000 },
    { name: '26 May', value: 11000 },
    { name: '31 May', value: 19000 },
  ];

  const pieData = [
    { name: 'Office Expenses', value: 6850, color: '#8b5cf6' },
    { name: 'Salaries', value: 5750, color: '#10b981' },
    { name: 'Marketing', value: 2450, color: '#f59e0b' },
    { name: 'Software & Tools', value: 1950, color: '#ec4899' },
    { name: 'Other Expenses', value: 1650, color: '#3b82f6' },
  ];

  const transactions = [
    { id: 'EXP-2024-0105', date: '31 May 2024', category: 'Office Expenses', vendor: 'Office Supply Co.', description: 'Office Supplies', amount: '$230.00', method: 'Bank Transfer' },
    { id: 'EXP-2024-0104', date: '30 May 2024', category: 'Salaries', vendor: 'Team Payroll', description: 'May Salary', amount: '$4,250.00', method: 'Bank Transfer' },
    { id: 'EXP-2024-0103', date: '28 May 2024', category: 'Marketing', vendor: 'Digital Ads Inc.', description: 'Facebook Ads', amount: '$450.00', method: 'Credit Card' },
    { id: 'EXP-2024-0102', date: '28 May 2024', category: 'Software & Tools', vendor: 'Adobe Systems', description: 'Adobe Subscription', amount: '$120.00', method: 'Credit Card' },
    { id: 'EXP-2024-0101', date: '27 May 2024', category: 'Office Expenses', vendor: 'Electricity Board', description: 'Electricity Bill', amount: '$165.00', method: 'Bank Transfer' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans pb-24">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage all your expenses.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm">
            <Calendar className="w-4 h-4" /> 01 May 2024 - 31 May 2024
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { label: 'Total Expenses', value: '$18,650.00', change: '+9.4%', isPositive: false, icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-50', time: 'from last month' },
          { label: 'This Month', value: '$6,240.00', change: '+7.8%', isPositive: false, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', time: 'from last month' },
          { label: 'This Week', value: '$1,250.00', change: '-2.4%', isPositive: true, icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50', time: 'from last week' },
          { label: 'Average Expense', value: '$1,865.00', change: '+8.1%', isPositive: false, icon: DollarSign, color: 'text-pink-600', bg: 'bg-pink-50', time: 'from last month' }
        ].map((kpi, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
              </div>
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className={`font-medium ${kpi.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>{kpi.change}</span>
              <span className="text-gray-400">{kpi.time}</span>
            </div>
          </div>
        ))}
      </div>



      {/* Expense List Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-900">Expense List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-500 uppercase tracking-wider font-bold bg-gray-50/50">
              <tr>
                <th className="px-6 py-4">Expense ID</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Vendor</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a href="#" className="font-semibold text-indigo-600 hover:underline">{row.id}</a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{row.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded transition-colors mx-auto block" title="Download">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Expenses;
