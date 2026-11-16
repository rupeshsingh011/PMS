import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, Download,
  Calendar, CheckCircle2, FileText, ArrowRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';

const plData = [
  { month: 'Jun', revenue: 2450000, cogs: 1120000, opex: 620000, netProfit: 710000 },
  { month: 'Jul', revenue: 2680000, cogs: 1200000, opex: 640000, netProfit: 840000 },
  { month: 'Aug', revenue: 2890000, cogs: 1310000, opex: 670000, netProfit: 910000 },
  { month: 'Sep', revenue: 3120000, cogs: 1390000, opex: 710000, netProfit: 1020000 },
  { month: 'Oct', revenue: 3450000, cogs: 1480000, opex: 740000, netProfit: 1230000 },
  { month: 'Nov (Proj)', revenue: 3600000, cogs: 1520000, opex: 760000, netProfit: 1320000 }
];

const revenueBreakdown = [
  { stream: 'Commercial Printer Monthly Rental Contracts', q3Actual: '₹43,50,000', margin: '48%', trend: '+14% YoY' },
  { stream: 'Outright Printer Sales & Hardware Deployments', q3Actual: '₹24,60,000', margin: '26%', trend: '+8% YoY' },
  { stream: 'Annual Maintenance Retainers (AMC)', q3Actual: '₹18,20,000', margin: '62%', trend: '+19% YoY' },
  { stream: 'Consumables, High-Yield Toner Packs & Reams', q3Actual: '₹14,80,000', margin: '34%', trend: '+11% YoY' }
];

const costBreakdown = [
  { item: 'OEM Hardware & Spare Parts Procurements (Canon, HP, Epson)', amount: '₹38,20,000', pct: '48%' },
  { item: 'Field Service Engineers Payroll & On-Site Mileage Stipends', amount: '₹18,50,000', pct: '23%' },
  { item: 'Logistics, Warehousing & Courier Despatch Network', amount: '₹8,40,000', pct: '11%' },
  { item: 'Software Telemetry Cloud Hosting & IT Infrastructure', amount: '₹3,20,000', pct: '4%' },
  { item: 'Administrative Overhead & Facility Lease', amount: '₹11,20,000', pct: '14%' }
];

const ProfitLoss = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('FY 2026-27 (Q3)');

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Profit & Loss (Income Statement)</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Gross operational margin, net bottom-line earnings, direct COGS, and overhead allocations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3.5 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-bold"
          >
            <option>FY 2026-27 (Q3)</option>
            <option>FY 2026-27 (Q2)</option>
            <option>FY 2025-26 (Full Year)</option>
          </select>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Financial P&L</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gross Revenue (Q3)</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">₹1.01 Cr</h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-1">+16.4% vs Last Quarter</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gross Profit (Margin)</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹57.4 Lakhs</h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-1">56.8% Gross Margin</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Operating Expenses (OPEX)</p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">₹22.8 Lakhs</h3>
            <span className="text-xs text-gray-500 font-medium block mt-1">Payroll, Fleet & Facility</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Net Profit Before Tax</p>
            <h3 className="text-2xl font-extrabold text-purple-600 mt-1">₹34.6 Lakhs</h3>
            <span className="text-xs text-purple-600 font-bold block mt-1">34.2% Net Margin</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* P&L Trend Chart */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-gray-100 gap-2">
          <div>
            <h3 className="font-extrabold text-gray-900 text-base">Monthly Income vs Expenditure Trend</h3>
            <p className="text-xs text-gray-500">Gross revenue, direct cost of goods, and net operating profit</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full self-start sm:self-auto">
            Consistently Profitable
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={plData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, '']} />
              <Legend />
              <Area type="monotone" dataKey="revenue" name="Gross Revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.15} />
              <Area type="monotone" dataKey="netProfit" name="Net Profit" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
              <Area type="monotone" dataKey="cogs" name="Direct COGS" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue & Expense Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Streams */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-extrabold text-gray-900 text-base mb-4 flex items-center justify-between">
            <span>Operating Revenue Streams</span>
            <span className="text-xs font-bold text-emerald-600">Q3 Total: ₹1.01 Cr</span>
          </h3>
          <div className="space-y-3">
            {revenueBreakdown.map((r) => (
              <div key={r.stream} className="p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-gray-900">{r.stream}</p>
                  <span className="text-[11px] text-gray-500 mt-0.5 block">{r.trend}</span>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-extrabold text-gray-900 text-sm">{r.q3Actual}</p>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5 inline-block">
                    {r.margin} Margin
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Costs */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-extrabold text-gray-900 text-base mb-4 flex items-center justify-between">
            <span>Expense & COGS Allocations</span>
            <span className="text-xs font-bold text-amber-600">Q3 Outflows: ₹79.5 Lakhs</span>
          </h3>
          <div className="space-y-3">
            {costBreakdown.map((c) => (
              <div key={c.item} className="p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-gray-800">{c.item}</p>
                  <span className="text-[11px] text-gray-400 mt-0.5 block">{c.pct} of total expenses</span>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-extrabold text-gray-900 text-sm">{c.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
