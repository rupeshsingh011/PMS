import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send, CheckCircle2, User, AlertTriangle,
  ShieldCheck, Building
} from 'lucide-react';

const MOCK_CLIENTS = [
  {
    id: 'CL-101',
    name: 'Globex Corporation',
    contactPerson: 'Sarah Jenkins',
    email: 'sarah.j@globex.com',
    phone: '+91 98765 43210',
    address: 'DLF Cyber City, Tower B, 7th Floor, Gurugram',
    slaTier: 'Diamond (2h Response / 4h Fix)',
    printers: [
      { id: 'PRN-8801', model: 'Canon imageRUNNER ADV DX C3835i', serial: 'CAN-880129-DX', location: '7th Fl - HR Wing' },
      { id: 'PRN-8802', model: 'HP LaserJet Enterprise MFP M635', serial: 'HP-635109-M', location: '8th Fl - Finance Bay' },
    ]
  },
  {
    id: 'CL-102',
    name: 'Acme Technologies Ltd',
    contactPerson: 'Vikram Malhotra',
    email: 'vikram@acmetech.in',
    phone: '+91 98111 22334',
    address: 'Connaught Place, Inner Circle, New Delhi',
    slaTier: 'Platinum (4h Response / 8h Fix)',
    printers: [
      { id: 'PRN-7701', model: 'Epson WorkForce Enterprise WF-C20750', serial: 'EPS-770123-WF', location: 'Main Reception' },
      { id: 'PRN-7702', model: 'Canon imageRUNNER 2630i', serial: 'CAN-263098-IR', location: 'Operations Room' }
    ]
  },
  {
    id: 'CL-103',
    name: 'Zenith Logistics Hub',
    contactPerson: 'Ananya Sharma',
    email: 'ananya.s@zenithlogistics.com',
    phone: '+91 97112 34567',
    address: 'Sector 62, Electronic City, Noida',
    slaTier: 'Gold (Next Business Day)',
    printers: [
      { id: 'PRN-6601', model: 'Kyocera TASKalfa 4054i', serial: 'KYO-405400-TK', location: 'Dispatch Office' }
    ]
  }
];

const ENGINEERS = [
  { id: 'ENG-1', name: 'Raj Kumar', territory: 'Gurugram / Cyber City', status: 'Available', activeTickets: 1 },
  { id: 'ENG-2', name: 'Amit Singh', territory: 'Central & South Delhi', status: 'Available', activeTickets: 2 },
  { id: 'ENG-3', name: 'Sunil Verma', territory: 'Noida / Greater Noida', status: 'Busy (On Site)', activeTickets: 4 },
  { id: 'ENG-4', name: 'Pooja Rawat', territory: 'West Delhi & North', status: 'Available', activeTickets: 0 }
];

const ISSUE_CATEGORIES = [
  'Paper Jam & Multi-sheet Feed Issue',
  'Toner Smudge / Streaks / Print Quality Error',
  'Scanner / ADF Optical Unit Failure',
  'Network / Wi-Fi Spooler & Offline Error',
  'Hardware Gear Noise / Fuser Drive Failure',
  'Firmware Crash / Specific Error Code',
  'Scheduled Preventive Maintenance PMS',
  'Other / Unspecified Issue'
];

const CreateTicket = () => {
  const navigate = useNavigate();

  // Form states
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedPrinterSerial, setSelectedPrinterSerial] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [priority, setPriority] = useState('High');
  const [errorCode, setErrorCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedEngineer, setAssignedEngineer] = useState('');
  const [visitSchedule, setVisitSchedule] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const selectedClient = MOCK_CLIENTS.find(c => c.id === selectedClientId);
  const availablePrinters = selectedClient ? selectedClient.printers : [];
  const selectedPrinter = availablePrinters.find(p => p.serial === selectedPrinterSerial);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicket({
      id: newTicketId,
      client: selectedClient?.name || 'Selected Client',
      printer: selectedPrinter ? `${selectedPrinter.model} (${selectedPrinter.serial})` : 'General Equipment',
      priority,
      category: issueCategory,
      engineer: assignedEngineer || 'Auto-dispatch Queue',
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Breadcrumb & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                Service Desk
              </span>
              <span className="text-gray-400 text-sm">/</span>
              <span className="text-xs text-gray-500 font-medium">New Dispatch</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">Create Service Ticket</h1>
          </div>
        </div>

        <button
          onClick={() => navigate('/admin/management/tickets')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors"
        >
          View Ticket List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Client & Equipment */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">1. Client & Equipment Information</h2>
              <p className="text-xs text-gray-500">Select the customer account and the malfunctioning machine.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Client selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Select Client <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedClientId}
                onChange={(e) => {
                  setSelectedClientId(e.target.value);
                  setSelectedPrinterSerial('');
                }}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">-- Choose Corporate Client --</option>
                {MOCK_CLIENTS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Printer selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Impacted Printer Asset <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedPrinterSerial}
                onChange={(e) => setSelectedPrinterSerial(e.target.value)}
                required
                disabled={!selectedClientId}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">{selectedClientId ? '-- Select Printer / S/N --' : 'Select client first'}</option>
                {availablePrinters.map((p) => (
                  <option key={p.serial} value={p.serial}>
                    {p.model} - S/N: {p.serial} ({p.location})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Client Details Preview Card */}
          {selectedClient && (
            <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div>
                <div className="font-bold text-indigo-900 text-sm mb-1">{selectedClient.name}</div>
                <div className="text-gray-600">Contact: <span className="font-medium text-gray-800">{selectedClient.contactPerson}</span> ({selectedClient.phone})</div>
                <div className="text-gray-500 mt-0.5">{selectedClient.address}</div>
              </div>
              <div className="flex items-center gap-2 self-start md:self-auto bg-white px-3 py-2 rounded-lg border border-indigo-200 text-indigo-700 font-semibold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>{selectedClient.slaTier}</span>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Issue Diagnostic & Severity */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">2. Problem Diagnostic & Priority SLA</h2>
              <p className="text-xs text-gray-500">Provide the error code, symptoms, and urgency tier.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Issue Category <span className="text-red-500">*</span>
              </label>
              <select
                value={issueCategory}
                onChange={(e) => setIssueCategory(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">-- Select Category --</option>
                {ISSUE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Machine Error Code
              </label>
              <input
                type="text"
                value={errorCode}
                onChange={(e) => setErrorCode(e.target.value)}
                placeholder="e.g. E000-0001, 50.4 Fuser"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                SLA Priority Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { level: 'Critical', color: 'border-rose-400 bg-rose-50 text-rose-700', active: 'ring-2 ring-rose-500' },
                  { level: 'High', color: 'border-amber-400 bg-amber-50 text-amber-700', active: 'ring-2 ring-amber-500' },
                  { level: 'Normal', color: 'border-emerald-400 bg-emerald-50 text-emerald-700', active: 'ring-2 ring-emerald-500' }
                ].map((p) => (
                  <button
                    key={p.level}
                    type="button"
                    onClick={() => setPriority(p.level)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all text-center ${
                      priority === p.level ? `${p.color} ${p.active}` : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {p.level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Issue Headline / Summary <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Heavy paper jam in Duplex Unit with loud gear grinding noise"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Detailed Diagnostic Notes & Steps Already Tried
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Client noticed repeated jamming on 80 GSM paper after printing 20 pages. Power cycled twice, error persists on Tray 2."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Step 3: Engineer Assignment & Scheduling */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">3. Field Dispatch & Engineer Scheduling</h2>
              <p className="text-xs text-gray-500">Assign a qualified field engineer and set arrival window.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Assign Field Engineer
              </label>
              <select
                value={assignedEngineer}
                onChange={(e) => setAssignedEngineer(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="">-- Auto Assign Based on Territory --</option>
                {ENGINEERS.map((eng) => (
                  <option key={eng.id} value={eng.name}>
                    {eng.name} ({eng.territory}) - {eng.status} [{eng.activeTickets} active]
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Requested Visit Time Slot
              </label>
              <input
                type="datetime-local"
                value={visitSchedule}
                onChange={(e) => setVisitSchedule(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/management/tickets')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-indigo-500/20 text-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Dispatch & Create Ticket
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {submittedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Ticket Created Successfully</span>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{submittedTicket.id}</h3>
              <p className="text-xs text-gray-500 mt-1">Dispatched to field service queue with priority notification sent.</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 text-left text-xs space-y-2 border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Client:</span>
                <span className="font-semibold text-gray-800">{submittedTicket.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Asset:</span>
                <span className="font-semibold text-gray-800">{submittedTicket.printer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Priority:</span>
                <span className="font-bold text-rose-600">{submittedTicket.priority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Engineer:</span>
                <span className="font-semibold text-indigo-600">{submittedTicket.engineer}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => navigate('/admin/management/tickets')}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm cursor-pointer"
              >
                Go to Ticket List
              </button>
              <button
                onClick={() => {
                  setSubmittedTicket(null);
                  setTitle('');
                  setDescription('');
                  setErrorCode('');
                  setSelectedPrinterSerial('');
                }}
                className="w-full py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-xs font-semibold transition-colors"
              >
                Create Another Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTicket;
