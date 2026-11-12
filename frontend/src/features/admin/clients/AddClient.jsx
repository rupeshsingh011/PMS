import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Upload, User, Building2, Phone, Mail, MapPin, CreditCard, FileText, CheckCircle2 } from 'lucide-react';

const AddClient = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);

  const personalRef = useRef(null);
  const companyRef = useRef(null);
  const membershipRef = useRef(null);
  const submitRef = useRef(null);

  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
    const ref = stepId === 1 ? personalRef :
                stepId === 2 ? companyRef :
                stepId === 3 ? membershipRef : submitRef;
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const steps = [
    { id: 1, label: 'Personal Details' },
    { id: 2, label: 'Company Details' },
    { id: 3, label: 'Membership' },
    { id: 4, label: 'Review & Submit' }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans pb-24">
      {/* Breadcrumb & Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="hover:text-indigo-600 cursor-pointer" onClick={() => navigate('/admin/clients')}>Clients</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Add Client</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Add Client</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details below to add a new client.</p>
        </div>
        <div className="flex items-center gap-3">
        </div>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Personal Details */}
          <div ref={personalRef} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm scroll-mt-8">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">Personal Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">First Name *</label>
                <input type="text" placeholder="Enter first name" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Last Name *</label>
                <input type="text" placeholder="Enter last name" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Date of Birth</label>
                <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors text-gray-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Gender</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors text-gray-500">
                  <option>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">Contact Information</h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email Address *</label>
                <input type="email" placeholder="Enter email address" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Phone Number *</label>
                <div className="flex relative">
                  <select className="absolute left-0 top-0 bottom-0 px-3 bg-gray-50 border border-gray-200 rounded-l-lg text-sm outline-none text-gray-700 font-medium">
                    <option>🇺🇸 +1</option>
                    <option>🇬🇧 +44</option>
                    <option>🇮🇳 +91</option>
                  </select>
                  <input type="text" placeholder="(555) 000-0000" className="w-full pl-24 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Membership */}
          <div ref={membershipRef} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-6 items-start scroll-mt-8">
             <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-bold text-gray-900">Membership</h2>
                </div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Select Membership Plan *</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors text-gray-500 mb-2">
                  <option>Select membership plan</option>
                  <option>Basic</option>
                  <option>Standard</option>
                  <option>Premium</option>
                </select>
                <a href="#" className="text-indigo-600 text-sm font-medium hover:underline">View Membership Plans</a>
             </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Company Details */}
          <div ref={companyRef} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm scroll-mt-8">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">Company Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Company Name *</label>
                <input type="text" placeholder="Enter company name" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Industry</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors text-gray-500">
                  <option>Select industry</option>
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Company Size</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors text-gray-500">
                  <option>Select company size</option>
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Website</label>
                <input type="url" placeholder="https://company.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-gray-900">Address</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Address Line 1</label>
                <input type="text" placeholder="Enter address line 1" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors" />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Address Line 2</label>
                <input type="text" placeholder="Enter address line 2" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">State / Province</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors text-gray-500">
                  <option>Select state</option>
                  <option>New York</option>
                  <option>California</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">City</label>
                <input type="text" placeholder="Enter city" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Zip / Postal Code</label>
                <input type="text" placeholder="Enter zip code" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors" />
              </div>
            </div>
          </div>
          
          <div ref={submitRef} className="flex gap-6 scroll-mt-8 flex-col sm:flex-row">
             {/* Notes */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex-1">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Notes (Optional)</h2>
              <textarea 
                placeholder="Add any additional notes about this client..." 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:bg-white focus:border-indigo-500 transition-colors resize-none h-24"
              ></textarea>
            </div>
            
            {/* Upload Documents */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex-1">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold text-gray-900">Upload Documents</h2>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 h-24 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer group">
                <Upload className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 mb-1" />
                <p className="text-xs font-semibold text-gray-700">Drag & drop files here</p>
                <p className="text-[10px] text-gray-400">or click to browse</p>
                <p className="text-[9px] text-gray-400 mt-1">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button 
              onClick={() => {
                // Mock adding the client
                const existingClients = JSON.parse(localStorage.getItem('mockClients') || '[]');
                
                // Get a few values from the form to make it look real
                const firstName = document.querySelector('input[placeholder="Enter first name"]')?.value || 'New';
                const lastName = document.querySelector('input[placeholder="Enter last name"]')?.value || 'Client';
                const companyName = document.querySelector('input[placeholder="Enter company name"]')?.value || 'New Company';
                
                const newClient = {
                  id: 'CL-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
                  name: `${firstName} ${lastName}`,
                  company: companyName,
                  email: `${firstName.toLowerCase()}@${companyName.toLowerCase().replace(/\\s+/g, '')}.com`,
                  phone: '+1 555-000-0000',
                  membership: 'Basic',
                  purchaseAmount: '$0.00',
                  status: 'Active'
                };
                localStorage.setItem('mockClients', JSON.stringify([newClient, ...existingClients]));
                navigate('/admin/clients');
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-sm text-sm"
            >
              Create Client
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddClient;
