import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar, Search,
  CheckCircle2, AlertTriangle, X, Wrench, MapPin
} from 'lucide-react';

const INITIAL_INSTALLATIONS = [
  {
    id: 'INS-401',
    serial: 'CAN-880199-DX',
    model: 'Canon imageRUNNER ADV DX C3835i',
    client: 'Globex Corporation',
    location: 'DLF Cyber City, Tower B, 7th Fl, Gurugram',
    contactPerson: 'Sarah Jenkins (+91 98765 43210)',
    deliveryDate: '2023-11-15',
    dueDate: '2023-11-17',
    assignedEngineer: 'Rajesh Kumar',
    status: 'Scheduled',
    siteReady: true
  },
  {
    id: 'INS-402',
    serial: 'HP-635201-M',
    model: 'HP LaserJet Enterprise MFP M635',
    client: 'Acme Technologies Ltd',
    location: 'Connaught Place, 3rd Floor, New Delhi',
    contactPerson: 'Vikram Malhotra (+91 98111 22334)',
    deliveryDate: '2023-11-16',
    dueDate: '2023-11-16',
    assignedEngineer: 'Amit Vikram Singh',
    status: 'Due Today',
    siteReady: true
  },
  {
    id: 'INS-403',
    serial: 'EPS-770889-WF',
    model: 'Epson WorkForce Enterprise WF-C20750',
    client: 'Starlight Media Hub',
    location: 'Film City, Sector 16A, Noida',
    contactPerson: 'Rohit Khanna (+91 98450 12345)',
    deliveryDate: '2023-11-14',
    dueDate: '2023-11-16',
    assignedEngineer: 'Sunil Verma',
    status: 'Awaiting Site Prep',
    siteReady: false
  },
  {
    id: 'INS-404',
    serial: 'KYO-405991-TK',
    model: 'Kyocera TASKalfa 4054i',
    client: 'Zenith Logistics Hub',
    location: 'Sector 62, Electronic City, Noida',
    contactPerson: 'Ananya Sharma (+91 97112 34567)',
    deliveryDate: '2023-11-13',
    dueDate: '2023-11-15',
    assignedEngineer: 'Unassigned',
    status: 'Overdue',
    siteReady: true
  }
];

const InstallationDue = () => {
  const navigate = useNavigate();
  const [installations, setInstallations] = useState(INITIAL_INSTALLATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInst, setSelectedInst] = useState(null);
  const [selectedTech, setSelectedTech] = useState('Rajesh Kumar');

  const statuses = ['All', 'Due Today', 'Scheduled', 'Awaiting Site Prep', 'Overdue'];

  const filtered = installations.filter(item => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignedEngineer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!selectedInst) return;
    setInstallations(installations.map(inst => {
      if (inst.id === selectedInst.id) {
        return { ...inst, assignedEngineer: selectedTech, status: 'Scheduled' };
      }
      return inst;
    }));
    setSelectedInst(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Due Today':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            Due Today
          </span>
        );
      case 'Overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            Overdue
          </span>
        );
      case 'Awaiting Site Prep':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            Site Prep Pending
          </span>
        );
      case 'Scheduled':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Scheduled
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">Hardware Deployment</span>
              <span className="text-gray-400 text-xs">/</span>
              <span className="text-xs text-gray-500 font-medium">Alerts</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Installation Due Notifications</h1>
          </div>
        </div>

        <button
          onClick={() => navigate('/admin/management/field-visits')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
        >
          <span>View Field Visits</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Installations</span>
          <div className="text-2xl font-black text-gray-900 mt-2">{installations.length}</div>
          <div className="text-xs text-blue-600 font-medium mt-1">Delivered to client sites</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Due Today</span>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {installations.filter(i => i.status === 'Due Today').length}
          </div>
          <div className="text-xs text-amber-600 font-medium mt-1">Technicians dispatched</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Awaiting Site Prep</span>
          <div className="text-2xl font-black text-gray-700 mt-2">
            {installations.filter(i => i.status === 'Awaiting Site Prep').length}
          </div>
          <div className="text-xs text-gray-400 font-medium mt-1">Power / Network check needed</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overdue Installations</span>
          <div className="text-2xl font-black text-rose-600 mt-2">
            {installations.filter(i => i.status === 'Overdue').length}
          </div>
          <div className="text-xs text-rose-600 font-medium mt-1">Requires immediate engineer</div>
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
              placeholder="Search serial, model, client, engineer..."
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
                <th className="py-4 px-6">Install Code & Machine</th>
                <th className="py-4 px-6">Client & Site Location</th>
                <th className="py-4 px-6">Delivered Date</th>
                <th className="py-4 px-6">Deadline</th>
                <th className="py-4 px-6">Assigned Engineer</th>
                <th className="py-4 px-6">Site Ready</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No installation notifications found.
                  </td>
                </tr>
              ) : (
                filtered.map((inst) => (
                  <tr key={inst.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Machine */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{inst.model}</div>
                      <div className="text-[11px] font-mono text-indigo-600 mt-0.5">{inst.id} • {inst.serial}</div>
                    </td>

                    {/* Client & Site */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800 text-xs">{inst.client}</div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[200px]">{inst.location}</span>
                      </div>
                    </td>

                    {/* Delivery Date */}
                    <td className="py-4 px-6">
                      <span className="text-xs text-gray-600">{inst.deliveryDate}</span>
                    </td>

                    {/* Deadline */}
                    <td className="py-4 px-6">
                      <span className="text-xs font-bold text-gray-900">{inst.dueDate}</span>
                    </td>

                    {/* Engineer */}
                    <td className="py-4 px-6">
                      <span className={`text-xs font-semibold ${
                        inst.assignedEngineer === 'Unassigned' ? 'text-rose-600 italic' : 'text-gray-800'
                      }`}>
                        {inst.assignedEngineer}
                      </span>
                    </td>

                    {/* Site Ready */}
                    <td className="py-4 px-6">
                      {inst.siteReady ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {getStatusBadge(inst.status)}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedInst(inst);
                          setSelectedTech(inst.assignedEngineer !== 'Unassigned' ? inst.assignedEngineer : 'Rajesh Kumar');
                        }}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        {inst.assignedEngineer === 'Unassigned' ? 'Assign Tech' : 'Reassign'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Modal */}
      {selectedInst && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-gray-900">Dispatch Installation Tech</h3>
              </div>
              <button onClick={() => setSelectedInst(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl text-xs space-y-1">
              <div className="font-bold text-gray-900">{selectedInst.model}</div>
              <div className="text-gray-500">Client: {selectedInst.client} • {selectedInst.location}</div>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Select Field Engineer *</label>
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                >
                  <option value="Rajesh Kumar">Rajesh Kumar (Gurugram)</option>
                  <option value="Amit Vikram Singh">Amit Vikram Singh (Delhi)</option>
                  <option value="Sunil Verma">Sunil Verma (Noida)</option>
                  <option value="Pooja Rawat">Pooja Rawat (West Delhi)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedInst(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallationDue;
