import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  ShoppingBag, Search, Package, CheckCircle2, Truck,
  ArrowDownToLine, X, Layers, ShoppingCart, Check
} from 'lucide-react';

const catalogPrinters = [
  {
    id: 'CAT-001',
    model: 'Canon imageRUNNER ADVANCE DX C3835i',
    brand: 'Canon',
    type: 'Color Laser A3 Multifunction',
    speed: '35 ppm (Color / Black)',
    dutyCycle: '50,000 pages / month',
    resolution: '1200 x 1200 dpi',
    connectivity: 'Gigabit Ethernet, Wi-Fi, NFC, AirPrint',
    features: ['Single-Pass Duplex Feeder', 'Cloud Scan & Print', 'Secure Hard Drive Erase'],
    buyPrice: 185000,
    buyPriceFormatted: '₹1,85,000',
    rentPrice: 4999,
    rentPriceFormatted: '₹4,999 / mo',
    freePrintsIncluded: '5,000 prints/mo included',
    highlight: 'Most Popular Corporate Rental',
    badgeColor: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'CAT-002',
    model: 'HP LaserJet Enterprise MFP M635',
    brand: 'HP',
    type: 'Monochrome Heavy-Duty Multi-Function',
    speed: '61 ppm Ultra-High Speed',
    dutyCycle: '300,000 pages / month',
    resolution: '1200 x 1200 dpi ProRes',
    connectivity: 'Ethernet, USB 3.0, Secure Mobile Print',
    features: ['100-sheet ADF', 'Self-Healing BIOS Security', 'Pin-Protected Print Release'],
    buyPrice: 145000,
    buyPriceFormatted: '₹1,45,000',
    rentPrice: 3750,
    rentPriceFormatted: '₹3,750 / mo',
    freePrintsIncluded: '10,000 prints/mo included',
    highlight: 'Best for Heavy Monochrome Printing',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'CAT-003',
    model: 'Epson WorkForce Pro WF-C878R',
    brand: 'Epson',
    type: 'Replaceable Ink Pack System (RIPS)',
    speed: '25 ppm High Efficiency',
    dutyCycle: '75,000 pages / month',
    resolution: '4800 x 1200 optimized dpi',
    connectivity: 'Wi-Fi Direct, Gigabit LAN, USB',
    features: ['PrecisionCore Heat-Free', '86,000-page Ink Bags', 'Ultra-Low Power Consumption'],
    buyPrice: 160000,
    buyPriceFormatted: '₹1,60,000',
    rentPrice: 4200,
    rentPriceFormatted: '₹4,200 / mo',
    freePrintsIncluded: '6,000 prints/mo included',
    highlight: 'Eco-Friendly Low Energy',
    badgeColor: 'bg-teal-100 text-teal-800'
  },
  {
    id: 'CAT-004',
    model: 'Brother MFC-L8900CDW',
    brand: 'Brother',
    type: 'Compact Business Color Laser',
    speed: '33 ppm (Color / Black)',
    dutyCycle: '60,000 pages / month',
    resolution: '2400 x 600 dpi class',
    connectivity: 'Wireless, Gigabit Ethernet, NFC, USB',
    features: ['70-page Auto Duplex ADF', 'Advanced Security', 'Direct Cloud Connect'],
    buyPrice: 89000,
    buyPriceFormatted: '₹89,000',
    rentPrice: 2800,
    rentPriceFormatted: '₹2,800 / mo',
    freePrintsIncluded: '3,000 prints/mo included',
    highlight: 'Ideal for Branch Offices',
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'CAT-005',
    model: 'Xerox AltaLink C8145',
    brand: 'Xerox',
    type: 'Departmental Color Production Copier',
    speed: '45 ppm High Workload',
    dutyCycle: '200,000 pages / month',
    resolution: '1200 x 2400 dpi True HD',
    connectivity: 'Ethernet, Wi-Fi Kit, NFC, Apple AirPrint',
    features: ['ConnectKey Technology', 'McAfee Whitelisting', 'Multi-Tray High Volume Feed'],
    buyPrice: 240000,
    buyPriceFormatted: '₹2,40,000',
    rentPrice: 6500,
    rentPriceFormatted: '₹6,500 / mo',
    freePrintsIncluded: '8,000 prints/mo included',
    highlight: 'Production Grade Copier',
    badgeColor: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'CAT-006',
    model: 'Ricoh IM C3000',
    brand: 'Ricoh',
    type: 'Smart A3 Color MFP with Touch Panel',
    speed: '30 ppm (Color / Black)',
    dutyCycle: '80,000 pages / month',
    resolution: '1200 x 1200 dpi',
    connectivity: 'Gigabit Ethernet, Wi-Fi, Bluetooth',
    features: ['10.1-inch Smart Operation Panel', 'Cloud Workflow Integration', 'Remote Firmware Updates'],
    buyPrice: 172000,
    buyPriceFormatted: '₹1,72,000',
    rentPrice: 4400,
    rentPriceFormatted: '₹4,400 / mo',
    freePrintsIncluded: '4,500 prints/mo included',
    highlight: 'Smart Touchscreen Workflow',
    badgeColor: 'bg-indigo-100 text-indigo-800'
  }
];

const initialPurchases = [
  {
    id: 'ORD-2026-9921',
    date: '15 Oct 2026',
    deliveredDate: '18 Oct 2026',
    invoiceRef: 'INV-2026-0491',
    category: 'Consumables & Supplies',
    status: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethod: 'Corporate Card •••• 4412',
    totalAmount: '₹48,500',
    items: [
      { name: 'HP W1470X High-Yield Black Toner Cartridge', qty: 4, unitPrice: '₹8,500', amount: '₹34,000' },
      { name: 'A4 High-Brightness Executive Copy Paper (Box of 5 Reams)', qty: 10, unitPrice: '₹1,450', amount: '₹14,500' }
    ],
    tracking: {
      courier: 'BlueDart Express',
      trackingNo: 'BLU-88291039',
      timeline: [
        { title: 'Order Placed', time: '15 Oct, 10:30 AM', done: true },
        { title: 'Dispatched from Warehouse', time: '16 Oct, 02:15 PM', done: true },
        { title: 'Out for Delivery', time: '18 Oct, 09:00 AM', done: true },
        { title: 'Delivered to IT Receiving Wing', time: '18 Oct, 01:45 PM', done: true }
      ]
    }
  },
  {
    id: 'ORD-2026-9840',
    date: '28 Sep 2026',
    deliveredDate: '01 Oct 2026',
    invoiceRef: 'INV-2026-0428',
    category: 'Printers & Hardware',
    status: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethod: 'Bank Wire (RTGS)',
    totalAmount: '₹1,85,000',
    items: [
      { name: 'Canon imageRUNNER ADVANCE DX C3835i Color Multifunction', qty: 1, unitPrice: '₹1,85,000', amount: '₹1,85,000' }
    ],
    tracking: {
      courier: 'PMS Logistics Direct Carrier',
      trackingNo: 'PMS-DIR-0091',
      timeline: [
        { title: 'Order Confirmed', time: '28 Sep, 11:00 AM', done: true },
        { title: 'Pre-Deployment Configuration', time: '29 Sep, 04:00 PM', done: true },
        { title: 'Dispatched', time: '30 Sep, 08:30 AM', done: true },
        { title: 'Installed & Calibrated On-Site', time: '01 Oct, 02:30 PM', done: true }
      ]
    }
  },
  {
    id: 'ORD-2026-9715',
    date: '10 Aug 2026',
    deliveredDate: '10 Aug 2026',
    invoiceRef: 'INV-2026-0371',
    category: 'AMC Contracts',
    status: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethod: 'Net Banking (HDFC Corporate)',
    totalAmount: '₹1,44,000',
    items: [
      { name: 'Annual Enterprise Diamond Fleet Care AMC (8 Units)', qty: 1, unitPrice: '₹1,44,000', amount: '₹1,44,000' }
    ],
    tracking: {
      courier: 'Digital SLA Activation',
      trackingNo: 'DIGITAL-AMC-9715',
      timeline: [
        { title: 'Contract Renewal Initiated', time: '10 Aug, 09:00 AM', done: true },
        { title: 'Payment Verification', time: '10 Aug, 09:15 AM', done: true },
        { title: 'SLA Activated in Central Telemetry', time: '10 Aug, 09:30 AM', done: true }
      ]
    }
  },
  {
    id: 'ORD-2026-9602',
    date: '02 Nov 2026',
    deliveredDate: 'Estimated 08 Nov 2026',
    invoiceRef: 'INV-2026-0511',
    category: 'Consumables & Supplies',
    status: 'Processing',
    paymentStatus: 'Net 30',
    paymentMethod: 'Approved Purchase Order (PO-2026-78)',
    totalAmount: '₹32,400',
    items: [
      { name: 'Epson T974 Replaceable High-Yield Cyan & Magenta Ink Packs', qty: 2, unitPrice: '₹12,200', amount: '₹24,400' },
      { name: 'Preventive Maintenance Roller Cleaning Kit', qty: 4, unitPrice: '₹2,000', amount: '₹8,000' }
    ],
    tracking: {
      courier: 'DTDC Priority Cargo',
      trackingNo: 'DTDC-7719204',
      timeline: [
        { title: 'PO Received & Approved', time: '02 Nov, 03:00 PM', done: true },
        { title: 'Pick & Pack in Warehouse', time: '03 Nov, 10:00 AM', done: true },
        { title: 'Awaiting Carrier Dispatch', time: 'Pending', done: false },
        { title: 'Delivery to Site', time: 'Pending', done: false }
      ]
    }
  },
  {
    id: 'ORD-2026-9530',
    date: '14 Jul 2026',
    deliveredDate: '17 Jul 2026',
    invoiceRef: 'INV-2026-0312',
    category: 'Hardware Accessories',
    status: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethod: 'Corporate Card •••• 4412',
    totalAmount: '₹24,800',
    items: [
      { name: 'Optional 550-Sheet Heavy Duty Feeder Paper Tray', qty: 2, unitPrice: '₹12,400', amount: '₹24,800' }
    ],
    tracking: {
      courier: 'BlueDart Express',
      trackingNo: 'BLU-55291882',
      timeline: [
        { title: 'Order Placed', time: '14 Jul, 02:00 PM', done: true },
        { title: 'Dispatched', time: '15 Jul, 11:30 AM', done: true },
        { title: 'Delivered & Fitted', time: '17 Jul, 04:00 PM', done: true }
      ]
    }
  }
];

const PurchaseHistory = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Active Tab: 'history' or 'buy-rent'
  const initialTab =
    location.state?.defaultTab ||
    (location.pathname.includes('/buy-rent') || searchParams.get('tab') === 'buy-rent' ? 'buy-rent' : 'history');

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (location.state?.defaultTab) {
      setActiveTab(location.state.defaultTab);
    } else if (location.pathname.includes('/buy-rent') || searchParams.get('tab') === 'buy-rent') {
      setActiveTab('buy-rent');
    }
  }, [location.state, location.pathname, searchParams]);

  // Order History States
  const [orders, setOrders] = useState(initialPurchases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Buy or Rent Catalog States
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogFilter, setCatalogFilter] = useState('All'); // 'All' | 'Rent' | 'Buy'
  const [catalogType, setCatalogType] = useState('All'); // 'All' | 'Color' | 'Monochrome' | 'A3'
  const [orderModalPrinter, setOrderModalPrinter] = useState(null);
  const [orderType, setOrderType] = useState('Rent'); // 'Rent' | 'Buy'
  const [leaseTenure, setLeaseTenure] = useState('24'); // '12' | '24' | '36'
  const [orderFloor, setOrderFloor] = useState('3rd Floor - Finance & Accounts');
  const [orderQuantity, setOrderQuantity] = useState(1);

  // Check if navigation passed preselected printer for Buy/Rent
  useEffect(() => {
    if (location.state?.preselectedModel) {
      const match = catalogPrinters.find((p) => p.model === location.state.preselectedModel);
      if (match) {
        setOrderModalPrinter(match);
        if (location.state.option) {
          setOrderType(location.state.option);
        }
      }
    }
  }, [location.state]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.invoiceRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || order.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredCatalog = catalogPrinters.filter((p) => {
    const matchesSearch =
      p.model.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.type.toLowerCase().includes(catalogSearch.toLowerCase());

    const matchesType =
      catalogType === 'All' ||
      (catalogType === 'Color' && p.type.toLowerCase().includes('color')) ||
      (catalogType === 'Monochrome' && p.type.toLowerCase().includes('monochrome')) ||
      (catalogType === 'A3' && p.type.includes('A3'));

    return matchesSearch && matchesType;
  });

  const handleDownloadInvoice = (order) => {
    setFeedback(`Downloading invoice ${order.invoiceRef} for Order ${order.id}...`);
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!orderModalPrinter) return;

    const newOrderId = `ORD-2026-${Math.floor(9900 + Math.random() * 99)}`;
    const newInvoiceId = `INV-2026-${Math.floor(520 + Math.random() * 50)}`;

    const totalAmt =
      orderType === 'Buy'
        ? `₹${(orderModalPrinter.buyPrice * orderQuantity).toLocaleString()}`
        : `₹${(orderModalPrinter.rentPrice * orderQuantity).toLocaleString()} / mo`;

    const newOrderRecord = {
      id: newOrderId,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      deliveredDate: 'Estimated within 48 Hours',
      invoiceRef: newInvoiceId,
      category: 'Printers & Hardware',
      status: 'Processing',
      paymentStatus: 'Approved PO',
      paymentMethod: orderType === 'Rent' ? `Corporate Rental (${leaseTenure} Mo Lease)` : 'Outright Purchase PO',
      totalAmount: totalAmt,
      items: [
        {
          name: `${orderModalPrinter.model} (${orderType === 'Rent' ? `${leaseTenure}-Month Corporate Lease` : 'New Unit'})`,
          qty: orderQuantity,
          unitPrice: orderType === 'Buy' ? orderModalPrinter.buyPriceFormatted : orderModalPrinter.rentPriceFormatted,
          amount: totalAmt
        }
      ],
      tracking: {
        courier: 'PMS Logistics Direct Carrier',
        trackingNo: `PMS-DIR-${Math.floor(1000 + Math.random() * 9000)}`,
        timeline: [
          { title: 'Requisition Approved', time: 'Just now', done: true },
          { title: 'Staging & Pre-Calibration', time: 'In Progress', done: true },
          { title: 'Delivery & Deployment', time: 'Scheduled in 48h', done: false },
          { title: 'On-Site Commissioning', time: 'Pending', done: false }
        ]
      }
    };

    setOrders([newOrderRecord, ...orders]);
    setFeedback(
      `Requisition for ${orderModalPrinter.model} (${orderType}) confirmed! Order ${newOrderId} has been logged in your account.`
    );
    setOrderModalPrinter(null);
    setActiveTab('history');
    setTimeout(() => setFeedback(null), 6000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Top Header with Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              {activeTab === 'buy-rent' ? 'Buy or Rent Commercial Printers' : 'Purchase History & Orders'}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Corporate Account
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {activeTab === 'buy-rent'
              ? 'Select corporate lease rental plans (zero CapEx, free toners & care) or buy enterprise hardware outright.'
              : 'Review past equipment procurements, consumable orders, and track active deliveries.'}
          </p>
        </div>

        {/* Tab Option Buttons */}
        <div className="flex items-center gap-2 p-1 bg-white border border-gray-200 rounded-2xl shadow-sm self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('buy-rent')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'buy-rent'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-700 hover:bg-emerald-50 bg-emerald-50/50'
            }`}
          >
            <ShoppingCart className="w-4 h-4 text-emerald-600" />
            <span>Buy or Rent Printers</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm font-medium animate-fade-in shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 1: BUY OR RENT PRINTERS CATALOG                                      */}
      {/* ========================================================================= */}
      {activeTab === 'buy-rent' && (
        <div className="space-y-6 animate-fade-in">
          {/* Benefit Banner */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                Corporate Fleet Expansion • Zero CapEx Rental Available
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Monthly Rental Includes 100% Free Toner & On-Site Service
              </h2>
              <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed">
                Rent any commercial multifunction copier or printer without capital expenditure. Every rental includes bundled monthly print quotas, automated cartridge dispatch, and 2-hour breakdown support.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-center">
                <span className="text-[10px] text-emerald-200 uppercase font-semibold block">Turnaround</span>
                <span className="font-extrabold text-white text-sm">48-Hr On-Site Setup</span>
              </div>
            </div>
          </div>

          {/* Catalog Filter Toolbar */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search models, brands (HP, Canon, Epson)..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap justify-between md:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Workload:</span>
                <select
                  value={catalogType}
                  onChange={(e) => setCatalogType(e.target.value)}
                  className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Formats</option>
                  <option value="Color">Color Multifunction</option>
                  <option value="Monochrome">Monochrome Heavy-Duty</option>
                  <option value="A3">A3 Commercial</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Plan Focus:</span>
                <select
                  value={catalogFilter}
                  onChange={(e) => setCatalogFilter(e.target.value)}
                  className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Pricing (Rent & Buy)</option>
                  <option value="Rent">Rental Priority</option>
                  <option value="Buy">Outright Purchase</option>
                </select>
              </div>
            </div>
          </div>

          {/* Catalog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalog.map((printer) => (
              <div
                key={printer.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-emerald-200 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="p-6 border-b border-gray-100/80 bg-gradient-to-b from-gray-50/50 to-transparent">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-800 shadow-sm">
                        {printer.brand}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${printer.badgeColor}`}>
                        {printer.highlight}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-gray-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                      {printer.model}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{printer.type}</p>
                  </div>

                  <div className="p-6 space-y-4 text-xs">
                    {/* Specs Matrix */}
                    <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Speed:</span>
                        <span className="font-bold text-gray-900">{printer.speed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duty Cycle:</span>
                        <span className="font-bold text-gray-900">{printer.dutyCycle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Print Quality:</span>
                        <span className="font-mono font-semibold text-gray-800">{printer.resolution}</span>
                      </div>
                    </div>

                    {/* Features Chips */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Highlights:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {printer.features.map((feat, idx) => (
                          <span key={idx} className="text-[11px] font-medium bg-emerald-50/70 text-emerald-800 px-2 py-0.5 rounded-md">
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pricing Comparison Box */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {/* Rental */}
                      <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                          Flexible Rental
                        </span>
                        <h4 className="text-base font-extrabold text-emerald-950 font-mono mt-0.5">
                          {printer.rentPriceFormatted}
                        </h4>
                        <span className="text-[10px] text-emerald-700 block mt-0.5 leading-tight font-medium">
                          {printer.freePrintsIncluded}
                        </span>
                      </div>

                      {/* Buy Outright */}
                      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                          Outright Buy
                        </span>
                        <h4 className="text-base font-extrabold text-gray-900 font-mono mt-0.5">
                          {printer.buyPriceFormatted}
                        </h4>
                        <span className="text-[10px] text-gray-500 block mt-0.5 leading-tight">
                          1-Yr OEM Warranty
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setOrderModalPrinter(printer);
                      setOrderType('Rent');
                    }}
                    className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Rent This Unit</span>
                  </button>

                  <button
                    onClick={() => {
                      setOrderModalPrinter(printer);
                      setOrderType('Buy');
                    }}
                    className="flex-1 py-2.5 px-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-all active:scale-95"
                  >
                    <span>Buy Outright</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: ORDER & PURCHASE HISTORY                                          */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="space-y-6 animate-fade-in">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Expenditure</p>
                <h3 className="text-2xl font-extrabold text-gray-900 mt-1">₹4,36,700</h3>
                <span className="text-xs text-emerald-600 font-medium mt-1 block">Current Fiscal Year</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Orders Fulfilled</p>
                <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{orders.length} Orders</h3>
                <span className="text-xs text-gray-500 mt-1 block">100% on-time delivery</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Active AMC Contracts</p>
                <h3 className="text-2xl font-extrabold text-emerald-700 mt-1">1 Active Plan</h3>
                <span className="text-xs text-gray-500 mt-1 block">Valid through Dec 2026</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Latest Delivery</p>
                <h3 className="text-lg font-bold text-gray-900 mt-1 truncate">ORD-2026-9602</h3>
                <span className="text-xs text-amber-600 font-semibold mt-1 block">Processing Delivery</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search order ID, item name, invoice #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto flex-wrap justify-between md:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Consumables & Supplies">Consumables & Supplies</option>
                  <option value="Printers & Hardware">Printers & Hardware</option>
                  <option value="AMC Contracts">AMC Contracts</option>
                  <option value="Hardware Accessories">Hardware Accessories</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 font-medium text-gray-700 outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Processing">Processing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] text-gray-500 uppercase tracking-wider font-bold bg-gray-50/70 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Order Details</th>
                    <th className="px-6 py-4">Date & Status</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Items Summary</th>
                    <th className="px-6 py-4">Amount & Payment</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                            <ShoppingBag className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">{order.id}</span>
                            <span className="text-xs font-mono text-gray-400">Inv: {order.invoiceRef}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-xs">
                        <p className="font-semibold text-gray-800">{order.date}</p>
                        <span
                          className={`inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs">
                        <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
                          {order.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs text-gray-700 max-w-xs">
                        <p className="font-medium truncate">{order.items[0].name}</p>
                        {order.items.length > 1 && (
                          <span className="text-[11px] text-emerald-700 font-semibold">
                            + {order.items.length - 1} more item(s)
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-xs">
                        <p className="font-extrabold text-gray-900 text-sm">{order.totalAmount}</p>
                        <span className="text-gray-400 text-[11px] block">{order.paymentStatus}</span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDownloadInvoice(order)}
                            className="p-2 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                            title="Download Invoice"
                          >
                            <ArrowDownToLine className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="px-3 py-1.5 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 font-semibold text-xs rounded-xl border border-gray-200 transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ORDER DETAILS (EXISTING ORDERS)                                     */}
      {/* ========================================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Order Summary: {selectedOrder.id}</h3>
                  <p className="text-xs text-gray-500">Invoice Reference: {selectedOrder.invoiceRef}</p>
                </div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block font-semibold uppercase text-[10px]">Order Date</span>
                  <p className="font-bold text-gray-900 mt-0.5">{selectedOrder.date}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block font-semibold uppercase text-[10px]">Payment Method</span>
                  <p className="font-bold text-gray-900 mt-0.5 truncate">{selectedOrder.paymentMethod}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-gray-400 block font-semibold uppercase text-[10px]">Courier</span>
                  <p className="font-bold text-gray-900 mt-0.5 truncate">{selectedOrder.tracking.courier}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-emerald-800 block font-semibold uppercase text-[10px]">Total Amount</span>
                  <p className="font-extrabold text-emerald-950 mt-0.5">{selectedOrder.totalAmount}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">Line Items</h4>
                <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between text-xs bg-white">
                      <div>
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-gray-400 text-[11px]">Quantity: {item.qty} × {item.unitPrice}</p>
                      </div>
                      <span className="font-extrabold text-gray-900">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">Fulfillment & Delivery Progress</h4>
                <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-3">
                  {selectedOrder.tracking.timeline.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        step.done ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 flex justify-between items-center text-xs">
                        <span className={`font-semibold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</span>
                        <span className="text-[11px] text-gray-400 font-mono">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleDownloadInvoice(selectedOrder)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  Download Official Tax Invoice (PDF)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: BUY OR RENT REQUISITION / ORDER PLACEMENT                          */}
      {/* ========================================================================= */}
      {orderModalPrinter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto border border-gray-100 p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {orderType === 'Rent' ? 'Corporate Printer Lease Order' : 'Equipment Purchase Order'}
                  </h3>
                  <p className="text-xs text-gray-500">{orderModalPrinter.model}</p>
                </div>
              </div>
              <button onClick={() => setOrderModalPrinter(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmOrder} className="space-y-4 text-xs">
              {/* Option Switcher: Rent vs Buy */}
              <div>
                <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1.5">
                  Contract Model:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType('Rent')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      orderType === 'Rent'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-emerald-700 block">Monthly Rental</span>
                    <h4 className="font-extrabold text-base mt-0.5">{orderModalPrinter.rentPriceFormatted}</h4>
                    <span className="text-[11px] text-gray-500 block mt-1">Zero CapEx, free toners & full maintenance</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('Buy')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      orderType === 'Buy'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-gray-700 block">Outright Purchase</span>
                    <h4 className="font-extrabold text-base mt-0.5">{orderModalPrinter.buyPriceFormatted}</h4>
                    <span className="text-[11px] text-gray-500 block mt-1">Direct corporate asset ownership</span>
                  </button>
                </div>
              </div>

              {/* Lease Tenure (If Rental) */}
              {orderType === 'Rent' && (
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                    Rental Lease Tenure
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['12', '24', '36'].map((mo) => (
                      <button
                        key={mo}
                        type="button"
                        onClick={() => setLeaseTenure(mo)}
                        className={`py-2 px-3 rounded-xl border text-center font-bold text-xs transition-colors ${
                          leaseTenure === mo
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {mo} Months
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Facility Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                    Number of Units
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                    Delivery Floor / Department
                  </label>
                  <select
                    value={orderFloor}
                    onChange={(e) => setOrderFloor(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option>3rd Floor - Finance & Accounts</option>
                    <option>4th Floor - Executive Boardroom</option>
                    <option>2nd Floor - Marketing & Creative Lab</option>
                    <option>1st Floor - HR & Operations</option>
                    <option>Ground Floor - Reception Lounge</option>
                    <option>Basement - Logistics & Warehouse</option>
                  </select>
                </div>
              </div>

              {/* Summary Breakdown Box */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Selected Model:</span>
                  <span className="font-bold text-gray-900">{orderModalPrinter.model}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Contract Terms:</span>
                  <span className="font-semibold text-emerald-800">
                    {orderType === 'Rent' ? `${leaseTenure}-Month Lease (${orderModalPrinter.freePrintsIncluded})` : 'Outright Purchase'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-extrabold text-emerald-950">
                  <span>Total Amount:</span>
                  <span className="font-mono">
                    {orderType === 'Buy'
                      ? `₹${(orderModalPrinter.buyPrice * orderQuantity).toLocaleString()}`
                      : `₹${(orderModalPrinter.rentPrice * orderQuantity).toLocaleString()} / month`}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOrderModalPrinter(null)}
                  className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-semibold text-xs hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs shadow-md transition-all active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  Confirm & Place Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
