import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, ShoppingCart, Calendar, Wrench, CheckCircle, 
  Clock, ArrowRight, Search, CheckCheck
} from 'lucide-react';

const CATEGORIES = [
  { icon: ShoppingCart, label: 'New Sale', path: '/admin/notifications/new-sale', colorClass: 'text-emerald-500', bgClass: 'bg-emerald-50', count: 4 },
  { icon: Calendar, label: 'Installation Due', path: '/admin/notifications/installation-due', colorClass: 'text-blue-500', bgClass: 'bg-blue-50', count: 3 },
  { icon: Wrench, label: 'Ticket Assigned', path: '/admin/notifications/ticket-assigned', colorClass: 'text-indigo-500', bgClass: 'bg-indigo-50', count: 4 },
  { icon: CheckCircle, label: 'Ticket Closed', path: '/admin/notifications/ticket-closed', colorClass: 'text-gray-500', bgClass: 'bg-gray-100', count: 4 },
  { icon: Clock, label: 'AMC Expiry', path: '/admin/notifications/amc-expiry', colorClass: 'text-amber-500', bgClass: 'bg-amber-50', count: 4 },
];

const INITIAL_FEED = [
  {
    id: 1,
    title: 'New Commercial Booking: Globex Inc',
    details: '2x Canon imageRUNNER ADV DX C3835i + 4 High-Yield Toners (₹3.45 Lakhs)',
    category: 'New Sale',
    time: '15 mins ago',
    path: '/admin/notifications/new-sale',
    unread: true,
    icon: ShoppingCart,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    id: 2,
    title: 'Urgent Dispatch: Ticket TKT-1045',
    details: 'Total Production Down at Globex Inc assigned to Rajesh Kumar (SLA: 4 Hours)',
    category: 'Ticket Assigned',
    time: '25 mins ago',
    path: '/admin/notifications/ticket-assigned',
    unread: true,
    icon: Wrench,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    id: 3,
    title: 'Service Ticket TKT-1044 Resolved',
    details: 'Replaced fuser sleeve and pressure bushing. Completed 30-page test print.',
    category: 'Ticket Closed',
    time: '45 mins ago',
    path: '/admin/notifications/ticket-closed',
    unread: true,
    icon: CheckCircle,
    color: 'text-gray-700',
    bg: 'bg-gray-100'
  },
  {
    id: 4,
    title: 'AMC Contract Expiring in 6 Days',
    details: 'Contract AMC-2023-091 for 4 machines at Globex Inc expiring on 22 Nov 2023.',
    category: 'AMC Expiry',
    time: '2 hours ago',
    path: '/admin/notifications/amc-expiry',
    unread: false,
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    id: 5,
    title: 'Installation Due Today: Acme Tech',
    details: 'HP LaserJet Enterprise M635 delivered to Connaught Place site awaiting setup.',
    category: 'Installation Due',
    time: '3 hours ago',
    path: '/admin/notifications/installation-due',
    unread: false,
    icon: Calendar,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 6,
    title: 'Field Service Completed: Acme Corp',
    details: 'Cleaned optics and deglazed Tray 2 pick-up rollers. Cleared error code 50.4.',
    category: 'Ticket Closed',
    time: '5 hours ago',
    path: '/admin/notifications/ticket-closed',
    unread: false,
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  }
];

const NotificationsDashboard = () => {
  const navigate = useNavigate();
  const [feed, setFeed] = useState(INITIAL_FEED);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('All');

  const handleMarkAllRead = () => {
    setFeed(feed.map(item => ({ ...item, unread: false })));
  };

  const filteredFeed = feed.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnread = filterMode === 'All' || (filterMode === 'Unread' && item.unread);
    return matchesSearch && matchesUnread;
  });

  const totalUnreadCount = feed.filter(f => f.unread).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 shadow-inner">
            <Bell className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900">Notifications Center</h1>
              {totalUnreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
                  {totalUnreadCount} Unread
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 font-medium mt-0.5">Unified operations feed, automated alerts, and service desk triggers.</p>
          </div>
        </div>

        {totalUnreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Quick Links Grid */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-600" />
          Notification Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(cat.path)}
                className="relative flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer text-center"
              >
                <div className={`p-3 rounded-2xl ${cat.bgClass} mb-2 group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-6 h-6 ${cat.colorClass}`} />
                </div>
                <span className="text-xs font-bold text-gray-800 leading-tight">{cat.label}</span>
                <span className="text-[10px] text-gray-400 mt-1 font-semibold">{cat.count} alerts</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Unified Live Notification Feed */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Recent Operational Feed</h2>
            <p className="text-xs text-gray-500">Live stream of cross-departmental alerts and actionable tasks.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter alerts..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-200">
              {['All', 'Unread'].map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterMode(m)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    filterMode === m ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feed List */}
        <div className="space-y-3">
          {filteredFeed.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              No notifications matching your search filter.
            </div>
          ) : (
            filteredFeed.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex items-start justify-between gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                    item.unread
                      ? 'bg-purple-50/20 border-purple-100 hover:bg-purple-50/40 hover:border-purple-200'
                      : 'bg-white border-gray-100 hover:bg-gray-50/80 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${item.bg}`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </span>
                        {item.unread && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        )}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-1">{item.details}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-center">
                    <span className="text-[11px] text-gray-400 font-medium">{item.time}</span>
                    <div className="p-1.5 rounded-lg text-gray-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsDashboard;
