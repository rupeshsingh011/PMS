import React, { useState } from 'react';
import {
  Printer, Edit2, Trash2, Download, QrCode, Eye, EyeOff,
  Wifi, WifiOff, Battery, Shield, Wrench, Activity, AlertTriangle,
  FileText, Image, Video, ChevronDown, ChevronUp, CheckCircle,
  XCircle, Clock, Star, BarChart2, MapPin, Calendar, User,
  Package, Settings, ZapOff, Zap, RefreshCw, ArrowUpDown, Search, Filter
} from 'lucide-react';

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const PRINTERS = [
  {
    id: 1,
    image: null,
    name: 'HP LaserJet MFP M430f',
    assetId: 'AST-000125',
    brand: 'HP',
    model: 'M430f',
    serialNo: 'CNB3G17492',
    status: 'Active',
    printerType: 'Laser',
    color: 'Monochrome',
    purchaseDate: '15-Jan-2025',
    installationDate: '20-Jan-2025',
    vendor: 'ABC Technologies',
    department: 'Accounts',
    location: 'Floor-2, Room-205',
    ipAddress: '192.168.1.25',
    macAddress: '00:1B:44:11:3A:B7',
    hostName: 'HP-M430F-25',
    firmware: 'v4.5.2',
    driver: 'Universal PCL6',
    connection: 'Ethernet',
    networkStatus: 'Online',
    tonerLevel: 72,
    tonerColor: 'Black',
    healthScore: 88,
    warrantyStart: '15-Jan-2025',
    warrantyEnd: '14-Jan-2028',
    warrantyVendor: 'HP India',
    amcStart: '20-Jan-2025',
    amcEnd: '19-Jan-2026',
    amcVendor: 'ABC Technologies',
    amcCost: '₹12,000/yr',
    performanceScore: 91,
    totalPages: 48200,
    monthlyPrints: 3200,
    colorPrints: 0,
    monoPrints: 3200,
    duplex: 1450,
    errorRate: '1.2%',
    downtime: '3.5 hrs',
    serviceHistory: [
      { id: 'SRV-001', date: '10-Mar-2025', engineer: 'Raj Kumar', type: 'Preventive', cost: '₹800', duration: '2 hrs', status: 'Completed' },
      { id: 'SRV-002', date: '05-May-2025', engineer: 'Amit Singh', type: 'Corrective', cost: '₹1,500', duration: '3 hrs', status: 'Completed' },
      { id: 'SRV-003', date: '18-Jun-2025', engineer: 'Priya Nair', type: 'Preventive', cost: '₹800', duration: '1.5 hrs', status: 'Completed' },
    ],
    maintenanceHistory: [
      { date: '10-Mar-2025', maintenance: 'Drum Cleaning', engineer: 'Raj Kumar', nextDue: '10-Jun-2025', status: 'Done' },
      { date: '10-Jun-2025', maintenance: 'Roller Replacement', engineer: 'Amit Singh', nextDue: '10-Sep-2025', status: 'Done' },
      { date: '10-Sep-2025', maintenance: 'Full Servicing', engineer: 'Priya Nair', nextDue: '10-Dec-2025', status: 'Pending' },
    ],
    repairRecords: [
      { id: 'REP-001', complaint: 'Paper Jam', rootCause: 'Worn roller', engineer: 'Raj Kumar', cost: '₹600', downtime: '4 hrs', status: 'Resolved' },
      { id: 'REP-002', complaint: 'Fuser Error', rootCause: 'Fuser unit failure', engineer: 'Amit Singh', cost: '₹2,200', downtime: '8 hrs', status: 'Resolved' },
    ],
    partsReplacement: [
      { part: 'Toner Cartridge', oldSerial: 'TC-0012', newSerial: 'TC-0098', cost: '₹3,500', vendor: 'HP India', warranty: '6 months', date: '05-May-2025' },
      { part: 'Fuser Unit', oldSerial: 'FU-0034', newSerial: 'FU-0071', cost: '₹1,800', vendor: 'ABC Tech', warranty: '1 year', date: '05-May-2025' },
    ],
    issueHistory: [
      { ticket: 'TKT-0451', issue: 'Paper Jam - Tray 2', priority: 'High', engineer: 'Raj Kumar', resolution: 'Cleared jam, replaced roller', status: 'Resolved' },
      { ticket: 'TKT-0512', issue: 'Fuser Error E5', priority: 'Critical', engineer: 'Amit Singh', resolution: 'Replaced fuser assembly', status: 'Resolved' },
      { ticket: 'TKT-0598', issue: 'Slow Print Speed', priority: 'Medium', engineer: 'Priya Nair', resolution: 'Firmware update applied', status: 'Resolved' },
    ],
    documents: {
      invoice: true, warranty: true, manuals: true,
      serviceReports: 3, repairBills: 2, images: 5, videos: 1,
    },
    activityTimeline: [
      { date: '18-Jun-2025', activity: 'Preventive Service', user: 'Priya Nair', description: 'Routine preventive maintenance completed.' },
      { date: '05-May-2025', activity: 'Repair', user: 'Amit Singh', description: 'Fuser unit replaced after failure.' },
      { date: '10-Mar-2025', activity: 'Maintenance', user: 'Raj Kumar', description: 'Drum cleaned and rollers inspected.' },
      { date: '20-Jan-2025', activity: 'Installation', user: 'Admin', description: 'Printer installed and configured on network.' },
      { date: '15-Jan-2025', activity: 'Purchase', user: 'Admin', description: 'Printer purchased from ABC Technologies.' },
    ],
  },
  {
    id: 2,
    image: null,
    name: 'Canon ImageRunner 2625i',
    assetId: 'AST-000132',
    brand: 'Canon',
    model: '2625i',
    serialNo: 'IRC2625A005',
    status: 'Maintenance',
    printerType: 'Laser',
    color: 'Color',
    purchaseDate: '02-Mar-2025',
    installationDate: '08-Mar-2025',
    vendor: 'Canon Dealers Pvt Ltd',
    department: 'HR',
    location: 'Floor-1, Room-102',
    ipAddress: '192.168.1.48',
    macAddress: '00:1B:44:22:5C:D1',
    hostName: 'CANON-2625-48',
    firmware: 'v3.2.1',
    driver: 'Canon UFRII LT',
    connection: 'Wi-Fi',
    networkStatus: 'Online',
    tonerLevel: 34,
    tonerColor: 'CMY+K',
    healthScore: 65,
    warrantyStart: '02-Mar-2025',
    warrantyEnd: '01-Mar-2028',
    warrantyVendor: 'Canon India',
    amcStart: '08-Mar-2025',
    amcEnd: '07-Mar-2026',
    amcVendor: 'Canon Dealers',
    amcCost: '₹18,000/yr',
    performanceScore: 74,
    totalPages: 22100,
    monthlyPrints: 1800,
    colorPrints: 600,
    monoPrints: 1200,
    duplex: 780,
    errorRate: '3.1%',
    downtime: '12 hrs',
    serviceHistory: [
      { id: 'SRV-011', date: '12-Apr-2025', engineer: 'Sunita Rao', type: 'Corrective', cost: '₹2,000', duration: '4 hrs', status: 'Completed' },
    ],
    maintenanceHistory: [
      { date: '12-Apr-2025', maintenance: 'Head Cleaning', engineer: 'Sunita Rao', nextDue: '12-Jul-2025', status: 'Done' },
    ],
    repairRecords: [
      { id: 'REP-011', complaint: 'Color Mismatch', rootCause: 'Low cyan toner', engineer: 'Sunita Rao', cost: '₹800', downtime: '2 hrs', status: 'Resolved' },
    ],
    partsReplacement: [
      { part: 'Cyan Toner', oldSerial: 'CT-008', newSerial: 'CT-021', cost: '₹2,200', vendor: 'Canon India', warranty: '6 months', date: '12-Apr-2025' },
    ],
    issueHistory: [
      { ticket: 'TKT-0621', issue: 'Color streaks on output', priority: 'High', engineer: 'Sunita Rao', resolution: 'Replaced cyan toner', status: 'Resolved' },
    ],
    documents: {
      invoice: true, warranty: true, manuals: false,
      serviceReports: 1, repairBills: 1, images: 2, videos: 0,
    },
    activityTimeline: [
      { date: '12-Apr-2025', activity: 'Repair', user: 'Sunita Rao', description: 'Cyan toner replaced, color calibration done.' },
      { date: '08-Mar-2025', activity: 'Installation', user: 'Admin', description: 'Printer installed on Wi-Fi network.' },
    ],
  },
  {
    id: 3,
    image: null,
    name: 'Epson EcoTank L6290',
    assetId: 'AST-000148',
    brand: 'Epson',
    model: 'L6290',
    serialNo: 'X8F1002345',
    status: 'Inactive',
    printerType: 'Inkjet',
    color: 'Color',
    purchaseDate: '10-Nov-2024',
    installationDate: '15-Nov-2024',
    vendor: 'Epson Store',
    department: 'Design',
    location: 'Floor-3, Room-310',
    ipAddress: '192.168.1.71',
    macAddress: '00:1B:44:33:7E:F4',
    hostName: 'EPSON-L6290-71',
    firmware: 'v2.1.8',
    driver: 'Epson Scan',
    connection: 'USB',
    networkStatus: 'Offline',
    tonerLevel: 12,
    tonerColor: 'CMY+K',
    healthScore: 40,
    warrantyStart: '10-Nov-2024',
    warrantyEnd: '09-Nov-2026',
    warrantyVendor: 'Epson India',
    amcStart: null,
    amcEnd: null,
    amcVendor: 'N/A',
    amcCost: 'N/A',
    performanceScore: 52,
    totalPages: 9400,
    monthlyPrints: 800,
    colorPrints: 500,
    monoPrints: 300,
    duplex: 120,
    errorRate: '5.8%',
    downtime: '22 hrs',
    serviceHistory: [],
    maintenanceHistory: [],
    repairRecords: [],
    partsReplacement: [],
    issueHistory: [
      { ticket: 'TKT-0701', issue: 'Ink head clogged', priority: 'Critical', engineer: 'Unassigned', resolution: 'Pending', status: 'Open' },
    ],
    documents: {
      invoice: true, warranty: false, manuals: true,
      serviceReports: 0, repairBills: 0, images: 1, videos: 0,
    },
    activityTimeline: [
      { date: '15-Nov-2024', activity: 'Installation', user: 'Admin', description: 'Printer installed and set up.' },
    ],
  },
];

// ─── Helper Components ─────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Inactive: 'bg-red-100 text-red-700 border-red-200',
    Maintenance: 'bg-amber-100 text-amber-700 border-amber-200',
    Online: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Offline: 'bg-red-100 text-red-700 border-red-200',
    Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Resolved: 'bg-blue-100 text-blue-700 border-blue-200',
    Pending: 'bg-amber-100 text-amber-700 border-amber-200',
    Open: 'bg-red-100 text-red-700 border-red-200',
    High: 'bg-orange-100 text-orange-700 border-orange-200',
    Critical: 'bg-red-100 text-red-700 border-red-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  return (
    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${map[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  );
};

const SectionHeader = ({ icon: Icon, title, color = 'indigo' }) => (
  <div className={`flex items-center gap-2 px-4 py-3 bg-${color}-50 border-b border-${color}-100`}>
    <Icon className={`w-4 h-4 text-${color}-600`} />
    <h3 className={`text-sm font-bold text-${color}-800 uppercase tracking-wide`}>{title}</h3>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex border-b border-gray-100 last:border-0">
    <div className="w-1/2 px-4 py-2.5 text-sm text-gray-500 font-medium bg-gray-50/60">{label}</div>
    <div className="w-1/2 px-4 py-2.5 text-sm text-gray-900 font-semibold">{value}</div>
  </div>
);

const TonerBar = ({ level }) => {
  const color = level > 50 ? 'bg-emerald-500' : level > 20 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full transition-all`} style={{ width: `${level}%` }} />
      </div>
      <span className={`text-sm font-bold ${level > 50 ? 'text-emerald-600' : level > 20 ? 'text-amber-600' : 'text-red-600'}`}>{level}%</span>
    </div>
  );
};

const ScoreRing = ({ score, label, color }) => {
  const strokeColor = score > 70 ? '#10b981' : score > 40 ? '#f59e0b' : '#ef4444';
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="76" height="76">
        <circle cx="38" cy="38" r={r} fill="none" stroke="#e5e7eb" strokeWidth="6" />
        <circle cx="38" cy="38" r={r} fill="none" stroke={strokeColor} strokeWidth="6"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          transform="rotate(-90 38 38)" />
        <text x="38" y="43" textAnchor="middle" fontSize="14" fontWeight="700" fill={strokeColor}>{score}</text>
      </svg>
      <span className="text-xs text-gray-500 font-medium">{label}</span>
    </div>
  );
};

const EmptyRow = ({ cols, message }) => (
  <tr>
    <td colSpan={cols} className="text-center py-8 text-gray-400 text-sm italic">{message}</td>
  </tr>
);

// ─── Printer Detail View ───────────────────────────────────────────────────────
const PrinterDetailView = ({ printer, onClose }) => {
  const warrantyDaysLeft = printer.warrantyEnd
    ? Math.ceil((new Date(printer.warrantyEnd.split('-').reverse().join('-')) - new Date()) / 86400000)
    : 0;

  return (
    <div className="mt-4 space-y-4 animate-fade-in">
      {/* ── Header Card ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-5 flex flex-wrap items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Printer className="w-9 h-9 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white truncate">{printer.name}</h2>
            <p className="text-indigo-100 text-sm mt-0.5">{printer.assetId} · {printer.brand} {printer.model} · S/N: {printer.serialNo}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={printer.status} />
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-colors">
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/80 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-colors">
              <QrCode className="w-3.5 h-3.5" /> QR Code
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold rounded-lg transition-colors">
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </div>

        {/* ── Live Status Strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y divide-gray-100">
          {/* Live Status */}
          <div className="p-4 flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500 font-medium">Live Status</span>
            <div className="flex items-center gap-1.5">
              {printer.networkStatus === 'Online'
                ? <Zap className="w-4 h-4 text-emerald-500" />
                : <ZapOff className="w-4 h-4 text-red-500" />}
              <span className={`text-sm font-bold ${printer.networkStatus === 'Online' ? 'text-emerald-600' : 'text-red-600'}`}>
                {printer.networkStatus}
              </span>
            </div>
          </div>
          {/* Toner */}
          <div className="p-4 flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-medium text-center">Toner Level</span>
            <TonerBar level={printer.tonerLevel} />
          </div>
          {/* Health */}
          <div className="p-4 flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500 font-medium">Health Score</span>
            <div className="flex items-center gap-1.5">
              <Activity className={`w-4 h-4 ${printer.healthScore > 70 ? 'text-emerald-500' : printer.healthScore > 40 ? 'text-amber-500' : 'text-red-500'}`} />
              <span className={`text-sm font-bold ${printer.healthScore > 70 ? 'text-emerald-600' : printer.healthScore > 40 ? 'text-amber-600' : 'text-red-600'}`}>
                {printer.healthScore}/100
              </span>
            </div>
          </div>
          {/* Warranty */}
          <div className="p-4 flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500 font-medium">Warranty</span>
            <span className={`text-sm font-bold ${warrantyDaysLeft > 180 ? 'text-emerald-600' : warrantyDaysLeft > 30 ? 'text-amber-600' : 'text-red-600'}`}>
              {warrantyDaysLeft > 0 ? `${warrantyDaysLeft}d left` : 'Expired'}
            </span>
          </div>
          {/* AMC */}
          <div className="p-4 flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500 font-medium">AMC</span>
            <span className="text-sm font-bold text-gray-800">{printer.amcEnd || 'N/A'}</span>
          </div>
          {/* Performance */}
          <div className="p-4 flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500 font-medium">Performance</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-bold text-gray-800">{printer.performanceScore}/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── General + Network Info ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* General Info */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <SectionHeader icon={Printer} title="General Information" color="indigo" />
          <div>
            <InfoRow label="Printer Name" value={printer.name} />
            <InfoRow label="Asset ID" value={printer.assetId} />
            <InfoRow label="Brand" value={printer.brand} />
            <InfoRow label="Model" value={printer.model} />
            <InfoRow label="Printer Type" value={printer.printerType} />
            <InfoRow label="Color" value={printer.color} />
            <InfoRow label="Purchase Date" value={printer.purchaseDate} />
            <InfoRow label="Installation Date" value={printer.installationDate} />
            <InfoRow label="Vendor" value={printer.vendor} />
            <InfoRow label="Department" value={printer.department} />
            <InfoRow label="Location" value={printer.location} />
          </div>
        </div>

        {/* Network Info */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <SectionHeader icon={Wifi} title="Network Information" color="blue" />
          <div>
            <InfoRow label="IP Address" value={printer.ipAddress} />
            <InfoRow label="MAC Address" value={printer.macAddress} />
            <InfoRow label="Host Name" value={printer.hostName} />
            <InfoRow label="Firmware" value={printer.firmware} />
            <InfoRow label="Driver" value={printer.driver} />
            <InfoRow label="Connection" value={printer.connection} />
            <InfoRow label="Network Status" value={
              <StatusBadge status={printer.networkStatus} />
            } />
          </div>
          {/* Warranty & AMC */}
          <div className="mt-0 border-t border-gray-100">
            <SectionHeader icon={Shield} title="Warranty & AMC" color="green" />
            <InfoRow label="Warranty Start" value={printer.warrantyStart} />
            <InfoRow label="Warranty End" value={printer.warrantyEnd} />
            <InfoRow label="Warranty Vendor" value={printer.warrantyVendor} />
            <InfoRow label="AMC Period" value={printer.amcStart ? `${printer.amcStart} – ${printer.amcEnd}` : 'N/A'} />
            <InfoRow label="AMC Vendor" value={printer.amcVendor} />
            <InfoRow label="AMC Cost" value={printer.amcCost} />
          </div>
        </div>
      </div>

      {/* ── Performance Analytics ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader icon={BarChart2} title="Performance Analytics" color="purple" />
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { label: 'Total Pages', value: printer.totalPages.toLocaleString(), icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
            { label: 'Monthly Prints', value: printer.monthlyPrints.toLocaleString(), icon: RefreshCw, color: 'text-blue-600 bg-blue-50' },
            { label: 'Color Prints', value: printer.colorPrints.toLocaleString(), icon: Zap, color: 'text-pink-600 bg-pink-50' },
            { label: 'Mono Prints', value: printer.monoPrints.toLocaleString(), icon: Printer, color: 'text-gray-600 bg-gray-50' },
            { label: 'Duplex', value: printer.duplex.toLocaleString(), icon: ArrowUpDown, color: 'text-teal-600 bg-teal-50' },
            { label: 'Error Rate', value: printer.errorRate, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
            { label: 'Downtime', value: printer.downtime, icon: Clock, color: 'text-amber-600 bg-amber-50' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 bg-gray-50/60">
              <div className={`w-9 h-9 rounded-lg ${color.split(' ')[1]} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${color.split(' ')[0]}`} />
              </div>
              <span className="text-sm font-bold text-gray-900">{value}</span>
              <span className="text-xs text-gray-500 text-center">{label}</span>
            </div>
          ))}
        </div>
        {/* Score rings */}
        <div className="flex gap-8 justify-center pb-5 border-t border-gray-100 pt-4">
          <ScoreRing score={printer.healthScore} label="Health Score" />
          <ScoreRing score={printer.performanceScore} label="Performance" />
        </div>
      </div>

      {/* ── Service History ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader icon={Wrench} title="Service History" color="teal" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                {['Service ID', 'Date', 'Engineer', 'Service Type', 'Cost', 'Duration', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {printer.serviceHistory.length === 0 ? <EmptyRow cols={7} message="No service records found." /> :
                printer.serviceHistory.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 font-medium text-indigo-600">{s.id}</td>
                    <td className="px-4 py-3 text-gray-600">{s.date}</td>
                    <td className="px-4 py-3 text-gray-800">{s.engineer}</td>
                    <td className="px-4 py-3 text-gray-600">{s.type}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{s.cost}</td>
                    <td className="px-4 py-3 text-gray-600">{s.duration}</td>
                    <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Maintenance History ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader icon={Settings} title="Maintenance History" color="amber" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                {['Date', 'Maintenance', 'Engineer', 'Next Due', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {printer.maintenanceHistory.length === 0 ? <EmptyRow cols={5} message="No maintenance records found." /> :
                printer.maintenanceHistory.map((m, i) => (
                  <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 text-gray-600">{m.date}</td>
                    <td className="px-4 py-3 text-gray-800 font-medium">{m.maintenance}</td>
                    <td className="px-4 py-3 text-gray-600">{m.engineer}</td>
                    <td className="px-4 py-3 text-gray-700">{m.nextDue}</td>
                    <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Repair Records ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader icon={Wrench} title="Repair Records" color="red" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                {['Repair ID', 'Complaint', 'Root Cause', 'Engineer', 'Cost', 'Downtime', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {printer.repairRecords.length === 0 ? <EmptyRow cols={7} message="No repair records found." /> :
                printer.repairRecords.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 font-medium text-red-600">{r.id}</td>
                    <td className="px-4 py-3 text-gray-800">{r.complaint}</td>
                    <td className="px-4 py-3 text-gray-600">{r.rootCause}</td>
                    <td className="px-4 py-3 text-gray-800">{r.engineer}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{r.cost}</td>
                    <td className="px-4 py-3 text-gray-600">{r.downtime}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Part Replacement ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader icon={Package} title="Part Replacement" color="orange" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                {['Part', 'Old Serial', 'New Serial', 'Cost', 'Vendor', 'Warranty', 'Date'].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {printer.partsReplacement.length === 0 ? <EmptyRow cols={7} message="No part replacement records found." /> :
                printer.partsReplacement.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{p.part}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.oldSerial}</td>
                    <td className="px-4 py-3 text-gray-800 font-mono text-xs">{p.newSerial}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{p.cost}</td>
                    <td className="px-4 py-3 text-gray-600">{p.vendor}</td>
                    <td className="px-4 py-3 text-gray-600">{p.warranty}</td>
                    <td className="px-4 py-3 text-gray-600">{p.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Issue History ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader icon={AlertTriangle} title="Issue History" color="rose" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
              <tr>
                {['Ticket', 'Issue', 'Priority', 'Assigned Engineer', 'Resolution', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {printer.issueHistory.length === 0 ? <EmptyRow cols={6} message="No issue records found." /> :
                printer.issueHistory.map(iss => (
                  <tr key={iss.ticket} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 font-medium text-rose-600">{iss.ticket}</td>
                    <td className="px-4 py-3 text-gray-800">{iss.issue}</td>
                    <td className="px-4 py-3"><StatusBadge status={iss.priority} /></td>
                    <td className="px-4 py-3 text-gray-700">{iss.engineer}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{iss.resolution}</td>
                    <td className="px-4 py-3"><StatusBadge status={iss.status} /></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Documents ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader icon={FileText} title="Documents" color="sky" />
        <div className="p-4 flex flex-wrap gap-3">
          {[
            { label: 'Invoice', has: printer.documents.invoice, icon: FileText },
            { label: 'Warranty Card', has: printer.documents.warranty, icon: Shield },
            { label: 'Manuals', has: printer.documents.manuals, icon: FileText },
            { label: `Service Reports (${printer.documents.serviceReports})`, has: printer.documents.serviceReports > 0, icon: Wrench },
            { label: `Repair Bills (${printer.documents.repairBills})`, has: printer.documents.repairBills > 0, icon: FileText },
            { label: `Images (${printer.documents.images})`, has: printer.documents.images > 0, icon: Image },
            { label: `Videos (${printer.documents.videos})`, has: printer.documents.videos > 0, icon: Video },
          ].map(({ label, has, icon: Icon }) => (
            <button
              key={label}
              disabled={!has}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${has
                  ? 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100 cursor-pointer'
                  : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {has && <Download className="w-3.5 h-3.5 ml-1 opacity-60" />}
            </button>
          ))}
        </div>
      </div>

      {/* ── Activity Timeline ── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <SectionHeader icon={Clock} title="Activity Timeline" color="violet" />
        <div className="p-5">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-5">
              {printer.activityTimeline.map((ev, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center shrink-0 relative z-10">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div className="flex-1 pb-1">
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-gray-900">{ev.activity}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">{ev.date}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <User className="w-3 h-3" />{ev.user}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Close button */}
      <div className="flex justify-end pb-2">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-xl transition-colors"
        >
          <EyeOff className="w-4 h-4" /> Collapse Details
        </button>
      </div>
    </div>
  );
};

// ─── Main PrinterList Component ────────────────────────────────────────────────
const PrinterList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = PRINTERS.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.assetId.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const selectedPrinter = PRINTERS.find(p => p.id === selectedId);

  const handleSelect = (id) => {
    setSelectedId(prev => (prev === id ? null : id));
    if (selectedId !== id) {
      setTimeout(() => {
        document.getElementById('printer-detail-view')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const statusCounts = PRINTERS.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Printers', value: PRINTERS.length, color: 'from-indigo-500 to-blue-500', icon: Printer },
          { label: 'Active', value: statusCounts['Active'] || 0, color: 'from-emerald-500 to-teal-500', icon: CheckCircle },
          { label: 'Maintenance', value: statusCounts['Maintenance'] || 0, color: 'from-amber-500 to-orange-500', icon: Wrench },
          { label: 'Inactive', value: statusCounts['Inactive'] || 0, color: 'from-red-500 to-rose-500', icon: XCircle },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-white shadow-sm`}>
            <div className="flex items-center justify-between mb-2">
              <Icon className="w-5 h-5 opacity-80" />
              <span className="text-2xl font-bold">{value}</span>
            </div>
            <p className="text-sm font-medium opacity-90">{label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2.5 border border-gray-200 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by name, asset ID, brand, department..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            {['All', 'Active', 'Maintenance', 'Inactive'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${statusFilter === s
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Printer Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-600" /> Printer Details
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-semibold">
            {filtered.length} of {PRINTERS.length} printers
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 font-semibold">Image</th>
                <th className="px-4 py-3 font-semibold">Printer Name</th>
                <th className="px-4 py-3 font-semibold">Asset ID</th>
                <th className="px-4 py-3 font-semibold">Brand</th>
                <th className="px-4 py-3 font-semibold">Model</th>
                <th className="px-4 py-3 font-semibold">Serial No</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-10 text-gray-400 italic">No printers found.</td></tr>
              )}
              {filtered.map(p => (
                <React.Fragment key={p.id}>
                  <tr
                    className={`transition-colors cursor-pointer ${selectedId === p.id
                        ? 'bg-indigo-50 border-l-4 border-indigo-500'
                        : 'hover:bg-gray-50/80 border-l-4 border-transparent'
                      }`}
                    onClick={() => handleSelect(p.id)}
                  >
                    {/* Image */}
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center border border-indigo-100">
                        <Printer className="w-5 h-5 text-indigo-500" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">{p.name}</div>
                      <div className="text-xs text-gray-400">{p.department} · {p.location}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-indigo-600 font-semibold">{p.assetId}</td>
                    <td className="px-4 py-3 text-gray-700">{p.brand}</td>
                    <td className="px-4 py-3 text-gray-700">{p.model}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{p.serialNo}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={e => { e.stopPropagation(); handleSelect(p.id); }}
                          className={`p-1.5 rounded-lg transition-colors ${selectedId === p.id
                              ? 'bg-indigo-100 text-indigo-600'
                              : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                            }`}
                          title="View Details"
                        >
                          {selectedId === p.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <button onClick={e => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="QR Code">
                          <QrCode className="w-4 h-4" />
                        </button>
                        <button onClick={e => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={e => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button onClick={e => e.stopPropagation()} className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail View (inline, below the table) */}
      {selectedPrinter && (
        <div id="printer-detail-view">
          <PrinterDetailView
            printer={selectedPrinter}
            onClose={() => setSelectedId(null)}
          />
        </div>
      )}
    </div>
  );
};

export default PrinterList;
