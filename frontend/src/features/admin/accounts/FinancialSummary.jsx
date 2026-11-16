import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileBarChart, BarChart3, Download, PieChart,
  CheckCircle2, Building2, TrendingUp, DollarSign,
  ArrowRight, ShieldCheck, X
} from 'lucide-react';

const assets = [
  { item: 'Cash & Liquid Bank Current Balances', val: '₹34,80,000', cat: 'Current Assets' },
  { item: 'Customer Accounts Receivable (Net of Provisions)', val: '₹18,19,000', cat: 'Current Assets' },
  { item: 'Consumable & Spare Parts Inventory at Warehouse', val: '₹12,40,000', cat: 'Current Assets' },
  { item: 'Capitalized Commercial Printer Fleet (Depreciated Value)', val: '₹84,50,000', cat: 'Fixed Assets' },
  { item: 'Office Infrastructure, Vehicles & Diagnostic Tools', val: '₹14,20,000', cat: 'Fixed Assets' }
];

const liabilities = [
  { item: 'OEM Supplier Accounts Payable (HP, Canon, Epson)', val: '₹4,65,000', cat: 'Current Liabilities' },
  { item: 'Statutory GST & Advance Tax Accruals', val: '₹3,34,400', cat: 'Current Liabilities' },
  { item: 'Customer Security Deposits (Printer Rental)', val: '₹8,50,000', cat: 'Current Liabilities' },
  { item: 'Long-Term Equipment Refinancing Facility', val: '₹22,00,000', cat: 'Long-Term Debt' },
  { item: 'Retained Earnings & Shareholder Equity', val: '₹1,25,59,600', cat: 'Equity' }
];

const FinancialSummary = () => {
  const navigate = useNavigate();
  const [reportModal, setReportModal] = useState(false);
  const [reportType, setReportType] = useState('Executive Balance Sheet');

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl">
            <FileBarChart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Financial Summary & Balance Sheet</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Enterprise financial position, working capital ratio, capitalized fleet valuation, and equity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setReportModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Official Statement</span>
          </button>
        </div>
      </div>

      {/* Top 4 Financial Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Enterprise Assets</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">₹1.64 Cr</h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-1">+18.2% Capital Growth</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Working Capital Ratio</p>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-1">4.02x</h3>
            <span className="text-xs text-blue-600 font-semibold block mt-1">Very Strong Liquidity</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Net Shareholder Equity</p>
            <h3 className="text-2xl font-extrabold text-purple-600 mt-1">₹1.25 Cr</h3>
            <span className="text-xs text-purple-600 font-semibold block mt-1">76.5% Equity-to-Assets</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Debt-to-Equity Ratio</p>
            <h3 className="text-2xl font-extrabold text-teal-600 mt-1">0.18</h3>
            <span className="text-xs text-teal-600 font-semibold block mt-1">Low Financial Leverage</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Balance Sheet Dual Column: Assets vs Liabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets Column */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">ASSETS</h3>
              <p className="text-xs text-gray-500">Capital investments & operational liquidity</p>
            </div>
            <span className="text-base font-extrabold text-emerald-700">Total: ₹1,64,09,000</span>
          </div>

          <div className="space-y-3">
            {assets.map((a) => (
              <div key={a.item} className="p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-gray-900">{a.item}</p>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">{a.cat}</span>
                </div>
                <p className="font-extrabold text-gray-900 text-sm">{a.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Liabilities & Equity Column */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">LIABILITIES & EQUITY</h3>
              <p className="text-xs text-gray-500">Creditors, provisions & retained earnings</p>
            </div>
            <span className="text-base font-extrabold text-blue-700">Total: ₹1,64,09,000</span>
          </div>

          <div className="space-y-3">
            {liabilities.map((l) => (
              <div key={l.item} className="p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-gray-900">{l.item}</p>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">{l.cat}</span>
                </div>
                <p className="font-extrabold text-gray-900 text-sm">{l.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Statement Modal */}
      {reportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-gray-900">Export Audited Financial Statements</h3>
              <button onClick={() => setReportModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Report Type
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium"
                >
                  <option value="Executive Balance Sheet">Executive Balance Sheet (As of 31 Oct 2026)</option>
                  <option value="Trial Balance Summary">Trial Balance Summary (Debit / Credit Ledger)</option>
                  <option value="Cash Flow Statement">Cash Flow Direct Statement</option>
                  <option value="Capitalized Fleet Fixed Assets Register">Capitalized Fleet Fixed Assets Register</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                  Certification Level
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl font-medium">
                  <option>Management Certified Internal Report</option>
                  <option>Statutory Audit Certified Copy (With Digital Signature)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setReportModal(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    window.print();
                    setReportModal(false);
                  }}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialSummary;
