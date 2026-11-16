import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart, Search, CheckCircle2,
  Clock, ArrowRight, X, Truck, Building
} from 'lucide-react';

const INITIAL_SALES_NOTIFICATIONS = [
  {
    id: 'NOTIF-SALE-101',
    orderId: 'ORD-2023-884',
    client: 'Globex Corporation',
    items: '2x Canon imageRUNNER ADV DX C3835i + 4 High-Yield Toners',
    orderType: 'Commercial Lease (36 Months)',
    totalValue: 345000,
    salesRep: 'Rohit Verma',
    timestamp: '15 mins ago',
    status: 'Unacknowledged',
    siteLocation: 'DLF Cyber City, Tower B, Gurugram'
  },
  {
    id: 'NOTIF-SALE-102',
    orderId: 'ORD-2023-883',
    client: 'Acme Technologies Ltd',
    items: '1x HP LaserJet Enterprise M635 MFP',
    orderType: 'Direct Outright Purchase',
    totalValue: 185000,
    salesRep: 'Priya Sen',
    timestamp: '2 hours ago',
    status: 'Acknowledged',
    siteLocation: 'Connaught Place, New Delhi'
  },
  {
    id: 'NOTIF-SALE-103',
    orderId: 'ORD-2023-882',
    client: 'Zenith Logistics Hub',
    items: '10x Heavy Duty Toner Cartridges (Black & Cyan)',
    orderType: 'Consumable Bulk Order',
    totalValue: 48000,
    salesRep: 'Arun Nair',
    timestamp: '4 hours ago',
    status: 'Acknowledged',
    siteLocation: 'Sector 62, Noida'
  },
  {
    id: 'NOTIF-SALE-104',
    orderId: 'ORD-2023-881',
    client: 'Prime Healthcare Network',
    items: '3x Epson WorkForce Enterprise WF-C20750',
    orderType: 'Healthcare Annual Rental',
    totalValue: 520000,
    salesRep: 'Rohit Verma',
    timestamp: 'Yesterday',
    status: 'Dispatched',
    siteLocation: 'Saket Medical District, New Delhi'
  }
];

const NewSale = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState(INITIAL_SALES_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = ['All', 'Unacknowledged', 'Acknowledged', 'Dispatched'];

  const filteredSales = sales.filter(s => {
    const matchesSearch =
      s.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.salesRep.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAcknowledge = (id) => {
    setSales(sales.map(s => s.id === id ? { ...s, status: 'Acknowledged' } : s));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Orders & Bookings</span>
              <span className="text-gray-400 text-xs">/</span>
              <span className="text-xs text-gray-500 font-medium">Alerts</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-0.5">New Sale Notifications</h1>
          </div>
        </div>

        <button
          onClick={() => navigate('/admin/sales')}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
        >
          <span>Open Sales Management</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">New Inward Bookings</span>
          <div className="text-2xl font-black text-gray-900 mt-2">{sales.length}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Ready for warehouse fulfillment</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Booking Value</span>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            ₹{(sales.reduce((acc, s) => acc + s.totalValue, 0) / 100000).toFixed(2)}L
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">Including GST & initial rent</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Acknowledgment</span>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {sales.filter(s => s.status === 'Unacknowledged').length}
          </div>
          <div className="text-xs text-amber-600 font-medium mt-1">Requires operations approval</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ready for Dispatch</span>
          <div className="text-2xl font-black text-blue-600 mt-2">
            {sales.filter(s => s.status === 'Acknowledged').length}
          </div>
          <div className="text-xs text-blue-600 font-medium mt-1">Challans scheduled</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID, client, equipment, sales rep..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === s
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sales Notifications Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Order & Timestamp</th>
                <th className="py-4 px-6">Client & Delivery Site</th>
                <th className="py-4 px-6">Contract Model</th>
                <th className="py-4 px-6">Equipment / Items</th>
                <th className="py-4 px-6">Total Amount</th>
                <th className="py-4 px-6">Sales Rep</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No new sale notifications found.
                  </td>
                </tr>
              ) : (
                filteredSales.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Order & Time */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 text-xs">{s.orderId}</div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {s.timestamp}
                      </div>
                    </td>

                    {/* Client & Site */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-gray-800 text-xs">{s.client}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5 truncate max-w-[200px]">{s.siteLocation}</div>
                    </td>

                    {/* Contract Type */}
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                        {s.orderType}
                      </span>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-medium text-gray-700 max-w-xs truncate" title={s.items}>
                        {s.items}
                      </div>
                    </td>

                    {/* Value */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-black text-gray-900">₹{s.totalValue.toLocaleString()}</div>
                    </td>

                    {/* Sales Rep */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-medium text-gray-700">{s.salesRep}</div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {s.status === 'Unacknowledged' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                          New Order
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {s.status}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      {s.status === 'Unacknowledged' ? (
                        <button
                          onClick={() => handleAcknowledge(s.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer mr-2 shadow-xs"
                        >
                          Acknowledge
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedOrder(s)}
                          className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors cursor-pointer mr-2"
                        >
                          View Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-gray-900">{selectedOrder.orderId}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-bold text-gray-900">{selectedOrder.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Address:</span>
                <span className="font-medium text-gray-700 text-right max-w-[200px]">{selectedOrder.siteLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Contract Type:</span>
                <span className="font-semibold text-emerald-700">{selectedOrder.orderType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sales Account Rep:</span>
                <span className="font-medium text-gray-800">{selectedOrder.salesRep}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                <span className="text-gray-700">Total Billed:</span>
                <span className="text-base text-gray-900">₹{selectedOrder.totalValue.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl text-xs space-y-1">
              <span className="font-bold text-emerald-900">Items Booked:</span>
              <p className="text-emerald-700">{selectedOrder.items}</p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  navigate('/admin/management/tickets/create');
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <Truck className="w-3.5 h-3.5" />
                Create Delivery Challan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewSale;
