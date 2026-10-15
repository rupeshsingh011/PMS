import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ChevronLeft } from 'lucide-react';

const MembershipPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Basic',
      price: '$99',
      period: '/month',
      description: 'Essential features for small businesses just getting started.',
      color: 'bg-emerald-500',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
      buttonClass: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200',
      features: [
        { name: 'Up to 5 Printers', included: true },
        { name: 'Standard Support (Email)', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'SLA: 48 Hours', included: true },
        { name: 'Preventive Maintenance', included: false },
        { name: 'Remote Troubleshooting', included: false },
        { name: 'Custom Reports', included: false },
      ]
    },
    {
      name: 'Standard',
      price: '$249',
      period: '/month',
      description: 'Advanced features and priority support for growing companies.',
      color: 'bg-blue-600',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      buttonClass: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200',
      popular: true,
      features: [
        { name: 'Up to 20 Printers', included: true },
        { name: 'Priority Support (Phone & Email)', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'SLA: 24 Hours', included: true },
        { name: 'Preventive Maintenance (Bi-Annual)', included: true },
        { name: 'Remote Troubleshooting', included: true },
        { name: 'Custom Reports', included: false },
      ]
    },
    {
      name: 'Premium',
      price: '$499',
      period: '/month',
      description: 'Maximum performance, unlimited scale, and dedicated support.',
      color: 'bg-purple-600',
      lightBg: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      buttonClass: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200',
      features: [
        { name: 'Unlimited Printers', included: true },
        { name: '24/7 Dedicated Support', included: true },
        { name: 'Enterprise Analytics', included: true },
        { name: 'SLA: 4 Hours', included: true },
        { name: 'Preventive Maintenance (Quarterly)', included: true },
        { name: 'Remote Troubleshooting', included: true },
        { name: 'Custom Reports', included: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 font-sans pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button 
          onClick={() => navigate('/admin/clients')}
          className="p-2 text-gray-500 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Membership Plans</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage the available client membership tiers.</p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`relative bg-white rounded-2xl border ${plan.popular ? 'border-blue-600 shadow-xl shadow-blue-900/5 scale-105 z-10' : 'border-gray-200 shadow-sm'} p-8 flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Most Popular
              </div>
            )}
            
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${plan.lightBg} ${plan.textColor} border ${plan.borderColor} w-fit`}>
              {plan.name}
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
              <span className="text-gray-500 font-medium">{plan.period}</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-8 h-10">
              {plan.description}
            </p>
            
            <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all mb-8 ${plan.buttonClass}`}>
              Manage {plan.name} Tier
            </button>
            
            <div className="space-y-4 mt-auto">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  {feature.included ? (
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                      <X className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  )}
                  <span className={`text-sm ${feature.included ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                    {feature.name}
                  </span>
                </div>
              ))}
            </div>
            
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default MembershipPlans;
