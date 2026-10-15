import React from 'react';
import {
  Printer, Wrench, CreditCard, Bell,
  CheckCircle2, Clock, AlertCircle, ArrowRight,
  FileText, Search, Download, Plus, Calendar, User,
  RotateCcw, Filter, BarChart2, ChevronDown,
  Users, IndianRupee, Wallet, UserCog, Activity, CalendarClock,
  TrendingUp, FilePlus, PenTool, PhoneCall, Receipt, Settings
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

// --- Mock Data ---

const printerStatusData = [
  { name: 'Active', value: 450, color: '#10B981' }, // emerald-500
  { name: 'Under Maintenance', value: 35, color: '#F59E0B' }, // amber-500
  { name: 'Offline/Faulty', value: 15, color: '#EF4444' }, // red-500
];

const recentActivities = [
  { id: 1, action: 'Sale Generated', details: 'Invoice #INV-2023-001 for TechCorp', time: '10 mins ago', icon: Receipt, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 2, action: 'Client Added', details: 'Nexus Industries joined.', time: '1 hour ago', icon: User, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 3, action: 'Ticket Raised', details: 'Paper jam in HR department printer.', time: '2 hours ago', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 4, action: 'Payment Received', details: '₹12,500 from Global Solutions', time: '3 hours ago', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
];

const notifications = [
  { id: 1, text: 'Warranty expiring soon for 5 printers at Apex Corp.', type: 'warning', time: '2 hours ago' },
  { id: 2, text: 'Payment of ₹4,500 received successfully.', type: 'success', time: '1 day ago' },
  { id: 3, text: 'Technician assigned for repair request SRV-090.', type: 'info', time: '2 days ago' },
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


const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <BarChart2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
            <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin" className="w-8 h-8 rounded-full border border-gray-200 shadow-sm" />
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <QuickActionButton icon={User} label="Add Client" colorClass="bg-blue-600 text-blue-600" />
          <QuickActionButton icon={TrendingUp} label="Create Sale" colorClass="bg-emerald-600 text-emerald-600" />
          <QuickActionButton icon={Printer} label="Register Printer" colorClass="bg-purple-600 text-purple-600" />
          <QuickActionButton icon={AlertCircle} label="Raise Ticket" colorClass="bg-amber-500 text-amber-500" />
          <QuickActionButton icon={Receipt} label="Generate Invoice" colorClass="bg-indigo-600 text-indigo-600" />
        </div>
      </div>

      {/* Business Overview Stats */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-indigo-600" />
          Business Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Today's Sales" value="₹24,500" icon={TrendingUp} iconColor="text-emerald-500" />
          <StatCard title="Today's Collections" value="₹18,200" icon={Wallet} iconColor="text-emerald-600" />
          <StatCard title="Monthly Revenue" value="₹4.2L" icon={IndianRupee} iconColor="text-indigo-500" />
          <StatCard title="Pending Payments" value="₹1.5L" icon={CreditCard} iconColor="text-red-500" />
          <StatCard title="Active Clients" value="124" icon={Users} iconColor="text-blue-500" />

          <StatCard title="Installed Printers" value="450" icon={Printer} iconColor="text-purple-500" />
          <StatCard title="Pending Installs" value="8" icon={Clock} iconColor="text-amber-500" />
          <StatCard title="Open Tickets" value="12" icon={AlertCircle} iconColor="text-orange-500" />
          <StatCard title="Engineers On Field" value="5" icon={UserCog} iconColor="text-cyan-500" />
          <StatCard title="AMC Expiring Soon" value="15" icon={CalendarClock} iconColor="text-rose-500" />
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Printer Status Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-400" />
            Printer Status Summary
          </h2>
          <div className="h-64 flex flex-col justify-center">
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

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            Recent Activities
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
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
            View All Activities
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-400" />
            Notifications
          </h2>
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-gray-50 transition-colors">
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

export default Dashboard;
