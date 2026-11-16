import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, Search,
  AlertTriangle, CheckCircle2,
  Send, X, Calendar
} from 'lucide-react';

const INITIAL_AMC_EXPIRIES = [
  {
    contractId: 'AMC-2023-091',
    client: 'Globex Corporation',
    fleetCount: '4 Machines',
    fleetSummary: 'Canon IR-ADV DX C3835i (x2), HP Enterprise M635 (x2)',
    annualValue: 144000,
    expiryDate: '2023-11-22',
    daysLeft: 6,
    status: 'Expiring in 6 Days',
    urgency: 'Critical',
    quoteSent: false
  },
  {
    contractId: 'AMC-2023-084',
    client: 'Acme Technologies Ltd',
    fleetCount: '2 Machines',
    fleetSummary: 'Canon imageRUNNER 2630i, Kyocera 4054i',
    annualValue: 72000,
    expiryDate: '2023-11-28',
    daysLeft: 12,
    status: 'Expiring in 12 Days',
    urgency: 'Warning',
    quoteSent: true
  },
  {
    contractId: 'AMC-2023-072',
    client: 'Zenith Logistics Hub',
    fleetCount: '3 Machines',
    fleetSummary: 'Kyocera TASKalfa 4054i (x2), HP LaserJet M507',
    annualValue: 98000,
    expiryDate: '2023-11-12',
    daysLeft: -4,
    status: 'Expired 4 Days Ago',
    urgency: 'Expired',
    quoteSent: true
  },
  {
    contractId: 'AMC-2023-102',
    client: 'Starlight Media Hub',
    fleetCount: '1 Machine',
    fleetSummary: 'Epson WorkForce Enterprise WF-C20750',
    annualValue: 65000,
    expiryDate: '2023-12-15',
    daysLeft: 29,
    status: 'Expiring in 29 Days',
    urgency: 'Normal',
    quoteSent: false
  }
];

const AMCExpiry = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState(INITIAL_AMC_EXPIRIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [selectedContract, setSelectedContract] = useState(null);
  const [renewalDiscount, setRenewalDiscount] = useState('5%');
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const urgencies = ['All', 'Critical', 'Warning', 'Expired', 'Normal'];

  const filtered = contracts.filter(c => {
    const matchesSearch =
      c.contractId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.fleetSummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUrgency = urgencyFilter === 'All' || c.urgency === urgencyFilter;
    return matchesSearch && matchesUrgency;
  });

  const handleSendQuote = (e) => {
    e.preventDefault();
    setQuoteSuccess(true);
    setContracts(contracts.map(c => c.contractId === selectedContract.contractId ? { ...c, quoteSent: true } : c));
    setTimeout(() => {
      setQuoteSuccess(false);
      setSelectedContract(null);
    }, 1200);
  };

  const getUrgencyBadge = (urgency, status) => {
    switch (urgency) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            {status}
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
            {status}
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            {status}
          </span>
        );
      case 'Normal':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">Contract Lifecycle</span>
              <span className="text-gray-400 text-xs">/</span>
              <span className="text-xs text-gray-500 font-medium">Alerts</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">AMC Expiry Notifications</h1>
          </div>
        </div>

        <button
          onClick={() => navigate('/admin/printers/amc')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
        >
          <span>Open AMC Management</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expiring in 30 Days</span>
          <div className="text-2xl font-black text-gray-900 mt-2">{contracts.length}</div>
          <div className="text-xs text-amber-600 font-medium mt-1">Requires renewal proposal</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Critical (&lt;7 Days)</span>
          <div className="text-2xl font-black text-rose-600 mt-2">
            {contracts.filter(c => c.urgency === 'Critical').length}
          </div>
          <div className="text-xs text-rose-600 font-medium mt-1">Service lapse danger</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expired Contracts</span>
          <div className="text-2xl font-black text-red-700 mt-2">
            {contracts.filter(c => c.urgency === 'Expired').length}
          </div>
          <div className="text-xs text-red-600 font-medium mt-1">Pending revival</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Renewal Pipeline</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            ₹{(contracts.reduce((acc, c) => acc + c.annualValue, 0) / 100000).toFixed(2)}L
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Contract value to retain</div>
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
              placeholder="Search contract ID, client, fleet machines..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1">
            {urgencies.map((u) => (
              <button
                key={u}
                onClick={() => setUrgencyFilter(u)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  urgencyFilter === u
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {u}
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
                <th className="py-4 px-6">Contract ID</th>
                <th className="py-4 px-6">Client & Fleet</th>
                <th className="py-4 px-6">Equipment Covered</th>
                <th className="py-4 px-6">Annual Value</th>
                <th className="py-4 px-6">Expiry Date</th>
                <th className="py-4 px-6">Countdown</th>
                <th className="py-4 px-6">Quotation Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No AMC expiry notifications found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.contractId} className="hover:bg-gray-50/70 transition-colors">
                    {/* Contract ID */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{c.contractId}</div>
                    </td>

                    {/* Client */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800 text-xs">{c.client}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{c.fleetCount}</div>
                    </td>

                    {/* Covered */}
                    <td className="py-4 px-6">
                      <div className="text-xs text-gray-700 max-w-xs truncate" title={c.fleetSummary}>
                        {c.fleetSummary}
                      </div>
                    </td>

                    {/* Value */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-black text-gray-900">₹{c.annualValue.toLocaleString()}/yr</div>
                    </td>

                    {/* Expiry */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-semibold text-gray-800">{c.expiryDate}</div>
                    </td>

                    {/* Countdown */}
                    <td className="py-4 px-6">
                      {getUrgencyBadge(c.urgency, c.status)}
                    </td>

                    {/* Quotation */}
                    <td className="py-4 px-6">
                      {c.quoteSent ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Quote Sent
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Not Sent</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedContract(c)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        {c.quoteSent ? 'Resend Quote' : 'Send Quote'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900">Send Renewal Quotation</h3>
                <p className="text-xs text-gray-500">{selectedContract.contractId} • {selectedContract.client}</p>
              </div>
              <button onClick={() => setSelectedContract(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {quoteSuccess ? (
              <div className="py-8 text-center text-emerald-600 space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto" />
                <div className="font-bold text-sm">Quotation Dispatched!</div>
                <p className="text-xs text-gray-500">Official AMC renewal proposal emailed to client contact.</p>
              </div>
            ) : (
              <form onSubmit={handleSendQuote} className="space-y-3 text-xs">
                <div className="bg-gray-50 p-3.5 rounded-xl space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fleet Size:</span>
                    <span className="font-bold text-gray-900">{selectedContract.fleetCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Standard Renewal ARR:</span>
                    <span className="font-bold text-gray-900">₹{selectedContract.annualValue.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Loyalty Renewal Discount</label>
                  <select
                    value={renewalDiscount}
                    onChange={(e) => setRenewalDiscount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    <option value="0%">0% - Standard Rate</option>
                    <option value="5%">5% - Annual Retention Incentive</option>
                    <option value="10%">10% - Multi-Year 36-Month Commitment</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setSelectedContract(null)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Dispatch Proposal
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

export default AMCExpiry;
