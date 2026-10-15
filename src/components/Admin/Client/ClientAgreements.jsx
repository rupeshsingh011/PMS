import React, { useState } from 'react';
import { ShieldCheck, Search, Plus, Filter, FileText, Download, Calendar } from 'lucide-react';
import PageHeader from '../common/PageHeader';
import DataTable from '../common/DataTable';

const MOCK_AGREEMENTS = [
  { id: 'AMC-2024-001', clientName: 'Acme Corp', type: 'Comprehensive AMC', startDate: '2024-01-01', endDate: '2024-12-31', amount: '₹1,50,000', status: 'Active' },
  { id: 'AMC-2024-002', clientName: 'Globex Inc', type: 'Non-Comprehensive AMC', startDate: '2023-06-01', endDate: '2024-05-31', amount: '₹75,000', status: 'Expiring Soon' },
  { id: 'SLA-2023-005', clientName: 'TechCorp', type: 'Service Level Agreement', startDate: '2022-01-01', endDate: '2023-12-31', amount: '₹2,00,000', status: 'Expired' },
];

const ClientAgreements = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { 
      key: 'agreementInfo', 
      label: 'Agreement Details',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900">{row.id}</div>
            <div className="text-xs text-gray-500">{row.type}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'clientName', 
      label: 'Client Company',
      render: (val) => <span className="text-sm font-medium text-gray-900">{val}</span>
    },
    { 
      key: 'duration', 
      label: 'Duration',
      render: (val, row) => (
        <div className="space-y-1">
          <div className="text-sm text-gray-600">Start: {row.startDate}</div>
          <div className="text-sm text-gray-600">End: {row.endDate}</div>
        </div>
      )
    },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (val) => <span className="text-sm font-mono font-medium text-gray-900">{val}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => {
        let color = 'bg-gray-100 text-gray-600';
        if (val === 'Active') color = 'bg-emerald-50 text-emerald-600';
        if (val === 'Expiring Soon') color = 'bg-amber-50 text-amber-600';
        if (val === 'Expired') color = 'bg-rose-50 text-rose-600';
        return <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${color}`}>{val}</span>;
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors" title="View Agreement"><FileText className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-amber-600 transition-colors" title="Renew"><Calendar className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-emerald-600 transition-colors" title="Download"><Download className="w-4 h-4" /></button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Client Agreements" breadcrumbs={[{ name: 'Clients', path: '/admin/clients' }, { name: 'Agreements' }]} />
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
          <Plus className="w-4 h-4" /> New Agreement
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search agreements by ID or client..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <DataTable columns={columns} data={MOCK_AGREEMENTS} />
      </div>
    </div>
  );
};

export default ClientAgreements;
