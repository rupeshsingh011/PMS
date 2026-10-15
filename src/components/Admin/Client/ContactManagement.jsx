import React, { useState } from 'react';
import { Users, Search, Plus, Filter, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import PageHeader from '../common/PageHeader';
import DataTable from '../common/DataTable';

const MOCK_CONTACTS = [
  { id: 'C-001', name: 'John Doe', role: 'CTO', clientName: 'Acme Corp', email: 'john@acme.com', phone: '+91 9876543210', primary: true },
  { id: 'C-002', name: 'Jane Finance', role: 'Billing Head', clientName: 'Acme Corp', email: 'billing@acme.com', phone: '+91 9876500000', primary: false },
  { id: 'C-003', name: 'Jane Smith', role: 'MD', clientName: 'Globex Inc', email: 'jane@globex.com', phone: '+91 9876543211', primary: true },
];

const ContactManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { 
      key: 'contactInfo', 
      label: 'Contact Details',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold border border-indigo-100">
            {row.name.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-gray-900 flex items-center gap-2">
              {row.name}
              {row.primary && <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase tracking-wider">Primary</span>}
            </div>
            <div className="text-xs text-gray-500">{row.role}</div>
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
      key: 'communication', 
      label: 'Communication',
      render: (val, row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-3.5 h-3.5 text-gray-400" /> {row.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-3.5 h-3.5 text-gray-400" /> {row.phone}
          </div>
        </div>
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
        <PageHeader title="Contact Management" breadcrumbs={[{ name: 'Clients', path: '/admin/clients' }, { name: 'Contacts' }]} />
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search contacts by name, email or client..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <DataTable columns={columns} data={MOCK_CONTACTS} />
      </div>
    </div>
  );
};

export default ContactManagement;
