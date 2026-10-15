import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Edit, MessageSquare, User, AlertCircle, Clock, Paperclip, CheckCircle
} from 'lucide-react';
import PageHeader from '../common/PageHeader';

const MOCK_TICKET = {
  id: 'TKT-1045',
  client: 'Globex Inc',
  issue: 'Printer Offline / Network Drop',
  priority: 'High',
  status: 'In Progress',
  assignedEngineer: 'Raj Kumar',
  createdDate: '2023-11-15 10:30 AM',
  description: 'The Canon IR Adv 4545 in the HR department keeps dropping off the network every 30 minutes. Needs urgent inspection.'
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
    <dd className="text-sm text-gray-800 font-medium">{value || <span className="text-gray-300 italic">N/A</span>}</dd>
  </div>
);

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('complaint');
  const ticket = MOCK_TICKET;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader
          title="Ticket Details"
          breadcrumbs={[
            { name: 'Management', path: '/admin/management' },
            { name: 'Tickets', path: '/admin/management/tickets' },
            { name: ticket.id }
          ]}
        />
        <div className="flex gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-all shadow-lg shadow-blue-500/30">
            <Edit className="w-4 h-4" /> Update Ticket
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-white shadow-2xl bg-gradient-to-br from-blue-900 via-slate-800 to-cyan-900 border border-slate-700">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 z-10">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 drop-shadow-md">{ticket.issue}</h1>
            <p className="text-blue-100 text-sm flex flex-wrap items-center gap-3">
              <span className="bg-white/10 border border-white/10 px-3 py-1 rounded-lg text-xs font-medium tracking-wide">
                {ticket.id}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="font-medium tracking-wide">{ticket.client}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="font-medium tracking-wide">Assigned: {ticket.assignedEngineer}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col flex-1">
        <div className="flex overflow-x-auto hide-scrollbar border-b border-gray-100">
          <TabButton active={activeTab === 'complaint'} icon={MessageSquare} label="Complaint" onClick={() => setActiveTab('complaint')} />
          <TabButton active={activeTab === 'engineer'} icon={User} label="Assigned Engineer" onClick={() => setActiveTab('engineer')} />
          <TabButton active={activeTab === 'priority'} icon={AlertCircle} label="Priority" onClick={() => setActiveTab('priority')} />
          <TabButton active={activeTab === 'timeline'} icon={Clock} label="Timeline" onClick={() => setActiveTab('timeline')} />
          <TabButton active={activeTab === 'attachments'} icon={Paperclip} label="Attachments" onClick={() => setActiveTab('attachments')} />
          <TabButton active={activeTab === 'resolution'} icon={CheckCircle} label="Resolution" onClick={() => setActiveTab('resolution')} />
        </div>
        <div className="p-6 flex-1 bg-gray-50/30">
          {activeTab === 'complaint' && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-3xl">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-blue-500"/> Complaint Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <DetailItem label="Client" value={ticket.client} />
                <DetailItem label="Created At" value={ticket.createdDate} />
                <div className="sm:col-span-2">
                  <DetailItem label="Description" value={ticket.description} />
                </div>
              </div>
            </div>
          )}
          {activeTab === 'engineer' && (
             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-xl">
               <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><User className="w-5 h-5 text-indigo-500"/> Engineer Details</h3>
               <DetailItem label="Name" value={ticket.assignedEngineer} />
               <DetailItem label="Status" value="On Field" />
             </div>
          )}
          {activeTab === 'priority' && (
             <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-xl">
               <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><AlertCircle className="w-5 h-5 text-amber-500"/> Priority & Status</h3>
               <DetailItem label="Priority Level" value={ticket.priority} />
               <DetailItem label="Current Status" value={ticket.status} />
             </div>
          )}
          {(activeTab === 'timeline' || activeTab === 'attachments' || activeTab === 'resolution') && (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-3xl">
              <p className="text-gray-500 italic">Information for {activeTab} will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TicketDetails;
