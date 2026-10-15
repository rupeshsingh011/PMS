import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Search, Filter, AlertCircle, Clock, CheckCircle2, User 
} from 'lucide-react';
import PageHeader from '../common/PageHeader';
import DataTable from '../common/DataTable';

const MOCK_TICKETS = [
  { id: 'TKT-1045', client: 'Globex Inc', issue: 'Printer Offline', priority: 'High', status: 'In Progress', engineer: 'Raj Kumar', date: '2023-11-15' },
  { id: 'TKT-1046', client: 'Acme Corp', issue: 'Paper Jam', priority: 'Medium', status: 'Open', engineer: 'Unassigned', date: '2023-11-16' },
  { id: 'TKT-1047', client: 'TechCorp', issue: 'Low Toner', priority: 'Low', status: 'Resolved', engineer: 'Amit Singh', date: '2023-11-14' },
];

const TicketList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { 
      key: 'ticketInfo', 
      label: 'Ticket Details',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900">{row.id}</div>
            <div className="text-xs text-gray-500 font-medium">{row.client}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'issue', 
      label: 'Issue',
      render: (val) => <span className="font-medium text-gray-800">{val}</span>
    },
    { 
      key: 'engineer', 
      label: 'Engineer',
      render: (val) => (
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <User className="w-4 h-4 text-gray-400" />
          {val}
        </div>
      )
    },
    { 
      key: 'priority', 
      label: 'Priority',
      render: (val) => {
        const color = val === 'High' ? 'text-rose-600 bg-rose-50' : val === 'Medium' ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50';
        return <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${color}`}>{val}</span>;
      }
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => {
        let color = 'bg-gray-100 text-gray-600';
        if (val === 'Resolved') color = 'bg-emerald-50 text-emerald-600';
        if (val === 'In Progress') color = 'bg-blue-50 text-blue-600';
        if (val === 'Open') color = 'bg-amber-50 text-amber-600';
        return (
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${color}`}>
            {val}
          </span>
        );
      }
    },
    { 
      key: 'date', 
      label: 'Date',
      render: (val) => <span className="text-sm text-gray-500">{val}</span>
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <PageHeader title="Tickets" breadcrumbs={[{ name: 'Management', path: '/admin/management' }, { name: 'Tickets' }]} />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
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
          data={MOCK_TICKETS} 
          onRowClick={(row) => navigate(`/admin/management/tickets/${row.id}`)}
        />
      </div>
    </div>
  );
};

export default TicketList;
