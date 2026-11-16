import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Printer, CheckCircle2, AlertTriangle, Wrench, Search,
  Droplets, MapPin, X, ArrowUpRight,
  ShieldCheck, AlertCircle, LayoutGrid, List
} from 'lucide-react';

const initialPrinters = [
  {
    id: 'PRT-001',
    model: 'HP LaserJet Enterprise MFP M635',
    type: 'Monochrome Multifunction',
    serialNo: 'HP-SN-89421',
    assetTag: 'AST-MUM-014',
    ipAddress: '192.168.10.45',
    location: '3rd Floor - Finance & Accounts',
    department: 'Finance',
    status: 'Operational',
    monthlyPrints: 14250,
    totalPrints: 182400,
    lastServiceDate: '12 Oct 2026',
    nextMaintenance: '12 Nov 2026',
    paperTray: 85,
    toner: {
      black: 78
    },
    amcContract: 'Enterprise Diamond Fleet Care',
    coverageValidUntil: '31 Dec 2026'
  },
  {
    id: 'PRT-002',
    model: 'Canon imageRUNNER ADVANCE DX C3835i',
    type: 'A3 Color Laser Multifunction',
    serialNo: 'CAN-DX-33918',
    assetTag: 'AST-MUM-019',
    ipAddress: '192.168.10.48',
    location: '4th Floor - Executive Boardroom',
    department: 'Management',
    status: 'Operational',
    monthlyPrints: 8900,
    totalPrints: 95400,
    lastServiceDate: '25 Sep 2026',
    nextMaintenance: '25 Nov 2026',
    paperTray: 60,
    toner: {
      black: 64,
      cyan: 52,
      magenta: 48,
      yellow: 58
    },
    amcContract: 'Enterprise Diamond Fleet Care',
    coverageValidUntil: '31 Dec 2026'
  },
  {
    id: 'PRT-003',
    model: 'Epson WorkForce Pro WF-C878R',
    type: 'High-Yield Replaceable Ink Pack System',
    serialNo: 'EPS-WF-77210',
    assetTag: 'AST-MUM-022',
    ipAddress: '192.168.10.52',
    location: '2nd Floor - Marketing & Creative Lab',
    department: 'Marketing',
    status: 'Warning',
    statusNote: 'Cyan Ink Pack below 15%',
    monthlyPrints: 19800,
    totalPrints: 245000,
    lastServiceDate: '05 Oct 2026',
    nextMaintenance: '05 Dec 2026',
    paperTray: 40,
    toner: {
      black: 82,
      cyan: 14, // low
      magenta: 68,
      yellow: 74
    },
    amcContract: 'Enterprise Diamond Fleet Care',
    coverageValidUntil: '31 Dec 2026'
  },
  {
    id: 'PRT-004',
    model: 'Brother MFC-L8900CDW',
    type: 'Color Laser All-in-One',
    serialNo: 'BRT-MF-10943',
    assetTag: 'AST-MUM-028',
    ipAddress: '192.168.10.60',
    location: '1st Floor - HR & Operations',
    department: 'Human Resources',
    status: 'Operational',
    monthlyPrints: 6400,
    totalPrints: 78100,
    lastServiceDate: '18 Aug 2026',
    nextMaintenance: '18 Nov 2026',
    paperTray: 90,
    toner: {
      black: 91,
      cyan: 80,
      magenta: 78,
      yellow: 85
    },
    amcContract: 'Enterprise Diamond Fleet Care',
    coverageValidUntil: '31 Dec 2026'
  },
  {
    id: 'PRT-005',
    model: 'HP Color LaserJet Enterprise M555dn',
    type: 'High-Speed Single Function Color',
    serialNo: 'HP-M555-55102',
    assetTag: 'AST-MUM-031',
    ipAddress: '192.168.10.64',
    location: 'Ground Floor - Reception & Visitors Lounge',
    department: 'Operations',
    status: 'Under Maintenance',
    statusNote: 'Scheduled roller replacement underway',
    monthlyPrints: 3200,
    totalPrints: 41200,
    lastServiceDate: '02 Nov 2026',
    nextMaintenance: '15 Nov 2026',
    paperTray: 20,
    toner: {
      black: 42,
      cyan: 38,
      magenta: 35,
      yellow: 40
    },
    amcContract: 'Enterprise Diamond Fleet Care',
    coverageValidUntil: '31 Dec 2026'
  },
  {
    id: 'PRT-006',
    model: 'Canon imageRUNNER 2625i',
    type: 'Heavy Duty Monochrome Multi-Functional',
    serialNo: 'CAN-IR-44019',
    assetTag: 'AST-MUM-034',
    ipAddress: '192.168.10.70',
    location: 'Basement - Logistics & Inventory Hub',
    department: 'Logistics',
    status: 'Operational',
    monthlyPrints: 22400,
    totalPrints: 389000,
    lastServiceDate: '28 Sep 2026',
    nextMaintenance: '28 Nov 2026',
    paperTray: 95,
    toner: {
      black: 89
    },
    amcContract: 'Enterprise Diamond Fleet Care',
    coverageValidUntil: '31 Dec 2026'
  }
];

const MyPrinters = () => {
  const navigate = useNavigate();
  const [printers] = useState(initialPrinters);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modals state
  const [activeModalPrinter, setActiveModalPrinter] = useState(null);
  const [modalType, setModalType] = useState(null); // 'details' | 'toner' | 'ticket'
  const [actionFeedback, setActionFeedback] = useState(null);

  // Filter calculations
  const filteredPrinters = printers.filter((p) => {
    const matchesSearch =
      p.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.serialNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.assetTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ipAddress.includes(searchTerm);

    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    const matchesDept = selectedDepartment === 'All' || p.department === selectedDepartment;

    return matchesSearch && matchesStatus && matchesDept;
  });

  const totalCount = printers.length;
  const operationalCount = printers.filter((p) => p.status === 'Operational').length;
  const warningCount = printers.filter((p) => p.status === 'Warning').length;
  const maintenanceCount = printers.filter((p) => p.status === 'Under Maintenance').length;

  const handleTonerRequest = (printer) => {
    setActionFeedback({
      type: 'success',
      message: `Automated replenishment order placed for ${printer.model}. Delivery scheduled within 24 hours under your Diamond AMC plan.`
    });
    setModalType(null);
    setActiveModalPrinter(null);
    setTimeout(() => setActionFeedback(null), 5000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Page Title & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">My Printer Fleet</h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time status, consumable levels, and health telemetry of your company's installed fleet.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/client/service-request')}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <Wrench className="w-4 h-4" />
            Raise Service Ticket
          </button>
        </div>
      </div>

      {actionFeedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm font-medium animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{actionFeedback.message}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Units Managed</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{totalCount}</h3>
            <span className="text-xs text-gray-500 mt-1 block">Full AMC Coverage</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-700 flex items-center justify-center">
            <Printer className="w-6 h-6 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">Operational & Online</p>
            <h3 className="text-2xl font-extrabold text-emerald-700 mt-1">{operationalCount}</h3>
            <span className="text-xs text-emerald-600 font-medium mt-1 block">100% Ready for print</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Consumable Warning</p>
            <h3 className="text-2xl font-extrabold text-amber-700 mt-1">{warningCount}</h3>
            <span className="text-xs text-amber-600 font-medium mt-1 block">Toner low &lt; 20%</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Under Service</p>
            <h3 className="text-2xl font-extrabold text-blue-700 mt-1">{maintenanceCount}</h3>
            <span className="text-xs text-blue-600 font-medium mt-1 block">Technician on-site</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and View Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search model, serial no, floor, IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all placeholder-gray-400 font-medium"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Statuses</option>
              <option value="Operational">Operational</option>
              <option value="Warning">Warning</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase">Dept:</span>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Departments</option>
              <option value="Finance">Finance</option>
              <option value="Management">Management</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Operations">Operations</option>
              <option value="Logistics">Logistics</option>
            </select>
          </div>

          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPrinters.map((printer) => {
            const hasColorToner = printer.toner.cyan !== undefined;
            const isWarning = printer.status === 'Warning';

            return (
              <div
                key={printer.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-100/80 bg-gradient-to-b from-gray-50/50 to-transparent">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl group-hover:scale-105 transition-transform">
                          <Printer className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono font-semibold text-gray-400 block">{printer.assetTag}</span>
                          <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                            {printer.model}
                          </h3>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                          printer.status === 'Operational'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                            : isWarning
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/50'
                            : 'bg-blue-50 text-blue-700 border border-blue-200/50'
                        }`}
                      >
                        {printer.status}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{printer.location}</span>
                    </div>
                  </div>

                  {/* Telemetry & Levels */}
                  <div className="p-6 space-y-4 text-xs">
                    {/* Consumable Levels */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                          Consumable Gauges
                        </span>
                        {isWarning && (
                          <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Refill Advised
                          </span>
                        )}
                      </div>

                      {hasColorToner ? (
                        <div className="grid grid-cols-4 gap-2 text-center">
                          {/* Black */}
                          <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                            <span className="font-bold text-gray-800 block text-[10px]">BLK</span>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-gray-900 rounded-full" style={{ width: `${printer.toner.black}%` }} />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium mt-1 block">{printer.toner.black}%</span>
                          </div>

                          {/* Cyan */}
                          <div className={`p-2 rounded-xl border ${printer.toner.cyan <= 20 ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'}`}>
                            <span className="font-bold text-cyan-600 block text-[10px]">CYAN</span>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${printer.toner.cyan}%` }} />
                            </div>
                            <span className={`text-[10px] font-semibold mt-1 block ${printer.toner.cyan <= 20 ? 'text-amber-700 font-bold' : 'text-gray-500'}`}>
                              {printer.toner.cyan}%
                            </span>
                          </div>

                          {/* Magenta */}
                          <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                            <span className="font-bold text-pink-600 block text-[10px]">MAG</span>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-pink-500 rounded-full" style={{ width: `${printer.toner.magenta}%` }} />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium mt-1 block">{printer.toner.magenta}%</span>
                          </div>

                          {/* Yellow */}
                          <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                            <span className="font-bold text-amber-500 block text-[10px]">YEL</span>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${printer.toner.yellow}%` }} />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium mt-1 block">{printer.toner.yellow}%</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-700">Monochrome Toner Cartridge (K)</span>
                            <span className="font-bold text-gray-900">{printer.toner.black}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-800 rounded-full" style={{ width: `${printer.toner.black}%` }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Paper & Metrics */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-2.5 rounded-xl bg-gray-50/70 border border-gray-100">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Monthly Usage</span>
                        <p className="font-extrabold text-gray-800 text-sm mt-0.5">{printer.monthlyPrints.toLocaleString()} prints</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-gray-50/70 border border-gray-100">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Paper Tray Load</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${printer.paperTray}%` }} />
                          </div>
                          <span className="text-xs font-bold text-gray-700">{printer.paperTray}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
                      <span>Serial: <span className="font-mono font-semibold text-gray-700">{printer.serialNo}</span></span>
                      <span>IP: <span className="font-mono font-semibold text-gray-700">{printer.ipAddress}</span></span>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveModalPrinter(printer);
                      setModalType('details');
                    }}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors shadow-sm"
                  >
                    Specs & Diagnostics
                  </button>
                  <button
                    onClick={() => {
                      setActiveModalPrinter(printer);
                      setModalType('toner');
                    }}
                    className="py-2 px-3 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 rounded-xl transition-colors"
                  >
                    Request Toner
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-gray-500 uppercase tracking-wider font-bold bg-gray-50/70 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Printer Model & Tag</th>
                  <th className="px-6 py-4">Location / Department</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Toner Level</th>
                  <th className="px-6 py-4">Monthly Print Volume</th>
                  <th className="px-6 py-4">IP & Serial</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPrinters.map((printer) => (
                  <tr key={printer.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                          <Printer className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{printer.model}</p>
                          <span className="text-xs font-mono text-gray-400">{printer.assetTag}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600">
                      <p className="font-medium text-gray-800">{printer.location}</p>
                      <span className="text-gray-400">{printer.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          printer.status === 'Operational'
                            ? 'bg-emerald-50 text-emerald-700'
                            : printer.status === 'Warning'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {printer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24">
                        <div className="flex justify-between text-[10px] font-bold text-gray-600 mb-1">
                          <span>Black</span>
                          <span>{printer.toner.black}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-800 rounded-full" style={{ width: `${printer.toner.black}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-800">
                      {printer.monthlyPrints.toLocaleString()} prints
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-600">
                      <p>{printer.ipAddress}</p>
                      <span className="text-[11px] text-gray-400">{printer.serialNo}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setActiveModalPrinter(printer);
                          setModalType('details');
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-emerald-700 transition-colors"
                        title="View Full Details"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Printer Specs & Diagnostics */}
      {modalType === 'details' && activeModalPrinter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Printer className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{activeModalPrinter.model}</h3>
                  <p className="text-xs text-gray-500 font-mono">{activeModalPrinter.assetTag} • {activeModalPrinter.serialNo}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setModalType(null);
                  setActiveModalPrinter(null);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-xs font-bold uppercase text-gray-400">Assigned Department & Floor</span>
                  <p className="font-semibold text-gray-800 mt-1">{activeModalPrinter.location}</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-xs font-bold uppercase text-gray-400">Network Host IP</span>
                  <p className="font-mono font-semibold text-gray-800 mt-1">{activeModalPrinter.ipAddress}</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-xs font-bold uppercase text-gray-400">Lifetime Impressions</span>
                  <p className="font-extrabold text-gray-900 text-lg mt-1">{activeModalPrinter.totalPrints.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <span className="text-xs font-bold uppercase text-gray-400">AMC Maintenance Cycle</span>
                  <p className="font-semibold text-emerald-700 mt-1">Next: {activeModalPrinter.nextMaintenance}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-emerald-900 text-sm">Active Contract: {activeModalPrinter.amcContract}</h4>
                  <p className="text-xs text-emerald-700">Includes all genuine toners, drums, preventive checkups, and 2hr SLA breakdown care.</p>
                </div>
                <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0 ml-4" />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    const selected = activeModalPrinter;
                    setModalType(null);
                    setActiveModalPrinter(null);
                    navigate('/client/service-request', { state: { printerId: selected.id, model: selected.model } });
                  }}
                  className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl font-semibold text-xs hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  File Service Ticket for this Unit
                </button>
                <button
                  onClick={() => handleTonerRequest(activeModalPrinter)}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-xs hover:bg-emerald-700 transition-colors"
                >
                  Request Cartridge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Quick Toner Refill */}
      {modalType === 'toner' && activeModalPrinter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2.5 text-emerald-700">
                <Droplets className="w-5 h-5" />
                <h3 className="font-bold text-gray-900">Request Toner Refill</h3>
              </div>
              <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-4">
              Your company is covered under <span className="font-semibold text-gray-900">{activeModalPrinter.amcContract}</span>. Replenishment cartridges are provided at zero additional charge.
            </p>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs space-y-1.5 mb-5">
              <p><span className="text-gray-500">Target Printer:</span> <span className="font-semibold text-gray-800">{activeModalPrinter.model}</span></p>
              <p><span className="text-gray-500">Assigned Location:</span> <span className="font-semibold text-gray-800">{activeModalPrinter.location}</span></p>
              <p><span className="text-gray-500">Dispatch Turnaround:</span> <span className="font-semibold text-emerald-700">Within 24 Hours</span></p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleTonerRequest(activeModalPrinter)}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 shadow-sm"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPrinters;
