import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, Search, Filter, Plus, CheckCircle2,
  Clock, ArrowUpRight, FileText, X
} from 'lucide-react';

const initialPayments = [
  {
    id: 'PAY-2026-8819',
    invoiceId: 'INV-2026-0511',
    client: 'Acme Technologies Ltd.',
    amount: '₹32,400',
    method: 'HDFC Bank RTGS',
    utr: 'HDFCR52026110291',
    date: '02 Nov 2026',
    status: 'Settled',
    account: 'Primary Corporate Current A/C',
    category: 'Monthly Rental & Telemetry'
  },
  {
    id: 'PAY-2026-8818',
    invoiceId: 'INV-2026-0491',
    client: 'Global Logistics Hub',
    amount: '₹48,500',
    method: 'Corporate Card •••• 4412',
    utr: 'TXN-CC-994102',
    date: '31 Oct 2026',
    status: 'Settled',
    account: 'Payment Gateway (Razorpay)',
    category: 'Consumables & Toner Packs'
  },
  {
    id: 'PAY-2026-8817',
    invoiceId: 'INV-2026-0480',
    client: 'Apex Financial Services',
    amount: '₹1,85,000',
    method: 'ICICI Bank NEFT',
    utr: 'ICICN02026102801',
    date: '28 Oct 2026',
    status: 'Settled',
    account: 'Primary Corporate Current A/C',
    category: 'Outright Printer Purchase'
  },
  {
    id: 'PAY-2026-8816',
    invoiceId: 'INV-2026-0472',
    client: 'Zenith Coworking Spaces',
    amount: '₹18,750',
    method: 'UPI Business Autopay',
    utr: 'UPI/2610250912/zenith',
    date: '25 Oct 2026',
    status: 'Processing',
    account: 'Payment Gateway (Razorpay)',
    category: 'Fleet Lease AMC'
  },
  {
    id: 'PAY-2026-8815',
    invoiceId: 'INV-2026-0465',
    client: 'Starlight Media House',
    amount: '₹24,800',
    method: 'Cheque Clearance',
    utr: 'CHQ-882104 (SBI)',
    date: '22 Oct 2026',
    status: 'Under Clearance',
    account: 'SBI Escrow A/C',
    category: 'Maintenance & Parts'
  },
  {
    id: 'PAY-2026-8814',
    invoiceId: 'INV-2026-0450',
    client: 'Metro Health Diagnostics',
    amount: '₹55,000',
    method: 'Axis Bank Wire',
    utr: 'AXISW1026101903',
    date: '19 Oct 2026',
    status: 'Settled',
    account: 'Primary Corporate Current A/C',
    category: 'Hospital Fleet Contract'
  }
];

const Payments = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // New Payment Form
  const [newPay, setNewPay] = useState({
    client: 'Acme Technologies Ltd.',
    invoiceId: '',
    amount: '',
    method: 'HDFC Bank RTGS',
    utr: '',
    account: 'Primary Corporate Current A/C',
    category: 'Monthly Rental & Telemetry'
  });

  const filteredPayments = payments.filter((p) => {
    const matchSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
      p.utr.toLowerCase().includes(search.toLowerCase());
    const matchMethod = methodFilter === 'All' || p.method.includes(methodFilter);
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchMethod && matchStatus;
  });

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (!newPay.amount || !newPay.invoiceId) return;

    const record = {
      id: `PAY-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      invoiceId: newPay.invoiceId,
      client: newPay.client,
      amount: newPay.amount.startsWith('₹') ? newPay.amount : `₹${Number(newPay.amount).toLocaleString('en-IN')}`,
      method: newPay.method,
      utr: newPay.utr || `UTR-${Date.now().toString().slice(-8)}`,
      date: 'Today',
      status: 'Settled',
      account: newPay.account,
      category: newPay.category
    };

    setPayments([record, ...payments]);
    setShowModal(false);
    setNewPay({
      client: 'Acme Technologies Ltd.',
      invoiceId: '',
      amount: '',
      method: 'HDFC Bank RTGS',
      utr: '',
      account: 'Primary Corporate Current A/C',
      category: 'Monthly Rental & Telemetry'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Payments & Remittances</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Real-time payment settlements, bank reconciliations, and customer transaction ledger.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Record Payment</span>
          </button>
          <button
            onClick={() => navigate('/admin/accounts/pending')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>View Pending</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Received (MTD)</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">₹3,64,450</h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 18 Transactions
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Settlements</p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">₹43,550</h3>
            <span className="text-xs text-amber-600 font-semibold flex items-center gap-1 mt-1">
              <Clock className="w-3.5 h-3.5" /> 2 Under Clearance
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bank Wire / RTGS</p>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-1">₹2,72,400</h3>
            <span className="text-xs text-gray-500 font-medium mt-1 block">75% of collections</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gateway (UPI / Card)</p>
            <h3 className="text-2xl font-extrabold text-purple-600 mt-1">₹67,250</h3>
            <span className="text-xs text-purple-600 font-semibold flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> Razorpay Linked
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
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
            placeholder="Search by Payment ID, Client, Invoice #, UTR..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-blue-500 focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 outline-none"
            >
              <option value="All">All Methods</option>
              <option value="RTGS">RTGS Wire</option>
              <option value="NEFT">NEFT Transfer</option>
              <option value="Card">Corporate Card</option>
              <option value="UPI">UPI AutoPay</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Settled">Settled</option>
            <option value="Processing">Processing</option>
            <option value="Under Clearance">Under Clearance</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 text-[11px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Payment Ref #</th>
                <th className="px-6 py-4 whitespace-nowrap">Client & Scope</th>
                <th className="px-6 py-4 whitespace-nowrap">Invoice Linked</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount Received</th>
                <th className="px-6 py-4 whitespace-nowrap">Payment Mode & UTR</th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-blue-700 whitespace-nowrap text-xs">
                    {p.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-bold text-gray-900 text-sm leading-tight">{p.client}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{p.category}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate('/admin/accounts/invoices')}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-mono font-semibold text-gray-800 transition-colors"
                    >
                      {p.invoiceId}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-extrabold text-emerald-700 text-sm">
                    {p.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-semibold text-gray-800 text-xs">{p.method}</p>
                    <p className="font-mono text-[10px] text-gray-400 mt-0.5">{p.utr}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-medium">
                    {p.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        p.status === 'Settled'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'Processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedPayment(p)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 border border-gray-200 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      View Voucher
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            <CreditCard className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm font-semibold">No remittance records matched your criteria.</p>
          </div>
        )}
      </div>

      {/* Record Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden border border-gray-100">
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">Record Inward Customer Payment</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Customer / Enterprise Client
                </label>
                <select
                  value={newPay.client}
                  onChange={(e) => setNewPay({ ...newPay, client: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium"
                >
                  <option value="Acme Technologies Ltd.">Acme Technologies Ltd.</option>
                  <option value="Global Logistics Hub">Global Logistics Hub</option>
                  <option value="Apex Financial Services">Apex Financial Services</option>
                  <option value="Zenith Coworking Spaces">Zenith Coworking Spaces</option>
                  <option value="Metro Health Diagnostics">Metro Health Diagnostics</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Linked Invoice Ref # *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. INV-2026-0518"
                    value={newPay.invoiceId}
                    onChange={(e) => setNewPay({ ...newPay, invoiceId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Amount Received (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="32400"
                    value={newPay.amount}
                    onChange={(e) => setNewPay({ ...newPay, amount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Payment Method
                  </label>
                  <select
                    value={newPay.method}
                    onChange={(e) => setNewPay({ ...newPay, method: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium"
                  >
                    <option value="HDFC Bank RTGS">HDFC Bank RTGS</option>
                    <option value="ICICI Bank NEFT">ICICI Bank NEFT</option>
                    <option value="Corporate Card">Corporate Card</option>
                    <option value="UPI Business Autopay">UPI Business Autopay</option>
                    <option value="Cheque Deposit">Cheque Deposit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Bank UTR / Transaction Ref
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HDFCR52026110..."
                    value={newPay.utr}
                    onChange={(e) => setNewPay({ ...newPay, utr: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Deposited Bank Account
                </label>
                <select
                  value={newPay.account}
                  onChange={(e) => setNewPay({ ...newPay, account: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium"
                >
                  <option value="Primary Corporate Current A/C (HDFC)">Primary Corporate Current A/C (HDFC - *4401)</option>
                  <option value="SBI Escrow A/C (*9920)">SBI Escrow A/C (*9920)</option>
                  <option value="Razorpay Virtual Escrow">Razorpay Virtual Escrow</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-gray-600 font-bold text-xs hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  Confirm & Post Remittance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Voucher Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Remittance Voucher</span>
                <h3 className="font-extrabold text-lg text-gray-900">{selectedPayment.id}</h3>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Customer:</span>
                <span className="font-bold text-gray-900">{selectedPayment.client}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Invoice Reference:</span>
                <span className="font-mono font-bold text-blue-600">{selectedPayment.invoiceId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold text-emerald-700 text-sm">{selectedPayment.amount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Settlement Method:</span>
                <span className="font-medium text-gray-900">{selectedPayment.method}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Bank UTR Number:</span>
                <span className="font-mono font-medium text-gray-800">{selectedPayment.utr}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Date Cleared:</span>
                <span className="font-medium text-gray-900">{selectedPayment.date}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Receiving Account:</span>
                <span className="font-medium text-gray-800">{selectedPayment.account}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Download Receipt PDF
              </button>
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold"
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

export default Payments;
