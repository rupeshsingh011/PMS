import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Search, Filter, AlertCircle, Plus, CheckCircle 
} from 'lucide-react';
import PageHeader from '../common/PageHeader';
import DataTable from '../common/DataTable';

const MOCK_INVOICES = [
  { id: 'INV-2023-001', client: 'Globex Inc', amount: '$1,200', date: '2023-11-15', dueDate: '2023-11-30', status: 'Paid' },
  { id: 'INV-2023-002', client: 'Acme Corp', amount: '$4,500', date: '2023-11-16', dueDate: '2023-12-01', status: 'Pending' },
  { id: 'INV-2023-003', client: 'TechCorp', amount: '$890', date: '2023-10-14', dueDate: '2023-10-28', status: 'Overdue' },
];

const CustomerInvoices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { 
      key: 'invoiceInfo', 
      label: 'Invoice Details',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900">{row.id}</div>
            <div className="text-xs text-gray-500 font-medium">{row.client}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (val) => <span className="font-bold text-gray-900">{val}</span>
    },
    { 
      key: 'date', 
      label: 'Issue Date',
      render: (val) => <span className="text-sm text-gray-500">{val}</span>
    },
    { 
      key: 'dueDate', 
      label: 'Due Date',
      render: (val) => <span className="text-sm text-gray-500">{val}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => {
        let color = 'bg-gray-100 text-gray-600';
        if (val === 'Paid') color = 'bg-emerald-50 text-emerald-600';
        if (val === 'Pending') color = 'bg-amber-50 text-amber-600';
        if (val === 'Overdue') color = 'bg-rose-50 text-rose-600';
        return (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${color}`}>
            {val}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <PageHeader title="Customer Invoices" breadcrumbs={[{ name: 'Accounts', path: '/admin/accounts' }, { name: 'Customer Invoices' }]} />
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <DataTable 
          columns={columns} 
          data={MOCK_INVOICES} 
          onRowClick={(row) => console.log('Clicked', row.id)}
        />
      </div>
    </div>
  );
};

export default CustomerInvoices;
