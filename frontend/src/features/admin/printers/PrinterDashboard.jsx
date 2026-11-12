import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Printer, Wrench, AlertCircle, Clock,
  CheckCircle2, Box, Calendar, ShieldCheck,
  Activity, Settings, Bell, FileText, FileCheck,
  TrendingUp, Download, CheckCircle
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// --- Mock Data ---
const printerStatusData = [
  { name: 'Online', value: 380, color: '#10B981' }, // emerald-500
  { name: 'Warning', value: 45, color: '#F59E0B' }, // amber-500
  { name: 'Offline', value: 25, color: '#EF4444' }, // red-500
];

const recentAlerts = [
  { id: 1, action: 'Low Toner Alert', details: 'Printer PRT-102 at Globex Inc is at 12% cyan toner.', time: '15 mins ago', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 2, action: 'Maintenance Overdue', details: 'Canon IR Adv 4545 requires scheduled servicing.', time: '2 hours ago', icon: Wrench, color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 3, action: 'Installation Completed', details: 'Epson L3250 successfully installed at TechCorp.', time: '3 hours ago', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 4, action: 'AMC Expiring', details: 'AMC for Acme Corp printers expires in 15 days.', time: '5 hours ago', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

const notifications = [
  { id: 1, text: 'New firmware update available for HP LaserJet M404 models.', type: 'info', time: '1 hour ago' },
  { id: 2, text: 'Printer PRT-103 lost network connectivity.', type: 'error', time: '3 hours ago' },
  { id: 3, text: 'Monthly preventive maintenance schedule generated.', type: 'success', time: '1 day ago' },
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
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </button>
);

const PrinterDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Printer className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Printer Overview</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pr-4 border-r border-gray-200">
            <button 
              onClick={() => navigate('/admin/printers/inventory')}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 text-sm font-medium transition-colors shadow-sm"
            >
              Printer List
            </button>
            <button 
              onClick={() => navigate('/admin/printers/add')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-sm font-medium transition-colors shadow-sm"
            >
              Add Printer
            </button>
          </div>
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
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <QuickActionButton icon={Printer} label="Inventory" onClick={() => navigate('/admin/printers/inventory')} colorClass="bg-blue-600 text-blue-600" />
          <QuickActionButton icon={Box} label="Unassigned" onClick={() => navigate('/admin/printers/unassigned')} colorClass="bg-emerald-600 text-emerald-600" />
          <QuickActionButton icon={Calendar} label="Installations" onClick={() => navigate('/admin/printers/installations')} colorClass="bg-purple-600 text-purple-600" />
          <QuickActionButton icon={ShieldCheck} label="Warranty" onClick={() => navigate('/admin/printers/warranty')} colorClass="bg-amber-500 text-amber-500" />
          <QuickActionButton icon={FileCheck} label="AMC Management" onClick={() => navigate('/admin/printers/amc')} colorClass="bg-indigo-600 text-indigo-600" />
          <QuickActionButton icon={Settings} label="Maintenance" onClick={() => navigate('/admin/printers/maintenance')} colorClass="bg-rose-600 text-rose-600" />
        </div>
      </div>

      {/* Overview Stats */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          Fleet Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Total Printers" value="450" icon={Printer} iconColor="text-indigo-500" />
          <StatCard title="Active & Online" value="380" icon={CheckCircle} iconColor="text-emerald-500" />
          <StatCard title="Offline / Faulty" value="25" icon={AlertCircle} iconColor="text-red-500" />
          <StatCard title="Unassigned Stock" value="45" icon={Box} iconColor="text-blue-500" />
          <StatCard title="Maintenance Due" value="12" icon={Wrench} iconColor="text-amber-500" />
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Printer Status Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-400" />
            Live Health Status
          </h2>
          <div className="h-64 flex flex-col justify-center cursor-pointer" onClick={() => navigate('/admin/printers/health')}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={printerStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {printerStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            Recent Alerts & Activity
          </h2>
          <div className="space-y-4">
            {recentAlerts.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <activity.icon className={`w-5 h-5 mt-0.5 ${activity.color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.details}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors">
            View All Activity
          </button>
        </div>

        {/* System Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-400" />
            System Notifications
          </h2>
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                {notif.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
                {notif.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}
                {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
                {notif.type === 'info' && <Bell className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />}
                <div>
                  <p className="text-sm text-gray-700 leading-snug">{notif.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors">
            Mark all as read
          </button>
        </div>

      </div>
    </div>
  );
};

export default PrinterDashboard;
