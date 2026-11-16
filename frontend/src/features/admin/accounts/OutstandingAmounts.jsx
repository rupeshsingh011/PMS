import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle, Search, Filter, Download, ArrowRight,
  Clock, ShieldAlert, CheckCircle2, Phone, Mail, Building2
} from 'lucide-react';

const agingBuckets = [
  { bucket: 'Current (0 - 30 Days)', count: 8, amount: '₹1,24,500', color: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-500', width: '68%' },
  { bucket: '31 - 60 Days Overdue', count: 3, amount: '₹42,800', color: 'text-amber-600', bg: 'bg-amber-50', bar: 'bg-amber-500', width: '23%' },
  { bucket: '61 - 90 Days Overdue', count: 1, amount: '₹14,600', color: 'text-orange-600', bg: 'bg-orange-50', bar: 'bg-orange-500', width: '8%' },
  { bucket: '90+ Days (High Risk)', count: 0, amount: '₹0', color: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-500', width: '0%' }
];

const debtors = [
  {
    id: 'CLI-88219',
    client: 'Acme Technologies Ltd.',
    contactPerson: 'Sunil Rao (VP Finance)',
    phone: '+91 98201 44551',
    email: 'finance@acmetech.com',
    totalOutstanding: '₹32,400',
    current: '₹32,400',
    overdue30: '₹0',
    overdue60: '₹0',
    overdue90: '₹0',
    creditScore: 'AAA (Low Risk)',
    lastRemittance: '02 Nov 2026'
  },
  {
    id: 'CLI-88194',
    client: 'Starlight Media House',
    contactPerson: 'Pooja Verma',
    phone: '+91 98330 11928',
    email: 'accounts@starlightmedia.in',
    totalOutstanding: '₹24,800',
    current: '₹0',
    overdue30: '₹24,800',
    overdue60: '₹0',
    overdue90: '₹0',
    creditScore: 'BBB (Medium Risk)',
    lastRemittance: '15 Sep 2026'
  },
  {
    id: 'CLI-88172',
    client: 'Zenith Coworking Spaces',
    contactPerson: 'Amit Khurana',
    phone: '+91 98112 00391',
    email: 'billing@zenithspaces.com',
    totalOutstanding: '₹68,200',
    current: '₹50,200',
    overdue30: '₹18,000',
    overdue60: '₹0',
    overdue90: '₹0',
    creditScore: 'A (Standard)',
    lastRemittance: '25 Oct 2026'
  },
  {
    id: 'CLI-88091',
    client: 'Nexus Diagnostics Clinic',
    contactPerson: 'Dr. R. K. Iyer',
    phone: '+91 97220 88910',
    email: 'dr.iyer@nexusclinics.org',
    totalOutstanding: '₹14,600',
    current: '₹0',
    overdue30: '₹0',
    overdue60: '₹14,600',
    overdue90: '₹0',
    creditScore: 'B (High Follow-Up)',
    lastRemittance: '12 Aug 2026'
  },
  {
    id: 'CLI-88220',
    client: 'Apex Financial Services',
    contactPerson: 'Manoj Sinha',
    phone: '+91 99200 44102',
    email: 'manoj.s@apexfinance.com',
    totalOutstanding: '₹41,900',
    current: '₹41,900',
    overdue30: '₹0',
    overdue60: '₹0',
    overdue90: '₹0',
    creditScore: 'AAA (Low Risk)',
    lastRemittance: '28 Oct 2026'
  }
];

const OutstandingAmounts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = debtors.filter(
    (d) =>
      d.client.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-rose-50 text-rose-700 rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Aging Analysis & Outstanding Balances</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Client aging analysis, debtor risk profiles, and receivables maturity timeline.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => navigate('/admin/accounts/pending')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Follow-Up Pending Remittances</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Aging Schedule Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agingBuckets.map((b) => (
          <div key={b.bucket} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-500 uppercase">{b.bucket}</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${b.bg} ${b.color}`}>
                  {b.count} Clients
                </span>
              </div>
              <h3 className={`text-2xl font-extrabold mt-2 ${b.color}`}>{b.amount}</h3>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${b.bar}`} style={{ width: b.width }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search debtor by client name, client ID, contact..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-rose-500 font-medium"
          />
        </div>
      </div>

      {/* Debtors Aging Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 text-[11px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Client ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Enterprise Client</th>
                <th className="px-6 py-4 whitespace-nowrap">Total Due</th>
                <th className="px-6 py-4 whitespace-nowrap">Current (&lt;30d)</th>
                <th className="px-6 py-4 whitespace-nowrap">31 - 60 Days</th>
                <th className="px-6 py-4 whitespace-nowrap">61 - 90 Days</th>
                <th className="px-6 py-4 whitespace-nowrap">Risk Category</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-rose-50/15 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-gray-900 text-xs whitespace-nowrap">
                    {d.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-bold text-gray-900 text-sm leading-tight">{d.client}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{d.contactPerson} • {d.phone}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-extrabold text-gray-900 text-sm">
                    {d.totalOutstanding}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-blue-600">
                    {d.current}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-amber-600">
                    {d.overdue30}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-rose-600">
                    {d.overdue60}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        d.creditScore.includes('AAA')
                          ? 'bg-emerald-100 text-emerald-800'
                          : d.creditScore.includes('BBB')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {d.creditScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <a
                      href={`tel:${d.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-rose-50 text-gray-700 hover:text-rose-700 border border-gray-200 rounded-xl text-xs font-bold transition-colors mr-2"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                    <button
                      onClick={() => navigate('/admin/accounts/pending')}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      Remind
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

export default OutstandingAmounts;
