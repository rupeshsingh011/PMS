import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Wrench, Plus, Search,
  CheckCircle2, Clock, UserCheck, Phone,
  X, Send
} from 'lucide-react';

const clientPrinters = [
  { id: 'PRT-001', name: 'HP LaserJet Enterprise MFP M635', location: '3rd Floor - Finance & Accounts' },
  { id: 'PRT-002', name: 'Canon imageRUNNER ADVANCE DX C3835i', location: '4th Floor - Executive Boardroom' },
  { id: 'PRT-003', name: 'Epson WorkForce Pro WF-C878R', location: '2nd Floor - Marketing & Creative Lab' },
  { id: 'PRT-004', name: 'Brother MFC-L8900CDW', location: '1st Floor - HR & Operations' },
  { id: 'PRT-005', name: 'HP Color LaserJet Enterprise M555dn', location: 'Ground Floor - Reception Lounge' },
  { id: 'PRT-006', name: 'Canon imageRUNNER 2625i', location: 'Basement - Logistics & Inventory Hub' }
];

const initialTickets = [
  {
    id: 'TKT-2026-4491',
    printerId: 'PRT-005',
    printerModel: 'HP Color LaserJet Enterprise M555dn',
    location: 'Ground Floor - Reception Lounge',
    category: 'Hardware Replacement',
    priority: 'High',
    status: 'In Progress',
    loggedDate: '02 Nov 2026, 09:30 AM',
    scheduledVisit: 'Today, 02:00 PM - 04:00 PM',
    description: 'Scheduled pickup roller and separation pad replacement. Occasional multifeed error 13.02 reported.',
    engineer: {
      name: 'Rajesh Kumar',
      role: 'Senior Field Service Specialist',
      phone: '+91 98199 88776',
      avatar: 'R'
    },
    timeline: [
      { step: 'Ticket Logged & Triaged', time: '02 Nov, 09:30 AM', done: true },
      { step: 'Engineer Dispatched with OEM Kit', time: '02 Nov, 11:15 AM', done: true },
      { step: 'On-Site Diagnostic & Part Fitting', time: 'In Progress', done: false },
      { step: 'Quality Test & Signoff', time: 'Pending', done: false }
    ]
  },
  {
    id: 'TKT-2026-4410',
    printerId: 'PRT-003',
    printerModel: 'Epson WorkForce Pro WF-C878R',
    location: '2nd Floor - Marketing & Creative Lab',
    category: 'Consumable Replenishment',
    priority: 'Medium',
    status: 'Engineer Assigned',
    loggedDate: '01 Nov 2026, 04:15 PM',
    scheduledVisit: 'Tomorrow, 10:00 AM - 12:00 PM',
    description: 'Cyan High-Yield Ink Pack exhausted. Automated telemetry triggered replacement pack dispatch.',
    engineer: {
      name: 'Amit Shinde',
      role: 'Supplies Delivery & Calibration Engineer',
      phone: '+91 98200 44556',
      avatar: 'A'
    },
    timeline: [
      { step: 'Ticket Logged via Telemetry', time: '01 Nov, 04:15 PM', done: true },
      { step: 'Replenishment Batch Allocated', time: '02 Nov, 09:00 AM', done: true },
      { step: 'Delivery & Cartridge Seating', time: 'Scheduled', done: false },
      { step: 'Print Alignment Calibration', time: 'Pending', done: false }
    ]
  },
  {
    id: 'TKT-2026-4320',
    printerId: 'PRT-001',
    printerModel: 'HP LaserJet Enterprise MFP M635',
    location: '3rd Floor - Finance & Accounts',
    category: 'Network & Firmware',
    priority: 'Low',
    status: 'Resolved',
    loggedDate: '24 Oct 2026, 11:00 AM',
    scheduledVisit: 'Completed on 24 Oct, 03:30 PM',
    description: 'Static IP gateway reconfiguration following corporate subnet migration. Test duplex print passed.',
    engineer: {
      name: 'Suresh Patil',
      role: 'Network & Solutions Engineer',
      phone: '+91 98200 11223',
      avatar: 'S'
    },
    timeline: [
      { step: 'Ticket Logged', time: '24 Oct, 11:00 AM', done: true },
      { step: 'Remote Diagnostics', time: '24 Oct, 11:45 AM', done: true },
      { step: 'Firmware & DNS Config', time: '24 Oct, 02:30 PM', done: true },
      { step: 'Resolved & Signed by IT Lead', time: '24 Oct, 03:30 PM', done: true }
    ]
  }
];

const ServiceRequest = () => {
  const location = useLocation();
  const preselectedPrinterId = location.state?.printerId || '';

  const [tickets, setTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // New Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    printerId: preselectedPrinterId || clientPrinters[0].id,
    category: 'Paper Jam & Feeder Hardware Fault',
    priority: 'High',
    description: '',
    contactPerson: 'Aditya Verma',
    contactPhone: '+91 98765 43210',
    preferredTime: 'Morning (10:00 AM - 01:00 PM)'
  });

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.printerModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openTicketsCount = tickets.filter((t) => t.status !== 'Resolved' && t.status !== 'Closed').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;

  const handleCreateTicket = (e) => {
    e.preventDefault();

    const matchedPrinter = clientPrinters.find((p) => p.id === ticketForm.printerId) || clientPrinters[0];
    const newId = `TKT-2026-${Math.floor(4500 + Math.random() * 500)}`;

    const newTicket = {
      id: newId,
      printerId: matchedPrinter.id,
      printerModel: matchedPrinter.name,
      location: matchedPrinter.location,
      category: ticketForm.category,
      priority: ticketForm.priority,
      status: 'In Progress',
      loggedDate: 'Just now',
      scheduledVisit: `Today (${ticketForm.preferredTime})`,
      description: ticketForm.description || 'Service inspection requested by client IT team.',
      engineer: {
        name: 'Rajesh Kumar',
        role: 'Senior Field Service Specialist',
        phone: '+91 98199 88776',
        avatar: 'R'
      },
      timeline: [
        { step: 'Ticket Logged & Triaged', time: 'Just now', done: true },
        { step: 'Engineer Dispatched (< 2hr SLA)', time: 'En Route', done: true },
        { step: 'On-Site Diagnostic & Part Fitting', time: 'Pending', done: false },
        { step: 'Quality Test & Signoff', time: 'Pending', done: false }
      ]
    };

    setTickets([newTicket, ...tickets]);
    setShowNewTicketModal(false);
    setToastMessage(`Service ticket ${newId} logged successfully. A certified field technician is dispatched under your < 2hr SLA.`);
    setTimeout(() => setToastMessage(null), 6000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Service & Maintenance Requests</h1>
          <p className="text-sm text-gray-500 mt-1">
            Dispatch certified on-site technicians, track resolution progress, and request immediate breakdown assistance.
          </p>
        </div>

        <button
          onClick={() => setShowNewTicketModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Raise New Service Ticket
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm font-medium animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Open Tickets</p>
            <h3 className="text-2xl font-extrabold text-amber-700 mt-1">{openTicketsCount} Active</h3>
            <span className="text-xs text-gray-500 mt-1 block">Assigned under SLA</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Technicians On Field</p>
            <h3 className="text-2xl font-extrabold text-blue-700 mt-1">{inProgressCount} Scheduled</h3>
            <span className="text-xs text-blue-600 font-medium mt-1 block">Visiting today</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Tickets Resolved</p>
            <h3 className="text-2xl font-extrabold text-emerald-700 mt-1">{resolvedCount} Closed</h3>
            <span className="text-xs text-gray-500 mt-1 block">Past 30 days</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Guaranteed Response</p>
            <h3 className="text-2xl font-extrabold text-emerald-700 mt-1">&lt; 2 Hours</h3>
            <span className="text-xs text-emerald-600 font-medium mt-1 block">Diamond AMC Tier</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search ticket ID, printer, fault note..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-bold text-gray-400 uppercase">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Requests</option>
            <option value="In Progress">In Progress</option>
            <option value="Engineer Assigned">Engineer Assigned</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 transition-all"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono font-bold text-gray-900 text-base">{ticket.id}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      ticket.priority === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {ticket.priority} Priority
                    </span>
                    <span className="text-xs text-gray-400">• Logged {ticket.loggedDate}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mt-0.5">{ticket.printerModel}</h3>
                  <p className="text-xs text-gray-500">{ticket.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider ${
                  ticket.status === 'Resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : ticket.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800 animate-pulse'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {ticket.status}
                </span>

                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="px-4 py-2 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 font-semibold text-xs rounded-xl border border-gray-200 transition-colors"
                >
                  View Live Progress
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="md:col-span-2">
                <span className="font-bold text-gray-400 uppercase text-[10px] block mb-1">Issue Description</span>
                <p className="text-gray-700 font-medium leading-relaxed">{ticket.description}</p>
              </div>

              <div className="p-3 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Assigned Engineer</span>
                  <p className="font-bold text-gray-900 mt-0.5">{ticket.engineer.name}</p>
                  <p className="text-[11px] text-gray-500">{ticket.engineer.role}</p>
                </div>
                <a
                  href={`tel:${ticket.engineer.phone}`}
                  className="p-2.5 bg-white text-emerald-600 border border-gray-200 hover:bg-emerald-50 rounded-xl transition-colors shadow-sm"
                  title="Call Technician"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Service Ticket Modal Form */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-gray-100 p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Raise Service / Repair Request</h3>
                  <p className="text-xs text-gray-500">Diamond AMC SLA Response Guarantee: &lt; 2 Hours</p>
                </div>
              </div>
              <button onClick={() => setShowNewTicketModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                  Select Affected Printer Unit *
                </label>
                <select
                  value={ticketForm.printerId}
                  onChange={(e) => setTicketForm({ ...ticketForm, printerId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  {clientPrinters.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                    Issue Category *
                  </label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>Paper Jam & Feeder Hardware Fault</option>
                    <option>Toner Cartridge & Consumable Exhaustion</option>
                    <option>Print Quality & Ghosting / Streaks</option>
                    <option>Network Offline / Connectivity Error</option>
                    <option>Periodic Preventative Maintenance Visit</option>
                    <option>Other Mechanical / Sensor Fault</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                    Priority Tier *
                  </label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="High">High (Production Impacted - 2hr SLA)</option>
                    <option value="Critical">Critical (Executive / Line Down - Immediate)</option>
                    <option value="Medium">Medium (Routine Servicing)</option>
                    <option value="Low">Low (Scheduled Inquiry)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                  Fault Description & Error Codes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                  placeholder="e.g. Error code 13.02 paper jam in tray 2, roller making grinding noise..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                    On-Site Contact Person
                  </label>
                  <input
                    type="text"
                    value={ticketForm.contactPerson}
                    onChange={(e) => setTicketForm({ ...ticketForm, contactPerson: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={ticketForm.contactPhone}
                    onChange={(e) => setTicketForm({ ...ticketForm, contactPhone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-semibold text-xs hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs shadow-md transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  Dispatch Service Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Ticket Progress Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-gray-100 p-6 sm:p-7">
            <div className="flex justify-between items-start pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{selectedTicket.id} Resolution Progress</h3>
                <p className="text-xs text-gray-500">{selectedTicket.printerModel} • {selectedTicket.location}</p>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs">
                <span className="font-bold text-gray-400 uppercase text-[10px] block mb-1">Assigned Field Specialist</span>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-gray-900 text-sm">{selectedTicket.engineer.name}</p>
                    <p className="text-emerald-700 font-semibold">{selectedTicket.scheduledVisit}</p>
                  </div>
                  <a
                    href={`tel:${selectedTicket.engineer.phone}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">Milestone Stepper</h4>
                <div className="space-y-3">
                  {selectedTicket.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        step.done ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className={`font-semibold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.step}</span>
                        <span className="text-[11px] text-gray-400 font-mono">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-semibold hover:bg-gray-800"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequest;
