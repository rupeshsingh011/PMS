import React, { useState } from 'react';
import {
  Building2, Mail, Phone, MapPin, ShieldCheck,
  Edit3, Save, X, CheckCircle2,
  Lock, Key, Bell, FileText,
  Printer, UserCheck, AlertCircle, Copy, Check
} from 'lucide-react';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Profile State
  const [profile, setProfile] = useState({
    companyName: 'Acme Technologies Ltd.',
    clientId: 'CLI-88219',
    industry: 'Information Technology & Services',
    gstin: '27AABCA1234F1Z8',
    pan: 'AABCA1234F',
    website: 'https://acmetech.example.com',
    primaryContact: {
      name: 'Aditya Verma',
      designation: 'Head of IT & Infrastructure',
      email: 'aditya.verma@acmetech.example.com',
      phone: '+91 98765 43210',
      secondaryPhone: '+91 22 6789 0123'
    },
    billingAddress: {
      addressLine: 'Plot 42, Tech Park Central, MIDC',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400093',
      country: 'India'
    },
    shippingAddress: {
      addressLine: 'Building B, 4th Floor, IT Wing, Tech Park Central',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400093',
      country: 'India'
    },
    membership: {
      planName: 'Enterprise Diamond Fleet Care',
      planId: 'AMC-2024-ED89',
      status: 'Active',
      startDate: '01 Jan 2024',
      renewalDate: '31 Dec 2026',
      printersCovered: 8,
      slaResponseTime: '< 2 Hours',
      accountManager: {
        name: 'Suresh Patil',
        email: 'suresh.patil@pmsprinters.com',
        phone: '+91 98200 11223'
      }
    }
  });

  const [editForm, setEditForm] = useState({ ...profile });

  // Password Change State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    tonerAlerts: true,
    maintenanceSchedules: true,
    ticketUpdates: true,
    invoiceAlerts: true,
    smsAlerts: false
  });

  const handleCopy = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...editForm });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'Please fill in all password fields.' });
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordStatus({ type: 'error', message: 'New password must be at least 8 characters long.' });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    setPasswordStatus({ type: 'success', message: 'Password updated successfully!' });
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordStatus({ type: '', message: '' }), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 font-sans">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-white/5 rounded-full blur-3xl pointer-events-none transform translate-x-32" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-extrabold shadow-inner text-white">
              <Building2 className="w-10 h-10 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{profile.companyName}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Active Client
                </span>
              </div>
              <p className="text-emerald-100 text-sm mt-1 flex items-center gap-3 flex-wrap">
                <span>Client ID: <span className="font-mono font-semibold text-white">{profile.clientId}</span></span>
                <span className="text-emerald-300">•</span>
                <span>{profile.industry}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {!isEditing ? (
              <button
                onClick={() => {
                  setEditForm({ ...profile });
                  setIsEditing(true);
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-emerald-800 rounded-xl font-semibold text-sm hover:bg-emerald-50 transition-all shadow-md active:scale-95 w-full md:w-auto"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/15 text-white border border-white/30 rounded-xl font-semibold text-sm hover:bg-white/25 transition-all w-full md:w-auto"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15 text-xs sm:text-sm">
          <div>
            <span className="text-emerald-200 block text-xs">Active Plan</span>
            <span className="font-semibold text-white mt-0.5 block truncate">{profile.membership.planName}</span>
          </div>
          <div>
            <span className="text-emerald-200 block text-xs">Printers Managed</span>
            <span className="font-semibold text-white mt-0.5 block">{profile.membership.printersCovered} Registered Units</span>
          </div>
          <div>
            <span className="text-emerald-200 block text-xs">Contract Validity</span>
            <span className="font-semibold text-white mt-0.5 block">Until {profile.membership.renewalDate}</span>
          </div>
          <div>
            <span className="text-emerald-200 block text-xs">Priority SLA Tier</span>
            <span className="font-semibold text-white mt-0.5 block text-emerald-200">{profile.membership.slaResponseTime} Response</span>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 flex items-center gap-3 text-sm font-medium animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Company & Contact Information (2 spans) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card: Primary Organization Details */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 sm:p-7">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Company & Contact Details</h2>
                  <p className="text-xs text-gray-500">Official business profile and representative contacts</p>
                </div>
              </div>
            </div>

            {!isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
                  <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Company Legal Name</span>
                  <p className="text-base font-bold text-gray-900 mt-1">{profile.companyName}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
                  <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Industry Sector</span>
                  <p className="text-base font-semibold text-gray-800 mt-1">{profile.industry}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">GSTIN</span>
                    <button
                      onClick={() => handleCopy(profile.gstin, 'gstin')}
                      className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
                    >
                      {copiedField === 'gstin' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedField === 'gstin' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-base font-mono font-bold text-gray-900 mt-1">{profile.gstin}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Permanent Account No. (PAN)</span>
                    <button
                      onClick={() => handleCopy(profile.pan, 'pan')}
                      className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
                    >
                      {copiedField === 'pan' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedField === 'pan' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-base font-mono font-bold text-gray-900 mt-1">{profile.pan}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100 sm:col-span-2">
                  <span className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Authorized IT Representative</span>
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-bold text-gray-900">{profile.primaryContact.name}</p>
                      <p className="text-xs text-gray-500">{profile.primaryContact.designation}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-600">
                      <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                        {profile.primaryContact.email}
                      </span>
                      <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        {profile.primaryContact.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Company Legal Name</label>
                    <input
                      type="text"
                      value={editForm.companyName}
                      onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Industry Sector</label>
                    <input
                      type="text"
                      value={editForm.industry}
                      onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">GSTIN</label>
                    <input
                      type="text"
                      value={editForm.gstin}
                      onChange={(e) => setEditForm({ ...editForm, gstin: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">PAN Number</label>
                    <input
                      type="text"
                      value={editForm.pan}
                      onChange={(e) => setEditForm({ ...editForm, pan: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Primary Representative Contact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.primaryContact.name}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          primaryContact: { ...editForm.primaryContact, name: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Designation</label>
                      <input
                        type="text"
                        value={editForm.primaryContact.designation}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          primaryContact: { ...editForm.primaryContact, designation: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={editForm.primaryContact.email}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          primaryContact: { ...editForm.primaryContact, email: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={editForm.primaryContact.phone}
                        onChange={(e) => setEditForm({
                          ...editForm,
                          primaryContact: { ...editForm.primaryContact, phone: e.target.value }
                        })}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    Save Details
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Card: Addresses & Delivery Locations */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 sm:p-7">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Locations & Addresses</h2>
                <p className="text-xs text-gray-500">Official billing and equipment servicing delivery destinations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      Billing Address
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mt-2">{profile.billingAddress.addressLine}</p>
                  <p className="text-sm text-gray-600">{profile.billingAddress.city}, {profile.billingAddress.state} - {profile.billingAddress.postalCode}</p>
                  <p className="text-xs text-gray-500 mt-1">{profile.billingAddress.country}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-xs text-gray-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Matches Corporate Tax Records
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                      Equipment Site / Delivery
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mt-2">{profile.shippingAddress.addressLine}</p>
                  <p className="text-sm text-gray-600">{profile.shippingAddress.city}, {profile.shippingAddress.state} - {profile.shippingAddress.postalCode}</p>
                  <p className="text-xs text-gray-500 mt-1">{profile.shippingAddress.country}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200/60 text-xs text-gray-500 flex items-center gap-2">
                  <Printer className="w-4 h-4 text-blue-600" /> Primary Fleet Facility
                </div>
              </div>
            </div>
          </div>

          {/* Card: Account Security (Change Password) */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6 sm:p-7">
            <div className="flex items-center gap-3 pb-4 mb-6 border-b border-gray-100">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Security & Credentials</h2>
                <p className="text-xs text-gray-500">Update your portal login authentication password</p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-xl">
              {passwordStatus.message && (
                <div className={`p-3.5 rounded-xl text-sm flex items-center gap-2.5 ${
                  passwordStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {passwordStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{passwordStatus.message}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Minimum 8 characters"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Repeat new password"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors shadow-sm"
                >
                  <Key className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column: Service Level & Dedicated Account Manager (1 span) */}
        <div className="space-y-6">

          {/* AMC Plan Details Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-gray-100">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Contract & AMC Tier</h3>
                <p className="text-xs text-gray-500">Service level agreements</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Active SLA</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">Active</span>
                </div>
                <h4 className="text-base font-extrabold text-emerald-950 mt-1">{profile.membership.planName}</h4>
                <p className="text-xs text-emerald-700 mt-1">Contract No: {profile.membership.planId}</p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Coverage Duration</span>
                  <span className="font-semibold text-gray-800">{profile.membership.startDate} - {profile.membership.renewalDate}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Breakdown Response SLA</span>
                  <span className="font-bold text-emerald-700">{profile.membership.slaResponseTime}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Preventive Maintenance</span>
                  <span className="font-semibold text-gray-800">Monthly Scheduled</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-500">Consumable Supplies</span>
                  <span className="font-semibold text-emerald-700">100% Covered (Zero Extra)</span>
                </div>
              </div>

              <button
                onClick={() => alert('Downloading official SLA Agreement PDF...')}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-bold transition-colors border border-gray-200 mt-3"
              >
                <FileText className="w-4 h-4 text-gray-500" />
                Download SLA Agreement
              </button>
            </div>
          </div>

          {/* Dedicated Account Manager Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-gray-100">
              <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Account Manager</h3>
                <p className="text-xs text-gray-500">Dedicated representative</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                {profile.membership.accountManager.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900">{profile.membership.accountManager.name}</h4>
                <p className="text-xs text-emerald-700 font-medium">Senior Key Account Executive</p>
                <p className="text-[11px] text-gray-400 mt-0.5">Assigned to Acme Corp</p>
              </div>
            </div>

            <div className="mt-5 space-y-2 pt-4 border-t border-gray-100 text-xs">
              <a
                href={`mailto:${profile.membership.accountManager.email}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-600" />
                <span className="truncate">{profile.membership.accountManager.email}</span>
              </a>
              <a
                href={`tel:${profile.membership.accountManager.phone}`}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{profile.membership.accountManager.phone}</span>
              </a>
            </div>
          </div>

          {/* Notification Preferences Card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-6">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
              <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Communication Alerts</h3>
                <p className="text-xs text-gray-500">Client notification settings</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-semibold text-gray-800">Low Toner Automated Alerts</p>
                  <p className="text-[11px] text-gray-400">Notify when ink/toner falls below 15%</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.tonerAlerts}
                  onChange={(e) => setNotifications({ ...notifications, tonerAlerts: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-semibold text-gray-800">Technician Dispatch Updates</p>
                  <p className="text-[11px] text-gray-400">Real-time status of service visits</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.ticketUpdates}
                  onChange={(e) => setNotifications({ ...notifications, ticketUpdates: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-semibold text-gray-800">Invoice & Receipt Notices</p>
                  <p className="text-[11px] text-gray-400">Monthly statements and payment links</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.invoiceAlerts}
                  onChange={(e) => setNotifications({ ...notifications, invoiceAlerts: e.target.checked })}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                />
              </label>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default MyProfile;
