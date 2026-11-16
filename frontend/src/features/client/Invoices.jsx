import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Search, Download, CreditCard,
  CheckCircle2, Clock, ArrowDownToLine,
  Eye, X, Printer, ShieldCheck
} from 'lucide-react';

const initialInvoices = [
  {
    id: 'INV-2026-0511',
    issueDate: '02 Nov 2026',
    dueDate: '17 Nov 2026',
    description: 'Consumable Supplies: High-Yield Ink Packs & Maintenance Kits',
    subtotal: 27457.63,
    gst: 4942.37,
    total: 32400,
    status: 'Pending',
    items: [
      { desc: 'Epson T974 Replaceable High-Yield Cyan & Magenta Ink Packs', hsn: '844399', qty: 2, rate: 10338.98, amount: 20677.96 },
      { desc: 'Preventive Maintenance Roller Cleaning Kit', hsn: '844399', qty: 4, rate: 1694.92, amount: 6779.67 }
    ]
  },
  {
    id: 'INV-2026-0491',
    issueDate: '15 Oct 2026',
    dueDate: '30 Oct 2026',
    description: 'Consumables & Paper Media Replenishment Batch #4',
    subtotal: 41101.69,
    gst: 7398.31,
    total: 48500,
    status: 'Paid',
    paidDate: '18 Oct 2026',
    paymentMethod: 'Corporate Card •••• 4412',
    items: [
      { desc: 'HP W1470X High-Yield Black Toner Cartridge', hsn: '844399', qty: 4, rate: 7203.39, amount: 28813.56 },
      { desc: 'A4 High-Brightness Executive Copy Paper (Box of 5 Reams)', hsn: '480256', qty: 10, rate: 1228.81, amount: 12288.13 }
    ]
  },
  {
    id: 'INV-2026-0428',
    issueDate: '28 Sep 2026',
    dueDate: '12 Oct 2026',
    description: 'New Equipment Procurement: Canon imageRUNNER ADVANCE DX C3835i',
    subtotal: 156779.66,
    gst: 28220.34,
    total: 185000,
    status: 'Paid',
    paidDate: '30 Sep 2026',
    paymentMethod: 'Bank Wire (RTGS)',
    items: [
      { desc: 'Canon imageRUNNER ADVANCE DX C3835i Color Multifunction Copier', hsn: '844331', qty: 1, rate: 156779.66, amount: 156779.66 }
    ]
  },
  {
    id: 'INV-2026-0371',
    issueDate: '10 Aug 2026',
    dueDate: '25 Aug 2026',
    description: 'Annual Comprehensive AMC Renewal: Diamond Fleet Care (8 Units)',
    subtotal: 122033.90,
    gst: 21966.10,
    total: 144000,
    status: 'Paid',
    paidDate: '12 Aug 2026',
    paymentMethod: 'Net Banking (HDFC Corporate)',
    items: [
      { desc: 'Annual Enterprise Diamond Fleet Care AMC Package', hsn: '998719', qty: 1, rate: 122033.90, amount: 122033.90 }
    ]
  },
  {
    id: 'INV-2026-0312',
    issueDate: '14 Jul 2026',
    dueDate: '29 Jul 2026',
    description: 'Hardware Accessory: Optional 550-Sheet High-Capacity Paper Feeder',
    subtotal: 21016.95,
    gst: 3783.05,
    total: 24800,
    status: 'Paid',
    paidDate: '16 Jul 2026',
    paymentMethod: 'Corporate Card •••• 4412',
    items: [
      { desc: 'Optional 550-Sheet Heavy Duty Feeder Paper Tray Unit', hsn: '844399', qty: 2, rate: 10508.47, amount: 21016.95 }
    ]
  }
];

const Invoices = () => {
  const navigate = useNavigate();
  const [invoices] = useState(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalOutstanding = invoices
    .filter((inv) => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((acc, curr) => acc + curr.total, 0);

  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.total, 0);
  const paidCount = invoices.filter((inv) => inv.status === 'Paid').length;

  const handleDownload = (inv) => {
    setFeedback(`Downloading PDF tax invoice ${inv.id}...`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handlePayInvoice = (inv) => {
    navigate('/client/payments', { state: { invoiceId: inv.id, amount: inv.total } });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Invoices & Billing</h1>
          <p className="text-sm text-gray-500 mt-1">
            Access tax-compliant billing statements, equipment purchase records, and AMC invoices.
          </p>
        </div>

        {totalOutstanding > 0 && (
          <button
            onClick={() => navigate('/client/payments')}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <CreditCard className="w-4 h-4" />
            Settle Due Balance (₹{totalOutstanding.toLocaleString()})
          </button>
        )}
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm font-medium animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Pending Amount Due</p>
            <h3 className="text-2xl font-extrabold text-amber-700 mt-1">₹{totalOutstanding.toLocaleString()}</h3>
            <span className="text-xs text-gray-500 mt-1 block">Due by 17 Nov 2026</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Invoiced (YTD)</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">₹{totalInvoiced.toLocaleString()}</h3>
            <span className="text-xs text-emerald-600 font-medium mt-1 block">GST compliant billing</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Settled Invoices</p>
            <h3 className="text-2xl font-extrabold text-emerald-700 mt-1">{paidCount} Paid</h3>
            <span className="text-xs text-gray-500 mt-1 block">100% verified receipts</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Overdue Status</p>
            <h3 className="text-2xl font-extrabold text-emerald-700 mt-1">Zero Overdue</h3>
            <span className="text-xs text-emerald-600 font-medium mt-1 block">Account in good standing</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search invoice number or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-gray-400 uppercase">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Invoices</option>
            <option value="Pending">Pending / Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-500 uppercase tracking-wider font-bold bg-gray-50/70 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Billing Scope & Description</th>
                <th className="px-6 py-4">Issue & Due Date</th>
                <th className="px-6 py-4">Total Amount (Incl. GST)</th>
                <th className="px-6 py-4">Payment Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono font-bold text-gray-900 block">{inv.id}</span>
                        <span className="text-[11px] text-gray-400">GST Invoice</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-800 max-w-sm">
                    <p className="font-semibold">{inv.description}</p>
                    <span className="text-gray-400 text-[11px]">{inv.items.length} line item(s)</span>
                  </td>

                  <td className="px-6 py-4 text-xs">
                    <p className="font-medium text-gray-800">Issued: {inv.issueDate}</p>
                    <span className={`text-[11px] font-semibold ${inv.status === 'Pending' ? 'text-amber-600' : 'text-gray-400'}`}>
                      Due: {inv.dueDate}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs">
                    <p className="font-extrabold text-gray-900 text-base">₹{inv.total.toLocaleString()}</p>
                    <span className="text-[11px] text-gray-400">GST 18%: ₹{inv.gst.toLocaleString()}</span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                          : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.status === 'Pending' && (
                        <button
                          onClick={() => handlePayInvoice(inv)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
                        >
                          Pay Now
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="p-2 text-gray-500 hover:text-emerald-700 hover:bg-gray-100 rounded-xl transition-colors"
                        title="View Full Statement"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(inv)}
                        className="p-2 text-gray-500 hover:text-emerald-700 hover:bg-gray-100 rounded-xl transition-colors"
                        title="Download PDF"
                      >
                        <ArrowDownToLine className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-gray-100 p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-start justify-between pb-6 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-xl">
                  <Printer className="w-6 h-6" />
                  <span>PMS Printers & Services Pvt Ltd</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Tax Invoice & Billing Statement</p>
                <p className="text-xs text-gray-400 font-mono">GSTIN: 27AABCP9921D1ZO • CIN: U72200MH2020PTC123456</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Bill Details */}
            <div className="grid grid-cols-2 gap-6 py-6 text-xs border-b border-gray-100">
              <div>
                <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px] block mb-1">Billed To (Client):</span>
                <p className="font-extrabold text-gray-900 text-sm">Acme Technologies Ltd.</p>
                <p className="text-gray-600 mt-0.5">Plot 42, Tech Park Central, MIDC, Mumbai, Maharashtra 400093</p>
                <p className="text-gray-500 font-mono mt-1">GSTIN: 27AABCA1234F1Z8</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-400 uppercase tracking-wider text-[10px] block mb-1">Invoice Info:</span>
                <p className="font-mono font-extrabold text-emerald-800 text-sm">{selectedInvoice.id}</p>
                <p className="text-gray-600 mt-0.5">Date of Issue: {selectedInvoice.issueDate}</p>
                <p className="text-gray-600">Payment Due: {selectedInvoice.dueDate}</p>
                <span
                  className={`inline-block mt-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    selectedInvoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  Status: {selectedInvoice.status}
                </span>
              </div>
            </div>

            {/* Line Items */}
            <div className="py-6">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] uppercase font-bold text-gray-400 bg-gray-50/70 border-b border-gray-100">
                  <tr>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">HSN/SAC</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Rate</th>
                    <th className="py-2.5 px-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedInvoice.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-3 px-3 font-semibold text-gray-800">{item.desc}</td>
                      <td className="py-3 px-3 font-mono text-gray-500">{item.hsn}</td>
                      <td className="py-3 px-3 text-center font-bold">{item.qty}</td>
                      <td className="py-3 px-3 text-right font-mono">₹{item.rate.toLocaleString()}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-gray-900">₹{item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col items-end text-xs space-y-1.5">
                <div className="flex justify-between w-60 text-gray-500">
                  <span>Taxable Subtotal:</span>
                  <span className="font-mono font-semibold text-gray-800">₹{selectedInvoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-60 text-gray-500">
                  <span>Integrated GST (18%):</span>
                  <span className="font-mono font-semibold text-gray-800">₹{selectedInvoice.gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-60 pt-2 border-t border-gray-200 text-sm font-extrabold text-emerald-900">
                  <span>Grand Total:</span>
                  <span className="font-mono">₹{selectedInvoice.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Bank details & buttons */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-gray-500">
                <p className="font-bold text-gray-700">Bank Wire Remittance Details:</p>
                <p>HDFC Bank • A/C No: 50200012349876 • IFSC: HDFC0000123</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleDownload(selectedInvoice)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
