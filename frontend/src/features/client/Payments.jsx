import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CreditCard, CheckCircle2, Clock, ShieldCheck, Download,
  QrCode, Landmark,
  Receipt, Plus, X, Copy, Check
} from 'lucide-react';

const initialTransactions = [
  {
    receiptId: 'RCP-2026-0941',
    invoiceRef: 'INV-2026-0491',
    date: '18 Oct 2026',
    time: '11:42 AM',
    method: 'Corporate Card',
    methodDetail: 'Visa Business •••• 4412',
    utr: 'TXN-VISA-8821904',
    amount: 48500,
    status: 'Success'
  },
  {
    receiptId: 'RCP-2026-0882',
    invoiceRef: 'INV-2026-0428',
    date: '30 Sep 2026',
    time: '03:15 PM',
    method: 'Bank Wire (RTGS)',
    methodDetail: 'HDFC Corporate Current A/C',
    utr: 'HDFCR52026093000842',
    amount: 185000,
    status: 'Success'
  },
  {
    receiptId: 'RCP-2026-0790',
    invoiceRef: 'INV-2026-0371',
    date: '12 Aug 2026',
    time: '01:20 PM',
    method: 'Net Banking',
    methodDetail: 'ICICI Corporate Gateway',
    utr: 'ICI-NET-99120482',
    amount: 144000,
    status: 'Success'
  },
  {
    receiptId: 'RCP-2026-0685',
    invoiceRef: 'INV-2026-0312',
    date: '16 Jul 2026',
    time: '10:05 AM',
    method: 'Corporate Card',
    methodDetail: 'Visa Business •••• 4412',
    utr: 'TXN-VISA-7719203',
    amount: 24800,
    status: 'Success'
  }
];

const savedMethods = [
  {
    id: 'pm-1',
    type: 'card',
    title: 'HDFC Corporate Commercial Visa',
    detail: '•••• •••• •••• 4412',
    expiry: '09/28',
    isDefault: true
  },
  {
    id: 'pm-2',
    type: 'bank',
    title: 'HDFC Direct Net Banking (Current A/C)',
    detail: 'A/C: ••••••••• 9876',
    expiry: 'Verified',
    isDefault: false
  }
];

const Payments = () => {
  const location = useLocation();
  const passedInvoiceId = location.state?.invoiceId || 'INV-2026-0511';
  const passedAmount = location.state?.amount || 32400;

  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedMethod, setSelectedMethod] = useState('card'); // 'card' | 'netbanking' | 'upi'
  const [payAmount, setPayAmount] = useState(passedAmount);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [copiedUtr, setCopiedUtr] = useState(null);

  const handleCopyUtr = (utr) => {
    navigator.clipboard?.writeText(utr);
    setCopiedUtr(utr);
    setTimeout(() => setCopiedUtr(null), 2000);
  };

  const handleExecutePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newReceipt = {
        receiptId: `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        invoiceRef: passedInvoiceId,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        method: selectedMethod === 'card' ? 'Corporate Card' : selectedMethod === 'netbanking' ? 'Net Banking' : 'UPI Instant',
        methodDetail: selectedMethod === 'card' ? 'Visa Business •••• 4412' : selectedMethod === 'netbanking' ? 'HDFC Corporate' : 'acmetech@hdfcbank',
        utr: `TXN-REF-${Math.floor(100000000 + Math.random() * 900000000)}`,
        amount: Number(payAmount),
        status: 'Success'
      };

      setTransactions([newReceipt, ...transactions]);
      setIsProcessing(false);
      setPaymentSuccess(newReceipt);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Payments & Settlements</h1>
        <p className="text-sm text-gray-500 mt-1">
          Make digital remittances, download official tax receipts, and configure approved corporate payment options.
        </p>
      </div>

      {paymentSuccess && (
        <div className="p-5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 text-base">Payment of ₹{paymentSuccess.amount.toLocaleString()} Confirmed!</h4>
              <p className="text-xs text-emerald-700">Receipt Ref: <span className="font-mono font-semibold">{paymentSuccess.receiptId}</span> • UTR: {paymentSuccess.utr}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedReceipt(paymentSuccess)}
              className="flex-1 sm:flex-none px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              View Receipt
            </button>
            <button
              onClick={() => setPaymentSuccess(null)}
              className="p-2 text-emerald-600 hover:text-emerald-800 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Pending Payable</p>
            <h3 className="text-2xl font-extrabold text-amber-700 mt-1">₹32,400</h3>
            <span className="text-xs text-gray-500 mt-1 block">Invoice: {passedInvoiceId}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Settled (YTD)</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">₹4,02,300</h3>
            <span className="text-xs text-emerald-600 font-medium mt-1 block">Across 4 transactions</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Latest Remittance</p>
            <h3 className="text-xl font-extrabold text-gray-900 mt-1">₹48,500</h3>
            <span className="text-xs text-gray-500 mt-1 block">18 Oct 2026</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Receipt className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Approved Credit Term</p>
            <h3 className="text-xl font-extrabold text-emerald-700 mt-1">Net 30 Days</h3>
            <span className="text-xs text-gray-500 mt-1 block">Auto-Invoiced Monthly</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Remittance Gateway (1 span) */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-gray-100">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Make an Online Payment</h3>
                <p className="text-xs text-gray-500">Instant invoice settlement</p>
              </div>
            </div>

            <form onSubmit={handleExecutePayment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                  Settling Invoice Reference
                </label>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 font-mono font-bold text-gray-800 flex justify-between items-center">
                  <span>{passedInvoiceId}</span>
                  <span className="text-[11px] font-sans text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Pending</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                  Payment Amount (₹)
                </label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-2">
                  Select Remittance Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedMethod === 'card'
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-bold'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('netbanking')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedMethod === 'netbanking'
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-bold'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Landmark className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                    <span>NetBank</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('upi')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedMethod === 'upi'
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-bold'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                    <span>UPI QR</span>
                  </button>
                </div>
              </div>

              {selectedMethod === 'card' && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-900">Visa Business Card •••• 4412</p>
                  <p className="text-[11px] text-gray-400">Cardholder: Acme Technologies Ltd (IT Account)</p>
                </div>
              )}

              {selectedMethod === 'netbanking' && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
                  <p className="font-semibold text-gray-900">Corporate Portal Gateway</p>
                  <p className="text-[11px] text-gray-400">Direct transfer via HDFC / ICICI Corporate Banking</p>
                </div>
              )}

              {selectedMethod === 'upi' && (
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1 text-center">
                  <p className="font-semibold text-gray-900">Instant Dynamic UPI QR</p>
                  <p className="text-[11px] text-gray-400">Scan via BHIM / Google Pay / PhonePe</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Processing Transaction...' : `Authorize Payment • ₹${Number(payAmount).toLocaleString()}`}
              </button>
            </form>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-400 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted Financial Gateway</span>
          </div>
        </div>

        {/* Right Column: Transactions History (2 spans) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Receipts & Payment History</h3>
                  <p className="text-xs text-gray-500">Verified bank and card transaction statements</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] text-gray-500 uppercase tracking-wider font-bold bg-gray-50/70 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3">Receipt ID</th>
                    <th className="px-4 py-3">Date & Time</th>
                    <th className="px-4 py-3">Invoice Ref</th>
                    <th className="px-4 py-3">Payment Method</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((tx) => (
                    <tr key={tx.receiptId} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3.5">
                        <span className="font-mono font-bold text-gray-900 block">{tx.receiptId}</span>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400 font-mono">
                          <span>{tx.utr.slice(0, 14)}...</span>
                          <button
                            onClick={() => handleCopyUtr(tx.utr)}
                            className="hover:text-gray-700"
                            title="Copy UTR"
                          >
                            {copiedUtr === tx.utr ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-xs">
                        <p className="font-semibold text-gray-800">{tx.date}</p>
                        <span className="text-[11px] text-gray-400">{tx.time}</span>
                      </td>

                      <td className="px-4 py-3.5 font-mono text-xs text-gray-700 font-semibold">
                        {tx.invoiceRef}
                      </td>

                      <td className="px-4 py-3.5 text-xs">
                        <p className="font-medium text-gray-900">{tx.method}</p>
                        <span className="text-[11px] text-gray-400">{tx.methodDetail}</span>
                      </td>

                      <td className="px-4 py-3.5 text-xs font-extrabold text-emerald-700 font-mono">
                        ₹{tx.amount.toLocaleString()}
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => setSelectedReceipt(tx)}
                          className="px-3 py-1.5 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-xl text-xs font-semibold border border-gray-200 transition-colors"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Saved Payment Methods */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
            <h4 className="font-bold text-gray-900 text-sm mb-4 flex items-center justify-between">
              <span>Saved Corporate Payment Accounts</span>
              <button
                onClick={() => alert('New corporate payment method registration requires Finance Admin approval.')}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Method
              </button>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedMethods.map((pm) => (
                <div key={pm.id} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200/80 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm text-gray-700">
                      {pm.type === 'card' ? <CreditCard className="w-5 h-5 text-emerald-600" /> : <Landmark className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-xs">{pm.title}</p>
                      <p className="font-mono text-xs text-gray-500 mt-0.5">{pm.detail}</p>
                      <span className="text-[10px] text-gray-400 mt-1 block">Expiry / Status: {pm.expiry}</span>
                    </div>
                  </div>
                  {pm.isDefault && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Default
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 p-6 sm:p-7">
            <div className="flex justify-between items-start pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Official Payment Receipt</h3>
                  <p className="text-xs text-gray-500">PMS Automated Cashier Acknowledgement</p>
                </div>
              </div>
              <button onClick={() => setSelectedReceipt(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-3.5 text-xs">
              <div className="text-center py-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider">Amount Received</span>
                <h2 className="text-3xl font-extrabold text-emerald-950 font-mono mt-0.5">₹{selectedReceipt.amount.toLocaleString()}</h2>
                <span className="text-[11px] text-emerald-700 font-semibold mt-1 inline-block">Status: Transaction Confirmed</span>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Receipt No:</span>
                  <span className="font-mono font-bold text-gray-900">{selectedReceipt.receiptId}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Invoice Settled:</span>
                  <span className="font-mono font-bold text-gray-900">{selectedReceipt.invoiceRef}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Transaction UTR:</span>
                  <span className="font-mono text-gray-800">{selectedReceipt.utr}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Date & Timestamp:</span>
                  <span className="text-gray-800 font-medium">{selectedReceipt.date} • {selectedReceipt.time}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Payment Instrument:</span>
                  <span className="text-gray-800 font-medium">{selectedReceipt.method} ({selectedReceipt.methodDetail})</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => {
                  alert(`Downloading PDF receipt for ${selectedReceipt.receiptId}`);
                  setSelectedReceipt(null);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download PDF Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
