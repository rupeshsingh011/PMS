import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ShoppingCart, FileText, Receipt, CreditCard, Clock,
  BarChart2, TrendingUp, Plus, Search, Filter, Download,
  CheckCircle, XCircle, AlertCircle, ArrowUpRight,
  Package, Calendar, Eye, Edit2, Trash2,
  ChevronRight, Star, Printer
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const salesRecords = [
  { id: 'SL-001', client: 'Acme Corp', product: 'HP LaserJet Pro', qty: 3, amount: 87000, status: 'Completed', date: '2026-07-10' },
  { id: 'SL-002', client: 'Globex Inc', product: 'Canon PIXMA G3010', qty: 5, amount: 62500, status: 'Pending', date: '2026-07-11' },
  { id: 'SL-003', client: 'Stark Industries', product: 'Epson EcoTank', qty: 2, amount: 34000, status: 'Processing', date: '2026-07-12' },
  { id: 'SL-004', client: 'Wayne Enterprises', product: 'Brother DCP-L2541DW', qty: 10, amount: 195000, status: 'Completed', date: '2026-07-13' },
  { id: 'SL-005', client: 'Initech LLC', product: 'HP OfficeJet Pro', qty: 1, amount: 28500, status: 'Cancelled', date: '2026-07-14' },
];

const invoices = [
  { id: 'INV-2026-001', client: 'Acme Corp', amount: 87000, tax: 15660, total: 102660, status: 'Paid', due: '2026-07-25' },
  { id: 'INV-2026-002', client: 'Globex Inc', amount: 62500, tax: 11250, total: 73750, status: 'Pending', due: '2026-07-28' },
  { id: 'INV-2026-003', client: 'Stark Industries', amount: 34000, tax: 6120, total: 40120, status: 'Overdue', due: '2026-07-05' },
  { id: 'INV-2026-004', client: 'Wayne Enterprises', amount: 195000, tax: 35100, total: 230100, status: 'Paid', due: '2026-07-30' },
];

const monthlyRevenue = [
  { month: 'Jan', revenue: 420000, target: 400000 },
  { month: 'Feb', revenue: 380000, target: 400000 },
  { month: 'Mar', revenue: 510000, target: 450000 },
  { month: 'Apr', revenue: 470000, target: 450000 },
  { month: 'May', revenue: 620000, target: 500000 },
  { month: 'Jun', revenue: 590000, target: 500000 },
  { month: 'Jul', revenue: 680000, target: 550000 },
];

const paymentData = [
  { client: 'Acme Corp', invoice: 'INV-2026-001', amount: 102660, method: 'Bank Transfer', status: 'Received', date: '2026-07-12' },
  { client: 'Wayne Enterprises', invoice: 'INV-2026-004', amount: 230100, method: 'Cheque', status: 'Received', date: '2026-07-14' },
  { client: 'Globex Inc', invoice: 'INV-2026-002', amount: 73750, method: 'UPI', status: 'Pending', date: '—' },
  { client: 'Stark Industries', invoice: 'INV-2026-003', amount: 40120, method: 'Bank Transfer', status: 'Overdue', date: '—' },
];

const orderHistory = [
  { id: 'ORD-001', client: 'Acme Corp', items: 3, total: 87000, status: 'Delivered', ordered: '2026-07-01', delivered: '2026-07-10' },
  { id: 'ORD-002', client: 'Globex Inc', items: 5, total: 62500, status: 'In Transit', ordered: '2026-07-08', delivered: '—' },
  { id: 'ORD-003', client: 'Stark Industries', items: 2, total: 34000, status: 'Processing', ordered: '2026-07-12', delivered: '—' },
  { id: 'ORD-004', client: 'Wayne Enterprises', items: 10, total: 195000, status: 'Delivered', ordered: '2026-07-05', delivered: '2026-07-13' },
];

const topProducts = [
  { name: 'HP LaserJet Pro', sold: 48, revenue: 1392000, growth: 12 },
  { name: 'Canon PIXMA G3010', sold: 35, revenue: 437500, growth: 8 },
  { name: 'Epson EcoTank', sold: 29, revenue: 493000, growth: -3 },
  { name: 'Brother DCP-L2541DW', sold: 22, revenue: 429000, growth: 18 },
];

// ─── Section: New Sales ────────────────────────────────────────────────────────
const NewSales = () => {
  const [formData, setFormData] = useState({ client: '', product: '', qty: 1, price: '', discount: 0, notes: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const subtotal = (formData.price * formData.qty) || 0;
  const discountAmt = (subtotal * formData.discount) / 100;
  const gst = (subtotal - discountAmt) * 0.18;
  const total = subtotal - discountAmt + gst;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">New Sale</h2>
        <p className="text-gray-500 text-sm mt-1">Create a new sales order</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h3 className="font-semibold text-gray-800 pb-2 border-b border-gray-100">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
              <select name="client" value={formData.client} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="">Select Client</option>
                {['Acme Corp', 'Globex Inc', 'Stark Industries', 'Wayne Enterprises'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
              <select name="product" value={formData.product} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="">Select Product</option>
                {['HP LaserJet Pro', 'Canon PIXMA G3010', 'Epson EcoTank', 'Brother DCP-L2541DW'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
              <input type="number" name="qty" min="1" value={formData.qty} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (₹) *</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input type="number" name="discount" min="0" max="100" value={formData.discount} onChange={handleChange} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option>Bank Transfer</option><option>UPI</option><option>Cheque</option><option>Cash</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} placeholder="Additional notes..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Create Sale
            </button>
            <button className="px-6 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors">Reset</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-semibold text-blue-100 text-sm mb-4">Order Summary</h3>
            <div className="space-y-3">
              {[
                { label: 'Subtotal', value: `₹${subtotal.toLocaleString('en-IN')}` },
                { label: `Discount (${formData.discount}%)`, value: `-₹${discountAmt.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
                { label: 'GST (18%)', value: `₹${gst.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
              ].map(r => (
                <div key={r.label} className="flex justify-between text-sm">
                  <span className="text-blue-200">{r.label}</span>
                  <span className="font-medium">{r.value}</span>
                </div>
              ))}
              <div className="border-t border-blue-500/40 pt-3 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold">₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Quick Stats (Today)</h3>
            {[
              { label: 'Sales Created', value: '7', color: 'text-blue-600' },
              { label: 'Revenue', value: '₹3.2L', color: 'text-green-600' },
              { label: 'Pending Orders', value: '4', color: 'text-amber-600' },
            ].map(s => (
              <div key={s.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{s.label}</span>
                <span className={`font-bold ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Section: Sales Record ─────────────────────────────────────────────────────
const SalesRecord = () => {
  const [search, setSearch] = useState('');
  const filtered = salesRecords.filter(r =>
    r.client.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase())
  );
  const statusColor = { Completed: 'bg-green-100 text-green-700', Pending: 'bg-amber-100 text-amber-700', Processing: 'bg-blue-100 text-blue-700', Cancelled: 'bg-red-100 text-red-700' };
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Sales Records</h2>
          <p className="text-gray-500 text-sm mt-1">All sales transactions</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-blue-500 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search sales..." className="bg-transparent border-none outline-none ml-2 text-sm w-36" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"><Filter className="w-4 h-4" /> Filter</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"><Download className="w-4 h-4" /> Export</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              {['Sale ID', 'Client', 'Product', 'Qty', 'Amount', 'Status', 'Date', 'Actions'].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-blue-50/30 transition-colors">
                <td className="px-5 py-4 font-mono text-sm font-semibold text-blue-600">{r.id}</td>
                <td className="px-5 py-4 font-medium text-gray-900">{r.client}</td>
                <td className="px-5 py-4 text-gray-600 text-sm">{r.product}</td>
                <td className="px-5 py-4 text-gray-600">{r.qty}</td>
                <td className="px-5 py-4 font-semibold text-gray-900">₹{r.amount.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[r.status]}`}>{r.status}</span></td>
                <td className="px-5 py-4 text-gray-500 text-sm">{r.date}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p>No sales records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Section: Invoice Generate ─────────────────────────────────────────────────
const InvoiceGenerate = () => {
  const statusColor = { Paid: 'bg-green-100 text-green-700', Pending: 'bg-amber-100 text-amber-700', Overdue: 'bg-red-100 text-red-700' };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Invoice Generate</h2>
          <p className="text-gray-500 text-sm mt-1">Create and manage invoices</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"><Plus className="w-4 h-4" /> New Invoice</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoices', value: invoices.length, color: 'from-blue-500 to-blue-600', Icon: Receipt },
          { label: 'Paid', value: invoices.filter(i => i.status === 'Paid').length, color: 'from-green-500 to-emerald-600', Icon: CheckCircle },
          { label: 'Pending', value: invoices.filter(i => i.status === 'Pending').length, color: 'from-amber-400 to-orange-500', Icon: AlertCircle },
          { label: 'Overdue', value: invoices.filter(i => i.status === 'Overdue').length, color: 'from-red-500 to-rose-600', Icon: XCircle },
        ].map(c => (
          <div key={c.label} className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 text-white shadow-md`}>
            <c.Icon className="w-6 h-6 mb-2 opacity-80" />
            <p className="text-3xl font-bold">{c.value}</p>
            <p className="text-sm opacity-80 mt-1">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">All Invoices</h3>
          <button className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline"><Download className="w-4 h-4" /> Export All</button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              {['Invoice #', 'Client', 'Amount', 'Tax', 'Total', 'Status', 'Due Date', 'Actions'].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4 font-mono text-sm font-semibold text-blue-600">{inv.id}</td>
                <td className="px-5 py-4 font-medium text-gray-900">{inv.client}</td>
                <td className="px-5 py-4 text-gray-600">₹{inv.amount.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4 text-gray-600">₹{inv.tax.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4 font-semibold text-gray-900">₹{inv.total.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[inv.status]}`}>{inv.status}</span></td>
                <td className="px-5 py-4 text-gray-500 text-sm">{inv.due}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg"><Eye className="w-4 h-4" /></button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"><Printer className="w-4 h-4" /></button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"><Download className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Section: Payment Status ───────────────────────────────────────────────────
const PaymentStatus = () => {
  const statusConfig = {
    Received: { color: 'bg-green-100 text-green-700', Icon: CheckCircle, iconColor: 'text-green-500', bg: 'bg-green-100' },
    Pending: { color: 'bg-amber-100 text-amber-700', Icon: AlertCircle, iconColor: 'text-amber-500', bg: 'bg-amber-100' },
    Overdue: { color: 'bg-red-100 text-red-700', Icon: XCircle, iconColor: 'text-red-500', bg: 'bg-red-100' },
  };
  const totalReceived = paymentData.filter(p => p.status === 'Received').reduce((s, p) => s + p.amount, 0);
  const totalPending = paymentData.filter(p => p.status !== 'Received').reduce((s, p) => s + p.amount, 0);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Payment Status</h2>
        <p className="text-gray-500 text-sm mt-1">Track all client payments</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
          <p className="text-sm text-green-600 font-medium">Total Received</p>
          <p className="text-3xl font-bold text-green-700 mt-1">₹{totalReceived.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-sm text-amber-600 font-medium">Pending Amount</p>
          <p className="text-3xl font-bold text-amber-700 mt-1">₹{totalPending.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-sm text-blue-600 font-medium">Collection Rate</p>
          <p className="text-3xl font-bold text-blue-700 mt-1">{Math.round((totalReceived / (totalReceived + totalPending)) * 100)}%</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Payment Records</h3></div>
        <div className="divide-y divide-gray-100">
          {paymentData.map((p, i) => {
            const cfg = statusConfig[p.status];
            return (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-gray-50/40 transition-colors gap-3">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${cfg.bg}`}><cfg.Icon className={`w-5 h-5 ${cfg.iconColor}`} /></div>
                  <div>
                    <p className="font-semibold text-gray-900">{p.client}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{p.invoice} · {p.method}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:gap-8">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">₹{p.amount.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-gray-400">{p.date !== '—' ? `Paid: ${p.date}` : 'Not yet paid'}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>{p.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Section: Order History ────────────────────────────────────────────────────
const OrderHistoryTab = () => {
  const statusColor = { Delivered: 'bg-green-100 text-green-700', 'In Transit': 'bg-blue-100 text-blue-700', Processing: 'bg-amber-100 text-amber-700' };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Order History</h2>
          <p className="text-gray-500 text-sm mt-1">All past and active orders</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"><Calendar className="w-4 h-4" /> Date Range</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700"><Download className="w-4 h-4" /> Export</button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: orderHistory.length, Icon: Package, bg: 'bg-blue-600' },
          { label: 'Delivered', value: orderHistory.filter(o => o.status === 'Delivered').length, Icon: CheckCircle, bg: 'bg-green-500' },
          { label: 'In Transit', value: orderHistory.filter(o => o.status === 'In Transit').length, Icon: ArrowUpRight, bg: 'bg-indigo-500' },
          { label: 'Processing', value: orderHistory.filter(o => o.status === 'Processing').length, Icon: Clock, bg: 'bg-amber-500' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
            <div className={`${c.bg} p-3 rounded-xl`}><c.Icon className="w-5 h-5 text-white" /></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{c.value}</p>
              <p className="text-xs text-gray-500">{c.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              {['Order ID', 'Client', 'Items', 'Total', 'Status', 'Ordered', 'Delivered'].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orderHistory.map(o => (
              <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4 font-mono text-sm font-semibold text-blue-600">{o.id}</td>
                <td className="px-5 py-4 font-medium text-gray-900">{o.client}</td>
                <td className="px-5 py-4 text-gray-600">{o.items} items</td>
                <td className="px-5 py-4 font-semibold text-gray-900">₹{o.total.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[o.status]}`}>{o.status}</span></td>
                <td className="px-5 py-4 text-gray-500 text-sm">{o.ordered}</td>
                <td className="px-5 py-4 text-gray-500 text-sm">{o.delivered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Section: Sales Report ─────────────────────────────────────────────────────
const SalesReport = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Sales Report</h2>
        <p className="text-gray-500 text-sm mt-1">Comprehensive sales analytics</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"><Download className="w-4 h-4" /> Download Report</button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4">Revenue vs Target</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, '']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '12px' }} />
              <Bar dataKey="revenue" name="Revenue" fill="#3B82F6" radius={[5, 5, 0, 0]} barSize={14} />
              <Bar dataKey="target" name="Target" fill="#E5E7EB" radius={[5, 5, 0, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-4">Top Products</h3>
        <div className="space-y-4">
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{p.name}</p>
                <div className="h-1.5 bg-gray-100 rounded-full mt-1.5">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${(p.sold / 50) * 100}%` }} />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-gray-900 text-sm">₹{(p.revenue / 1000).toFixed(0)}k</p>
                <p className={`text-xs font-semibold ${p.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>{p.growth >= 0 ? '↑' : '↓'} {Math.abs(p.growth)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-4">Client-wise Sales Summary</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            {['Client', 'Orders', 'Total Sales', 'Status'].map(h => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {[
            { client: 'Acme Corp', orders: 12, total: 1240000, status: 'Active' },
            { client: 'Globex Inc', orders: 8, total: 870000, status: 'Active' },
            { client: 'Stark Industries', orders: 5, total: 520000, status: 'Active' },
            { client: 'Wayne Enterprises', orders: 15, total: 2100000, status: 'Premium' },
          ].map(r => (
            <tr key={r.client} className="hover:bg-gray-50/50">
              <td className="px-4 py-3 font-medium text-gray-900">{r.client}</td>
              <td className="px-4 py-3 text-gray-600">{r.orders}</td>
              <td className="px-4 py-3 font-semibold text-gray-900">₹{r.total.toLocaleString('en-IN')}</td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${r.status === 'Premium' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                  {r.status === 'Premium' && <Star className="w-3 h-3 inline mr-1" />}{r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Section: Monthly Revenue ──────────────────────────────────────────────────
const MonthlyRevenue = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Monthly Revenue</h2>
        <p className="text-gray-500 text-sm mt-1">Revenue trends and projections</p>
      </div>
      <select className="border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
        <option>FY 2025-26</option><option>FY 2024-25</option>
      </select>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Total Revenue', value: '₹38.7L', change: '+22%', up: true },
        { label: 'Avg Monthly', value: '₹5.5L', change: '+18%', up: true },
        { label: 'Best Month', value: 'July', change: '₹6.8L', up: null },
        { label: 'Growth Rate', value: '22%', change: 'YoY', up: true },
      ].map(k => (
        <div key={k.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{k.label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{k.value}</p>
          <p className={`text-xs font-semibold mt-1 ${k.up === true ? 'text-green-500' : k.up === false ? 'text-red-500' : 'text-gray-400'}`}>{k.up === true && '↑ '}{k.change}</p>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="font-bold text-gray-800 mb-6">Revenue Trend (Monthly)</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={v => [`₹${v.toLocaleString('en-IN')}`, '']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevS)" name="Revenue" />
            <Area type="monotone" dataKey="target" stroke="#D1D5DB" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} name="Target" />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: '16px' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100"><h3 className="font-semibold text-gray-800">Month-wise Breakdown</h3></div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            {['Month', 'Revenue', 'Target', 'Variance', 'Achievement'].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {monthlyRevenue.map(m => {
            const variance = m.revenue - m.target;
            const achievement = Math.round((m.revenue / m.target) * 100);
            return (
              <tr key={m.month} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4 font-semibold text-gray-900">{m.month}</td>
                <td className="px-5 py-4 font-semibold text-gray-900">₹{m.revenue.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4 text-gray-600">₹{m.target.toLocaleString('en-IN')}</td>
                <td className={`px-5 py-4 font-semibold ${variance >= 0 ? 'text-green-600' : 'text-red-500'}`}>{variance >= 0 ? '+' : ''}₹{variance.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.min(achievement, 100)}%` }} />
                    </div>
                    <span className={`text-xs font-bold ${achievement >= 100 ? 'text-green-600' : 'text-gray-600'}`}>{achievement}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Tab Configuration ─────────────────────────────────────────────────────────
const tabs = [
  { id: 'new', label: 'New Sales', Icon: Plus, Component: NewSales },
  { id: 'records', label: 'Sales Record', Icon: FileText, Component: SalesRecord },
  { id: 'invoice', label: 'Invoice Generate', Icon: Receipt, Component: InvoiceGenerate },
  { id: 'payment', label: 'Payment Status', Icon: CreditCard, Component: PaymentStatus },
  { id: 'orders', label: 'Order History', Icon: Clock, Component: OrderHistoryTab },
  { id: 'report', label: 'Sales Report', Icon: BarChart2, Component: SalesReport },
  { id: 'revenue', label: 'Monthly Revenue', Icon: TrendingUp, Component: MonthlyRevenue },
];

// ─── Shared Tab Bar ───────────────────────────────────────────────────────────
const TabBar = ({ tabs, active, onChange }) => (
  <div className="border-b border-gray-200 mb-6">
    <div className="flex gap-1 overflow-x-auto">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            active === t.id
              ? 'border-blue-500 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}>
          <t.Icon className="w-4 h-4" />
          {t.label}
        </button>
      ))}
    </div>
  </div>
);

// ─── Main Export ───────────────────────────────────────────────────────────────
const SalesManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState(tabFromUrl || 'new');

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    navigate(`/admin/sales?tab=${id}`, { replace: true });
  };

  const active = tabs.find(t => t.id === activeTab) || tabs[0];
  const ActiveComponent = active.Component;

  return (
    <div>
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-blue-600" /> Sales Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage orders, payments, and sales analytics</p>
      </div>
      <TabBar tabs={tabs} active={activeTab} onChange={handleTabChange} />
      <ActiveComponent />
    </div>
  );
};

export default SalesManagement;
