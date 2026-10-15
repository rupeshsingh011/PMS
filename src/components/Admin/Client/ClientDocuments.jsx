import React, { useState } from 'react';
import { FileText, Search, Plus, Filter, Download, Trash2, Eye } from 'lucide-react';
import PageHeader from '../common/PageHeader';
import DataTable from '../common/DataTable';

const MOCK_DOCS = [
  { id: 'DOC-001', clientName: 'Acme Corp', docType: 'Service Agreement', fileName: 'Acme_SLA_2024.pdf', uploadDate: '2024-01-15', size: '2.4 MB', status: 'Active' },
  { id: 'DOC-002', clientName: 'Acme Corp', docType: 'GST Certificate', fileName: 'Acme_GST.pdf', uploadDate: '2024-01-10', size: '1.1 MB', status: 'Verified' },
  { id: 'DOC-003', clientName: 'Globex Inc', docType: 'PAN Card', fileName: 'Globex_PAN.jpg', uploadDate: '2024-03-12', size: '800 KB', status: 'Pending Review' },
];

const ClientDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { 
      key: 'document', 
      label: 'Document Name',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900">{row.fileName}</div>
            <div className="text-xs text-gray-500">{row.size}</div>
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
      key: 'docType', 
      label: 'Document Type',
      render: (val) => <span className="text-sm text-gray-600">{val}</span>
    },
    { 
      key: 'uploadDate', 
      label: 'Upload Date',
      render: (val) => <span className="text-sm text-gray-600">{val}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => {
        let color = 'bg-gray-100 text-gray-600';
        if (val === 'Active' || val === 'Verified') color = 'bg-emerald-50 text-emerald-600';
        if (val === 'Pending Review') color = 'bg-amber-50 text-amber-600';
        return <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${color}`}>{val}</span>;
      }
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><Eye className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-emerald-600 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Client Documents" breadcrumbs={[{ name: 'Clients', path: '/admin/clients' }, { name: 'Documents' }]} />
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
          <Plus className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <DataTable columns={columns} data={MOCK_DOCS} />
      </div>
    </div>
  );
};

export default ClientDocuments;
