import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench, Search,
  CheckCircle2, Clock, Phone, Send,
  AlertTriangle
} from 'lucide-react';

const INITIAL_ASSIGNMENTS = [
  {
    id: 'TKT-1045',
    client: 'Globex Inc',
    location: 'Cyber City, Tower B, 7th Fl, Gurugram',
    issue: 'Total Production Down - Duplex Grinding',
    priority: 'Critical',
    assignedTo: 'Rajesh Kumar',
    phone: '+91 98765 11223',
    assignedAt: '25 mins ago',
    status: 'In Transit',
    slaTarget: '4 Hours'
  },
  {
    id: 'TKT-1046',
    client: 'Acme Corp',
    location: 'Connaught Place, Inner Circle, New Delhi',
    issue: 'Paper Jam & Pick-up Roller Slip',
    priority: 'High',
    assignedTo: 'Amit Vikram Singh',
    phone: '+91 98112 33445',
    assignedAt: '40 mins ago',
    status: 'Accepted',
    slaTarget: '8 Hours'
  },
  {
    id: 'TKT-1048',
    client: 'Zenith Logistics Hub',
    location: 'Sector 62, Noida',
    issue: 'Optical Scanner CCD Error Code E000-0001',
    priority: 'Critical',
    assignedTo: 'Sunil Verma',
    phone: '+91 97115 55667',
    assignedAt: '12 mins ago',
    status: 'Pending Acceptance',
    slaTarget: '2 Hours'
  },
  {
    id: 'TKT-1049',
    client: 'Starlight Media Hub',
    location: 'Film City, Sector 16A, Noida',
    issue: 'Color Calibration & Magenta Smudge',
    priority: 'Medium',
    assignedTo: 'Pooja Rawat',
    phone: '+91 98223 77889',
    assignedAt: '1 hour ago',
    status: 'Accepted',
    slaTarget: '8 Hours'
  }
];

const TicketAssigned = () => {
  const navigate = useNavigate();
  const [assignments] = useState(INITIAL_ASSIGNMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [pingAlert, setPingAlert] = useState(null);

  const statuses = ['All', 'Pending Acceptance', 'Accepted', 'In Transit'];

  const filtered = assignments.filter(item => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePingTech = (techName) => {
    setPingAlert(`Urgent SMS & push notification sent to ${techName}.`);
    setTimeout(() => setPingAlert(null), 3000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            In Transit
          </span>
        );
      case 'Accepted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Accepted
          </span>
        );
      case 'Pending Acceptance':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Awaiting Ack
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">Dispatch Queue</span>
              <span className="text-gray-400 text-xs">/</span>
              <span className="text-xs text-gray-500 font-medium">Alerts</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Ticket Assignment Notifications</h1>
          </div>
        </div>

        <button
          onClick={() => navigate('/admin/management/tickets')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
        >
          <span>All Tickets</span>
        </button>
      </div>

      {/* Ping Alert Toast */}
      {pingAlert && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {pingAlert}
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Dispatches</span>
          <div className="text-2xl font-black text-gray-900 mt-2">{assignments.length}</div>
          <div className="text-xs text-indigo-600 font-medium mt-1">Dispatched to mobile app</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Awaiting Acceptance</span>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {assignments.filter(a => a.status === 'Pending Acceptance').length}
          </div>
          <div className="text-xs text-amber-600 font-medium mt-1">Unopened on technician app</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Technicians In Transit</span>
          <div className="text-2xl font-black text-blue-600 mt-2">
            {assignments.filter(a => a.status === 'In Transit').length}
          </div>
          <div className="text-xs text-blue-600 font-medium mt-1">En route to client site</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Average Ack Time</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">4.5 mins</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Target &lt; 10 mins</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticket ID, client, engineer, problem..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === s
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Ticket & Priority</th>
                <th className="py-4 px-6">Client & Site Location</th>
                <th className="py-4 px-6">Reported Problem</th>
                <th className="py-4 px-6">Assigned Technician</th>
                <th className="py-4 px-6">Assigned Time</th>
                <th className="py-4 px-6">SLA Target</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No active ticket assignments found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Ticket */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{item.id}</div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.priority === 'Critical' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {item.priority}
                      </span>
                    </td>

                    {/* Client */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800 text-xs">{item.client}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[200px]">{item.location}</div>
                    </td>

                    {/* Problem */}
                    <td className="py-4 px-6">
                      <div className="text-xs text-gray-700 max-w-xs truncate" title={item.issue}>
                        {item.issue}
                      </div>
                    </td>

                    {/* Technician */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-900 text-xs">{item.assignedTo}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{item.phone}</div>
                    </td>

                    {/* Assigned Time */}
                    <td className="py-4 px-6">
                      <span className="text-xs text-gray-600">{item.assignedAt}</span>
                    </td>

                    {/* Target */}
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.slaTarget}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => handlePingTech(item.assignedTo)}
                        className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors cursor-pointer mr-1.5"
                        title="Ping technician mobile app"
                      >
                        <Send className="w-3.5 h-3.5 inline mr-1" />
                        Ping
                      </button>
                      <a
                        href={`tel:${item.phone}`}
                        className="p-1.5 inline-flex text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Call Technician"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TicketAssigned;
