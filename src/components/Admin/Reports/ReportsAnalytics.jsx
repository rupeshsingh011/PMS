import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, Activity, Lock,
  Download, Filter, Calendar, ArrowUpRight, ArrowDownRight,
  FileBarChart, PieChart as PieChartIcon, LineChart as LineChartIcon, Eye
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid,
  PolarAngleAxis
} from 'recharts';

// ─── Shared Data ──────────────────────────────────────────────────────────────
const monthly = [
  { month: 'Jan', revenue: 520000, cost: 310000, profit: 210000, clients: 18, services: 42 },
  { month: 'Feb', revenue: 480000, cost: 290000, profit: 190000, clients: 19, services: 38 },
  { month: 'Mar', revenue: 640000, cost: 340000, profit: 300000, clients: 22, services: 55 },
  { month: 'Apr', revenue: 590000, cost: 320000, profit: 270000, clients: 24, services: 48 },
  { month: 'May', revenue: 720000, cost: 380000, profit: 340000, clients: 27, services: 61 },
  { month: 'Jun', revenue: 680000, cost: 360000, profit: 320000, clients: 29, services: 57 },
  { month: 'Jul', revenue: 790000, cost: 410000, profit: 380000, clients: 32, services: 68 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4'];

// ─── Shared Tab Bar ───────────────────────────────────────────────────────────
const TabBar = ({ tabs, active, onChange }) => (
  <div className="border-b border-gray-200 mb-6">
    <div className="flex gap-1 overflow-x-auto">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${active === t.id
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
            }`}>
          <t.Icon className="w-4 h-4" />
          {t.label}
        </button>
      ))}
    </div>
  </div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, change, up, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-2xl p-5 text-white shadow-md`}>
    <p className="text-sm opacity-80">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
    {change && (
      <div className="flex items-center gap-1 mt-1 text-xs font-semibold opacity-90">
        {up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
        {change} vs last month
      </div>
    )}
  </div>
);

// ─── Section: Business Reports ────────────────────────────────────────────────
const BusinessReports = () => {
  const [period, setPeriod] = useState('7months');
  const topClients = [
    { name: 'Wayne Enterprises', revenue: 230100, growth: '+18%' },
    { name: 'Acme Corp', revenue: 102660, growth: '+12%' },
    { name: 'Globex Inc', revenue: 73750, growth: '+7%' },
    { name: 'Initech LLC', revenue: 52000, growth: '+22%' },
    { name: 'Stark Industries', revenue: 40120, growth: '-3%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Business Reports</h2>
          <p className="text-gray-500 text-sm mt-0.5">Key performance metrics and summaries</p>
        </div>
        <div className="flex gap-2">
          <select value={period} onChange={e => setPeriod(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="7months">Last 7 Months</option>
            <option value="year">This Year</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="₹34.2L" change="+16%" up color="from-blue-500 to-blue-600" />
        <StatCard label="Net Profit" value="₹20.1L" change="+22%" up color="from-emerald-500 to-emerald-600" />
        <StatCard label="Total Clients" value="32" change="+3" up color="from-purple-500 to-purple-600" />
        <StatCard label="Service Calls" value="369" change="+11%" up color="from-amber-500 to-amber-600" />
      </div>



      {/* Summary Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Monthly Business Summary</h3></div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              {['Month', 'Revenue', 'Cost', 'Profit', 'Margin', 'Clients', 'Services'].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {monthly.map(m => (
              <tr key={m.month} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5 font-semibold text-gray-900">{m.month}</td>
                <td className="px-5 py-3.5 text-blue-600 font-semibold">₹{m.revenue.toLocaleString('en-IN')}</td>
                <td className="px-5 py-3.5 text-red-500 font-semibold">₹{m.cost.toLocaleString('en-IN')}</td>
                <td className="px-5 py-3.5 text-emerald-600 font-bold">₹{m.profit.toLocaleString('en-IN')}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.round((m.profit / m.revenue) * 100)}%` }} />
                    </div>
                    <span className="text-sm font-bold text-indigo-600">{Math.round((m.profit / m.revenue) * 100)}%</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-gray-700 font-semibold">{m.clients}</td>
                <td className="px-5 py-3.5 text-gray-700 font-semibold">{m.services}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Section: Trends ──────────────────────────────────────────────────────────
const Trends = () => {
  const serviceTypes = [
    { name: 'Repairs', value: 148 },
    { name: 'Maintenance', value: 89 },
    { name: 'Installations', value: 62 },
    { name: 'Consulting', value: 45 },
    { name: 'Replacements', value: 25 },
  ];

  const weeklyTickets = [
    { day: 'Mon', open: 8, closed: 6 },
    { day: 'Tue', open: 12, closed: 10 },
    { day: 'Wed', open: 9, closed: 11 },
    { day: 'Thu', open: 14, closed: 12 },
    { day: 'Fri', open: 11, closed: 9 },
    { day: 'Sat', open: 5, closed: 6 },
    { day: 'Sun', open: 3, closed: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Trends</h2>
          <p className="text-gray-500 text-sm mt-0.5">Operational patterns and service demand trends</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Avg Response Time" value="2.4 hrs" change="-18%" up color="from-teal-500 to-teal-600" />
        <StatCard label="Resolution Rate" value="94.2%" change="+2.1%" up color="from-green-500 to-emerald-600" />
        <StatCard label="Repeat Clients" value="78%" change="+5%" up color="from-purple-500 to-purple-600" />
        <StatCard label="Avg Ticket Value" value="₹8,240" change="+9%" up color="from-blue-500 to-indigo-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client & Service Trend */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-5">Client & Service Growth</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '12px' }} />
                <Line type="monotone" dataKey="clients" name="Clients" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 4, fill: '#3B82F6' }} />
                <Line type="monotone" dataKey="services" name="Services" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: '#10B981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Ticket Trend */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-5">Weekly Ticket Trend</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyTickets} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '12px' }} />
                <Bar dataKey="open" name="Opened" fill="#EF4444" radius={[5, 5, 0, 0]} barSize={14} />
                <Bar dataKey="closed" name="Closed" fill="#10B981" radius={[5, 5, 0, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Service Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-4">Service Type Breakdown</h3>
          <div className="space-y-3">
            {serviceTypes.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                <span className="text-sm text-gray-600 flex-1">{s.name}</span>
                <div className="h-2 w-36 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(s.value / 369) * 100}%`, background: COLORS[i] }} />
                </div>
                <span className="text-sm font-bold text-gray-800 w-8 text-right">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-2">Service Distribution</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={serviceTypes} cx="50%" cy="50%" innerRadius={45} outerRadius={85} paddingAngle={4} dataKey="value">
                  {serviceTypes.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Section: Growth Analysis ─────────────────────────────────────────────────
const GrowthAnalysis = () => {
  const qoq = [
    { quarter: 'Q1 FY25', revenue: 1640000, clients: 14, services: 135 },
    { quarter: 'Q2 FY25', revenue: 1950000, clients: 18, services: 162 },
    { quarter: 'Q3 FY25', revenue: 2210000, clients: 23, services: 188 },
    { quarter: 'Q4 FY25', revenue: 2480000, clients: 27, services: 204 },
    { quarter: 'Q1 FY26', revenue: 2750000, clients: 30, services: 233 },
  ];

  const kpis = [
    { label: 'YoY Revenue Growth', value: '+28.4%', color: 'from-blue-500 to-blue-600' },
    { label: 'Client Acquisition Rate', value: '+14/qtr', color: 'from-purple-500 to-purple-600' },
    { label: 'Service Expansion', value: '+22.6%', color: 'from-teal-500 to-teal-600' },
    { label: 'Avg. Deal Size Growth', value: '+9.8%', color: 'from-amber-500 to-amber-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Growth Analysis</h2>
          <p className="text-gray-500 text-sm mt-0.5">Quarter-over-quarter and year-over-year growth</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className={`bg-gradient-to-br ${k.color} rounded-2xl p-5 text-white shadow-md`}>
            <p className="text-sm opacity-80">{k.label}</p>
            <p className="text-2xl font-bold mt-1">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-5">Quarter-over-Quarter Revenue Growth</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={qoq} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, '']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366F1" strokeWidth={3} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-5">Client Growth by Quarter</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={qoq} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="clients" name="Clients" fill="#8B5CF6" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100"><h3 className="font-semibold text-gray-800">QoQ Summary</h3></div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                {['Quarter', 'Revenue', 'Clients', 'Services', 'Growth'].map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {qoq.map((q, i) => {
                const prev = qoq[i - 1];
                const growth = prev ? Math.round(((q.revenue - prev.revenue) / prev.revenue) * 100) : null;
                return (
                  <tr key={q.quarter} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 text-sm">{q.quarter}</td>
                    <td className="px-4 py-3 text-blue-600 font-semibold text-sm">₹{(q.revenue / 100000).toFixed(2)}L</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold text-sm">{q.clients}</td>
                    <td className="px-4 py-3 text-gray-700 font-semibold text-sm">{q.services}</td>
                    <td className="px-4 py-3">
                      {growth !== null && (
                        <span className={`text-xs font-bold ${growth > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {growth > 0 ? '+' : ''}{growth}%
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Section: Permission Reports ──────────────────────────────────────────────
const PermissionReports = () => {
  const auditLog = [
    { id: 'AUD-001', user: 'Ravi Kumar', action: 'Granted access to Accounts', module: 'Accounts', role: 'Manager', date: '2026-07-14 10:22', by: 'Super Admin' },
    { id: 'AUD-002', user: 'Amit Singh', action: 'Role changed: Support → Technician', module: 'System', role: 'Technician', date: '2026-07-13 15:45', by: 'Super Admin' },
    { id: 'AUD-003', user: 'Neha Joshi', action: 'Account deactivated', module: 'User Mgmt', role: 'Accountant', date: '2026-07-12 09:30', by: 'Ravi Kumar' },
    { id: 'AUD-004', user: 'Suresh Babu', action: 'Access revoked from Reports', module: 'Reports', role: 'Support', date: '2026-07-11 14:00', by: 'Super Admin' },
    { id: 'AUD-005', user: 'Priya Sharma', action: 'Settings permission granted', module: 'Settings', role: 'Manager', date: '2026-07-10 11:15', by: 'Super Admin' },
  ];

  const rolePie = [
    { name: 'Super Admin', value: 1 },
    { name: 'Manager', value: 2 },
    { name: 'Technician', value: 5 },
    { name: 'Accountant', value: 2 },
    { name: 'Support', value: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Permission Reports</h2>
          <p className="text-gray-500 text-sm mt-0.5">Access control audits and role summaries</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <Download className="w-4 h-4" /> Audit Report
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value="13" color="from-blue-500 to-blue-600" />
        <StatCard label="Active Roles" value="5" color="from-purple-500 to-purple-600" />
        <StatCard label="Permissions Changed" value="5" color="from-amber-500 to-amber-600" />
        <StatCard label="Restricted Modules" value="3" color="from-rose-500 to-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-800 mb-3">Users by Role</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={rolePie} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                  {rolePie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {rolePie.map((r, i) => (
              <div key={r.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-sm text-gray-600">{r.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Permission Audit Log</h3>
            <span className="text-xs text-gray-400">{auditLog.length} entries</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                {['User', 'Action', 'Module', 'Date', 'Performed By'].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {auditLog.map(a => (
                <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-gray-900 text-sm">{a.user}</div>
                    <div className="text-xs text-gray-400">{a.role}</div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-700 text-sm">{a.action}</td>
                  <td className="px-5 py-3.5"><span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">{a.module}</span></td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{a.date}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-sm">{a.by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Tab Config ───────────────────────────────────────────────────────────────
const tabs = [
  { id: 'business', label: 'Business Reports', Icon: BarChart3, Component: BusinessReports },
  { id: 'trends', label: 'Trends', Icon: TrendingUp, Component: Trends },
  { id: 'growth', label: 'Growth Analysis', Icon: Activity, Component: GrowthAnalysis },
  { id: 'permissions', label: 'Permission Reports', Icon: Lock, Component: PermissionReports },
];

// ─── Main Export ──────────────────────────────────────────────────────────────
const ReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState('business');
  const ActiveComponent = tabs.find(t => t.id === activeTab)?.Component || BusinessReports;

  return (
    <div>
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-600" /> Reports & Analytics
        </h1>
        <p className="text-gray-500 text-sm mt-1">Business intelligence, trends and data-driven insights</p>
      </div>
      <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
      <ActiveComponent />
    </div>
  );
};

export default ReportsAnalytics;
