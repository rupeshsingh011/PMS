import React from 'react';
import { Download, ChevronDown, CheckCircle, FileText, UploadCloud, Eye, Wallet } from 'lucide-react';

const GSTReports = () => {
  const gstDetails = [
    { gstin: '24ABCDE1234F1Z5', reportType: 'GSTR-1', taxableAmount: '$125,750.00', cgst: '$11,317.50', sgst: '$11,317.50', igst: '$0.00', totalGst: '$22,635.00', status: 'Filed' },
    { gstin: '24ABCDE1234F1Z5', reportType: 'GSTR-3B', taxableAmount: '$85,250.00', cgst: '$7,672.50', sgst: '$7,672.50', igst: '$0.00', totalGst: '$15,345.00', status: 'Filed' },
    { gstin: '24ABCDE1234F1Z5', reportType: 'GSTR-9', taxableAmount: '$210,000.00', cgst: '$18,990.00', sgst: '$18,990.00', igst: '$0.00', totalGst: '$37,980.00', status: 'Filed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans pb-24">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GST Report</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage GST reports and filings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-between gap-4 px-4 py-2 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm min-w-[140px]">
            May 2024 <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Total Sales (Taxable)', value: '$125,750.00', icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Total GST Collected', value: '$22,635.00', icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Total Purchases (Taxable)', value: '$85,250.00', icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Total GST Paid', value: '$15,345.00', icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Net GST Payable', value: '$7,290.00', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Return Period', value: 'May 2024', icon: UploadCloud, color: 'text-indigo-500', bg: 'bg-indigo-50' }
        ].map((kpi, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden">
            <div>
              <p className="text-gray-500 text-xs font-medium mb-1 truncate">{kpi.label}</p>
              <h3 className="text-lg font-bold text-gray-900">{kpi.value}</h3>
            </div>
            <div className={`absolute bottom-3 right-3 p-1.5 rounded-lg ${kpi.bg}`}>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - GST Summary */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
          <h2 className="text-sm font-bold text-gray-900 mb-6">GST Summary</h2>
          
          <div className="space-y-4 text-sm flex-1">
            <div className="flex justify-between items-center text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">
              <span>Description</span>
              <span>Amount</span>
            </div>
            
            <div>
              <div className="flex justify-between items-center font-medium text-gray-900 mb-2">
                <span>Total Sales (Taxable)</span>
                <span>$125,750.00</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-xs ml-4 mb-1">
                <span>Add: CGST Collected (9%)</span>
                <span>$11,317.50</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-xs ml-4 mb-3">
                <span>Add: SGST Collected (9%)</span>
                <span>$11,317.50</span>
              </div>
              <div className="flex justify-between items-center font-bold text-indigo-600 border-b border-gray-100 pb-4">
                <span>Total GST Collected</span>
                <span>$22,635.00</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center font-medium text-gray-900 mb-2">
                <span>Total Purchases (Taxable)</span>
                <span>$85,250.00</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-xs ml-4 mb-1">
                <span>Less: CGST Paid (9%)</span>
                <span>$7,672.50</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 text-xs ml-4 mb-3">
                <span>Less: SGST Paid (9%)</span>
                <span>$7,672.50</span>
              </div>
              <div className="flex justify-between items-center font-bold text-emerald-600 border-b border-gray-100 pb-4">
                <span>Total GST Paid</span>
                <span>$15,345.00</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center font-bold text-blue-600 text-base mt-4 pt-4 border-t border-gray-100">
            <span>Net GST Payable</span>
            <span>$7,290.00</span>
          </div>
        </div>

        {/* Middle Column - GST Report Details */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-900">GST Report Details</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-gray-500 uppercase tracking-wider font-bold bg-gray-50/50">
                <tr>
                  <th className="px-4 py-4">GSTIN</th>
                  <th className="px-4 py-4">Report Type</th>
                  <th className="px-4 py-4">Taxable Amount</th>
                  <th className="px-4 py-4">CGST</th>
                  <th className="px-4 py-4">SGST</th>
                  <th className="px-4 py-4">IGST</th>
                  <th className="px-4 py-4">Total GST</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {gstDetails.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors text-xs">
                    <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">{row.gstin}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-600">{row.reportType}</td>
                    <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">{row.taxableAmount}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-600">{row.cgst}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-600">{row.sgst}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-600">{row.igst}</td>
                    <td className="px-4 py-4 whitespace-nowrap font-bold text-gray-900">{row.totalGst}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-[10px] font-bold uppercase text-emerald-500">
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded transition-colors mx-auto block" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-sm font-bold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="space-y-3 flex-1 flex flex-col">
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-100 rounded-xl text-sm font-medium text-indigo-600 transition-colors">
              File GSTR-1
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-100 rounded-xl text-sm font-medium text-indigo-600 transition-colors">
              File GSTR-3B
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-100 rounded-xl text-sm font-medium text-indigo-600 transition-colors mb-4">
              File GSTR-9
            </button>
            
            <div className="border-t border-gray-100 my-2 pt-4 space-y-3">
              <button className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                <Download className="w-4 h-4" /> Download Report
              </button>
              <button className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                <Eye className="w-4 h-4" /> View GST History
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GSTReports;
