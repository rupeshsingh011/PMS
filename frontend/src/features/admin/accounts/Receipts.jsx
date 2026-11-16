import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Receipt, Search, Plus, Printer,
  CheckCircle2, ArrowRight, X, FileText
} from 'lucide-react';

const initialReceipts = [
  {
    id: 'RCP-2026-0941',
    paymentId: 'PAY-2026-8819',
    invoiceId: 'INV-2026-0511',
    client: 'Acme Technologies Ltd.',
    gstin: '27AABCT8819Q1ZM',
    amount: '₹32,400',
    date: '02 Nov 2026',
    mode: 'HDFC RTGS (UTR: HDFCR52026110291)',
    receivedBy: 'Rajesh Sharma (Senior Accountant)',
    notes: 'Cleared for October commercial printer lease contract'
  },
  {
    id: 'RCP-2026-0940',
    paymentId: 'PAY-2026-8818',
    invoiceId: 'INV-2026-0491',
    client: 'Global Logistics Hub',
    gstin: '27AABCG4412P1ZL',
    amount: '₹48,500',
    date: '31 Oct 2026',
    mode: 'Razorpay Gateway (Corporate Card)',
    receivedBy: 'Automated Gateway Webhook',
    notes: 'Toner supplies auto-replenishment batch #9921'
  },
  {
    id: 'RCP-2026-0939',
    paymentId: 'PAY-2026-8817',
    invoiceId: 'INV-2026-0480',
    client: 'Apex Financial Services',
    gstin: '27AABCA3319L1ZP',
    amount: '₹1,85,000',
    date: '28 Oct 2026',
    mode: 'ICICI NEFT (UTR: ICICN02026102801)',
    receivedBy: 'Rajesh Sharma (Senior Accountant)',
    notes: 'Full payment received for Canon imageRUNNER hardware unit'
  },
  {
    id: 'RCP-2026-0938',
    paymentId: 'PAY-2026-8814',
    invoiceId: 'INV-2026-0450',
    client: 'Metro Health Diagnostics',
    gstin: '27AABCM9902M1Z8',
    amount: '₹55,000',
    date: '19 Oct 2026',
    mode: 'Axis Bank Wire Transfer',
    receivedBy: 'Accounts Payable Dept',
    notes: 'Monthly enterprise healthcare print contract'
  }
];

const Receipts = () => {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState(initialReceipts);
  const [search, setSearch] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [newReceiptModal, setNewReceiptModal] = useState(false);

  const [newReceipt, setNewReceipt] = useState({
    client: 'Acme Technologies Ltd.',
    invoiceId: 'INV-2026-0518',
    amount: '32400',
    mode: 'HDFC RTGS Wire',
    notes: 'Settlement for equipment rental'
  });

  const filtered = receipts.filter(
    (r) =>
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.client.toLowerCase().includes(search.toLowerCase()) ||
      r.invoiceId.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateReceipt = (e) => {
    e.preventDefault();
    const created = {
      id: `RCP-2026-0${Math.floor(950 + Math.random() * 50)}`,
      paymentId: `PAY-2026-${Math.floor(8820 + Math.random() * 80)}`,
      invoiceId: newReceipt.invoiceId,
      client: newReceipt.client,
      gstin: '27AABCT8819Q1ZM',
      amount: newReceipt.amount.startsWith('₹') ? newReceipt.amount : `₹${Number(newReceipt.amount).toLocaleString('en-IN')}`,
      date: 'Today',
      mode: newReceipt.mode,
      receivedBy: 'Admin Accountant',
      notes: newReceipt.notes
    };
    setReceipts([created, ...receipts]);
    setNewReceiptModal(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-2xl">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Receipts & Payment Vouchers</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Official GST acknowledgement receipts, cash vouchers, and verified collection certificates.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setNewReceiptModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-purple-600/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Receipt</span>
          </button>
          <button
            onClick={() => navigate('/admin/accounts/payments')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>Payments Ledger</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Receipts Issued</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{receipts.length} Active Vouchers</h3>
            <span className="text-xs text-purple-600 font-semibold block mt-1">100% Tax Compliant</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Receipt className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Acknowledged Value</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹3,20,900</h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-1">Direct Bank Wire & RTGS</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gateway Digital Vouchers</p>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-1">₹48,500</h3>
            <span className="text-xs text-blue-600 font-semibold block mt-1">Instant Webhook Verification</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
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
            placeholder="Search receipts by Receipt #, Client Name, Invoice ID..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-purple-500 focus:bg-white transition-all font-medium"
          />
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 text-[11px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Receipt Number</th>
                <th className="px-6 py-4 whitespace-nowrap">Client Name</th>
                <th className="px-6 py-4 whitespace-nowrap">Invoice & Payment Ref</th>
                <th className="px-6 py-4 whitespace-nowrap">Date Issued</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount Acknowledged</th>
                <th className="px-6 py-4 whitespace-nowrap">Verified By</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-purple-50/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-purple-700 text-xs whitespace-nowrap">
                    {r.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-bold text-gray-900 text-sm leading-tight">{r.client}</p>
                    <span className="text-[10px] text-gray-400 font-mono">GSTIN: {r.gstin}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <p className="font-mono font-semibold text-blue-600">{r.invoiceId}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{r.paymentId}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600 font-medium">
                    {r.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-extrabold text-emerald-700 text-sm">
                    {r.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-700">
                    <p className="font-medium">{r.receivedBy}</p>
                    <span className="text-[10px] text-gray-400">{r.mode.slice(0, 24)}...</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedReceipt(r)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-purple-700 border border-gray-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Print Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 border border-gray-100">
            {/* Voucher Header */}
            <div className="flex justify-between items-start pb-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-600 rounded-2xl text-white">
                  <Receipt className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">OFFICIAL RECEIPT VOUCHER</h3>
                  <p className="text-xs text-gray-500 font-mono">PMS Core Systems India Pvt. Ltd.</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Receipt Number</span>
                  <p className="font-mono font-bold text-gray-900 text-sm mt-0.5">{selectedReceipt.id}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Date of Issue</span>
                  <p className="font-semibold text-gray-800 text-sm mt-0.5">{selectedReceipt.date}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Received With Thanks From:</span>
                  <span className="font-bold text-gray-900">{selectedReceipt.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Client GSTIN / Tax ID:</span>
                  <span className="font-mono text-gray-800">{selectedReceipt.gstin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Against Tax Invoice:</span>
                  <span className="font-mono font-bold text-blue-600">{selectedReceipt.invoiceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Remittance Mode:</span>
                  <span className="font-medium text-gray-800">{selectedReceipt.mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Particulars:</span>
                  <span className="font-medium text-gray-700">{selectedReceipt.notes}</span>
                </div>
                <div className="flex justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="font-bold text-emerald-950">Total Amount Credited:</span>
                  <span className="font-extrabold text-emerald-700 text-base">{selectedReceipt.amount}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                <div className="text-[10px] text-gray-400 space-y-0.5">
                  <p>Computer generated tax acknowledgement.</p>
                  <p>Subject to realization of bank instruments.</p>
                </div>
                <div className="text-right">
                  <div className="w-28 border-b border-gray-400 mb-1" />
                  <span className="text-[10px] font-bold text-gray-600 uppercase">Authorized Signatory</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Voucher</span>
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Receipt Modal */}
      {newReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Generate Payment Receipt</h3>
              <button onClick={() => setNewReceiptModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReceipt} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Customer Client</label>
                <select
                  value={newReceipt.client}
                  onChange={(e) => setNewReceipt({ ...newReceipt, client: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <option value="Acme Technologies Ltd.">Acme Technologies Ltd.</option>
                  <option value="Global Logistics Hub">Global Logistics Hub</option>
                  <option value="Apex Financial Services">Apex Financial Services</option>
                  <option value="Metro Health Diagnostics">Metro Health Diagnostics</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Invoice ID Reference</label>
                <input
                  type="text"
                  required
                  value={newReceipt.invoiceId}
                  onChange={(e) => setNewReceipt({ ...newReceipt, invoiceId: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Amount Acknowledged (₹)</label>
                <input
                  type="number"
                  required
                  value={newReceipt.amount}
                  onChange={(e) => setNewReceipt({ ...newReceipt, amount: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Payment Method & UTR</label>
                <input
                  type="text"
                  value={newReceipt.mode}
                  onChange={(e) => setNewReceipt({ ...newReceipt, mode: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setNewReceiptModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-md"
                >
                  Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receipts;
