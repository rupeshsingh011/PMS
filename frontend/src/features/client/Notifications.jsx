import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, CheckCircle2, AlertTriangle, Wrench,
  CreditCard, Clock, Trash2, Check,
  ArrowRight
} from 'lucide-react';

const initialNotifications = [
  {
    id: 'notif-1',
    category: 'Service & Visits',
    title: 'Technician Dispatched for Printer PRT-005',
    message: 'Senior Field Specialist Rajesh Kumar is en route to Ground Floor Reception for roller replacement. Expected arrival: 02:00 PM.',
    time: '15 mins ago',
    unread: true,
    severity: 'info',
    actionLabel: 'Track Ticket',
    actionLink: '/client/service-request',
    meta: 'Ticket TKT-2026-4491'
  },
  {
    id: 'notif-2',
    category: 'Toner & Supplies',
    title: 'Low Toner Alert: Epson WorkForce Pro (2nd Floor)',
    message: 'Cyan Ink Pack has dropped to 14%. An automated replenishment pack has been allocated for delivery under your Diamond AMC.',
    time: '2 hours ago',
    unread: true,
    severity: 'warning',
    actionLabel: 'View Printer',
    actionLink: '/client/printers',
    meta: 'Asset Tag: AST-MUM-022'
  },
  {
    id: 'notif-3',
    category: 'Billing & Invoices',
    title: 'New Monthly Statement Generated: INV-2026-0511',
    message: 'Invoice for consumables replenishment batch #4 (₹32,400) has been generated and is due on 17 Nov 2026.',
    time: '1 day ago',
    unread: true,
    severity: 'billing',
    actionLabel: 'Review & Pay',
    actionLink: '/client/invoices',
    meta: 'Due in 15 days'
  },
  {
    id: 'notif-4',
    category: 'Billing & Invoices',
    title: 'Payment Acknowledged: Receipt RCP-2026-0941',
    message: 'Remittance of ₹48,500 for Invoice INV-2026-0491 was confirmed. Official GST receipt is now available for download.',
    time: '3 days ago',
    unread: false,
    severity: 'success',
    actionLabel: 'View Receipt',
    actionLink: '/client/payments',
    meta: 'Payment Confirmed'
  },
  {
    id: 'notif-5',
    category: 'Service & Visits',
    title: 'Preventive Health Check Completed on Fleet',
    message: 'Monthly scheduled maintenance for October was completed across all 6 operational units. All calibration reports verified.',
    time: '5 days ago',
    unread: false,
    severity: 'success',
    actionLabel: 'Fleet Telemetry',
    actionLink: '/client/printers',
    meta: 'Monthly Care Signoff'
  },
  {
    id: 'notif-6',
    category: 'System & Contract',
    title: 'Diamond Fleet Care AMC Active and Covered',
    message: 'All 8 company printers remain 100% covered under zero-cost parts and consumable SLA until 31 Dec 2026.',
    time: '1 week ago',
    unread: false,
    severity: 'info',
    actionLabel: 'Contract Details',
    actionLink: '/client/profile',
    meta: 'Contract: AMC-2024-ED89'
  }
];

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const categories = [
    'All',
    'Service & Visits',
    'Toner & Supplies',
    'Billing & Invoices',
    'System & Contract'
  ];

  const filtered = notifications.filter((n) => {
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory;
    const matchesUnread = !unreadOnly || n.unread;
    return matchesCategory && matchesUnread;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
    setToastMessage('All notifications marked as read.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getSeverityIcon = (sev) => {
    switch (sev) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'billing':
        return <CreditCard className="w-5 h-5 text-purple-600" />;
      default:
        return <Wrench className="w-5 h-5 text-blue-600" />;
    }
  };

  const getSeverityBg = (sev) => {
    switch (sev) {
      case 'warning':
        return 'bg-amber-50';
      case 'success':
        return 'bg-emerald-50';
      case 'billing':
        return 'bg-purple-50';
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Notification Center</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-600 text-white">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Real-time dispatches, consumable replenishment alerts, maintenance reports, and billing updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-xl text-xs font-semibold border border-gray-200 transition-all shadow-sm"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            Mark All as Read
          </button>
        )}
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm font-medium animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Tabs Bar */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? notifications.length
              : notifications.filter((n) => n.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={unreadOnly}
            onChange={(e) => setUnreadOnly(e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
          />
          <span>Show Unread Only</span>
        </label>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              item.unread
                ? 'bg-white border-emerald-200/80 shadow-[0_4px_20px_rgb(16,185,129,0.06)]'
                : 'bg-white border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] opacity-85 hover:opacity-100'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl shrink-0 ${getSeverityBg(item.severity)}`}>
                {getSeverityIcon(item.severity)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug">{item.title}</h3>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  )}
                  <span className="text-[11px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">{item.message}</p>

                <div className="flex items-center gap-3 pt-1 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                  {item.meta && (
                    <>
                      <span>•</span>
                      <span className="text-gray-500 font-mono">{item.meta}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center w-full sm:w-auto justify-end">
              {item.actionLabel && (
                <button
                  onClick={() => navigate(item.actionLink)}
                  className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200/50 transition-colors flex items-center gap-1"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => handleToggleRead(item.id)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                title={item.unread ? 'Mark as read' : 'Mark as unread'}
              >
                <Check className={`w-4 h-4 ${item.unread ? 'text-gray-400' : 'text-emerald-600'}`} />
              </button>

              <button
                onClick={() => handleDeleteNotification(item.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                title="Dismiss Notification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 text-gray-400">
            <Bell className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <h4 className="text-base font-bold text-gray-800">No Notifications Found</h4>
            <p className="text-xs text-gray-400 mt-1">There are no alerts matching your selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
