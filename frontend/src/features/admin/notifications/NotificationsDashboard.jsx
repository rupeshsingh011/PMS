import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, ShoppingCart, Calendar, Wrench, CheckCircle, 
  Clock, ShieldAlert, CreditCard, FileText, UserPlus, AlertTriangle
} from 'lucide-react';

const QuickLink = ({ icon: Icon, label, path, colorClass }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
    >
      <Icon className={`w-8 h-8 mb-3 ${colorClass} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`} />
      <span className="text-sm font-medium text-gray-700 text-center leading-snug">{label}</span>
    </button>
  );
};

const NotificationsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600 shadow-inner">
            <Bell className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications Center</h1>
            <p className="text-sm text-gray-500 font-medium">Manage and view all your system alerts.</p>
          </div>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-600" />
          Notification Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <QuickLink icon={ShoppingCart} label="New Sale" path="/admin/notifications/new-sale" colorClass="text-emerald-500" />
          <QuickLink icon={Calendar} label="Installation Due" path="/admin/notifications/installation-due" colorClass="text-blue-500" />
          <QuickLink icon={Wrench} label="Ticket Assigned" path="/admin/notifications/ticket-assigned" colorClass="text-indigo-500" />
          <QuickLink icon={CheckCircle} label="Ticket Closed" path="/admin/notifications/ticket-closed" colorClass="text-gray-500" />
          <QuickLink icon={Clock} label="AMC Expiry" path="/admin/notifications/amc-expiry" colorClass="text-amber-500" />
          <QuickLink icon={ShieldAlert} label="Warranty Expiry" path="/admin/notifications/warranty-expiry" colorClass="text-rose-500" />
          <QuickLink icon={CreditCard} label="Payment Due" path="/admin/notifications/payment-due" colorClass="text-red-600" />
          <QuickLink icon={FileText} label="Invoice Generated" path="/admin/notifications/invoice-generated" colorClass="text-blue-600" />
          <QuickLink icon={UserPlus} label="New Client" path="/admin/notifications/new-client" colorClass="text-teal-500" />
          <QuickLink icon={AlertTriangle} label="System Alerts" path="/admin/notifications/system-alerts" colorClass="text-orange-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center py-12">
        <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-gray-900">Select a category to view notifications</h2>
        <p className="text-gray-500 text-sm mt-2">Filter and manage alerts efficiently from the menu above.</p>
      </div>
    </div>
  );
};

export default NotificationsDashboard;
