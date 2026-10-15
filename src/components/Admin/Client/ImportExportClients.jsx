import React from 'react';
import { UploadCloud, Download, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import PageHeader from '../common/PageHeader';

const ImportExportClients = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <PageHeader title="Import / Export Clients" breadcrumbs={[{ name: 'Clients', path: '/admin/clients' }, { name: 'Data Management' }]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Import Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <UploadCloud className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Import Clients</h2>
          <p className="text-gray-500 mb-6 text-sm">Upload a CSV or Excel file to bulk import client data into the system.</p>
          
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group mb-6">
            <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-8 h-8 text-indigo-500" />
            </div>
            <p className="text-sm font-medium text-gray-900 mb-1">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">CSV, XLS, or XLSX (max 10MB)</p>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" /> Before you upload
            </h4>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>Ensure data follows the standard template format.</li>
              <li>Duplicate emails or PAN numbers will be flagged.</li>
            </ul>
            <button className="text-indigo-600 font-medium text-sm mt-4 hover:underline">Download Template File</button>
          </div>
        </div>

        {/* Export Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col hover:shadow-md transition-shadow">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <Download className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Export Clients</h2>
          <p className="text-gray-500 mb-6 text-sm">Download your complete client database or export specific filtered data.</p>
          
          <div className="space-y-4 mb-6">
             <div className="p-4 border border-gray-100 rounded-xl hover:border-emerald-200 cursor-pointer transition-colors">
               <div className="flex justify-between items-center mb-1">
                 <h4 className="font-bold text-gray-900">All Clients Data</h4>
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />
               </div>
               <p className="text-xs text-gray-500">Export the entire database including all fields.</p>
             </div>
             <div className="p-4 border border-gray-100 rounded-xl hover:border-emerald-200 cursor-pointer transition-colors opacity-60">
               <div className="flex justify-between items-center mb-1">
                 <h4 className="font-bold text-gray-900">Active Clients Only</h4>
               </div>
               <p className="text-xs text-gray-500">Export only clients with active status.</p>
             </div>
          </div>

          <div className="mt-auto pt-6">
            <button className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all shadow-sm">
              <Download className="w-4 h-4" /> Export Data
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImportExportClients;
