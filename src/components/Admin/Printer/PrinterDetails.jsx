import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Printer, ArrowLeft, Edit, Info, ShieldCheck, Calendar, Activity, 
  BarChart2, Droplet, FileCheck, QrCode
} from 'lucide-react';
import PageHeader from '../common/PageHeader';

const MOCK_PRINTER = {
  id: 'PRT-9092',
  model: 'LaserJet Pro M404dn',
  brand: 'HP',
  serialNumber: 'VNF3G01234',
  barcode: '889894331234',
  status: 'Active',
  assignedClient: 'Acme Corp',
  installDate: '2023-11-15',
  warrantyStatus: 'Under Warranty',
  warrantyEndDate: '2025-11-14',
  meterReading: '45,210',
  amcStatus: 'Active',
  tonerLevel: '45%',
  drumLife: '82%'
};

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-300
      ${active 
        ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' 
        : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-200'
      }`}
  >
    <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-gray-400'}`} />
    {label}
  </button>
);

const DetailItem = ({ label, value }) => (
  <div className="mb-5 group">
    <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 group-hover:text-indigo-500 transition-colors duration-300">{label}</dt>
    <dd className="text-sm text-gray-800 font-medium">{value || <span className="text-gray-300 italic">N/A</span>}</dd>
  </div>
);

const PrinterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const printer = MOCK_PRINTER;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader
          title="Printer Details"
          breadcrumbs={[
            { name: 'Printers', path: '/admin/printers' },
            { name: printer.id }
          ]}
        />
        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition-all shadow-lg shadow-indigo-500/30">
            <Edit className="w-4 h-4" /> Edit Details
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-white shadow-2xl bg-gradient-to-br from-indigo-900 via-slate-800 to-violet-900 border border-slate-700">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 z-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
            <Printer className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 drop-shadow-md">{printer.model}</h1>
            <p className="text-indigo-100 text-sm flex flex-wrap items-center gap-3">
              <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-lg text-xs font-medium tracking-wide">
                {printer.id}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="font-medium tracking-wide">{printer.brand}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="font-medium tracking-wide">SN: {printer.serialNumber}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-100">
          <TabButton active={activeTab === 'info'} icon={Info} label="Information" onClick={() => setActiveTab('info')} />
          <TabButton active={activeTab === 'warranty'} icon={ShieldCheck} label="Warranty" onClick={() => setActiveTab('warranty')} />
        </div>
        <div className="p-6 flex-1 bg-gray-50/30">
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><Printer className="w-5 h-5 text-indigo-500"/> Specifications</h3>
                <div className="grid grid-cols-2 gap-x-4">
                  <DetailItem label="Model" value={printer.model} />
                  <DetailItem label="Brand" value={printer.brand} />
                  <DetailItem label="Serial Number" value={printer.serialNumber} />
                </div>
              </div>
            </div>
          )}
          {activeTab === 'warranty' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500"/> Warranty Details</h3>
              <p className="text-sm text-gray-600">Coverage ends on: <strong className="text-gray-900">{printer.warrantyEndDate}</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PrinterDetails;
