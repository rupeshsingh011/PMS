import React, { useState } from 'react';
import {
  Wrench, CheckCircle2, AlertTriangle, Calendar,
  Search, CheckSquare, X,
  FileCheck
} from 'lucide-react';

const INITIAL_PMS_DATA = [
  {
    id: 'PMS-8801',
    serial: 'CAN-880129-DX',
    model: 'Canon imageRUNNER ADV DX C3835i',
    client: 'Globex Inc',
    location: 'Tower B, 7th Floor - HR Bay',
    frequency: 'Monthly',
    lastServiced: '2023-10-15',
    nextDue: '2023-11-15',
    daysLeft: -1,
    status: 'Overdue',
    meterReading: '142,500 pages',
    technician: 'Rajesh Kumar',
    healthScore: 78
  },
  {
    id: 'PMS-8802',
    serial: 'HP-635109-M',
    model: 'HP LaserJet Enterprise MFP M635',
    client: 'Acme Corp',
    location: 'Inner Circle, Floor 3',
    frequency: 'Bi-Monthly',
    lastServiced: '2023-09-20',
    nextDue: '2023-11-20',
    daysLeft: 4,
    status: 'Due Soon',
    meterReading: '89,400 pages',
    technician: 'Amit Vikram Singh',
    healthScore: 91
  },
  {
    id: 'PMS-8803',
    serial: 'KYO-405400-TK',
    model: 'Kyocera TASKalfa 4054i',
    client: 'Zenith Logistics',
    location: 'Sector 62 Hub, Ground Fl',
    frequency: 'Monthly',
    lastServiced: '2023-11-12',
    nextDue: '2023-12-12',
    daysLeft: 26,
    status: 'Completed',
    meterReading: '215,800 pages',
    technician: 'Sunil Verma',
    healthScore: 98
  },
  {
    id: 'PMS-8804',
    serial: 'EPS-770123-WF',
    model: 'Epson WorkForce Enterprise WF-C20750',
    client: 'Starlight Media',
    location: 'Studio Wing B',
    frequency: 'Quarterly',
    lastServiced: '2023-08-25',
    nextDue: '2023-11-25',
    daysLeft: 9,
    status: 'Due Soon',
    meterReading: '340,120 pages',
    technician: 'Pooja Rawat',
    healthScore: 88
  },
  {
    id: 'PMS-8805',
    serial: 'RIC-550301-MP',
    model: 'Ricoh MP C3004ex',
    client: 'Prime Healthcare Hospital',
    location: 'Records Bay, 2nd Floor',
    frequency: 'Monthly',
    lastServiced: '2023-11-14',
    nextDue: '2023-12-14',
    daysLeft: 28,
    status: 'Completed',
    meterReading: '112,000 pages',
    technician: 'Deepak Sharma',
    healthScore: 96
  }
];

const CHECKLIST_ITEMS = [
  'Deglaze & clean pick-up and feed rollers (Tray 1 & 2)',
  'Inspect transfer belt, clean registration sensor mirrors',
  'Check fuser sleeve, thermistor & pressure roller tension',
  'Empty / replace waste toner container & wipe optical glass',
  'Update machine firmware to latest stable vendor patch',
  'Execute 25-page duplex CMYK color densitometry print test'
];

const PreventiveMaintenance = () => {
  const [pmsList, setPmsList] = useState(INITIAL_PMS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [activeChecklistPms, setActiveChecklistPms] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [technicianNotes, setTechnicianNotes] = useState('');

  const statuses = ['All', 'Due Soon', 'Overdue', 'Completed'];

  const filteredPms = pmsList.filter(item => {
    const matchesSearch =
      item.serial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.technician.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenChecklist = (pms) => {
    setActiveChecklistPms(pms);
    const initialChecks = {};
    CHECKLIST_ITEMS.forEach((_, idx) => {
      initialChecks[idx] = pms.status === 'Completed';
    });
    setCheckedItems(initialChecks);
    setTechnicianNotes(pms.status === 'Completed' ? 'Routine inspection completed. No wear anomalies detected.' : '');
  };

  const handleToggleCheck = (index) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleSavePms = () => {
    setPmsList(pmsList.map(item => {
      if (item.id === activeChecklistPms.id) {
        return {
          ...item,
          status: 'Completed',
          daysLeft: 30,
          lastServiced: new Date().toISOString().split('T')[0],
          healthScore: 98
        };
      }
      return item;
    }));
    setActiveChecklistPms(null);
  };

  const getStatusBadge = (status, daysLeft) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Serviced
          </span>
        );
      case 'Overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            Overdue ({Math.abs(daysLeft)}d)
          </span>
        );
      case 'Due Soon':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            Due in {daysLeft}d
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Preventive Maintenance (PMS)</h1>
            <p className="text-xs text-gray-500">Scheduled proactive servicing, optical cleaning, and printer health score tracking.</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Scheduled This Month</span>
          <div className="text-2xl font-black text-gray-900 mt-2">{pmsList.length}</div>
          <div className="text-xs text-purple-600 font-medium mt-1">Across contracted fleets</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Due Within 7 Days</span>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {pmsList.filter(p => p.status === 'Due Soon').length}
          </div>
          <div className="text-xs text-amber-600 font-medium mt-1">Technicians alerted</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completed / Serviced</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            {pmsList.filter(p => p.status === 'Completed').length}
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Checklists signed off</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">High Risk / Overdue</span>
          <div className="text-2xl font-black text-rose-600 mt-2">
            {pmsList.filter(p => p.status === 'Overdue').length}
          </div>
          <div className="text-xs text-rose-600 font-medium mt-1">Requires immediate visit</div>
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

      {/* PMS Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Equipment Asset</th>
                <th className="py-4 px-6">Client & Location</th>
                <th className="py-4 px-6">PMS Cycle</th>
                <th className="py-4 px-6">Meter Count</th>
                <th className="py-4 px-6">Next Due Date</th>
                <th className="py-4 px-6">Health Score</th>
                <th className="py-4 px-6">Technician</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredPms.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No preventive maintenance records found.
                  </td>
                </tr>
              ) : (
                filteredPms.map((pms) => (
                  <tr key={pms.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Asset */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{pms.model}</div>
                      <div className="text-[11px] font-mono text-gray-400 mt-0.5">{pms.serial}</div>
                    </td>

                    {/* Client */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800 text-xs">{pms.client}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{pms.location}</div>
                    </td>

                    {/* Cycle */}
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700">
                        {pms.frequency}
                      </span>
                      <div className="text-[10px] text-gray-400 mt-1">Last: {pms.lastServiced}</div>
                    </td>

                    {/* Meter */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-semibold text-gray-700">{pms.meterReading}</div>
                    </td>

                    {/* Due */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-semibold text-gray-800">{pms.nextDue}</div>
                      <div className="mt-1">{getStatusBadge(pms.status, pms.daysLeft)}</div>
                    </td>

                    {/* Health Score */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pms.healthScore > 90 ? 'bg-emerald-500' : pms.healthScore > 75 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${pms.healthScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-800">{pms.healthScore}%</span>
                      </div>
                    </td>

                    {/* Tech */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-medium text-gray-700">{pms.technician}</div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenChecklist(pms)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        {pms.status === 'Completed' ? 'View Report' : 'Run Checklist'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checklist Modal */}
      {activeChecklistPms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Standard PMS Protocol</span>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5">{activeChecklistPms.model}</h3>
                <p className="text-xs text-gray-400">S/N: {activeChecklistPms.serial} • {activeChecklistPms.client}</p>
              </div>
              <button onClick={() => setActiveChecklistPms(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-gray-700 block mb-1">Preventive Service Checkpoints</span>
              {CHECKLIST_ITEMS.map((item, idx) => (
                <label
                  key={idx}
                  onClick={() => handleToggleCheck(idx)}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-colors ${
                    checkedItems[idx] ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center border ${
                    checkedItems[idx] ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 bg-white'
                  }`}>
                    {checkedItems[idx] && <CheckSquare className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-xs leading-snug">{item}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Technician Observations</label>
              <textarea
                rows={2}
                value={technicianNotes}
                onChange={(e) => setTechnicianNotes(e.target.value)}
                placeholder="Note any worn gears, unusual toner residue, or parts recommended for next visit..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setActiveChecklistPms(null)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePms}
                className="flex items-center gap-1.5 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <FileCheck className="w-4 h-4" />
                Sign Off & Complete PMS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreventiveMaintenance;
