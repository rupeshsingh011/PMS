import React, { useState } from 'react';
import {
  Settings, Building2, Users, ShieldCheck, HardDrive, SlidersHorizontal,
  Save, Plus, Edit2, Trash2, Upload, Download, Eye, EyeOff,
  CheckCircle, XCircle, AlertCircle, Globe, Mail, Phone,
  Lock, Key, UserPlus, RefreshCw, Calendar, Clock, Database,
  Camera, MapPin, FileText, Wifi, Shield, ChevronDown
} from 'lucide-react';

// ─── Shared horizontal tab bar ────────────────────────────────────────────────
const TabBar = ({ tabs, active, onChange }) => (
  <div className="border-b border-gray-200 mb-6">
    <div className="flex gap-1 overflow-x-auto">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
            active === t.id
              ? 'border-blue-600 text-blue-700 bg-blue-50/50'
              : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
          }`}
        >
          <t.Icon className="w-4 h-4" />
          {t.label}
        </button>
      ))}
    </div>
  </div>
);

// ─── Section: Company Settings ────────────────────────────────────────────────
const CompanySettings = () => {
  const [form, setForm] = useState({
    name: 'PrinterPro Management Pvt. Ltd.',
    email: 'admin@printerpro.in',
    phone: '+91 98765 43210',
    address: '12, Tech Park, Whitefield, Bengaluru – 560066',
    website: 'https://printerpro.in',
    gst: '29AABCP1234F1Z5',
    pan: 'AABCP1234F',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Company Settings</h2>
          <p className="text-gray-500 text-sm mt-0.5">Manage your organization details</p>
        </div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logo Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-800 text-sm">Company Logo</p>
            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 2MB</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors w-full justify-center">
            <Camera className="w-4 h-4" /> Upload Logo
          </button>
        </div>

        {/* Form Fields */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 pb-2 border-b border-gray-100">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Company Name', key: 'name', icon: Building2, type: 'text' },
              { label: 'Email Address', key: 'email', icon: Mail, type: 'email' },
              { label: 'Phone Number', key: 'phone', icon: Phone, type: 'tel' },
              { label: 'Website', key: 'website', icon: Globe, type: 'url' },
              { label: 'GST Number', key: 'gst', icon: FileText, type: 'text' },
              { label: 'PAN Number', key: 'pan', icon: FileText, type: 'text' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <div className="relative">
                  <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} rows={2}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="INR">INR – Indian Rupee (₹)</option>
                <option value="USD">USD – US Dollar ($)</option>
                <option value="EUR">EUR – Euro (€)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select value={form.timezone} onChange={e => setForm({ ...form, timezone: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York (EST)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Section: User Management ─────────────────────────────────────────────────
const users = [
  { id: 1, name: 'Ravi Kumar', email: 'ravi@printerpro.in', role: 'Super Admin', status: 'Active', last: '2026-07-15 10:30', avatar: 'RK' },
  { id: 2, name: 'Priya Sharma', email: 'priya@printerpro.in', role: 'Manager', status: 'Active', last: '2026-07-15 09:15', avatar: 'PS' },
  { id: 3, name: 'Amit Singh', email: 'amit@printerpro.in', role: 'Technician', status: 'Active', last: '2026-07-14 17:45', avatar: 'AS' },
  { id: 4, name: 'Neha Joshi', email: 'neha@printerpro.in', role: 'Accountant', status: 'Inactive', last: '2026-07-10 12:00', avatar: 'NJ' },
  { id: 5, name: 'Suresh Babu', email: 'suresh@printerpro.in', role: 'Support', status: 'Active', last: '2026-07-15 08:50', avatar: 'SB' },
];

const avatarColors = ['bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-amber-600', 'bg-rose-600'];

const UserManagement = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-500 text-sm mt-0.5">Manage admin and staff accounts</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 border border-gray-200 focus-within:border-blue-500 transition-all">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="bg-transparent border-none outline-none ml-2 text-sm w-36" />
          </div>
          <button onClick={() => setShowAdd(v => !v)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
            <UserPlus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* Add User Form */}
      {showAdd && (
        <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6 space-y-4">
          <h3 className="font-semibold text-gray-800">Add New User</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="john@company.in" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option>Manager</option><option>Technician</option><option>Accountant</option><option>Support</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input type="password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" placeholder="+91 00000 00000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 flex items-center gap-2"><Save className="w-4 h-4" /> Create User</button>
            <button onClick={() => setShowAdd(false)} className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              {['User', 'Email', 'Role', 'Status', 'Last Active', 'Actions'].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((u, i) => (
              <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} text-white text-xs font-bold flex items-center justify-center`}>{u.avatar}</div>
                    <span className="font-medium text-gray-900">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-500 text-sm">{u.email}</td>
                <td className="px-5 py-4"><span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{u.role}</span></td>
                <td className="px-5 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{u.status}</span></td>
                <td className="px-5 py-4 text-gray-500 text-sm">{u.last}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1.5 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"><Key className="w-4 h-4" /></button>
                    <button className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Section: Roles & Permissions ─────────────────────────────────────────────
const rolesData = [
  { role: 'Super Admin', users: 1, color: 'bg-purple-100 text-purple-700', perms: { dashboard: true, clients: true, printers: true, sales: true, accounts: true, reports: true, notifications: true, settings: true, support: true } },
  { role: 'Manager', users: 2, color: 'bg-blue-100 text-blue-700', perms: { dashboard: true, clients: true, printers: true, sales: true, accounts: false, reports: true, notifications: true, settings: false, support: true } },
  { role: 'Technician', users: 5, color: 'bg-emerald-100 text-emerald-700', perms: { dashboard: true, clients: false, printers: true, sales: false, accounts: false, reports: false, notifications: true, settings: false, support: true } },
  { role: 'Accountant', users: 2, color: 'bg-amber-100 text-amber-700', perms: { dashboard: true, clients: false, printers: false, sales: true, accounts: true, reports: true, notifications: false, settings: false, support: false } },
  { role: 'Support', users: 3, color: 'bg-rose-100 text-rose-700', perms: { dashboard: true, clients: true, printers: false, sales: false, accounts: false, reports: false, notifications: true, settings: false, support: true } },
];
const modules = ['dashboard', 'clients', 'printers', 'sales', 'accounts', 'reports', 'notifications', 'settings', 'support'];

const RolesPermissions = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Roles & Permissions</h2>
          <p className="text-gray-500 text-sm mt-0.5">Manage what each role can access</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> New Role
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {rolesData.map(r => (
          <button key={r.role} onClick={() => setSelected(selected === r.role ? null : r.role)}
            className={`bg-white rounded-2xl border shadow-sm p-4 text-left transition-all hover:shadow-md ${selected === r.role ? 'border-blue-400 ring-2 ring-blue-200' : 'border-gray-100'}`}>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.color}`}>{r.role}</span>
            <p className="text-2xl font-bold text-gray-900 mt-2">{r.users}</p>
            <p className="text-xs text-gray-400">users</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Permission Matrix</h3>
          <p className="text-xs text-gray-400 mt-0.5">Click a role card above to highlight its column</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-5 py-4 font-semibold">Module</th>
                {rolesData.map(r => (
                  <th key={r.role} className={`px-4 py-4 font-semibold text-center ${selected === r.role ? 'bg-blue-50 text-blue-700' : ''}`}>{r.role}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {modules.map(mod => (
                <tr key={mod} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800 capitalize">{mod}</td>
                  {rolesData.map(r => (
                    <td key={r.role} className={`px-4 py-3.5 text-center ${selected === r.role ? 'bg-blue-50/50' : ''}`}>
                      {r.perms[mod]
                        ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        : <XCircle className="w-5 h-5 text-gray-300 mx-auto" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Section: Backup ──────────────────────────────────────────────────────────
const backupHistory = [
  { id: 'BKP-007', name: 'Full Backup – July 2026', size: '84.2 MB', date: '2026-07-15 02:00', type: 'Automated', status: 'Success' },
  { id: 'BKP-006', name: 'Full Backup – June 2026', size: '79.1 MB', date: '2026-06-30 02:00', type: 'Automated', status: 'Success' },
  { id: 'BKP-005', name: 'Manual Backup – Post Migration', size: '82.7 MB', date: '2026-06-15 14:30', type: 'Manual', status: 'Success' },
  { id: 'BKP-004', name: 'Full Backup – May 2026', size: '71.3 MB', date: '2026-05-31 02:00', type: 'Automated', status: 'Failed' },
];

const Backup = () => {
  const [creating, setCreating] = useState(false);
  const [done, setDone] = useState(false);

  const handleBackup = () => {
    setCreating(true);
    setTimeout(() => { setCreating(false); setDone(true); setTimeout(() => setDone(false), 3000); }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Backup</h2>
          <p className="text-gray-500 text-sm mt-0.5">Data backup and restore management</p>
        </div>
        <button onClick={handleBackup} disabled={creating}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${done ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} disabled:opacity-70`}>
          {creating ? <RefreshCw className="w-4 h-4 animate-spin" /> : done ? <CheckCircle className="w-4 h-4" /> : <Database className="w-4 h-4" />}
          {creating ? 'Creating Backup...' : done ? 'Backup Created!' : 'Create Backup Now'}
        </button>
      </div>

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Last Backup', value: '2026-07-15, 2:00 AM', icon: Clock, color: 'bg-blue-50 border-blue-100 text-blue-700' },
          { label: 'Total Backups', value: backupHistory.length, icon: HardDrive, color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
          { label: 'Storage Used', value: '84.2 MB', icon: Database, color: 'bg-purple-50 border-purple-100 text-purple-700' },
        ].map(c => (
          <div key={c.label} className={`border rounded-2xl p-5 flex items-center gap-4 ${c.color}`}>
            <c.icon className="w-8 h-8 opacity-70" />
            <div>
              <p className="text-sm opacity-80">{c.label}</p>
              <p className="text-xl font-bold mt-0.5">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Backup Schedule */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">Backup Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
            <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
              <option>Daily</option><option>Weekly</option><option>Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input type="time" defaultValue="02:00" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Retention (days)</label>
            <input type="number" defaultValue="30" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
            <span className="text-sm text-gray-700">Send backup notification to admin email</span>
          </label>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
          <Save className="w-4 h-4" /> Save Schedule
        </button>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Backup History</h3>
          <button className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline"><Download className="w-4 h-4" /> Export Log</button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              {['ID', 'Backup Name', 'Size', 'Date & Time', 'Type', 'Status', 'Actions'].map(h => <th key={h} className="px-5 py-4 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {backupHistory.map(b => (
              <tr key={b.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-gray-400">{b.id}</td>
                <td className="px-5 py-4 font-medium text-gray-900 text-sm">{b.name}</td>
                <td className="px-5 py-4 text-gray-500 text-sm">{b.size}</td>
                <td className="px-5 py-4 text-gray-500 text-sm">{b.date}</td>
                <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${b.type === 'Automated' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{b.type}</span></td>
                <td className="px-5 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${b.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{b.status}</span></td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Download"><Download className="w-4 h-4" /></button>
                    <button className="p-1.5 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors" title="Restore"><RefreshCw className="w-4 h-4" /></button>
                    <button className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Section: General Settings ────────────────────────────────────────────────
const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    emailNotif: true, smsNotif: true, maintenanceMode: false,
    twoFactor: true, sessionTimeout: '30', dateFormat: 'DD/MM/YYYY',
    language: 'en', theme: 'light', autoLogout: true,
  });
  const [saved, setSaved] = useState(false);

  const toggle = key => setSettings(s => ({ ...s, [key]: !s[key] }));
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const Toggle = ({ on, onClick }) => (
    <button onClick={onClick} className={`relative w-11 h-6 rounded-full transition-colors ${on ? 'bg-blue-600' : 'bg-gray-300'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">General Settings</h2>
          <p className="text-gray-500 text-sm mt-0.5">System preferences and configuration</p>
        </div>
        <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Toggle Settings */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-1">
          <h3 className="font-semibold text-gray-800 mb-4">Notifications & Security</h3>
          {[
            { key: 'emailNotif', label: 'Email Notifications', desc: 'Receive system alerts via email' },
            { key: 'smsNotif', label: 'SMS Notifications', desc: 'Receive SMS for critical events' },
            { key: 'twoFactor', label: '2-Factor Authentication', desc: 'Require OTP for all logins' },
            { key: 'autoLogout', label: 'Auto Logout', desc: 'Logout inactive sessions automatically' },
            { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Disable portal for non-admins' },
          ].map(s => (
            <div key={s.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
              <div>
                <p className="font-medium text-gray-800 text-sm">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.desc}</p>
              </div>
              <Toggle on={settings[s.key]} onClick={() => toggle(s.key)} />
            </div>
          ))}
        </div>

        {/* Preference Settings */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-semibold text-gray-800 mb-2">Display Preferences</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select value={settings.language} onChange={e => setSettings(s => ({ ...s, language: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
              <select value={settings.dateFormat} onChange={e => setSettings(s => ({ ...s, dateFormat: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50">
                <option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
              <div className="flex gap-3">
                {['Light', 'Dark', 'System'].map(t => (
                  <button key={t} onClick={() => setSettings(s => ({ ...s, theme: t.toLowerCase() }))}
                    className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-all ${settings.theme === t.toLowerCase() ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <h3 className="font-semibold text-gray-800 mb-2">Security</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
              <input type="number" value={settings.sessionTimeout} onChange={e => setSettings(s => ({ ...s, sessionTimeout: e.target.value }))}
                min="5" max="480" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">Changing security settings will require all active sessions to re-authenticate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Tab Config ───────────────────────────────────────────────────────────────
const tabs = [
  { id: 'company', label: 'Company Settings', Icon: Building2, Component: CompanySettings },
  { id: 'users', label: 'User Management', Icon: Users, Component: UserManagement },
  { id: 'roles', label: 'Roles & Permissions', Icon: ShieldCheck, Component: RolesPermissions },
  { id: 'backup', label: 'Backup', Icon: HardDrive, Component: Backup },
  { id: 'general', label: 'General Settings', Icon: SlidersHorizontal, Component: GeneralSettings },
];

// ─── Main Export ──────────────────────────────────────────────────────────────
const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const ActiveComponent = tabs.find(t => t.id === activeTab)?.Component || CompanySettings;

  return (
    <div className="space-y-0">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" /> Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">Configure your system preferences and administration options</p>
      </div>
      <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
      <ActiveComponent />
    </div>
  );
};

export default AdminSettings;
