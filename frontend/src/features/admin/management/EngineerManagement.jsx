import React, { useState } from 'react';
import {
  Users, UserCheck, Wrench, Star, Phone, Mail,
  Search, Plus, X, Award, MapPin,
  CheckCircle2, Clock
} from 'lucide-react';

const INITIAL_ENGINEERS = [
  {
    id: 'ENG-101',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@pmservice.in',
    phone: '+91 98765 11223',
    territory: 'Gurugram / Cyber City',
    status: 'On Field',
    specialization: ['Canon Pro Series', 'Heavy Duplexers'],
    activeTickets: 3,
    completedJobs: 142,
    rating: 4.9,
    firstTimeFix: '94%',
    baseLocation: 'DLF Phase 2 Hub'
  },
  {
    id: 'ENG-102',
    name: 'Amit Vikram Singh',
    email: 'amit.v@pmservice.in',
    phone: '+91 98112 33445',
    territory: 'South & Central Delhi',
    status: 'Available',
    specialization: ['HP Enterprise', 'LaserJet M600', 'Network Firmware'],
    activeTickets: 1,
    completedJobs: 198,
    rating: 4.8,
    firstTimeFix: '92%',
    baseLocation: 'Okhla Phase 3 Depot'
  },
  {
    id: 'ENG-103',
    name: 'Sunil Verma',
    email: 'sunil.v@pmservice.in',
    phone: '+91 97115 55667',
    territory: 'Noida / Greater Noida',
    status: 'On Field',
    specialization: ['Kyocera Multi-function', 'Optics & CCD'],
    activeTickets: 4,
    completedJobs: 115,
    rating: 4.7,
    firstTimeFix: '89%',
    baseLocation: 'Sector 62 Service Bay'
  },
  {
    id: 'ENG-104',
    name: 'Pooja Rawat',
    email: 'pooja.r@pmservice.in',
    phone: '+91 98223 77889',
    territory: 'West Delhi & North',
    status: 'Available',
    specialization: ['Epson EcoTank', 'Color Calibration', 'Board Repair'],
    activeTickets: 0,
    completedJobs: 86,
    rating: 4.95,
    firstTimeFix: '96%',
    baseLocation: 'Netaji Subhash Place'
  },
  {
    id: 'ENG-105',
    name: 'Deepak Sharma',
    email: 'deepak.s@pmservice.in',
    phone: '+91 98991 88990',
    territory: 'Gurugram / Cyber City',
    status: 'In Transit',
    specialization: ['Ricoh Aficio', 'Fuser Reconditioning'],
    activeTickets: 2,
    completedJobs: 167,
    rating: 4.65,
    firstTimeFix: '88%',
    baseLocation: 'Sohna Road Center'
  },
  {
    id: 'ENG-106',
    name: 'Karan Mehra',
    email: 'karan.m@pmservice.in',
    phone: '+91 98100 44556',
    territory: 'South & Central Delhi',
    status: 'On Leave',
    specialization: ['Canon imageRUNNER', 'ADF Feeders'],
    activeTickets: 0,
    completedJobs: 210,
    rating: 4.85,
    firstTimeFix: '93%',
    baseLocation: 'Nehru Place Hub'
  }
];

const EngineerManagement = () => {
  const [engineers, setEngineers] = useState(INITIAL_ENGINEERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [territoryFilter, setTerritoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [newEngineer, setNewEngineer] = useState({
    name: '',
    email: '',
    phone: '',
    territory: 'Gurugram / Cyber City',
    baseLocation: '',
    specialization: 'Canon Pro Series, HP Enterprise'
  });

  const territories = ['All', 'Gurugram / Cyber City', 'South & Central Delhi', 'Noida / Greater Noida', 'West Delhi & North'];
  const statuses = ['All', 'Available', 'On Field', 'In Transit', 'On Leave'];

  const filteredEngineers = engineers.filter(eng => {
    const matchesSearch =
      eng.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eng.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eng.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTerritory = territoryFilter === 'All' || eng.territory === territoryFilter;
    const matchesStatus = statusFilter === 'All' || eng.status === statusFilter;
    return matchesSearch && matchesTerritory && matchesStatus;
  });

  const handleAddEngineer = (e) => {
    e.preventDefault();
    const created = {
      id: `ENG-${100 + engineers.length + 1}`,
      name: newEngineer.name,
      email: newEngineer.email,
      phone: newEngineer.phone,
      territory: newEngineer.territory,
      status: 'Available',
      specialization: newEngineer.specialization.split(',').map(s => s.trim()),
      activeTickets: 0,
      completedJobs: 0,
      rating: 5.0,
      firstTimeFix: '100%',
      baseLocation: newEngineer.baseLocation || 'Central Dispatch Hub'
    };
    setEngineers([created, ...engineers]);
    setIsAddModalOpen(false);
    setNewEngineer({
      name: '',
      email: '',
      phone: '',
      territory: 'Gurugram / Cyber City',
      baseLocation: '',
      specialization: 'Canon Pro Series, HP Enterprise'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'On Field':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            On Field
          </span>
        );
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Available
          </span>
        );
      case 'In Transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            In Transit
          </span>
        );
      case 'On Leave':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
            On Leave
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
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Engineer Management</h1>
            <p className="text-xs text-gray-500">Track field technician status, territory coverage, and repair metrics.</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Engineer
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Roster</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-gray-900">{engineers.length}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Across 4 metro territories</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active On Field</span>
            <UserCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {engineers.filter(e => e.status === 'On Field').length}
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">Responding to live tickets</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">First-Time Fix</span>
            <Wrench className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-600">92.8%</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">+2.4% vs last month</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Customer CSAT</span>
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-black text-gray-900">4.84 <span className="text-xs text-gray-400 font-normal">/ 5.0</span></div>
          <div className="text-xs text-amber-600 font-medium mt-1">From 890+ verified reviews</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, or specialization..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Territory Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1">
            {territories.map((t) => (
              <button
                key={t}
                onClick={() => setTerritoryFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  territoryFilter === t
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status:</span>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === s
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Engineers Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Engineer</th>
                <th className="py-4 px-6">Territory & Base</th>
                <th className="py-4 px-6">Certifications</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Active Load</th>
                <th className="py-4 px-6">Rating</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredEngineers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No engineers found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredEngineers.map((eng) => (
                  <tr key={eng.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Profile */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                          {eng.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{eng.name}</div>
                          <div className="text-xs text-gray-400">{eng.id} • {eng.phone}</div>
                        </div>
                      </div>
                    </td>

                    {/* Territory */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-gray-800 font-medium text-xs">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {eng.territory}
                      </div>
                      <div className="text-[11px] text-gray-400 ml-5">{eng.baseLocation}</div>
                    </td>

                    {/* Specialization */}
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {eng.specialization.map((spec, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 text-gray-700">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {getStatusBadge(eng.status)}
                    </td>

                    {/* Active Load */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-gray-900 text-xs">
                          {eng.activeTickets} <span className="text-gray-400 font-normal">tickets</span>
                        </div>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              eng.activeTickets > 3 ? 'bg-rose-500' : eng.activeTickets > 0 ? 'bg-blue-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min(eng.activeTickets * 25, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-xs text-gray-900">{eng.rating}</span>
                        <span className="text-[10px] text-gray-400 font-medium">({eng.completedJobs})</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedEngineer(eng)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors cursor-pointer mr-2"
                      >
                        Profile
                      </button>
                      <a
                        href={`tel:${eng.phone}`}
                        className="p-1.5 inline-flex text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Call Engineer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Engineer Profile Details Modal */}
      {selectedEngineer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-black text-lg flex items-center justify-center shadow-md">
                  {selectedEngineer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedEngineer.name}</h3>
                  <p className="text-xs text-gray-500">{selectedEngineer.id} • {selectedEngineer.territory}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEngineer(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400">Current Status:</span>
                <div className="mt-1">{getStatusBadge(selectedEngineer.status)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400">First-Time Fix Rate:</span>
                <div className="text-base font-bold text-emerald-600 mt-0.5">{selectedEngineer.firstTimeFix}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400">Customer Rating:</span>
                <div className="flex items-center gap-1 font-bold text-gray-800 text-base mt-0.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  {selectedEngineer.rating} / 5.0
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl">
                <span className="text-gray-400">Lifetime Tickets Closed:</span>
                <div className="text-base font-bold text-gray-900 mt-0.5">{selectedEngineer.completedJobs}</div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-gray-700 block mb-1">Contact Details</span>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {selectedEngineer.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  {selectedEngineer.email}
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-700 block mb-1">Certified Specialties</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEngineer.specialization.map((spec, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-semibold text-[11px]">
                      <Award className="w-3 h-3 text-indigo-500" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedEngineer(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Engineer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Add Field Engineer</h3>
                  <p className="text-xs text-gray-500">Register new field service technician into roster.</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEngineer} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newEngineer.name}
                  onChange={(e) => setNewEngineer({ ...newEngineer, name: e.target.value })}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newEngineer.phone}
                    onChange={(e) => setNewEngineer({ ...newEngineer, phone: e.target.value })}
                    placeholder="+91 98..."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newEngineer.email}
                    onChange={(e) => setNewEngineer({ ...newEngineer, email: e.target.value })}
                    placeholder="name@pmservice.in"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Primary Territory</label>
                  <select
                    value={newEngineer.territory}
                    onChange={(e) => setNewEngineer({ ...newEngineer, territory: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    {territories.filter(t => t !== 'All').map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Base Hub Location</label>
                  <input
                    type="text"
                    value={newEngineer.baseLocation}
                    onChange={(e) => setNewEngineer({ ...newEngineer, baseLocation: e.target.value })}
                    placeholder="e.g. DLF Cyber Hub depot"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Specialties (comma separated)</label>
                <input
                  type="text"
                  value={newEngineer.specialization}
                  onChange={(e) => setNewEngineer({ ...newEngineer, specialization: e.target.value })}
                  placeholder="Canon Pro, HP Enterprise, Firmware"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Save Engineer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EngineerManagement;
