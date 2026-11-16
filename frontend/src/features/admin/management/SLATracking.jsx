import React, { useState } from 'react';
import {
  Clock, AlertTriangle, CheckCircle2, ShieldCheck,
  Search, X, Send, Flame
} from 'lucide-react';

const INITIAL_SLA_ITEMS = [
  {
    ticketId: 'TKT-1045',
    priority: 'Critical',
    client: 'Globex Inc',
    tier: 'Diamond (4h Fix)',
    issue: 'Total Production Down - Duplex Grinding',
    printer: 'Canon imageRUNNER ADV DX C3835i',
    elapsed: '3h 48m',
    target: '4h 00m',
    timeLeft: '12m remaining',
    status: 'At Risk',
    engineer: 'Rajesh Kumar'
  },
  {
    ticketId: 'TKT-1041',
    priority: 'High',
    client: 'MegaPrint Systems',
    tier: 'Platinum (8h Fix)',
    issue: 'Fuser Optical Sensor Error E000-0001',
    printer: 'HP LaserJet Enterprise M635',
    elapsed: '9h 15m',
    target: '8h 00m',
    timeLeft: '+1h 15m BREACH',
    status: 'Breached',
    engineer: 'Amit Vikram Singh'
  },
  {
    ticketId: 'TKT-1046',
    priority: 'Medium',
    client: 'Acme Corp',
    tier: 'Platinum (8h Fix)',
    issue: 'Tray 2 Paper Feed Intermittent Jam',
    printer: 'Kyocera TASKalfa 4054i',
    elapsed: '2h 10m',
    target: '8h 00m',
    timeLeft: '5h 50m remaining',
    status: 'Compliant',
    engineer: 'Sunil Verma'
  },
  {
    ticketId: 'TKT-1047',
    priority: 'Normal',
    client: 'Zenith Logistics',
    tier: 'Gold (24h Fix)',
    issue: 'Low Toner Alert & Waste Box Cleaning',
    printer: 'Epson WorkForce WF-C20750',
    elapsed: '4h 30m',
    target: '24h 00m',
    timeLeft: '19h 30m remaining',
    status: 'Compliant',
    engineer: 'Pooja Rawat'
  },
  {
    ticketId: 'TKT-1039',
    priority: 'Critical',
    client: 'Apollo Diagnostics',
    tier: 'Diamond (4h Fix)',
    issue: 'Network Spooler Locked in Pathology Bay',
    printer: 'Canon imageRUNNER 2630i',
    elapsed: '5h 02m',
    target: '4h 00m',
    timeLeft: '+1h 02m BREACH',
    status: 'Breached',
    engineer: 'Deepak Sharma'
  }
];

const SLATracking = () => {
  const [slaItems] = useState(INITIAL_SLA_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Escalation Modal
  const [escalateTicket, setEscalateTicket] = useState(null);
  const [escalationLevel, setEscalationLevel] = useState('L2');
  const [escalationNote, setEscalationNote] = useState('');
  const [isEscalatedSuccess, setIsEscalatedSuccess] = useState(false);

  const statuses = ['All', 'At Risk', 'Breached', 'Compliant'];

  const filteredItems = slaItems.filter(item => {
    const matchesSearch =
      item.ticketId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.engineer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEscalateSubmit = (e) => {
    e.preventDefault();
    setIsEscalatedSuccess(true);
    setTimeout(() => {
      setIsEscalatedSuccess(false);
      setEscalateTicket(null);
      setEscalationNote('');
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Breached':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            SLA Breached
          </span>
        );
      case 'At Risk':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Imminent Breach
          </span>
        );
      case 'Compliant':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Within SLA
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SLA Tracking & Compliance</h1>
            <p className="text-xs text-gray-500">Monitor resolution deadlines, prevent SLA breaches, and manage penalty risks.</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overall Compliance</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">98.4%</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Exceeds 95% target</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Response Time</span>
          <div className="text-2xl font-black text-indigo-600 mt-2">24 mins</div>
          <div className="text-xs text-indigo-600 font-medium mt-1">Target &lt; 60 mins</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mean Time to Repair</span>
          <div className="text-2xl font-black text-blue-600 mt-2">2.4 hrs</div>
          <div className="text-xs text-blue-600 font-medium mt-1">Target &lt; 4.0 hrs</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Breaches</span>
          <div className="text-2xl font-black text-rose-600 mt-2">
            {slaItems.filter(s => s.status === 'Breached').length}
          </div>
          <div className="text-xs text-rose-600 font-medium mt-1">Penalties flagged</div>
        </div>
      </div>

      {/* SLA Tiers Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50/50 p-5 rounded-2xl border border-indigo-100">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Diamond Tier SLA
          </div>
          <p className="text-xs text-gray-600 mt-1">First Response: 1 Hour | On-site Fix: 4 Hours max.</p>
          <div className="mt-3 text-xs font-bold text-indigo-700">Contract Guarantee: 99.5% Uptime</div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-emerald-50/50 p-5 rounded-2xl border border-teal-100">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Platinum Tier SLA
          </div>
          <p className="text-xs text-gray-600 mt-1">First Response: 2 Hours | On-site Fix: 8 Hours max.</p>
          <div className="mt-3 text-xs font-bold text-teal-700">Contract Guarantee: 98.0% Uptime</div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 rounded-2xl border border-amber-100">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            Gold Standard SLA
          </div>
          <p className="text-xs text-gray-600 mt-1">First Response: 4 Hours | On-site Fix: Next Business Day.</p>
          <div className="mt-3 text-xs font-bold text-amber-700">Contract Guarantee: 95.0% Uptime</div>
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
              placeholder="Search ticket, client, engineer, issue..."
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

      {/* SLA Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Ticket & Priority</th>
                <th className="py-4 px-6">Client & Contract Tier</th>
                <th className="py-4 px-6">Issue & Hardware</th>
                <th className="py-4 px-6">Elapsed vs Target</th>
                <th className="py-4 px-6">Remaining Buffer</th>
                <th className="py-4 px-6">Technician</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No SLA tracking records found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.ticketId} className="hover:bg-gray-50/70 transition-colors">
                    {/* Ticket */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{item.ticketId}</div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.priority === 'Critical' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {item.priority}
                      </span>
                    </td>

                    {/* Client */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800 text-xs">{item.client}</div>
                      <div className="text-[11px] text-indigo-600 font-medium mt-0.5">{item.tier}</div>
                    </td>

                    {/* Issue */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-medium text-gray-800 max-w-xs truncate" title={item.issue}>
                        {item.issue}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{item.printer}</div>
                    </td>

                    {/* Elapsed vs Target */}
                    <td className="py-4 px-6">
                      <div className="font-mono text-xs font-bold text-gray-900">
                        {item.elapsed} <span className="text-gray-400 font-normal">/ {item.target}</span>
                      </div>
                    </td>

                    {/* Buffer */}
                    <td className="py-4 px-6">
                      <span className={`text-xs font-mono font-bold ${
                        item.status === 'Breached' ? 'text-rose-600' : item.status === 'At Risk' ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {item.timeLeft}
                      </span>
                    </td>

                    {/* Engineer */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-medium text-gray-700">{item.engineer}</div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setEscalateTicket(item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          item.status === 'Breached'
                            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        Escalate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Escalation Modal */}
      {escalateTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-gray-900">Escalate SLA Issue</h3>
              </div>
              <button onClick={() => setEscalateTicket(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-rose-50 p-3 rounded-xl text-xs space-y-1">
              <div className="font-bold text-rose-900">{escalateTicket.ticketId} - {escalateTicket.client}</div>
              <div className="text-rose-700">Assigned: {escalateTicket.engineer} • Status: {escalateTicket.timeLeft}</div>
            </div>

            {isEscalatedSuccess ? (
              <div className="py-8 text-center text-emerald-600 space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto" />
                <div className="font-bold text-sm">Escalation Alert Dispatched!</div>
                <p className="text-xs text-gray-500">Service Operations Head & Lead Engineer alerted via SMS & Slack.</p>
              </div>
            ) : (
              <form onSubmit={handleEscalateSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Escalation Severity Tier</label>
                  <select
                    value={escalationLevel}
                    onChange={(e) => setEscalationLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    <option value="L1">Level 1 - Territory Supervisor Notice</option>
                    <option value="L2">Level 2 - Operations Head Direct Dispatch</option>
                    <option value="L3">Level 3 - Executive Priority (Emergency Replacement)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Escalation Instructions</label>
                  <textarea
                    rows={3}
                    required
                    value={escalationNote}
                    onChange={(e) => setEscalationNote(e.target.value)}
                    placeholder="e.g. Client CFO escalated machine downtime. Dispatch senior technician Amit with replacement fuser unit immediately."
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setEscalateTicket(null)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    Dispatch Escalation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SLATracking;
