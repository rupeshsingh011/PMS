import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calculator, Download, Calendar, CheckCircle2,
  AlertCircle, ArrowRight, FileSpreadsheet, ShieldCheck
} from 'lucide-react';

const taxSlabs = [
  {
    sacHsn: 'SAC 997314',
    service: 'Rental / Lease of Commercial Office Machinery (Printers & MFPs)',
    rate: '18% GST',
    turnoverMTD: '₹14,50,000',
    cgst: '₹1,30,500',
    sgst: '₹1,30,500',
    igst: '₹0',
    totalTax: '₹2,61,000'
  },
  {
    sacHsn: 'HSN 844332',
    service: 'Outright Sale of Laser Multifunction Printers',
    rate: '18% GST',
    turnoverMTD: '₹8,20,000',
    cgst: '₹49,200',
    sgst: '₹49,200',
    igst: '₹49,200',
    totalTax: '₹1,47,600'
  },
  {
    sacHsn: 'HSN 844399',
    service: 'Printer Consumables, High-Yield Toner Packs & Drums',
    rate: '18% GST',
    turnoverMTD: '₹3,80,000',
    cgst: '₹34,200',
    sgst: '₹34,200',
    igst: '₹0',
    totalTax: '₹68,400'
  },
  {
    sacHsn: 'SAC 998716',
    service: 'Annual Maintenance Contracts (AMC) & Preventive Visits',
    rate: '18% GST',
    turnoverMTD: '₹2,90,000',
    cgst: '₹26,100',
    sgst: '₹26,100',
    igst: '₹0',
    totalTax: '₹52,200'
  }
];

const filingDeadlines = [
  { form: 'GSTR-1', desc: 'Outward Supplies & Monthly Sales Ledger', dueDate: '11 Nov 2026', status: 'Filed & Reconciled', badge: 'bg-emerald-100 text-emerald-800' },
  { form: 'GSTR-3B', desc: 'Summary Return & Monthly Net Tax Liability Payment', dueDate: '20 Nov 2026', status: 'Upcoming', badge: 'bg-blue-100 text-blue-800' },
  { form: 'TDS (Sec 194C / 194J)', desc: 'Contractor & Technical Engineer Tax Deduction', dueDate: '07 Nov 2026', status: 'Challan Paid', badge: 'bg-emerald-100 text-emerald-800' },
  { form: 'Advance Tax Installment 3', desc: 'Corporate Income Tax Advance Installment (75%)', dueDate: '15 Dec 2026', status: 'Scheduled', badge: 'bg-purple-100 text-purple-800' }
];

const Taxes = () => {
  const navigate = useNavigate();
  const [selectedQuarter, setSelectedQuarter] = useState('Q3 FY 2026-27');

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Corporate Taxes & GST Compliance</h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              CGST, SGST, IGST liabilities, Input Tax Credit (ITC) ledger, and statutory return schedules.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => navigate('/admin/accounts/gst')}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Detailed GSTR Reports</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gross Output Tax</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">₹5,29,200</h3>
            <span className="text-xs text-gray-500 font-medium block mt-1">18% On Total Billings</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-700 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Eligible Input Tax Credit (ITC)</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">₹1,94,800</h3>
            <span className="text-xs text-emerald-600 font-semibold block mt-1">From OEM Purchases</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Net Cash Tax Payable</p>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-1">₹3,34,400</h3>
            <span className="text-xs text-blue-500 font-medium block mt-1">GSTR-3B Offset Due</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">TDS Deducted (Sec 194C)</p>
            <h3 className="text-2xl font-extrabold text-purple-600 mt-1">₹28,600</h3>
            <span className="text-xs text-purple-600 font-semibold block mt-1">Challan 281 Reconciled</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Statutory Calendar & Deadlines */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-extrabold text-gray-900 text-base mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <span>Statutory Compliance Calendar & Deadlines</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filingDeadlines.map((item) => (
            <div key={item.form} className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-extrabold text-gray-900 text-sm">{item.form}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.badge}`}>{item.status}</span>
                </div>
                <p className="text-xs text-gray-600 leading-snug">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200/60 flex justify-between text-xs font-semibold text-gray-700">
                <span>Due Date:</span>
                <span className="text-gray-900">{item.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HSN / SAC Liability Breakdown Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-gray-900 text-base">HSN / SAC Wise GST Liability Register</h3>
            <p className="text-xs text-gray-500">Categorized according to Goods and Services Tax Network (GSTN) classifications</p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Tax Audit Sheet</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 text-[11px] uppercase tracking-wider font-bold text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">HSN / SAC Code</th>
                <th className="px-6 py-4 whitespace-nowrap">Service / Product Classification</th>
                <th className="px-6 py-4 whitespace-nowrap">GST Rate</th>
                <th className="px-6 py-4 whitespace-nowrap">Taxable Turnover</th>
                <th className="px-6 py-4 whitespace-nowrap">CGST (9%)</th>
                <th className="px-6 py-4 whitespace-nowrap">SGST (9%)</th>
                <th className="px-6 py-4 whitespace-nowrap">IGST (18%)</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Total Tax Liability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {taxSlabs.map((t) => (
                <tr key={t.sacHsn} className="hover:bg-emerald-50/20 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-emerald-800 text-xs whitespace-nowrap">
                    {t.sacHsn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold text-xs">
                    {t.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600 font-bold">
                    {t.rate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900 text-xs">
                    {t.turnoverMTD}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                    {t.cgst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                    {t.sgst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                    {t.igst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-extrabold text-emerald-700 text-sm text-right">
                    {t.totalTax}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Taxes;
