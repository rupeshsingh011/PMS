import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle, Clock, HelpCircle, Phone,
  Send, Search, ChevronDown, ChevronUp,
  CheckCircle, User, Bot, Mail, Globe,
  Headphones, Star, ThumbsUp, ThumbsDown,
  AlertCircle, ArrowRight, ExternalLink, MapPin
} from 'lucide-react';

// ─── Shared Tab Bar ───────────────────────────────────────────────────────────
const TabBar = ({ tabs, active, onChange }) => (
  <div className="border-b border-gray-200 mb-6">
    <div className="flex gap-1 overflow-x-auto">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            active === t.id
              ? 'border-rose-500 text-rose-600 bg-rose-50/50'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}>
          <t.Icon className="w-4 h-4" />
          {t.label}
        </button>
      ))}
    </div>
  </div>
);

// ─── Section: Live Chat ───────────────────────────────────────────────────────
const initialMessages = [
  { id: 1, from: 'bot', text: 'Hello! Welcome to PrinterPro Support. How can I help you today?', time: '10:00 AM' },
  { id: 2, from: 'user', text: 'Hi, my printer at Wayne Enterprises is showing offline status.', time: '10:01 AM' },
  { id: 3, from: 'bot', text: 'I understand. Let me check the status of your devices. Could you please confirm the Printer ID or serial number?', time: '10:01 AM' },
  { id: 4, from: 'user', text: 'It is HP-WAYNE-003.', time: '10:02 AM' },
  { id: 5, from: 'bot', text: 'Found it. Printer HP-WAYNE-003 (HP LaserJet Pro) shows as offline since 2:45 PM yesterday. A technician has been automatically notified. Expected response time: 2 hours.', time: '10:02 AM' },
];

const onlineAgents = [
  { name: 'Raj Kumar', status: 'online', avatar: 'RK', color: 'bg-emerald-600', chats: 2 },
  { name: 'Deepa Nair', status: 'online', avatar: 'DN', color: 'bg-blue-600', chats: 1 },
  { name: 'Sanjay Rao', status: 'busy', avatar: 'SR', color: 'bg-amber-600', chats: 4 },
];

const LiveChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = { id: Date.now(), from: 'user', text: input, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(m => [...m, msg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(m => [...m, { id: Date.now() + 1, from: 'bot', text: 'Thank you for your message. A support agent will assist you shortly. Your ticket ID is TKT-' + Math.floor(1000 + Math.random() * 9000) + '.', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1800);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Live Chat</h2>
          <p className="text-gray-500 text-sm mt-0.5">Real-time support with our agents</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 border border-green-200 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-green-700">{onlineAgents.filter(a => a.status === 'online').length} Agents Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Agent List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
          <h3 className="font-semibold text-gray-800 text-sm">Support Agents</h3>
          {onlineAgents.map(a => (
            <div key={a.name} className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-9 h-9 rounded-full ${a.color} text-white text-xs font-bold flex items-center justify-center`}>{a.avatar}</div>
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${a.status === 'online' ? 'bg-green-500' : 'bg-amber-500'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{a.name}</p>
                <p className="text-xs text-gray-400">{a.chats} active {a.chats === 1 ? 'chat' : 'chats'}</p>
              </div>
            </div>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-400">Avg. wait time: <span className="font-semibold text-gray-700">~3 min</span></div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col" style={{ height: '500px' }}>
          {/* Chat Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">RK</div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Raj Kumar</p>
              <p className="text-xs text-green-600">Online · Support Agent</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><Phone className="w-4 h-4" /></button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"><Mail className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map(m => (
              <div key={m.id} className={`flex gap-2.5 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${m.from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {m.from === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`max-w-xs lg:max-w-sm ${m.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.from === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm shadow-sm'}`}>
                    {m.text}
                  </div>
                  <span className="text-xs text-gray-400">{m.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 shrink-0 flex items-center justify-center text-xs font-bold">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 flex gap-3">
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            <button onClick={sendMessage}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5 text-sm font-semibold">
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Section: 24×7 Support ────────────────────────────────────────────────────
const Support247 = () => {
  const tickets = [
    { id: 'TKT-015', issue: 'Printer HP-WAYNE-003 offline', client: 'Wayne Enterprises', priority: 'Critical', status: 'Open', assigned: 'Raj Kumar', created: '2026-07-15 08:30' },
    { id: 'TKT-014', issue: 'Ink cartridge replacement needed', client: 'Acme Corp', priority: 'High', status: 'In Progress', assigned: 'Amit Singh', created: '2026-07-14 14:00' },
    { id: 'TKT-013', issue: 'Paper jam clearing – Canon PIXMA', client: 'Globex Inc', priority: 'Medium', status: 'In Progress', assigned: 'Raj Kumar', created: '2026-07-14 11:15' },
    { id: 'TKT-012', issue: 'Network connectivity issue', client: 'Initech LLC', priority: 'Low', status: 'Resolved', assigned: 'Deepa Nair', created: '2026-07-13 09:00' },
  ];
  const priorityConfig = {
    Critical: 'bg-red-100 text-red-700',
    High: 'bg-orange-100 text-orange-700',
    Medium: 'bg-amber-100 text-amber-700',
    Low: 'bg-blue-100 text-blue-700',
  };
  const statusConfig = {
    Open: 'bg-red-100 text-red-700',
    'In Progress': 'bg-amber-100 text-amber-700',
    Resolved: 'bg-green-100 text-green-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">24×7 Support</h2>
          <p className="text-gray-500 text-sm mt-0.5">Round-the-clock technical assistance</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 transition-colors">
          <AlertCircle className="w-4 h-4" /> Raise Emergency Ticket
        </button>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          <span className="font-bold text-lg">All Systems Operational</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { label: 'Response SLA', value: '< 2 hrs', icon: Clock },
            { label: 'Resolution SLA', value: '< 24 hrs', icon: CheckCircle },
            { label: 'Uptime', value: '99.8%', icon: Globe },
            { label: 'Support Hours', value: '24 × 7 × 365', icon: Headphones },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <s.icon className="w-4 h-4 opacity-75" />
              <div>
                <p className="opacity-75 text-xs">{s.label}</p>
                <p className="font-bold">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escalation Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Emergency Hotline', value: '+91 1800-PRINTER', icon: Phone, color: 'bg-red-50 border-red-200 text-red-700' },
          { label: 'Support Email', value: 'support@printerpro.in', icon: Mail, color: 'bg-blue-50 border-blue-200 text-blue-700' },
          { label: 'WhatsApp Support', value: '+91 98765 43210', icon: MessageCircle, color: 'bg-green-50 border-green-200 text-green-700' },
        ].map(c => (
          <div key={c.label} className={`border rounded-2xl p-5 flex items-center gap-4 ${c.color}`}>
            <c.icon className="w-8 h-8 opacity-60" />
            <div>
              <p className="text-xs opacity-70">{c.label}</p>
              <p className="font-bold text-sm mt-0.5">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Tickets */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Active Support Tickets</h3>
          <span className="text-xs bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">{tickets.filter(t => t.status !== 'Resolved').length} Open</span>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              {['Ticket ID', 'Issue', 'Client', 'Priority', 'Status', 'Assigned To', 'Created'].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.map(t => (
              <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-blue-600 font-bold">{t.id}</td>
                <td className="px-5 py-4 text-gray-900 text-sm font-medium">{t.issue}</td>
                <td className="px-5 py-4 text-gray-500 text-sm">{t.client}</td>
                <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${priorityConfig[t.priority]}`}>{t.priority}</span></td>
                <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[t.status]}`}>{t.status}</span></td>
                <td className="px-5 py-4 text-gray-500 text-sm">{t.assigned}</td>
                <td className="px-5 py-4 text-gray-500 text-xs">{t.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Section: FAQ ─────────────────────────────────────────────────────────────
const faqs = [
  {
    category: 'Printers & Devices',
    items: [
      { q: 'How do I check if my printer is online?', a: 'Go to Printers → select your printer → check the Status column. A green "Online" badge means the device is connected and ready. You can also click "Refresh Status" to get a live update.' },
      { q: 'My printer shows "Paper Jam" — what do I do?', a: 'First, turn off the printer. Open all access panels and gently remove any jammed paper. Ensure no torn pieces remain. Close all covers, turn the printer back on, and try printing again. If the issue persists, raise a support ticket.' },
      { q: 'How do I order replacement ink cartridges?', a: 'Navigate to Inventory → Ink Cartridges, select your printer model, and click "Request Reorder". Alternatively, call your assigned account manager for urgent orders.' },
    ],
  },
  {
    category: 'Billing & Payments',
    items: [
      { q: 'When is my invoice generated?', a: "Invoices are generated on the 1st of every month for the previous month's services, or immediately after a one-time service is completed. You will receive an email notification." },
      { q: 'What payment methods are accepted?', a: 'We accept Bank Transfer (NEFT/RTGS/IMPS), UPI, Cheque, and Cash. All payments should reference your Invoice Number for faster processing.' },
      { q: 'How do I view my payment history?', a: 'Go to Accounts → Payment Records. You can filter by date range or client and export records as PDF or CSV.' },
    ],
  },
  {
    category: 'Account & Access',
    items: [
      { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page and enter your registered email. A reset link will be sent within 2 minutes. The link expires in 30 minutes.' },
      { q: 'Can I have multiple users under one company account?', a: 'Yes. Go to Settings → User Management and add users with appropriate roles (Manager, Technician, Accountant, Support). Each user gets their own login credentials.' },
    ],
  },
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [search, setSearch] = useState('');
  const [ratings, setRatings] = useState({});

  const toggleItem = key => setOpenItems(p => ({ ...p, [key]: !p[key] }));
  const rateItem = (key, val) => setRatings(p => ({ ...p, [key]: val }));

  const allItems = faqs.flatMap(c => c.items.map(i => ({ ...i, category: c.category })));
  const filtered = search ? allItems.filter(i => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900">FAQ</h2>
          <p className="text-gray-500 text-sm mt-0.5">Frequently asked questions and answers</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search FAQs..."
          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50" />
      </div>

      {/* Filtered Search Results */}
      {filtered ? (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No FAQs matched your search.</div>
          ) : filtered.map((item, i) => {
            const key = `search-${i}`;
            return (
              <div key={key} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => toggleItem(key)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors">
                  <div>
                    <span className="text-xs text-rose-600 font-semibold mr-2">{item.category}</span>
                    <span className="font-semibold text-gray-900 text-sm">{item.q}</span>
                  </div>
                  {openItems[key] ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                </button>
                {openItems[key] && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs text-gray-400">Helpful?</span>
                      <button onClick={() => rateItem(key, 'up')} className={`p-1.5 rounded-lg transition-colors ${ratings[key] === 'up' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:bg-green-50 hover:text-green-500'}`}><ThumbsUp className="w-4 h-4" /></button>
                      <button onClick={() => rateItem(key, 'down')} className={`p-1.5 rounded-lg transition-colors ${ratings[key] === 'down' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:bg-red-50 hover:text-red-500'}`}><ThumbsDown className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        faqs.map(cat => (
          <div key={cat.category}>
            <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-3">{cat.category}</h3>
            <div className="space-y-2">
              {cat.items.map((item, i) => {
                const key = `${cat.category}-${i}`;
                return (
                  <div key={key} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <button onClick={() => toggleItem(key)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors">
                      <span className="font-semibold text-gray-900 text-sm">{item.q}</span>
                      {openItems[key] ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                    </button>
                    {openItems[key] && (
                      <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                        <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-xs text-gray-400">Was this helpful?</span>
                          <button onClick={() => rateItem(key, 'up')} className={`p-1.5 rounded-lg transition-colors ${ratings[key] === 'up' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:bg-green-50 hover:text-green-500'}`}><ThumbsUp className="w-4 h-4" /></button>
                          <button onClick={() => rateItem(key, 'down')} className={`p-1.5 rounded-lg transition-colors ${ratings[key] === 'down' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:bg-red-50 hover:text-red-500'}`}><ThumbsDown className="w-4 h-4" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// ─── Section: Contact Support ─────────────────────────────────────────────────
const ContactSupport = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', category: '', priority: 'Medium', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', category: '', priority: 'Medium', message: '' });
  };

  const contacts = [
    { label: 'Phone Support', value: '+91 1800-PRINTER (Toll Free)', icon: Phone, sub: 'Mon–Sat, 9 AM – 8 PM', color: 'bg-blue-50 border-blue-200' },
    { label: 'Email Support', value: 'support@printerpro.in', icon: Mail, sub: 'Reply within 4 hours', color: 'bg-emerald-50 border-emerald-200' },
    { label: 'Emergency Line', value: '+91 98765 43210', icon: AlertCircle, sub: '24×7 for critical issues', color: 'bg-red-50 border-red-200' },
    { label: 'Office Address', value: '12, Tech Park, Whitefield, Bengaluru – 560066', icon: MapPin, sub: 'Mon–Fri, 9 AM – 6 PM', color: 'bg-amber-50 border-amber-200' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Contact Support</h2>
        <p className="text-gray-500 text-sm mt-0.5">Reach us through any channel or submit a support request</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map(c => (
          <div key={c.label} className={`border rounded-2xl p-5 flex items-start gap-4 ${c.color}`}>
            <c.icon className="w-6 h-6 text-gray-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 font-medium">{c.label}</p>
              <p className="font-bold text-gray-900 text-sm mt-0.5">{c.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-rose-500" /> Submit a Support Ticket
        </h3>

        {submitted && (
          <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <p className="font-semibold text-green-800 text-sm">Ticket submitted successfully!</p>
              <p className="text-xs text-green-600 mt-0.5">Ticket ID: TKT-{Math.floor(1000 + Math.random() * 9000)}. You will receive a confirmation email shortly.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50" placeholder="+91 00000 00000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Category *</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50">
                <option value="">Select category...</option>
                <option>Printer Offline</option>
                <option>Paper Jam</option>
                <option>Ink / Toner Issue</option>
                <option>Billing / Invoicing</option>
                <option>Account Access</option>
                <option>AMC / Warranty</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <div className="flex gap-3">
              {['Low', 'Medium', 'High', 'Critical'].map(p => (
                <button type="button" key={p} onClick={() => setForm(f => ({ ...f, priority: p }))}
                  className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-all ${form.priority === p
                    ? p === 'Critical' ? 'border-red-500 bg-red-50 text-red-700'
                    : p === 'High' ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : p === 'Medium' ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue Description *</label>
            <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4} required
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50 resize-none"
              placeholder="Describe your issue in detail..." />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 transition-colors">
              <Send className="w-4 h-4" /> Submit Ticket
            </button>
            <button type="reset" onClick={() => setForm({ name: '', email: '', phone: '', category: '', priority: 'Medium', message: '' })}
              className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Tab Config ───────────────────────────────────────────────────────────────
const tabs = [
  { id: 'livechat', label: 'Live Chat', Icon: MessageCircle, Component: LiveChat },
  { id: 'support247', label: '24×7 Support', Icon: Headphones, Component: Support247 },
  { id: 'faq', label: 'FAQ', Icon: HelpCircle, Component: FAQ },
  { id: 'contact', label: 'Contact Support', Icon: Phone, Component: ContactSupport },
];

// ─── Main Export ──────────────────────────────────────────────────────────────
const CustomerCare = () => {
  const [activeTab, setActiveTab] = useState('livechat');
  const ActiveComponent = tabs.find(t => t.id === activeTab)?.Component || LiveChat;

  return (
    <div>
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Headphones className="w-6 h-6 text-rose-600" /> Support Center
        </h1>
        <p className="text-gray-500 text-sm mt-1">Get help, explore FAQs, or connect with our support team</p>
      </div>
      <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
      <ActiveComponent />
    </div>
  );
};

export default CustomerCare;
