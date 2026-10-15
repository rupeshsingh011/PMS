import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Bell, MoreHorizontal, Filter, Users, ShieldCheck, Star, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';

// Mock Data
const initialMockClients = [
  { id: 'CL-001', name: 'Daniel Anderson', company: 'Anderson LLC', email: 'daniel@anderson.com', phone: '+1 202-555-0187', membership: 'Premium', purchaseAmount: '$12,450.00', status: 'Active' },
  { id: 'CL-002', name: 'Sophia Carter', company: 'Carter Solutions', email: 'sophia@carter.com', phone: '+1 303-555-0149', membership: 'Standard', purchaseAmount: '$7,850.00', status: 'Active' },
  { id: 'CL-003', name: 'James Mitchell', company: 'Mitchell Group', email: 'james@mitchell.com', phone: '+1 415-555-0132', membership: 'Premium', purchaseAmount: '$15,200.00', status: 'Active' },
  { id: 'CL-004', name: 'Olivia Bennett', company: 'Bennett Co.', email: 'olivia@bennett.com', phone: '+1 512-555-0119', membership: 'Basic', purchaseAmount: '$2,350.00', status: 'Inactive' },
  { id: 'CL-005', name: 'Liam Harris', company: 'Harris Enterprises', email: 'liam@harris.com', phone: '+1 646-555-0176', membership: 'Standard', purchaseAmount: '$6,980.00', status: 'Inactive' },
  { id: 'CL-006', name: 'Emma Wilson', company: 'Wilson Dynamics', email: 'emma@wilson.com', phone: '+1 213-555-0199', membership: 'Premium', purchaseAmount: '$18,500.00', status: 'Active' },
  { id: 'CL-007', name: 'Noah Martinez', company: 'Martinez Tech', email: 'noah@martinez.com', phone: '+1 713-555-0122', membership: 'Basic', purchaseAmount: '$1,200.00', status: 'Active' },
  { id: 'CL-008', name: 'Ava Thompson', company: 'Thompson Inc', email: 'ava@thompson.com', phone: '+1 312-555-0144', membership: 'Standard', purchaseAmount: '$5,400.00', status: 'Inactive' },
  { id: 'CL-009', name: 'William Garcia', company: 'Garcia Logistics', email: 'william@garcia.com', phone: '+1 214-555-0188', membership: 'Premium', purchaseAmount: '$22,100.00', status: 'Active' },
  { id: 'CL-010', name: 'Isabella Robinson', company: 'Robinson Consulting', email: 'isabella@robinson.com', phone: '+1 305-555-0177', membership: 'Standard', purchaseAmount: '$8,950.00', status: 'Active' },
];

const ClientList = () => {
  const navigate = useNavigate();
  const [clientsData, setClientsData] = useState(() => {
    const saved = localStorage.getItem('mockClients');
    if (saved) {
      return JSON.parse(saved);
    }
    localStorage.setItem('mockClients', JSON.stringify(initialMockClients));
    return initialMockClients;
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [showColumnsFilter, setShowColumnsFilter] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    client: true,
    company: true,
    email: true,
    phone: true,
    membership: true,
    purchaseAmount: true,
    status: true,
  });

  const [statusFilter, setStatusFilter] = useState('All Status');
  const [membershipFilter, setMembershipFilter] = useState('All Membership');

  const filteredClients = clientsData.filter(client => {
    const matchStatus = statusFilter === 'All Status' || client.status === statusFilter;
    const matchMembership = membershipFilter === 'All Membership' || client.membership === membershipFilter;
    return matchStatus && matchMembership;
  });

  const handleDeleteClick = (client, e) => {
    e.stopPropagation();
    setSelectedClient(client);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedClient) {
      setClientsData((prev) => {
        const newData = prev.filter(c => c.id !== selectedClient.id);
        localStorage.setItem('mockClients', JSON.stringify(newData));
        return newData;
      });
    }
    setIsDeleteModalOpen(false);
    setSelectedClient(null);
  };

  // Helper for initials
  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  // Colors for initials avatars based on name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-indigo-600', 'bg-emerald-500', 'bg-blue-600', 'bg-purple-600', 'bg-rose-500'
    ];
    return colors[name.length % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans">

      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Client List</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your clients in one place.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search clients, companies..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-64 shadow-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="relative p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 shadow-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button
            onClick={() => navigate('/admin/clients/membership-plans')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm shadow-sm ml-2"
          >
            <Star className="w-4 h-4 text-purple-500" /> View Membership Plans
          </button>
          <button
            onClick={() => navigate('/admin/clients/add')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors text-sm shadow-sm ml-2"
          >
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Clients', value: '1,248', increase: '+12.5%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Active Clients', value: '956', increase: '+8.2%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Premium Members', value: '362', increase: '+15.3%', icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Total Revenue', value: '$2.45M', increase: '+18.7%', icon: DollarSign, color: 'text-amber-500', bg: 'bg-amber-50' }
        ].map((kpi, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{kpi.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
              </div>
              <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs">
              <span className="text-emerald-600 font-medium">{kpi.increase}</span>
              <span className="text-gray-400">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Area */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

        {/* Table Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by name, email or company..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col hidden sm:flex">
              <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm bg-transparent border-none text-gray-700 font-medium cursor-pointer focus:ring-0 outline-none pr-6"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="w-px h-8 bg-gray-200 mx-1 hidden sm:block"></div>
            <div className="flex flex-col hidden sm:flex">
              <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">Membership</span>
              <select
                value={membershipFilter}
                onChange={(e) => setMembershipFilter(e.target.value)}
                className="text-sm bg-transparent border-none text-gray-700 font-medium cursor-pointer focus:ring-0 outline-none pr-6"
              >
                <option value="All Membership">All Membership</option>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
                <option value="Basic">Basic</option>
              </select>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowColumnsFilter(!showColumnsFilter)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors ml-2"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
              {showColumnsFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-10 py-2">
                  <div className="px-4 py-2 border-b border-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Toggle Columns
                  </div>
                  {Object.keys(visibleColumns).map((col) => (
                    <label key={col} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={visibleColumns[col]}
                        onChange={(e) => setVisibleColumns({ ...visibleColumns, [col]: e.target.checked })}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 capitalize">{col.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-500 uppercase tracking-wider font-bold bg-gray-50/50">
              <tr>
                {visibleColumns.client && <th className="px-6 py-4">Client</th>}
                {visibleColumns.company && <th className="px-6 py-4">Company</th>}
                {visibleColumns.email && <th className="px-6 py-4">Email</th>}
                {visibleColumns.phone && <th className="px-6 py-4">Phone</th>}
                {visibleColumns.membership && <th className="px-6 py-4">Membership</th>}
                {visibleColumns.purchaseAmount && <th className="px-6 py-4">Purchase Amount</th>}
                {visibleColumns.status && <th className="px-6 py-4">Status</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  {visibleColumns.client && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getAvatarColor(row.name)}`}>
                          {getInitials(row.name)}
                        </div>
                        <span className="font-semibold text-gray-900">{row.name}</span>
                      </div>
                    </td>
                  )}
                  {visibleColumns.company && <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.company}</td>}
                  {visibleColumns.email && <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.email}</td>}
                  {visibleColumns.phone && <td className="px-6 py-4 whitespace-nowrap text-gray-600">{row.phone}</td>}
                  {visibleColumns.membership && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-md border ${row.membership === 'Premium' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          row.membership === 'Standard' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                        {row.membership}
                      </span>
                    </td>
                  )}
                  {visibleColumns.purchaseAmount && <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.purchaseAmount}</td>}
                  {visibleColumns.status && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[11px] font-bold uppercase ${row.status === 'Active' ? 'text-emerald-500' : 'text-red-500'
                        }`}>
                        {row.status}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-gray-500 font-medium">
            Showing 1 to 10 of 1,248 results
          </p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 border border-transparent transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium text-sm shadow-sm transition-colors">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">3</button>
            <span className="text-gray-400 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors">250</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 border border-transparent transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Deletion" maxWidth="max-w-md">
        <div>
          <p className="text-gray-600">
            Are you sure you want to delete <span className="font-bold text-gray-900">{selectedClient?.name}</span>?
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">Cancel</button>
            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-sm">Yes, Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClientList;
