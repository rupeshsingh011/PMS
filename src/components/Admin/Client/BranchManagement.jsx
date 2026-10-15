import React, { useState } from 'react';
import { MapPin, Search, Plus, Filter, Edit, Trash2 } from 'lucide-react';
import PageHeader from '../common/PageHeader';
import DataTable from '../common/DataTable';

const MOCK_BRANCHES = [
  { id: 'BR-001', name: 'Head Office (HQ)', clientName: 'Acme Corp', city: 'Mumbai', state: 'Maharashtra', contact: '+91 9876543210', status: 'Active' },
  { id: 'BR-002', name: 'North Zone Office', clientName: 'Globex Inc', city: 'Delhi', state: 'Delhi', contact: '+91 9876511111', status: 'Active' },
  { id: 'BR-003', name: 'South Hub', clientName: 'Acme Corp', city: 'Bangalore', state: 'Karnataka', contact: '+91 9876522222', status: 'Inactive' },
];

const BranchManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { 
      key: 'branchInfo', 
      label: 'Branch Details',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900">{row.name}</div>
            <div className="text-xs text-gray-500">{row.city}, {row.state}</div>
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
      key: 'contact', 
      label: 'Contact Number',
      render: (val) => <span className="text-sm text-gray-600">{val}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${val === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {val}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Branch Management" breadcrumbs={[{ name: 'Clients', path: '/admin/clients' }, { name: 'Branches' }]} />
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
          <Plus className="w-4 h-4" /> Add Branch
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search branches by name, city or client..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <DataTable columns={columns} data={MOCK_BRANCHES} />
      </div>
    </div>
  );
};

export default BranchManagement;
