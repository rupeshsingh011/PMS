import React, { useState } from 'react';
import {
  History, Search, X, Download, ShieldCheck
} from 'lucide-react';

const INITIAL_CLOSED_TICKETS = [
  {
    id: 'TKT-1044',
    client: 'Globex Inc',
    model: 'Canon imageRUNNER ADV DX C3835i',
    serial: 'CAN-880129-DX',
    rootCause: 'Hardware (Fuser Pressure)',
    engineer: 'Rajesh Kumar',
    resolution: 'Replaced fuser sleeve and pressure bushing. Calibrated heating element and ran 30-page duplex test.',
    partsUsed: 'Fuser Film Sleeve (PRT-FM1-W154)',
    resolutionTime: '2h 15m',
    slaStatus: 'Met SLA (Target 4h)',
    closedDate: '2023-11-15'
  },
  {
    id: 'TKT-1043',
    client: 'Acme Corp',
    model: 'HP LaserJet Enterprise MFP M635',
    serial: 'HP-635109-M',
    rootCause: 'Mechanical (Paper Feed)',
    engineer: 'Amit Vikram Singh',
    resolution: 'Tray 2 pick-up rollers were heavily glazed. Replaced roller set and cleaned paper path sensors.',
    partsUsed: 'Roller Set (PRT-FL3-1430)',
    resolutionTime: '1h 40m',
    slaStatus: 'Met SLA (Target 8h)',
    closedDate: '2023-11-14'
  },
  {
    id: 'TKT-1040',
    client: 'Zenith Logistics',
    model: 'Kyocera TASKalfa 4054i',
    serial: 'KYO-405400-TK',
    rootCause: 'Network & Spooler',
    engineer: 'Sunil Verma',
    resolution: 'Static IP had conflicted with warehouse barcode gateway. Reconfigured subnet gateway and updated port 9100 driver.',
    partsUsed: 'None (Firmware / Network Config)',
    resolutionTime: '45 mins',
    slaStatus: 'Met SLA (Target 4h)',
    closedDate: '2023-11-12'
  },
  {
    id: 'TKT-1036',
    client: 'Starlight Media Hub',
    model: 'Epson WorkForce WF-C20750',
    serial: 'EPS-770123-WF',
    rootCause: 'Printhead & Densitometry',
    engineer: 'Pooja Rawat',
    resolution: 'Performed deep ultrasonic printhead purge, aligned bidirectional print pass, replaced Cyan cartridge.',
    partsUsed: 'Cyan Ink Tank (T-902)',
    resolutionTime: '3h 10m',
    slaStatus: 'Met SLA (Target 8h)',
    closedDate: '2023-11-10'
  },
  {
    id: 'TKT-1032',
    client: 'Prime Healthcare',
    model: 'Ricoh MP C3004ex',
    serial: 'RIC-550301-MP',
    rootCause: 'Consumable & Waste Box',
    engineer: 'Deepak Sharma',
    resolution: 'Waste toner container had overflowed locking the machine. Replaced container and cleaned optics mirror.',
    partsUsed: 'Waste Box WT-860',
    resolutionTime: '1h 15m',
    slaStatus: 'Met SLA (Target 4h)',
    closedDate: '2023-11-08'
  }
];

const ClosedTickets = () => {
  const [closedList] = useState(INITIAL_CLOSED_TICKETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [causeFilter, setCauseFilter] = useState('All');

  // Certificate Modal
  const [selectedTicket, setSelectedTicket] = useState(null);

  const causes = ['All', 'Hardware', 'Mechanical', 'Network', 'Consumable'];

  const filteredTickets = closedList.filter(t => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.engineer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.resolution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCause = causeFilter === 'All' || t.rootCause.toLowerCase().includes(causeFilter.toLowerCase());
    return matchesSearch && matchesCause;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 text-gray-700 rounded-2xl">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Closed Tickets Archive</h1>
            <p className="text-xs text-gray-500">Historical service logs, root cause analysis, replaced parts, and verified resolution certificates.</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Closed Tickets</span>
          <div className="text-2xl font-black text-gray-900 mt-2">1,480</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">100% customer signed off</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">First-Time Fix Rate</span>
          <div className="text-2xl font-black text-blue-600 mt-2">92.4%</div>
          <div className="text-xs text-blue-600 font-medium mt-1">Resolved on first dispatch</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Resolution Time</span>
          <div className="text-2xl font-black text-indigo-600 mt-2">2.2 hrs</div>
          <div className="text-xs text-indigo-600 font-medium mt-1">Well inside 4h target</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Parts Consumed</span>
          <div className="text-2xl font-black text-gray-900 mt-2">412 units</div>
          <div className="text-xs text-gray-500 font-medium mt-1">Documented in inventory</div>
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
              placeholder="Search by ticket ID, client, engineer, part, root cause..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1">
            {causes.map((c) => (
              <button
                key={c}
                onClick={() => setCauseFilter(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  causeFilter === c
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Closed Tickets Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Ticket & Date</th>
                <th className="py-4 px-6">Client & Machine</th>
                <th className="py-4 px-6">Root Cause</th>
                <th className="py-4 px-6">Resolution Summary</th>
                <th className="py-4 px-6">Parts Used</th>
                <th className="py-4 px-6">Resolution Time</th>
                <th className="py-4 px-6">Engineer</th>
                <th className="py-4 px-6 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No closed tickets found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Ticket */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{t.id}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{t.closedDate}</div>
                    </td>

                    {/* Client & Machine */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800 text-xs">{t.client}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[180px]">{t.model}</div>
                    </td>

                    {/* Root Cause */}
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 text-gray-700">
                        {t.rootCause}
                      </span>
                    </td>

                    {/* Resolution Summary */}
                    <td className="py-4 px-6">
                      <div className="text-xs text-gray-700 max-w-xs truncate" title={t.resolution}>
                        {t.resolution}
                      </div>
                    </td>

                    {/* Parts */}
                    <td className="py-4 px-6">
                      <span className="text-xs text-gray-600 font-medium">
                        {t.partsUsed}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-bold text-emerald-600">{t.resolutionTime}</div>
                      <div className="text-[10px] text-gray-400">{t.slaStatus}</div>
                    </td>

                    {/* Engineer */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-medium text-gray-700">{t.engineer}</div>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedTicket(t)}
                        className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Service Report
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolution Certificate Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Verified Service Resolution</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-0.5">{selectedTicket.id}</h3>
                </div>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-2xl space-y-2 border border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer Organization:</span>
                  <span className="font-bold text-gray-900">{selectedTicket.client}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hardware Asset:</span>
                  <span className="font-semibold text-gray-800">{selectedTicket.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Serial Number:</span>
                  <span className="font-mono text-gray-700">{selectedTicket.serial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Root Cause:</span>
                  <span className="font-semibold text-purple-700">{selectedTicket.rootCause}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Resolution Time:</span>
                  <span className="font-bold text-emerald-600">{selectedTicket.resolutionTime} ({selectedTicket.slaStatus})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Servicing Engineer:</span>
                  <span className="font-semibold text-gray-800">{selectedTicket.engineer}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-1">
                <span className="font-bold text-emerald-900">Work Carried Out:</span>
                <p className="text-gray-700 text-xs leading-relaxed">{selectedTicket.resolution}</p>
                <div className="text-[11px] text-gray-500 pt-1">Parts Consumed: <span className="font-semibold text-gray-800">{selectedTicket.partsUsed}</span></div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl text-[11px] text-gray-500">
                <span>Sign-off: Customer OTP Verified</span>
                <span className="font-semibold text-gray-700">Closed: {selectedTicket.closedDate}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => alert(`Downloading Certificate for ${selectedTicket.id}...`)}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClosedTickets;
