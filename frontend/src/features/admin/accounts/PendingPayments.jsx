import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, AlertTriangle, Search, Filter, Mail, Phone,
  ArrowRight, CheckCircle2, Building2, Send, X, Calendar
} from 'lucide-react';

const initialPending = [
  {
    id: 'INV-2026-0511',
    client: 'Acme Technologies Ltd.',
    contact: 'Sunil Rao (+91 98201 44551)',
    email: 'finance@acmetech.com',
    amount: '₹32,400',
    dueDate: '17 Nov 2026',
    daysOverdue: 0,
    status: 'Due Soon',
    category: 'Commercial Rental & Telemetry',
    slaTier: 'Diamond Fleet Care'
  },
  {
    id: 'INV-2026-0489',
    client: 'Starlight Media House',
    contact: 'Pooja Verma (+91 98330 11928)',
    email: 'billing@starlightmedia.in',
    amount: '₹24,800',
    dueDate: '01 Nov 2026',
    daysOverdue: 15,
    status: 'Overdue',
    category: 'Printer Maintenance & Rollers',
    slaTier: 'Gold Support'
  },
  {
    id: 'INV-2026-0475',
    client: 'Zenith Coworking Spaces',
    contact: 'Amit Khurana (+91 98112 00391)',
    email: 'accounts@zenithspaces.com',
    amount: '₹68,200',
    dueDate: '22 Oct 2026',
    daysOverdue: 25,
    status: 'Overdue (30 Days)',
    category: 'Quarterly Lease AMC (8 Units)',
    slaTier: 'Platinum Enterprise'
  },
  {
    id: 'INV-2026-0440',
    client: 'Nexus Diagnostics Clinic',
    contact: 'Dr. R. K. Iyer (+91 97220 88910)',
    email: 'billing@nexusclinics.org',
    amount: '₹14,500',
    dueDate: '10 Oct 2026',
    daysOverdue: 37,
    status: 'Severely Overdue',
    category: 'Toner Cartridges Supplies',
    slaTier: 'Standard Support'
  },
  {
    id: 'INV-2026-0520',
    client: 'Apex Financial Services',
    contact: 'Manoj Sinha (+91 99200 44102)',
    email: 'accounts@apexfinance.com',
    amount: '₹42,000',
    dueDate: '20 Nov 2026',
    daysOverdue: 0,
    status: 'Due Soon',
    category: 'Annual Maintenance Retainer',
    slaTier: 'Diamond Fleet Care'
  }
];

const PendingPayments = () => {
  const navigate = useNavigate();
  const [pendingList, setPendingList] = useState(initialPending);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [reminderModal, setReminderModal] = useState(null);
  const [reminderSent, setReminderSent] = useState(null);

  const filtered = pendingList.filter((item) => {
    const matchSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.client.toLowerCase().includes(search.toLowerCase()) ||
      item.contact.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Overdue' && item.daysOverdue > 0) ||
      (statusFilter === 'Due Soon' && item.daysOverdue === 0);
    return matchSearch && matchStatus;
  });

  const handleSendReminder = (e) => {
    e.preventDefault();
    if (!reminderModal) return;
    setReminderSent(reminderModal.client);
    setReminderModal(null);
    setTimeout(() => setReminderSent(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Pending & Overdue Receivables</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Track outstanding accounts receivables, follow up on aging invoices, and trigger automated reminders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => navigate('/admin/accounts/invoices')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>All Customer Invoices</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/admin/accounts/payments')}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
          >
            <span>Record Received Payment</span>
          </button>
        </div>
      </div>

      {/* Reminder Notification Toast */}
      {reminderSent && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 text-xs sm:text-sm font-bold flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Formal payment reminder with statement PDF dispatched to {reminderSent}!</span>
          </div>
          <button onClick={() => setReminderSent(null)} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Outstanding</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">₹1,81,900</h3>
            <span className="text-xs text-amber-600 font-semibold block mt-1">5 Unpaid Invoices</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Severely Overdue (&gt;30d)</p>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-1">₹14,500</h3>
            <span className="text-xs text-rose-500 font-semibold block mt-1">Requires Escalation</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Due Within 7 Days</p>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-1">₹74,400</h3>
            <span className="text-xs text-blue-500 font-semibold block mt-1">2 Corporate Clients</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average DSO</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">24.2 Days</h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-1">Healthy Cash Velocity</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Client, Invoice #, Contact..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-amber-500 focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 outline-none"
          >
            <option value="All">All Invoices</option>
            <option value="Overdue">Overdue Invoices</option>
            <option value="Due Soon">Due Soon (&lt; 7 Days)</option>
          </select>
        </div>
      </div>

      {/* Receivables Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 text-[11px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Invoice #</th>
                <th className="px-6 py-4 whitespace-nowrap">Enterprise Client</th>
                <th className="px-6 py-4 whitespace-nowrap">Billing Scope</th>
                <th className="px-6 py-4 whitespace-nowrap">Due Date & Aging</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount Receivable</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Quick Follow-Up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-amber-800 text-xs whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-bold text-gray-900 text-sm leading-tight">{item.client}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{item.contact}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                    <p className="font-medium text-gray-800">{item.category}</p>
                    <span className="text-[10px] text-gray-400">{item.slaTier}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-semibold text-gray-800 text-xs">{item.dueDate}</p>
                    {item.daysOverdue > 0 ? (
                      <span className="text-[10px] text-rose-600 font-bold block mt-0.5">
                        ⚠️ {item.daysOverdue} days past due
                      </span>
                    ) : (
                      <span className="text-[10px] text-blue-600 font-medium block mt-0.5">
                        Within payment term
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-extrabold text-gray-900 text-sm">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Severely Overdue'
                          ? 'bg-rose-100 text-rose-800'
                          : item.status.includes('Overdue')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setReminderModal(item)}
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Reminder</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
            <p className="text-sm font-semibold text-gray-600">All customer invoices are cleared!</p>
          </div>
        )}
      </div>

      {/* Reminder Dispatch Modal */}
      {reminderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">Send Payment Notice</h3>
                  <p className="text-[11px] text-gray-500">{reminderModal.id} • {reminderModal.amount}</p>
                </div>
              </div>
              <button
                onClick={() => setReminderModal(null)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendReminder} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Recipient Contact
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${reminderModal.client} (${reminderModal.email})`}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Reminder Urgency
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium">
                  <option>Gentle Friendly Reminder (Statement Attached)</option>
                  <option>Second Due Date Escalation Notice</option>
                  <option>Urgent: Impending AMC & Toner Dispatch Hold Notice</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Custom Finance Message
                </label>
                <textarea
                  rows={3}
                  defaultValue={`Dear Accounts Team, please note invoice ${reminderModal.id} for ${reminderModal.amount} was due on ${reminderModal.dueDate}. Kindly share the bank UTR remittance copy.`}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setReminderModal(null)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Notification</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingPayments;
