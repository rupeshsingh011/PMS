import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Building2, Phone, MapPin, CreditCard, FileText, StickyNote, ArrowLeft, Edit,
  Users, Printer, Activity, FileSpreadsheet, FileCheck, ShieldAlert
} from 'lucide-react';
import PageHeader from '../common/PageHeader';

// Use same mock data for consistency
const MOCK_CLIENTS = {
  'CL-001': {
    clientCode: 'CLT-2024-001', clientName: 'John Doe', companyName: 'Acme Corp',
    clientType: 'business', industry: 'Technology', gstNumber: '22AAAAA0000A1Z5',
    panNumber: 'AAAPL1234C', companyRegNo: 'U74999MH2020PTC001', clientStatus: 'active',
    customerSince: '2024-01-15',
    primaryContact: 'John Doe', designation: 'CTO', email: 'john@acme.com',
    alternateEmail: 'accounts@acme.com', mobile: '+91 9876543210', alternateMobile: '+91 9876543211',
    officePhone: '022-12345678', website: 'https://acme.com', preferredComm: 'email',
    address1: '101, Business Park', address2: 'Andheri East', city: 'Mumbai',
    state: 'Maharashtra', country: 'India', postalCode: '400069',
    paymentTerms: 'net30', creditLimit: '500000', currency: 'INR',
    paymentMethod: 'bank_transfer', taxId: 'TAX-001', billingContact: 'Jane Finance',
    billingEmail: 'billing@acme.com', billingPhone: '+91 9876500000', outstandingBalance: '45000',
    accountStatus: 'active', notes: 'Key enterprise client. Priority support required.',
    documents: ['logo', 'gst', 'pan', 'regCert', 'agreement']
  }
};

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-300
      ${active
        ? 'border-blue-600 text-blue-700 bg-blue-50/50'
        : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-200'
      }`}
  >
    <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
    {label}
  </button>
);

const DetailItem = ({ label, value }) => (
  <div className="mb-5 group">
    <dt className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 group-hover:text-blue-500 transition-colors duration-300">{label}</dt>
    <dd className="text-sm text-gray-800 font-medium">{value || <span className="text-gray-300 italic">Not provided</span>}</dd>
  </div>
);

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clientData = MOCK_CLIENTS[id] || MOCK_CLIENTS['CL-001']; // fallback for demo
  const [activeTab, setActiveTab] = useState('company');

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader
          title="Client Profile"
          breadcrumbs={[
            { name: 'Clients', path: '/admin/clients' },
            { name: clientData.companyName }
          ]}
        />
        <div className="flex gap-3">
          <button onClick={() => navigate('/admin/clients')} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 font-medium transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-all shadow-lg shadow-blue-500/30">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-white shadow-2xl bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900 border border-slate-700">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 z-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 drop-shadow-md">{clientData.companyName}</h1>
            <p className="text-blue-100 text-sm flex flex-wrap items-center gap-3">
              <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-lg text-xs font-medium tracking-wide">
                {clientData.clientCode}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="font-medium tracking-wide">{clientData.industry}</span>
            </p>
          </div>
          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 mt-4 sm:mt-0">
            <div className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-lg bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
              Active Account
            </div>
            <span className="text-blue-200/80 text-xs font-medium">Partner since {clientData.customerSince}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-100">
          <TabButton active={activeTab === 'company'} icon={Building2} label="Company Info" onClick={() => setActiveTab('company')} />
          <TabButton active={activeTab === 'contacts'} icon={Users} label="Contact Persons" onClick={() => setActiveTab('contacts')} />
          <TabButton active={activeTab === 'branches'} icon={MapPin} label="Branches" onClick={() => setActiveTab('branches')} />
          <TabButton active={activeTab === 'printers'} icon={Printer} label="Installed Printers" onClick={() => setActiveTab('printers')} />
          <TabButton active={activeTab === 'sales'} icon={Activity} label="Sales History" onClick={() => setActiveTab('sales')} />
          <TabButton active={activeTab === 'service'} icon={ShieldAlert} label="Service History" onClick={() => setActiveTab('service')} />
          <TabButton active={activeTab === 'payments'} icon={CreditCard} label="Payment History" onClick={() => setActiveTab('payments')} />
          <TabButton active={activeTab === 'amc'} icon={FileCheck} label="AMC Details" onClick={() => setActiveTab('amc')} />
          <TabButton active={activeTab === 'docs'} icon={FileSpreadsheet} label="Documents" onClick={() => setActiveTab('docs')} />
          <TabButton active={activeTab === 'notes'} icon={StickyNote} label="Notes" onClick={() => setActiveTab('notes')} />
        </div>

        {/* Tab Content Area */}
        <div className="p-6 sm:p-8 flex-1 bg-gray-50/30">

          {activeTab === 'company' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><Building2 className="w-5 h-5 text-blue-500" /> Business Details</h3>
                <div className="grid grid-cols-2 gap-x-4">
                  <DetailItem label="Client Name" value={clientData.clientName} />
                  <DetailItem label="Client Type" value={<span className="capitalize">{clientData.clientType}</span>} />
                  <DetailItem label="GST Number" value={<span className="font-mono bg-gray-50 px-2 py-1 rounded border">{clientData.gstNumber}</span>} />
                  <DetailItem label="PAN Number" value={<span className="font-mono bg-gray-50 px-2 py-1 rounded border">{clientData.panNumber}</span>} />
                  <DetailItem label="Company Reg. No." value={clientData.companyRegNo} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><CreditCard className="w-5 h-5 text-violet-500" /> Financial Info</h3>
                <div className="grid grid-cols-2 gap-x-4">
                  <DetailItem label="Payment Terms" value={<span className="capitalize">{clientData.paymentTerms?.replace('net', 'Net ')} Days</span>} />
                  <DetailItem label="Credit Limit" value={<span className="font-mono font-medium">{clientData.currency} {Number(clientData.creditLimit).toLocaleString()}</span>} />
                  <DetailItem label="Outstanding Bal." value={<span className="font-mono font-bold text-red-600">{clientData.currency} {Number(clientData.outstandingBalance).toLocaleString()}</span>} />
                  <DetailItem label="Tax ID" value={clientData.taxId} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><Users className="w-5 h-5 text-emerald-500" /> Contact Directory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{clientData.primaryContact}</h4>
                      <p className="text-sm text-gray-600">{clientData.designation}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Primary</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600 flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /> {clientData.mobile}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /> {clientData.email}</p>
                  </div>
                </div>
                <div className="p-4 border border-gray-200 rounded-xl hover:border-indigo-200 transition-colors cursor-pointer group flex flex-col items-center justify-center text-center h-full min-h-[160px]">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="font-medium text-indigo-600">Add New Contact</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'branches' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><MapPin className="w-5 h-5 text-rose-500" /> Registered Branches</h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Add Branch</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 border border-emerald-100 bg-emerald-50/30 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                  <h4 className="font-bold text-gray-900 mb-1">Head Office (HQ)</h4>
                  <p className="text-sm text-gray-600 mb-4">{clientData.address1}, {clientData.address2}<br />{clientData.city}, {clientData.state}</p>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded uppercase">Active</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {['GST Certificate', 'PAN Card', 'Service Agreement', 'Company Logo'].map((doc, i) => (
                <div key={i} className="group relative overflow-hidden flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{doc}</p>
                    <p className="text-xs mt-1 font-medium text-emerald-600">Available to view</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 h-full min-h-[300px] animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><StickyNote className="w-5 h-5 text-amber-500" /> CRM Notes</h3>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{clientData.notes}</p>
            </div>
          )}

          {['printers', 'sales', 'service', 'payments', 'amc'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Records Found</h3>
              <p className="text-gray-500 text-sm max-w-sm">There is currently no {activeTab} data available for this client.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
