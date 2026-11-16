import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Search, CheckCircle2,
  Clock, ArrowRight, X
} from 'lucide-react';

const initialVendors = [
  {
    id: 'VP-2026-0311',
    vendor: 'HP India Sales Pvt. Ltd.',
    poRef: 'PO-HP-2026-92',
    category: 'Enterprise Printer Hardware',
    amount: '₹3,40,000',
    dueDate: '15 Nov 2026',
    status: 'Pending Approval',
    terms: 'Net 30',
    bankAccount: 'Citibank N.A. (HP India *9021)'
  },
  {
    id: 'VP-2026-0310',
    vendor: 'Canon India Industrial Distributors',
    poRef: 'PO-CAN-2026-50',
    category: 'OEM Toner Cartridges & Drums',
    amount: '₹1,25,000',
    dueDate: '20 Nov 2026',
    status: 'Scheduled',
    terms: 'Net 45',
    bankAccount: 'Standard Chartered (*1190)'
  },
  {
    id: 'VP-2026-0309',
    vendor: 'JK Paper & Packaging Mills',
    poRef: 'PO-JK-2026-14',
    category: 'A4 High-Brightness Executive Reams',
    amount: '₹58,000',
    dueDate: '08 Nov 2026',
    status: 'Paid',
    terms: 'Net 15',
    bankAccount: 'HDFC Corporate Banking (*4410)'
  },
  {
    id: 'VP-2026-0308',
    vendor: 'DTDC Priority Express Cargo',
    poRef: 'PO-LOG-2026-78',
    category: 'Logistics & Nationwide Field Dispatch',
    amount: '₹22,400',
    dueDate: '01 Nov 2026',
    status: 'Paid',
    terms: 'Immediate',
    bankAccount: 'ICICI Current A/C (*8821)'
  }
];

const VendorPayments = () => {
  const navigate = useNavigate();
  const [vendorList, setVendorList] = useState(initialVendors);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [payModal, setPayModal] = useState(null);

  const filtered = vendorList.filter((v) => {
    const matchSearch =
      v.vendor.toLowerCase().includes(search.toLowerCase()) ||
      v.poRef.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDisburse = (e) => {
    e.preventDefault();
    if (!payModal) return;
    setVendorList(
      vendorList.map((item) =>
        item.id === payModal.id ? { ...item, status: 'Paid' } : item
      )
    );
    setPayModal(null);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-teal-50 text-teal-700 rounded-2xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Vendor Payments & Accounts Payable</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Manage OEM hardware procurements, paper supplier remittances, and logistic carrier payments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => navigate('/admin/accounts/expenses')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>Operational Expenses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Payables</p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">₹4,65,000</h3>
            <span className="text-xs text-amber-600 font-semibold block mt-1">2 OEM Invoices Due</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Disbursed (MTD)</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹80,400</h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-1">Cleared via Corporate Wire</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Suppliers</p>
            <h3 className="text-2xl font-extrabold text-teal-600 mt-1">12 Approved Vendors</h3>
            <span className="text-xs text-teal-600 font-semibold block mt-1">Tier-1 OEM Partnerships</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
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
            placeholder="Search vendor name, purchase order, category..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-teal-500 font-medium"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="Pending Approval">Pending Approval</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      {/* Payables Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 text-[11px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Voucher Ref</th>
                <th className="px-6 py-4 whitespace-nowrap">Vendor Name & Category</th>
                <th className="px-6 py-4 whitespace-nowrap">PO Reference</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount Payable</th>
                <th className="px-6 py-4 whitespace-nowrap">Due Date</th>
                <th className="px-6 py-4 whitespace-nowrap">Terms</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-teal-50/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-teal-800 text-xs whitespace-nowrap">
                    {v.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-bold text-gray-900 text-sm leading-tight">{v.vendor}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{v.category}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs font-semibold text-blue-600">
                    {v.poRef}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-extrabold text-gray-900 text-sm">
                    {v.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-700 font-medium">
                    {v.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {v.terms}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        v.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : v.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {v.status !== 'Paid' ? (
                      <button
                        onClick={() => setPayModal(v)}
                        className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        Authorize Payout
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">Cleared</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disburse Modal */}
      {payModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-gray-900">Authorize Vendor Remittance</h3>
              <button onClick={() => setPayModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDisburse} className="py-4 space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-2xl space-y-1">
                <span className="text-gray-500">Beneficiary:</span>
                <p className="font-bold text-gray-900 text-sm">{payModal.vendor}</p>
                <p className="text-[11px] text-gray-600">{payModal.bankAccount}</p>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Amount to Disburse:</span>
                <span className="font-extrabold text-teal-700 text-base">{payModal.amount}</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Disbursing Corporate Account
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium">
                  <option>HDFC Current A/C (Balance: ₹18.4 Lakhs)</option>
                  <option>ICICI Escrow A/C (Balance: ₹9.2 Lakhs)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Payment Mode
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium">
                  <option>Corporate NetBanking RTGS (Immediate)</option>
                  <option>Scheduled Corporate Direct Debit</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setPayModal(null)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-md"
                >
                  Execute Wire Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorPayments;
