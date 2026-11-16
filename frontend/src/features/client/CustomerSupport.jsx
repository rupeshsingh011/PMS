import React, { useState } from 'react';
import {
  Phone, Mail, MessageSquare,
  ShieldCheck, HelpCircle, ChevronDown, ChevronUp, Send,
  CheckCircle2, Laptop, ExternalLink,
  UserCheck, ThumbsUp
} from 'lucide-react';

const faqs = [
  {
    q: 'How do I resolve a 13.00 / 13.02 Paper Jam in Tray 2?',
    a: '1. Gently slide open Tray 2 and inspect the feed rollers. 2. Remove any crumpled sheets by pulling straight outward in the direction of the paper path. 3. Ensure the tray paper guides firmly hug the media without bending. 4. If multifeed errors recur frequently, file a service request—your Diamond AMC covers free replacement of pickup rollers.'
  },
  {
    q: 'My printer shows "Offline" on the network. What steps should I take?',
    a: '1. Check the Ethernet cable at the back of the unit or confirm Wi-Fi signal indicator. 2. Ping the device IP address from your local network terminal (e.g. 192.168.10.45). 3. Power-cycle the printer (turn off, wait 30 seconds, power on). 4. If static IP binding was lost after subnet changes, our network support engineer can remotely rebind it.'
  },
  {
    q: 'What consumables are covered under our Enterprise Diamond Fleet Care plan?',
    a: '100% of OEM toner cartridges (Black, Cyan, Magenta, Yellow), replacement imaging drums, transfer belts, fuser assemblies, and waste toner collection boxes are fully covered with zero extra surcharge. Paper reams are delivered under your monthly standing quota.'
  },
  {
    q: 'What is our guaranteed on-site response time for hardware breakdowns?',
    a: 'Under your Diamond AMC SLA, certified field engineers arrive on-site within 2 hours of logging a High or Critical priority ticket in the Mumbai metropolitan area during working hours (8:00 AM - 8:00 PM), with 24/7 standby for executive lines.'
  },
  {
    q: 'How are scheduled preventive maintenance visits handled?',
    a: 'PMS automatically dispatches a senior service technician every calendar month to clean optical mirrors, calibrate printheads, lubricate gear assemblies, run diagnostic sensor tests, and update firmware.'
  }
];

const CustomerSupport = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketUrgency, setTicketUrgency] = useState('Standard');
  const [inquirySent, setInquirySent] = useState(false);

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) return;

    setInquirySent(true);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Customer Support & Help Desk</h1>
        <p className="text-sm text-gray-500 mt-1">
          Direct access to your dedicated enterprise account team, certified field technicians, and 24/7 priority emergency hotline.
        </p>
      </div>

      {inquirySent && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-sm font-medium animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Support inquiry submitted successfully! A support engineer will respond within 30 minutes.</span>
        </div>
      )}

      {/* Support Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dedicated Account Manager */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Key Account Executive
            </span>
            <h3 className="font-extrabold text-gray-900 text-base mt-2">Suresh Patil</h3>
            <p className="text-xs text-gray-500">Dedicated Account Lead for Acme Corp</p>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 space-y-2 text-xs">
            <a
              href="tel:+919820011223"
              className="flex items-center gap-2 text-gray-700 hover:text-emerald-700 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+91 98200 11223</span>
            </a>
            <a
              href="mailto:suresh.patil@pmsprinters.com"
              className="flex items-center gap-2 text-gray-500 hover:text-emerald-700 truncate"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span>suresh.patil@pmsprinters.com</span>
            </a>
          </div>
        </div>

        {/* 24/7 Breakdown Hotline */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
              24/7 Priority Hotline
            </span>
            <h3 className="font-extrabold text-gray-900 text-base mt-2">1800 200 7746</h3>
            <p className="text-xs text-gray-500">Immediate technician dispatch for line down</p>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 text-xs">
            <a
              href="tel:18002007746"
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Emergency Desk
            </a>
          </div>
        </div>

        {/* Remote Diagnostics */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Laptop className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
              Live Remote Assist
            </span>
            <h3 className="font-extrabold text-gray-900 text-base mt-2">Screen Diagnostic</h3>
            <p className="text-xs text-gray-500">Firmware, driver & IP configuration assist</p>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 text-xs">
            <button
              onClick={() => alert('Launching encrypted secure remote diagnostic portal...')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Launch Session
            </button>
          </div>
        </div>

        {/* Guaranteed SLA Tier */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
              Diamond AMC Tier
            </span>
            <h3 className="font-extrabold text-gray-900 text-base mt-2">&lt; 2hr Response</h3>
            <p className="text-xs text-gray-500">Unlimited spare parts & free OEM consumables</p>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Valid till 31 Dec 2026</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Support Inquiry Form (1 span) */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 sm:p-7">
          <div className="flex items-center gap-3 pb-4 mb-5 border-b border-gray-100">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Direct Desk Inquiry</h3>
              <p className="text-xs text-gray-500">Send notes directly to support engineers</p>
            </div>
          </div>

          <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                Subject Line *
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Question regarding monthly print quota allocation"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                Urgency Tier
              </label>
              <select
                value={ticketUrgency}
                onChange={(e) => setTicketUrgency(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Standard Question (Within 4 hours)</option>
                <option>High Priority (Within 1 hour)</option>
                <option>Contract & Billing Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider text-[10px] mb-1">
                Detailed Message *
              </label>
              <textarea
                rows={5}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Describe your question, equipment model, or requested documentation..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit to Help Desk
            </button>
          </form>
        </div>

        {/* Self-Service Troubleshooting Knowledge Base (2 spans) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 sm:p-7">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Knowledge Base & Quick Troubleshooting</h3>
                <p className="text-xs text-gray-500">Step-by-step solutions for frequent printer operational questions</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all ${
                    isOpen ? 'border-emerald-200 bg-emerald-50/20' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-gray-900 text-sm"
                  >
                    <span>{faq.q}</span>
                    <span className="text-gray-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-emerald-100/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs">
              <div className="p-2 bg-emerald-600 text-white rounded-xl">
                <ThumbsUp className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Need On-Site Technician Dispatched?</p>
                <p className="text-gray-500">Raise a direct repair ticket to have an engineer visit your floor.</p>
              </div>
            </div>
            <a
              href="/client/service-request"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
            >
              Go to Service Request
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
