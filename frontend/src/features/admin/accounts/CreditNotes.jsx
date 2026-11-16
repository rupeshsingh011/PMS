import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Search, Plus, Download, Printer,
  CheckCircle2, AlertCircle, X, ArrowRight
} from 'lucide-react';

const initialCreditNotes = [
  {
    id: 'CN-2026-0081',
    invoiceId: 'INV-2026-0480',
    client: 'Acme Technologies Ltd.',
    amount: '₹4,500',
    date: '04 Nov 2026',
    reason: 'SLA Downtime Credit (Printer M635 24hr Outage)',
    status: 'Applied to Ledger',
    taxAdjustment: '₹810 (18% GST Rebate)'
  },
  {
    id: 'CN-2026-0080',
    invoiceId: 'INV-2026-0428',
    client: 'Apex Financial Services',
    amount: '₹8,500',
    date: '27 Oct 2026',
    reason: 'Defective Toner Cartridge Return (HP W1470X)',
    status: 'Applied to Ledger',
    taxAdjustment: '₹1,530 (18% GST Rebate)'
  },
  {
    id: 'CN-2026-0079',
    invoiceId: 'INV-2026-0391',
    client: 'Zenith Coworking Spaces',
    amount: '₹6,200',
    date: '15 Oct 2026',
    reason: 'Quarterly Volume Discount Tariff Adjustment',
    status: 'Pending Next Billing',
    taxAdjustment: '₹1,116 (18% GST Rebate)'
  }
];

const CreditNotes = () => {
  const navigate = useNavigate();
  const [creditNotes, setCreditNotes] = useState(initialCreditNotes);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [newNote, setNewNote] = useState({
    client: 'Acme Technologies Ltd.',
    invoiceId: 'INV-2026-0511',
    amount: '4500',
    reason: 'SLA Downtime Service Guarantee Credit'
  });

  const filtered = creditNotes.filter(
    (c) =>
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase()) ||
      c.invoiceId.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    const created = {
      id: `CN-2026-00${Math.floor(82 + Math.random() * 20)}`,
      invoiceId: newNote.invoiceId,
      client: newNote.client,
      amount: newNote.amount.startsWith('₹') ? newNote.amount : `₹${Number(newNote.amount).toLocaleString('en-IN')}`,
      date: 'Today',
      reason: newNote.reason,
      status: 'Applied to Ledger',
      taxAdjustment: `₹${Math.round(Number(newNote.amount) * 0.18).toLocaleString('en-IN')} (18% GST Rebate)`
    };
    setCreditNotes([created, ...creditNotes]);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-rose-50 text-rose-700 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Credit Notes (Customer Rebates)</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Tax credit notes issued to clients for SLA penalties, hardware downtime, and returned consumables.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-rose-600/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Issue Credit Note</span>
          </button>
          <button
            onClick={() => navigate('/admin/accounts/invoices')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>Invoices Ledger</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Credit Value</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">₹19,200</h3>
            <span className="text-xs text-rose-600 font-semibold block mt-1">3 Notes Issued (Q3)</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">GST Output Tax Rebate</p>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-1">₹3,456</h3>
            <span className="text-xs text-blue-600 font-semibold block mt-1">GSTR-1 Section 9B Adjusted</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Unadjusted Balance</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹6,200</h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-1">Will deduct from next bill</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Credit Note #, Client, Invoice #..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-rose-500 font-medium"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 text-[11px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Credit Note #</th>
                <th className="px-6 py-4 whitespace-nowrap">Enterprise Client</th>
                <th className="px-6 py-4 whitespace-nowrap">Against Invoice</th>
                <th className="px-6 py-4 whitespace-nowrap">Rebate Reason</th>
                <th className="px-6 py-4 whitespace-nowrap">Credit Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">GST Adjustment</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((cn) => (
                <tr key={cn.id} className="hover:bg-rose-50/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-rose-700 text-xs whitespace-nowrap">
                    {cn.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900 text-sm">
                    {cn.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs font-semibold text-blue-600">
                    {cn.invoiceId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                    {cn.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-extrabold text-rose-700 text-sm">
                    {cn.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {cn.taxAdjustment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                      {cn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedNote(cn)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-rose-50 text-gray-700 hover:text-rose-700 border border-gray-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      View Note
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Credit Note Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Issue Formal Credit Note</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Customer Client</label>
                <select
                  value={newNote.client}
                  onChange={(e) => setNewNote({ ...newNote, client: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <option value="Acme Technologies Ltd.">Acme Technologies Ltd.</option>
                  <option value="Apex Financial Services">Apex Financial Services</option>
                  <option value="Zenith Coworking Spaces">Zenith Coworking Spaces</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Invoice Linked Ref</label>
                <input
                  type="text"
                  required
                  value={newNote.invoiceId}
                  onChange={(e) => setNewNote({ ...newNote, invoiceId: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Rebate Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={newNote.amount}
                  onChange={(e) => setNewNote({ ...newNote, amount: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Justification / Reason</label>
                <textarea
                  rows={2}
                  required
                  value={newNote.reason}
                  onChange={(e) => setNewNote({ ...newNote, reason: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-md"
                >
                  Post Credit Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Credit Note View Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-gray-900">{selectedNote.id}</h3>
              <button onClick={() => setSelectedNote(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Issued To:</span>
                <span className="font-bold text-gray-900">{selectedNote.client}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Against Invoice:</span>
                <span className="font-mono font-bold text-blue-600">{selectedNote.invoiceId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Credit Amount:</span>
                <span className="font-extrabold text-rose-700 text-sm">{selectedNote.amount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">GST Adjustment:</span>
                <span className="font-medium text-gray-800">{selectedNote.taxAdjustment}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Reason:</span>
                <span className="font-medium text-gray-800">{selectedNote.reason}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Credit Note</span>
              </button>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditNotes;
