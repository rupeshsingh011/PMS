import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, Search,
  Clock, Eye,
  FileCheck, X
} from 'lucide-react';

const INITIAL_CLOSED_NOTIFS = [
  {
    id: 'TKT-1044',
    client: 'Globex Inc',
    printer: 'Canon imageRUNNER ADV DX C3835i',
    engineer: 'Rajesh Kumar',
    resolution: 'Replaced fuser sleeve and pressure bushing. Completed 30-page test print.',
    partsUsed: 'Fuser Film Sleeve (PRT-FM1-W154)',
    turnaround: '2h 15m',
    closedAt: '10 mins ago',
    feedbackStatus: 'Feedback Received (5★)',
    otpVerified: true
  },
  {
    id: 'TKT-1043',
    client: 'Acme Corp',
    printer: 'HP LaserJet Enterprise MFP M635',
    engineer: 'Amit Vikram Singh',
    resolution: 'Cleaned optics and deglazed Tray 2 pick-up rollers. Cleared error code 50.4.',
    partsUsed: 'Roller Set (PRT-FL3-1430)',
    turnaround: '1h 40m',
    closedAt: '1 hour ago',
    feedbackStatus: 'Pending CSAT',
    otpVerified: true
  },
  {
    id: 'TKT-1040',
    client: 'Zenith Logistics Hub',
    printer: 'Kyocera TASKalfa 4054i',
    engineer: 'Sunil Verma',
    resolution: 'Subnet gateway reconfiguration and port 9100 driver reinstall.',
    partsUsed: 'None (Network Config)',
    turnaround: '45 mins',
    closedAt: '3 hours ago',
    feedbackStatus: 'Feedback Received (4★)',
    otpVerified: true
  },
  {
    id: 'TKT-1036',
    client: 'Starlight Media Hub',
    printer: 'Epson WorkForce WF-C20750',
    engineer: 'Pooja Rawat',
    resolution: 'Deep ultrasonic printhead purge & Cyan ink tank replacement.',
    partsUsed: 'Cyan Ink Tank (T-902)',
    turnaround: '3h 10m',
    closedAt: 'Yesterday',
    feedbackStatus: 'Feedback Received (5★)',
    otpVerified: true
  }
];

const TicketClosed = () => {
  const navigate = useNavigate();
  const [closedTickets] = useState(INITIAL_CLOSED_NOTIFS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filters = ['All', 'Pending CSAT', 'Feedback Received'];

  const filtered = closedTickets.filter(item => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.engineer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.resolution.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    if (filterType === 'Pending CSAT') matchesFilter = item.feedbackStatus.includes('Pending');
    else if (filterType === 'Feedback Received') matchesFilter = item.feedbackStatus.includes('Received');

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 text-gray-700 rounded-2xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Resolutions</span>
              <span className="text-gray-400 text-xs">/</span>
              <span className="text-xs text-gray-500 font-medium">Alerts</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Ticket Closed Notifications</h1>
          </div>
        </div>

        <button
          onClick={() => navigate('/admin/management/closed')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
        >
          <span>View Closed Archive</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tickets Closed Today</span>
          <div className="text-2xl font-black text-gray-900 mt-2">{closedTickets.length}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">100% customer OTP signed</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">First-Time Fix</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">94.2%</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">No secondary visits required</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Resolution Time</span>
          <div className="text-2xl font-black text-indigo-600 mt-2">2h 10m</div>
          <div className="text-xs text-indigo-600 font-medium mt-1">Inside 4h contract SLA</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Awaiting CSAT Rating</span>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {closedTickets.filter(c => c.feedbackStatus.includes('Pending')).length}
          </div>
          <div className="text-xs text-amber-600 font-medium mt-1">SMS feedback link sent</div>
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
              placeholder="Search by ticket ID, client, engineer, part..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  filterType === f
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {f}
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
                <th className="py-4 px-6">Ticket & Closed At</th>
                <th className="py-4 px-6">Client & Machine</th>
                <th className="py-4 px-6">Resolution Summary</th>
                <th className="py-4 px-6">Parts Replaced</th>
                <th className="py-4 px-6">Turnaround</th>
                <th className="py-4 px-6">Engineer</th>
                <th className="py-4 px-6">CSAT Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No closed ticket notifications found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Ticket */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{item.id}</div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {item.closedAt}
                      </div>
                    </td>

                    {/* Client & Machine */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800 text-xs">{item.client}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[180px]">{item.printer}</div>
                    </td>

                    {/* Resolution */}
                    <td className="py-4 px-6">
                      <div className="text-xs text-gray-700 max-w-xs truncate" title={item.resolution}>
                        {item.resolution}
                      </div>
                    </td>

                    {/* Parts */}
                    <td className="py-4 px-6">
                      <span className="text-xs text-gray-600 font-medium">
                        {item.partsUsed}
                      </span>
                    </td>

                    {/* Turnaround */}
                    <td className="py-4 px-6">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.turnaround}
                      </span>
                    </td>

                    {/* Engineer */}
                    <td className="py-4 px-6">
                      <span className="text-xs font-medium text-gray-800">{item.engineer}</span>
                    </td>

                    {/* CSAT */}
                    <td className="py-4 px-6">
                      <span className={`text-xs font-semibold ${
                        item.feedbackStatus.includes('5★') ? 'text-amber-600' : 'text-gray-500'
                      }`}>
                        {item.feedbackStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedTicket(item)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="View Resolution Summary"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-gray-900">{selectedTicket.id} Resolution</h3>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-bold text-gray-900">{selectedTicket.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Machine:</span>
                <span className="font-medium text-gray-800">{selectedTicket.printer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Technician:</span>
                <span className="font-semibold text-indigo-700">{selectedTicket.engineer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Downtime:</span>
                <span className="font-bold text-emerald-600">{selectedTicket.turnaround}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs space-y-1">
              <span className="font-bold text-emerald-900">Work Carried Out:</span>
              <p className="text-emerald-800">{selectedTicket.resolution}</p>
              <div className="text-[11px] text-gray-500 pt-1">Parts: {selectedTicket.partsUsed}</div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketClosed;
