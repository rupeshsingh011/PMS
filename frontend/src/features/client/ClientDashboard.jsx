import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Printer, ShoppingCart, Wrench, FileText,
  CreditCard, CheckCircle2, Clock, ArrowRight,
  Droplets, MapPin, Phone, ChevronRight, Activity
} from 'lucide-react';

const featuredPrinters = [
  {
    id: 'PRT-CAT-01',
    model: 'Canon imageRUNNER ADVANCE DX C3835i',
    type: 'Color Laser A3 Multifunction',
    brand: 'Canon',
    speed: '35 ppm (Color & Mono)',
    dutyCycle: 'Up to 50,000 pages/mo',
    buyPrice: '₹1,85,000',
    rentPrice: '₹4,999 / mo',
    rentBenefits: 'Includes 5,000 free prints/mo + 100% Free Toner & Maintenance',
    highlight: 'Most Popular Corporate Rental'
  },
  {
    id: 'PRT-CAT-02',
    model: 'HP LaserJet Enterprise MFP M635',
    type: 'Monochrome Heavy-Duty Multi-Function',
    brand: 'HP',
    speed: '61 ppm Ultra-Fast',
    dutyCycle: 'Up to 300,000 pages/mo',
    buyPrice: '₹1,45,000',
    rentPrice: '₹3,750 / mo',
    rentBenefits: 'Zero upfront cost, replacement drums & toner cartridges included',
    highlight: 'Best for High-Volume Printing'
  },
  {
    id: 'PRT-CAT-03',
    model: 'Epson WorkForce Pro WF-C878R',
    type: 'Replaceable Ink Pack System (RIPS)',
    brand: 'Epson',
    speed: '25 ppm Ultra Low Power',
    dutyCycle: 'Up to 75,000 pages/mo',
    buyPrice: '₹1,60,000',
    rentPrice: '₹4,200 / mo',
    rentBenefits: 'Includes 86,000-page high-yield ink packs + zero ozone emission',
    highlight: 'Eco-Friendly Cost Saver'
  }
];

const livePrinters = [
  {
    id: 'PRT-001',
    model: 'HP LaserJet Enterprise MFP M635',
    location: '3rd Floor - Finance & Accounts',
    status: 'Operational',
    toner: 78,
    paper: 85
  },
  {
    id: 'PRT-003',
    model: 'Epson WorkForce Pro WF-C878R',
    location: '2nd Floor - Marketing & Creative Lab',
    status: 'Warning',
    statusText: 'Cyan Toner Low (14%)',
    toner: 14,
    paper: 40
  },
  {
    id: 'PRT-005',
    model: 'HP Color LaserJet Enterprise M555dn',
    location: 'Ground Floor - Reception Lounge',
    status: 'In Maintenance',
    statusText: 'Roller replacement scheduled today',
    toner: 38,
    paper: 20
  }
];

const recentActivity = [
  {
    id: 1,
    title: 'Technician Dispatched',
    desc: 'Rajesh Kumar assigned to Ground Floor M555dn service visit',
    time: '20 mins ago',
    type: 'service',
    icon: Wrench,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 2,
    title: 'Cyan Ink Pack Auto-Order',
    desc: 'Automated telemetry replenishment order #ORD-2026-9602 created',
    time: '2 hours ago',
    type: 'toner',
    icon: Droplets,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    id: 3,
    title: 'Invoice Generated',
    desc: 'Invoice INV-2026-0511 for ₹32,400 due on 17 Nov 2026',
    time: '1 day ago',
    type: 'billing',
    icon: FileText,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    id: 4,
    title: 'Payment Acknowledged',
    desc: 'Receipt RCP-2026-0941 confirmed for ₹48,500',
    time: '3 days ago',
    type: 'payment',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  }
];

const ClientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-white/5 rounded-full blur-3xl pointer-events-none transform translate-x-32" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                Diamond Fleet Care AMC
              </span>
              <span className="text-xs text-emerald-200">Client ID: <span className="font-mono font-semibold text-white">CLI-88219</span></span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, Acme Technologies Ltd.
            </h1>
            <p className="text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Your company fleet has <span className="font-bold text-white">6 printers online</span>. 
              Breakdown coverage and automated toner delivery are active with guaranteed &lt; 2hr on-site SLA.
            </p>
          </div>

          {/* Action Button CTA: Buy or Rent Printers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => navigate('/client/purchases', { state: { defaultTab: 'buy-rent' } })}
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white text-emerald-900 rounded-2xl font-bold text-sm hover:bg-emerald-50 transition-all shadow-xl shadow-black/10 hover:shadow-emerald-950/20 active:scale-95 group"
            >
              <ShoppingCart className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>Buy or Rent Printers</span>
              <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/client/service-request')}
              className="flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-900/60 hover:bg-emerald-900 text-white border border-white/20 rounded-2xl font-semibold text-sm transition-all"
            >
              <Wrench className="w-4 h-4 text-emerald-200" />
              <span>Request Service</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15 text-xs">
          <div>
            <span className="text-emerald-200 block text-[11px]">Primary Account Manager</span>
            <span className="font-semibold text-white mt-0.5 block">Suresh Patil (+91 98200 11223)</span>
          </div>
          <div>
            <span className="text-emerald-200 block text-[11px]">Contract Status</span>
            <span className="font-semibold text-white mt-0.5 block">Active till 31 Dec 2026</span>
          </div>
          <div>
            <span className="text-emerald-200 block text-[11px]">Next Scheduled Preventive Visit</span>
            <span className="font-semibold text-white mt-0.5 block">12 Nov 2026 (Monthly Care)</span>
          </div>
          <div>
            <span className="text-emerald-200 block text-[11px]">Emergency Hotline</span>
            <span className="font-semibold text-white mt-0.5 block">1800 200 7746 (24/7)</span>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Fleet Count */}
        <div
          onClick={() => navigate('/client/printers')}
          className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer transition-all flex items-center justify-between group"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Installed Printer Fleet</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">6 Units</h3>
            <span className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 5 Operational • 1 Service
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Printer className="w-6 h-6" />
          </div>
        </div>

        {/* Service Requests */}
        <div
          onClick={() => navigate('/client/service-request')}
          className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer transition-all flex items-center justify-between group"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">Active Service Visits</p>
            <h3 className="text-2xl font-extrabold text-blue-700 mt-1">1 Scheduled</h3>
            <span className="text-xs text-gray-500 mt-1 block">Technician visiting today</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Wrench className="w-6 h-6" />
          </div>
        </div>

        {/* Outstanding Billing */}
        <div
          onClick={() => navigate('/client/invoices')}
          className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer transition-all flex items-center justify-between group"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Pending Payable</p>
            <h3 className="text-2xl font-extrabold text-amber-700 mt-1">₹32,400</h3>
            <span className="text-xs text-amber-600 font-semibold mt-1 block">Due by 17 Nov 2026</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        {/* Monthly Print Usage */}
        <div
          onClick={() => navigate('/client/printers')}
          className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] cursor-pointer transition-all flex items-center justify-between group"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-purple-600">Monthly Print Volume</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">74,950</h3>
            <span className="text-xs text-purple-600 font-medium mt-1 block">Within enterprise quota</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* PORTAL SHORTCUTS (ROW ABOVE 'BUY OR RENT COMMERCIAL PRINTERS') */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-gray-900 text-sm tracking-wide">Portal Shortcuts</h3>
            <span className="text-xs text-gray-400 hidden sm:inline">• Direct access to fleet management tools</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {/* 1. Buy or Rent */}
          <button
            onClick={() => navigate('/client/buy-rent')}
            className="p-4 rounded-2xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-100/80 text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform mb-3">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-emerald-950 text-sm leading-tight group-hover:text-emerald-700 transition-colors">Buy or Rent</p>
              <p className="text-[11px] text-emerald-700/80 mt-0.5">Commercial printers</p>
            </div>
          </button>

          {/* 2. My Fleet */}
          <button
            onClick={() => navigate('/client/printers')}
            className="p-4 rounded-2xl bg-teal-50/70 hover:bg-teal-100/80 border border-teal-100/80 text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-teal-700 group-hover:scale-110 transition-transform mb-3">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-teal-950 text-sm leading-tight group-hover:text-teal-700 transition-colors">My Fleet</p>
              <p className="text-[11px] text-teal-700/80 mt-0.5">Telemetry & levels</p>
            </div>
          </button>

          {/* 3. Service Request */}
          <button
            onClick={() => navigate('/client/service-request')}
            className="p-4 rounded-2xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-100/80 text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform mb-3">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-blue-950 text-sm leading-tight group-hover:text-blue-700 transition-colors">Raise Ticket</p>
              <p className="text-[11px] text-blue-700/80 mt-0.5">Service visit & SLA</p>
            </div>
          </button>

          {/* 4. Invoices */}
          <button
            onClick={() => navigate('/client/invoices')}
            className="p-4 rounded-2xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-100/80 text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-purple-950 text-sm leading-tight group-hover:text-purple-700 transition-colors">Invoices</p>
              <p className="text-[11px] text-purple-700/80 mt-0.5">Billing & GST ledger</p>
            </div>
          </button>

          {/* 5. Payments */}
          <button
            onClick={() => navigate('/client/payments')}
            className="p-4 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-100/80 text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform mb-3">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-amber-950 text-sm leading-tight group-hover:text-amber-700 transition-colors">Pay Bills</p>
              <p className="text-[11px] text-amber-700/80 mt-0.5">Bank wire & UPI</p>
            </div>
          </button>

          {/* 6. Customer Support */}
          <button
            onClick={() => navigate('/client/support')}
            className="p-4 rounded-2xl bg-rose-50/70 hover:bg-rose-100/80 border border-rose-100/80 text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-rose-700 group-hover:scale-110 transition-transform mb-3">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-rose-950 text-sm leading-tight group-hover:text-rose-700 transition-colors">Help Desk</p>
              <p className="text-[11px] text-rose-700/80 mt-0.5">24/7 dedicated line</p>
            </div>
          </button>
        </div>
      </div>

      {/* FEATURED: "BUY OR RENT PRINTERS" SHOWCASE SECTION */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">Buy or Rent Commercial Printers</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Zero CapEx Available
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Expand your company fleet with flexible monthly rental contracts (free toner & service) or direct purchase.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/client/purchases', { state: { defaultTab: 'buy-rent' } })}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
            >
              <span>View All Models & Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Featured Printers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {featuredPrinters.map((printer) => (
            <div
              key={printer.id}
              className="p-5 rounded-3xl bg-gray-50/70 border border-gray-200/70 hover:border-emerald-300 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-white border border-gray-200 text-emerald-800">
                    {printer.brand}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {printer.highlight}
                  </span>
                </div>

                <h3 className="font-extrabold text-gray-900 text-base leading-snug group-hover:text-emerald-700 transition-colors">
                  {printer.model}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{printer.type}</p>

                <div className="mt-4 p-3 rounded-2xl bg-white border border-gray-100 text-xs space-y-1.5">
                  <div className="flex justify-between text-gray-600">
                    <span>Print Speed:</span>
                    <span className="font-bold text-gray-900">{printer.speed}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Monthly Workload:</span>
                    <span className="font-bold text-gray-900">{printer.dutyCycle}</span>
                  </div>
                </div>

                {/* Price Matrix */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">Monthly Rental</span>
                    <p className="font-extrabold text-emerald-950 text-sm mt-0.5">{printer.rentPrice}</p>
                    <span className="text-[10px] text-emerald-700 block mt-0.5">Free toner & care</span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-gray-100/70 border border-gray-200">
                    <span className="text-[10px] uppercase font-bold text-gray-600 block">Outright Buy</span>
                    <p className="font-extrabold text-gray-900 text-sm mt-0.5">{printer.buyPrice}</p>
                    <span className="text-[10px] text-gray-500 block mt-0.5">1-Yr OEM warranty</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">
                  ✓ {printer.rentBenefits}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-200/60 flex items-center gap-2">
                <button
                  onClick={() => navigate('/client/purchases', { state: { defaultTab: 'buy-rent', preselectedModel: printer.model, option: 'Rent' } })}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  Rent Unit
                </button>
                <button
                  onClick={() => navigate('/client/purchases', { state: { defaultTab: 'buy-rent', preselectedModel: printer.model, option: 'Buy' } })}
                  className="flex-1 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Buy Unit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Fleet Telemetry & Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Fleet Telemetry (2 spans) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 sm:p-7">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Fleet Telemetry Status</h3>
                <p className="text-xs text-gray-500">Live consumable levels across deployed corporate printers</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/client/printers')}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1"
            >
              <span>View All (6)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {livePrinters.map((printer) => (
              <div
                key={printer.id}
                className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white rounded-xl border border-gray-200 text-gray-700 shadow-sm">
                    <Printer className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{printer.model}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {printer.location}
                    </p>
                    {printer.statusText && (
                      <span className="text-[11px] font-semibold text-amber-700 mt-1 block">
                        • {printer.statusText}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end text-xs">
                  <div className="w-32">
                    <div className="flex justify-between text-[11px] text-gray-600 font-medium mb-1">
                      <span>Toner Level</span>
                      <span className={`font-bold ${printer.toner <= 20 ? 'text-amber-600' : 'text-gray-900'}`}>{printer.toner}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${printer.toner <= 20 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${printer.toner}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/client/printers')}
                    className="px-3 py-1.5 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 border border-gray-200 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Activity & Shortcuts (1 span) */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
              <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Recent Fleet Activity</h3>
                <p className="text-xs text-gray-500">Service visits and supply events</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${act.bg} ${act.color}`}>
                    <act.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">{act.title}</p>
                    <p className="text-gray-500 text-[11px] leading-snug truncate">{act.desc}</p>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Account Support Card */}
          <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-6 text-white shadow-sm relative overflow-hidden">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">Dedicated Support</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                  Priority SLA
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-base">Suresh Patil</h4>
                <p className="text-xs text-emerald-200">Senior Key Account Manager</p>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Direct contact for fleet expansion, expedited consumable deliveries, and contract queries.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => navigate('/client/support')}
                  className="flex-1 py-2 px-3 bg-white text-emerald-900 font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors text-center cursor-pointer"
                >
                  Contact Desk
                </button>
                <a
                  href="tel:18002007746"
                  className="p-2 bg-emerald-700/80 hover:bg-emerald-700 text-white rounded-xl transition-colors cursor-pointer"
                  title="Call Emergency Hotline"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
