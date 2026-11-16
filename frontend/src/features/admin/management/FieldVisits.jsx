import React, { useState } from 'react';
import {
  Calendar, MapPin, Search, Plus, X,
  CheckCircle2, Clock, CheckSquare,
  ShieldCheck
} from 'lucide-react';

const INITIAL_VISITS = [
  {
    id: 'VST-2041',
    ticketId: 'TKT-1045',
    client: 'Globex Inc',
    location: 'Cyber City, Tower B, 7th Fl, Gurugram',
    contactPerson: 'Sarah Jenkins (+91 98765 43210)',
    engineer: 'Rajesh Kumar',
    timeSlot: '10:30 AM - 12:00 PM',
    date: '2023-11-16',
    purpose: 'Emergency Breakdown',
    printer: 'Canon imageRUNNER ADV DX C3835i',
    status: 'In Progress',
    otpVerified: true,
    otpCode: '8492'
  },
  {
    id: 'VST-2042',
    ticketId: 'TKT-1046',
    client: 'Acme Corp',
    location: 'Inner Circle, Connaught Place, New Delhi',
    contactPerson: 'Vikram Malhotra (+91 98111 22334)',
    engineer: 'Amit Vikram Singh',
    timeSlot: '02:00 PM - 03:30 PM',
    date: '2023-11-16',
    purpose: 'Paper Jam & Roller Replacement',
    printer: 'HP LaserJet Enterprise M635',
    status: 'Dispatched',
    otpVerified: false,
    otpCode: '5120'
  },
  {
    id: 'VST-2043',
    ticketId: 'PMS-8802',
    client: 'Zenith Logistics',
    location: 'Sector 62, Electronic City, Noida',
    contactPerson: 'Ananya Sharma (+91 97112 34567)',
    engineer: 'Sunil Verma',
    timeSlot: '11:00 AM - 01:00 PM',
    date: '2023-11-16',
    purpose: 'Routine Monthly PMS',
    printer: 'Kyocera TASKalfa 4054i',
    status: 'Completed',
    otpVerified: true,
    otpCode: '7741'
  },
  {
    id: 'VST-2044',
    ticketId: 'INS-3301',
    client: 'Starlight Media Hub',
    location: 'Film City, Sector 16A, Noida',
    contactPerson: 'Rohit Khanna (+91 98450 12345)',
    engineer: 'Sunil Verma',
    timeSlot: '04:00 PM - 06:00 PM',
    date: '2023-11-16',
    purpose: 'New Printer Installation & Setup',
    printer: 'Epson WorkForce Enterprise WF-C20750',
    status: 'Scheduled',
    otpVerified: false,
    otpCode: '9034'
  },
  {
    id: 'VST-2045',
    ticketId: 'TKT-1042',
    client: 'BlueSky Digital Solutions',
    location: 'Okhla Phase 2, New Delhi',
    contactPerson: 'Manish Roy (+91 98101 99887)',
    engineer: 'Amit Vikram Singh',
    timeSlot: '09:00 AM - 10:30 AM',
    date: '2023-11-16',
    purpose: 'Firmware & Network Config',
    printer: 'Canon imageRUNNER 2630i',
    status: 'Completed',
    otpVerified: true,
    otpCode: '4399'
  }
];

const FieldVisits = () => {
  const [visits, setVisits] = useState(INITIAL_VISITS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [activeSheetVisit, setActiveSheetVisit] = useState(null);
  const [otpVerifyVisit, setOtpVerifyVisit] = useState(null);
  const [inputOtp, setInputOtp] = useState('');
  const [otpError, setOtpError] = useState(false);

  // New Visit Form State
  const [newVisit, setNewVisit] = useState({
    ticketId: '',
    client: '',
    location: '',
    contactPerson: '',
    engineer: 'Rajesh Kumar',
    timeSlot: '11:00 AM - 12:30 PM',
    purpose: 'Emergency Breakdown',
    printer: ''
  });

  const statuses = ['All', 'Scheduled', 'Dispatched', 'In Progress', 'Completed'];

  const filteredVisits = visits.filter(v => {
    const matchesSearch =
      v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.engineer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateVisit = (e) => {
    e.preventDefault();
    const created = {
      id: `VST-${Math.floor(2050 + Math.random() * 900)}`,
      ticketId: newVisit.ticketId || `TKT-${Math.floor(1050 + Math.random() * 50)}`,
      client: newVisit.client,
      location: newVisit.location,
      contactPerson: newVisit.contactPerson,
      engineer: newVisit.engineer,
      timeSlot: newVisit.timeSlot,
      date: new Date().toISOString().split('T')[0],
      purpose: newVisit.purpose,
      printer: newVisit.printer || 'Standard Office MFD',
      status: 'Scheduled',
      otpVerified: false,
      otpCode: `${Math.floor(1000 + Math.random() * 9000)}`
    };
    setVisits([created, ...visits]);
    setIsScheduleModalOpen(false);
    setNewVisit({
      ticketId: '',
      client: '',
      location: '',
      contactPerson: '',
      engineer: 'Rajesh Kumar',
      timeSlot: '11:00 AM - 12:30 PM',
      purpose: 'Emergency Breakdown',
      printer: ''
    });
  };

  const handleVerifyOtp = () => {
    if (inputOtp === otpVerifyVisit.otpCode || inputOtp === '1234') {
      setVisits(visits.map(v => v.id === otpVerifyVisit.id ? { ...v, status: 'Completed', otpVerified: true } : v));
      setOtpVerifyVisit(null);
      setInputOtp('');
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            On Site
          </span>
        );
      case 'Dispatched':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Clock className="w-3.5 h-3.5 text-purple-600" />
            Dispatched
          </span>
        );
      case 'Scheduled':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
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
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Field Visits & Dispatch</h1>
            <p className="text-xs text-gray-500">Coordinate on-site customer visits, technician arrivals, and customer sign-offs.</p>
          </div>
        </div>

        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Schedule Visit
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Scheduled Today</span>
          <div className="text-2xl font-black text-gray-900 mt-2">{visits.length}</div>
          <div className="text-xs text-indigo-600 font-medium mt-1">Across Delhi-NCR hubs</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Currently On-Site</span>
          <div className="text-2xl font-black text-blue-600 mt-2">
            {visits.filter(v => v.status === 'In Progress').length}
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">Active live diagnoses</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completed Today</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            {visits.filter(v => v.status === 'Completed').length}
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">100% verified with OTP</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Punctuality SLA</span>
          <div className="text-2xl font-black text-gray-900 mt-2">97.4%</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Within scheduled window</div>
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
              placeholder="Search by visit ID, ticket, client, engineer..."
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

      {/* Visits Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Visit & Ticket</th>
                <th className="py-4 px-6">Client & Site Location</th>
                <th className="py-4 px-6">Assigned Technician</th>
                <th className="py-4 px-6">Time Slot</th>
                <th className="py-4 px-6">Purpose</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredVisits.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No field visits found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredVisits.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Visit ID */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{v.id}</div>
                      <div className="text-xs font-semibold text-indigo-600">{v.ticketId}</div>
                    </td>

                    {/* Client & Location */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{v.client}</div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[220px]">{v.location}</span>
                      </div>
                    </td>

                    {/* Engineer */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800 text-xs">{v.engineer}</div>
                      <div className="text-[11px] text-gray-400">{v.printer}</div>
                    </td>

                    {/* Slot */}
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-50 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {v.timeSlot}
                      </div>
                    </td>

                    {/* Purpose */}
                    <td className="py-4 px-6">
                      <span className="text-xs font-semibold text-gray-700">{v.purpose}</span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {getStatusBadge(v.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      {!v.otpVerified && v.status !== 'Completed' ? (
                        <button
                          onClick={() => {
                            setOtpVerifyVisit(v);
                            setInputOtp('');
                            setOtpError(false);
                          }}
                          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors cursor-pointer mr-2"
                        >
                          Verify OTP
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveSheetVisit(v)}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors cursor-pointer mr-2"
                        >
                          Service Sheet
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {otpVerifyVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">Customer OTP Verification</h3>
              <p className="text-xs text-gray-500 mt-1">Enter the 4-digit completion OTP shared by the customer to sign off this visit.</p>
            </div>

            <div className="bg-amber-50 p-2.5 rounded-xl text-xs text-amber-800 font-medium">
              Demo OTP code for testing: <span className="font-bold underline">{otpVerifyVisit.otpCode}</span> (or 1234)
            </div>

            <div>
              <input
                type="text"
                maxLength={4}
                value={inputOtp}
                onChange={(e) => {
                  setInputOtp(e.target.value);
                  setOtpError(false);
                }}
                placeholder="4-digit OTP"
                className="w-full text-center tracking-widest text-2xl font-black py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {otpError && (
                <div className="text-xs text-rose-600 font-semibold mt-1">Invalid OTP code. Please retry.</div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setOtpVerifyVisit(null)}
                className="w-1/2 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                className="w-1/2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                Verify & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Sheet Modal */}
      {activeSheetVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Verified Service Sign-Off</span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">{activeSheetVisit.id}</h3>
              </div>
              <button onClick={() => setActiveSheetVisit(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Client:</span>
                  <span className="font-bold text-gray-900">{activeSheetVisit.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Service Engineer:</span>
                  <span className="font-semibold text-gray-800">{activeSheetVisit.engineer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hardware Asset:</span>
                  <span className="font-semibold text-indigo-700">{activeSheetVisit.printer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Completed On:</span>
                  <span className="text-gray-700">{activeSheetVisit.date} at {activeSheetVisit.timeSlot}</span>
                </div>
              </div>

              <div className="border border-emerald-100 bg-emerald-50/50 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 font-bold text-emerald-800 mb-1">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  Service Technician Sign-Off Summary
                </div>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  Inspected unit, cleared paper feed obstruction in Tray 2, replaced pick-up roller with genuine OEM part, cleaned optical mirrors, and executed 25-page duplex diagnostic test print. All parameters operating within factory spec.
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                <span>Customer Contact: {activeSheetVisit.contactPerson}</span>
                <span className="text-emerald-600 font-bold">OTP: Verified ({activeSheetVisit.otpCode})</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveSheetVisit(null)}
                className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Close Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900">Schedule Field Visit</h3>
              <button onClick={() => setIsScheduleModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVisit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newVisit.client}
                  onChange={(e) => setNewVisit({ ...newVisit, client: e.target.value })}
                  placeholder="e.g. Globex Inc"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">On-Site Location / Floor *</label>
                <input
                  type="text"
                  required
                  value={newVisit.location}
                  onChange={(e) => setNewVisit({ ...newVisit, location: e.target.value })}
                  placeholder="e.g. DLF Cyber City, Tower B, 7th Floor"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Site Contact Person *</label>
                  <input
                    type="text"
                    required
                    value={newVisit.contactPerson}
                    onChange={(e) => setNewVisit({ ...newVisit, contactPerson: e.target.value })}
                    placeholder="Contact name & phone"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Ticket Reference ID</label>
                  <input
                    type="text"
                    value={newVisit.ticketId}
                    onChange={(e) => setNewVisit({ ...newVisit, ticketId: e.target.value })}
                    placeholder="e.g. TKT-1048"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Assign Engineer</label>
                  <select
                    value={newVisit.engineer}
                    onChange={(e) => setNewVisit({ ...newVisit, engineer: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    <option value="Rajesh Kumar">Rajesh Kumar (Gurugram)</option>
                    <option value="Amit Vikram Singh">Amit Vikram Singh (Delhi)</option>
                    <option value="Sunil Verma">Sunil Verma (Noida)</option>
                    <option value="Pooja Rawat">Pooja Rawat (West Delhi)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Time Window</label>
                  <input
                    type="text"
                    value={newVisit.timeSlot}
                    onChange={(e) => setNewVisit({ ...newVisit, timeSlot: e.target.value })}
                    placeholder="e.g. 10:30 AM - 12:00 PM"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Dispatch Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldVisits;
