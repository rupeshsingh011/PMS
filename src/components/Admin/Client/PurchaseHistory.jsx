import React, { useState } from 'react';
import { Download, Calendar, Search, Filter, Package, ShieldCheck, DollarSign, Clock, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const PurchaseHistory = () => {
  const transactions = [
    { id: 'INV-2024-0158', date: '30 May 2024', product: 'Premium Membership', qty: 1, amount: '$99.00', status: 'Paid' },
    { id: 'INV-2024-0157', date: '28 May 2024', product: 'API Access Add-on', qty: 2, amount: '$120.00', status: 'Paid' },
    { id: 'INV-2024-0156', date: '25 May 2024', product: 'Custom Report', qty: 1, amount: '$250.00', status: 'Pending' },
    { id: 'INV-2024-0155', date: '22 May 2024', product: 'Training Session', qty: 1, amount: '$150.00', status: 'Paid' },
    { id: 'INV-2024-0154', date: '18 May 2024', product: 'Data Export', qty: 5, amount: '$90.00', status: 'Paid' },
    { id: 'INV-2024-0153', date: '15 May 2024', product: 'Priority Support', qty: 1, amount: '$60.00', status: 'Failed' },
    { id: 'INV-2024-0152', date: '10 May 2024', product: 'Standard Plan', qty: 1, amount: '$49.00', status: 'Paid' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans pb-24">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchase History</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage all client purchases and transactions.</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Orders', value: '248', change: '+12.5%', isPositive: true, icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Spend', value: '$24,850.00', change: '+18.8%', isPositive: true, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Payments', value: '$3,250.00', change: '-5.3%', isPositive: false, icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Last Purchase', value: '30 May 2024', subtext: '2 days ago', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((kpi, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
              </div>
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
            {kpi.change && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className={`font-medium ${kpi.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>{kpi.change}</span>
                <span className="text-gray-400">from last month</span>
              </div>
            )}
            {kpi.subtext && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-gray-500 font-medium">{kpi.subtext}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Table (2/3) */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          
          {/* Table Toolbar */}
          <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search by invoice ID, product..."
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-col hidden sm:flex">
                <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Status</span>
                <select className="text-sm bg-transparent border-none text-gray-700 font-medium cursor-pointer focus:ring-0 outline-none pr-6">
                  <option>All Status</option>
                  <option>Paid</option>
                  <option>Pending</option>
                </select>
              </div>
              <div className="w-px h-8 bg-gray-200 mx-1 hidden sm:block"></div>
              <div className="flex flex-col hidden sm:flex">
                <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Payment Status</span>
                <select className="text-sm bg-transparent border-none text-gray-700 font-medium cursor-pointer focus:ring-0 outline-none pr-6">
                  <option>All Payment Status</option>
                  <option>Success</option>
                  <option>Failed</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors ml-2">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-gray-500 uppercase tracking-wider font-bold bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4">Invoice ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Product / Service</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Payment Status</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{row.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.qty}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[11px] font-bold uppercase ${
                        row.status === 'Paid' ? 'text-emerald-500' :
                        row.status === 'Pending' ? 'text-amber-500' :
                        'text-red-500'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded transition-colors mx-auto block" title="Download Invoice">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-500 font-medium">
              Showing 1 to 7 of 248 results
            </p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 border border-transparent transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium text-sm shadow-sm transition-colors">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">3</button>
              <span className="text-gray-400 px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">36</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 border border-transparent transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default PurchaseHistory;
