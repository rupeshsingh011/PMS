import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Search, Plus, Printer, CheckCircle2,
  AlertCircle, X, ArrowRight
} from 'lucide-react';

const initialDebitNotes = [
  {
    id: 'DN-2026-0041',
    poRef: 'PO-HP-2026-88',
    vendor: 'HP India Sales Pvt. Ltd.',
    amount: '₹14,200',
    date: '03 Nov 2026',
    reason: 'Damaged Pickup Rollers Batch Return (10 Units)',
    status: 'Settled by Vendor',
    itcAdjustment: 'Input Tax Credit Adjusted (18%)'
  },
  {
    id: 'DN-2026-0040',
    poRef: 'PO-CAN-2026-44',
    vendor: 'Canon India Industrial Distributors',
    amount: '₹22,500',
    date: '24 Oct 2026',
    reason: 'Defective Drum Unit Optical Sensor Warranty Claim',
    status: 'Credit Received',
    itcAdjustment: 'Input Tax Credit Adjusted (18%)'
  },
  {
    id: 'DN-2026-0039',
    poRef: 'PO-EPS-2026-19',
    vendor: 'Epson Seiko Logistics Hub',
    amount: '₹8,900',
    date: '12 Oct 2026',
    reason: 'Overcharged Unit Freight & Price Differential',
    status: 'Under Review',
    itcAdjustment: 'Awaiting Vendor Credit Note'
  }
];

const DebitNotes = () => {
  const navigate = useNavigate();
  const [debitNotes, setDebitNotes] = useState(initialDebitNotes);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [newNote, setNewNote] = useState({
    vendor: 'HP India Sales Pvt. Ltd.',
    poRef: 'PO-HP-2026-92',
    amount: '12000',
    reason: 'Damaged Toner Cartridges in Transit'
  });

  const filtered = debitNotes.filter(
    (d) =>
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.vendor.toLowerCase().includes(search.toLowerCase()) ||
      d.poRef.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    const created = {
      id: `DN-2026-00${Math.floor(42 + Math.random() * 20)}`,
      poRef: newNote.poRef,
      vendor: newNote.vendor,
      amount: newNote.amount.startsWith('₹') ? newNote.amount : `₹${Number(newNote.amount).toLocaleString('en-IN')}`,
      date: 'Today',
      reason: newNote.reason,
      status: 'Issued to Vendor',
      itcAdjustment: 'Input Tax Credit Adjusted (18%)'
    };
    setDebitNotes([created, ...debitNotes]);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-indigo-50 text-indigo-700 rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Debit Notes (Vendor Adjustments)</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Debit notes issued to OEM suppliers for damaged hardware parts, warranty claims, and purchase order credits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Debit Note</span>
          </button>
          <button
            onClick={() => navigate('/admin/accounts/vendors')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>Vendor Payables</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Debit Value Claimed</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">₹45,600</h3>
            <span className="text-xs text-indigo-600 font-semibold block mt-1">3 Supplier Claims (Q3)</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Settled Credits</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹36,700</h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-1">Deducted from OEM POs</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Under Supplier Review</p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">₹8,900</h3>
            <span className="text-xs text-amber-600 font-semibold block mt-1">Epson Warranty Claim</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
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
            placeholder="Search by Debit Note #, Vendor Name, PO Ref..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-indigo-500 font-medium"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 text-[11px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Debit Note #</th>
                <th className="px-6 py-4 whitespace-nowrap">OEM Supplier / Vendor</th>
                <th className="px-6 py-4 whitespace-nowrap">Purchase Order Ref</th>
                <th className="px-6 py-4 whitespace-nowrap">Claim Reason</th>
                <th className="px-6 py-4 whitespace-nowrap">Claim Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((dn) => (
                <tr key={dn.id} className="hover:bg-indigo-50/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-indigo-700 text-xs whitespace-nowrap">
                    {dn.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900 text-sm">
                    {dn.vendor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs font-semibold text-blue-600">
                    {dn.poRef}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                    {dn.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-extrabold text-indigo-700 text-sm">
                    {dn.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        dn.status.includes('Settled') || dn.status.includes('Credit')
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {dn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedNote(dn)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 border border-gray-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
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

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Issue Vendor Debit Note</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">OEM Vendor</label>
                <select
                  value={newNote.vendor}
                  onChange={(e) => setNewNote({ ...newNote, vendor: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <option value="HP India Sales Pvt. Ltd.">HP India Sales Pvt. Ltd.</option>
                  <option value="Canon India Industrial Distributors">Canon India Industrial Distributors</option>
                  <option value="Epson Seiko Logistics Hub">Epson Seiko Logistics Hub</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Purchase Order Ref</label>
                <input
                  type="text"
                  required
                  value={newNote.poRef}
                  onChange={(e) => setNewNote({ ...newNote, poRef: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Claim Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={newNote.amount}
                  onChange={(e) => setNewNote({ ...newNote, amount: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Defect / Reason</label>
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
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md"
                >
                  Post Debit Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
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
                <span className="text-gray-500">Issued To Vendor:</span>
                <span className="font-bold text-gray-900">{selectedNote.vendor}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Against PO:</span>
                <span className="font-mono font-bold text-blue-600">{selectedNote.poRef}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Claim Amount:</span>
                <span className="font-extrabold text-indigo-700 text-sm">{selectedNote.amount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Defect Reason:</span>
                <span className="font-medium text-gray-800">{selectedNote.reason}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Debit Note</span>
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

export default DebitNotes;
