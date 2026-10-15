import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase, AlertCircle, Wrench, Clock,
  CheckCircle2, Users, Calendar, Activity, 
  MessageSquare, History, PhoneCall, CheckCircle, TrendingUp, Bell, Settings
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// --- Mock Data ---
const ticketStatusData = [
  { name: 'Open', value: 45, color: '#F59E0B' }, // amber-500
  { name: 'In Progress', value: 120, color: '#3B82F6' }, // blue-500
  { name: 'Resolved', value: 380, color: '#10B981' }, // emerald-500
  { name: 'Closed', value: 85, color: '#6B7280' }, // gray-500
];

const recentAlerts = [
  { id: 1, action: 'SLA Breach', details: 'Ticket TKT-1045 has breached the 4-hour resolution SLA.', time: '10 mins ago', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 2, action: 'New Ticket Raised', details: 'Printer offline at TechCorp HQ.', time: '1 hour ago', icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 3, action: 'Engineer Assigned', details: 'Raj Kumar dispatched to Globex Inc.', time: '2 hours ago', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 4, action: 'Ticket Resolved', details: 'Paper jam issue fixed at Acme Corp.', time: '3 hours ago', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const notifications = [
  { id: 1, text: 'Customer feedback received: 5/5 stars for Raj Kumar.', type: 'success', time: '30 mins ago' },
  { id: 2, text: 'Low stock alert: Fuser units running low.', type: 'warning', time: '4 hours ago' },
  { id: 3, text: 'System maintenance scheduled for tonight at 12 AM.', type: 'info', time: '1 day ago' },
];

// --- Components ---
const StatCard = ({ title, value, icon: Icon, iconColor, subtitle }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-3">
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{title}</h3>
    <div className="flex items-end gap-2 mt-1">
      <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
      {subtitle && <span className="text-xs font-medium text-gray-400 mb-1">{subtitle}</span>}
    </div>
  </div>
);

const QuickActionButton = ({ icon: Icon, label, onClick, colorClass }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
  >
    <Icon className={`w-8 h-8 mb-3 ${colorClass.replace('bg-', 'text-')} opacity-80 group-hover:opacity-100 transition-opacity`} />
    <span className="text-sm font-medium text-gray-700 text-center leading-tight">{label}</span>
  </button>
);

const ManagementDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Management Overview</h1>
          </div>
          <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
            <button 
              onClick={() => navigate('/admin/management/tickets')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors shadow-sm"
            >
              All Tickets
            </button>
            <button 
              onClick={() => navigate('/admin/management/tickets/create')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-sm font-medium transition-colors shadow-sm"
            >
              Raise Ticket
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          Quick Links
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <QuickActionButton icon={Users} label="Engineers" onClick={() => navigate('/admin/management/engineers')} colorClass="bg-blue-600 text-blue-600" />
          <QuickActionButton icon={Calendar} label="Field Visits" onClick={() => navigate('/admin/management/field-visits')} colorClass="bg-emerald-600 text-emerald-600" />
          <QuickActionButton icon={Wrench} label="Preventive" onClick={() => navigate('/admin/management/preventive')} colorClass="bg-purple-600 text-purple-600" />
          <QuickActionButton icon={Settings} label="Spare Parts" onClick={() => navigate('/admin/management/parts')} colorClass="bg-amber-500 text-amber-500" />
          <QuickActionButton icon={PhoneCall} label="Remote Support" onClick={() => navigate('/admin/management/remote')} colorClass="bg-indigo-600 text-indigo-600" />
          <QuickActionButton icon={Clock} label="SLA Tracking" onClick={() => navigate('/admin/management/sla')} colorClass="bg-rose-600 text-rose-600" />
          <QuickActionButton icon={MessageSquare} label="Feedback" onClick={() => navigate('/admin/management/feedback')} colorClass="bg-teal-600 text-teal-600" />
          <QuickActionButton icon={History} label="Closed" onClick={() => navigate('/admin/management/closed')} colorClass="bg-gray-600 text-gray-600" />
        </div>
      </div>

      {/* Overview Stats */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Open Tickets" value="45" icon={AlertCircle} iconColor="text-amber-500" />
          <StatCard title="In Progress" value="120" icon={Wrench} iconColor="text-blue-500" />
          <StatCard title="Resolved Today" value="34" icon={CheckCircle} iconColor="text-emerald-500" />
          <StatCard title="Engineers on Field" value="12" icon={Users} iconColor="text-indigo-500" />
          <StatCard title="SLA Breaches" value="2" icon={Clock} iconColor="text-red-500" />
        </div>
      </div>


    </div>
  );
};

export default ManagementDashboard;
