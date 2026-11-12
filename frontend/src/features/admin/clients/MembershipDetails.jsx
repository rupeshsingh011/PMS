import React from 'react';
import { Star, Box, Crown, Shield, Check, Download, Info, Settings, LifeBuoy } from 'lucide-react';

const MembershipDetails = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Membership Details</h1>
        <p className="text-gray-500 text-sm mt-1">View and manage membership plans and benefits.</p>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Basic */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:border-indigo-200 transition-colors cursor-pointer">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-emerald-500 fill-emerald-500" />
            <span className="font-bold text-gray-900 text-lg">Basic</span>
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">$0</span>
            <span className="text-gray-500 text-sm font-medium"> /month</span>
          </div>
          <p className="text-gray-500 text-xs">For small businesses just getting started.</p>
        </div>

        {/* Standard */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:border-indigo-200 transition-colors cursor-pointer">
          <div className="flex items-center gap-2 mb-4">
            <Box className="w-5 h-5 text-blue-500" />
            <span className="font-bold text-gray-900 text-lg">Standard</span>
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">$49</span>
            <span className="text-gray-500 text-sm font-medium"> /month</span>
          </div>
          <p className="text-gray-500 text-xs">For growing businesses and teams.</p>
        </div>

        {/* Premium */}
        <div className="bg-white p-6 rounded-2xl border-2 border-purple-500 shadow-sm relative flex flex-col">
          <div className="absolute -top-3 right-4 bg-purple-100 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-purple-200">
            Most Popular
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-purple-600 fill-purple-600" />
            <span className="font-bold text-gray-900 text-lg">Premium</span>
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">$99</span>
            <span className="text-gray-500 text-sm font-medium"> /month</span>
          </div>
          <p className="text-gray-500 text-xs">For established businesses with advanced needs.</p>
        </div>

        {/* Enterprise */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:border-indigo-200 transition-colors cursor-pointer">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-gray-900 text-lg">Enterprise</span>
          </div>
          <div className="mb-2">
            <span className="text-3xl font-bold text-gray-900">$199</span>
            <span className="text-gray-500 text-sm font-medium"> /month</span>
          </div>
          <p className="text-gray-500 text-xs">For large organizations with custom requirements.</p>
        </div>
      </div>


    </div>
  );
};

export default MembershipDetails;
