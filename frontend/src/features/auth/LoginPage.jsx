import React from 'react';
import { Printer, BarChart3, Wrench, ShieldCheck } from 'lucide-react';
import LoginForm from './LoginForm';

const LoginPage = () => {
  return (
    <div className="h-screen w-full bg-[#07101E] overflow-hidden">
      <div className="flex w-full h-full bg-transparent overflow-hidden">

        {/* Left Panel - Branding and Marketing */}
        <div className="hidden lg:flex w-[55%] pt-12 pl-12 pr-4 pb-12 flex-col justify-between relative text-white bg-transparent h-full">

          {/* Content */}
          <div className="z-20 relative flex flex-col gap-8">
            <div className="flex items-center gap-4 ml-2">
              {/* 3D Printer Icon CSS Art */}
              <div className="relative w-[72px] h-[64px] drop-shadow-2xl">
                {/* Top Paper */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-6 bg-gradient-to-b from-white to-[#d1d9e6] rounded-t-xl shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)] border border-white/80" />
                {/* Main Body (White Outer) */}
                <div className="absolute top-4 left-0 w-full h-[40px] bg-gradient-to-b from-white to-[#d1d9e6] rounded-[16px] shadow-lg border border-white" />
                {/* Blue Front Panel */}
                <div className="absolute top-[20px] left-[6px] right-[6px] h-7 bg-gradient-to-b from-[#258bf7] to-[#0c66ee] rounded-[8px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] flex justify-between items-center px-3 border border-blue-400/20">
                  <div className="w-3.5 h-[3px] bg-black/25 rounded-full" />
                  <div className="w-2 h-[3px] bg-black/25 rounded-full" />
                </div>
                {/* Bottom Output Tray/Paper */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[42px] h-[22px] bg-gradient-to-b from-white to-[#d1d9e6] rounded-b-xl shadow-[0_6px_12px_rgba(0,0,0,0.4)] border border-white/80 flex flex-col items-center justify-start pt-1.5 gap-1.5 z-10">
                  <div className="w-5 h-[3px] bg-[#1E88E5] rounded-full" />
                  <div className="w-3 h-[3px] bg-[#60A5FA] rounded-full -ml-2" />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center">
                <h1 className="text-[42px] font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-md">Printer</h1>
                <p className="text-[#3B82F6] text-[18px] font-bold tracking-wide leading-none">Management System</p>
              </div>
            </div>

            <div className="mt-6 ml-2 max-w-lg relative z-20">
              {/* Divider Line */}
              <div className="w-48 h-[2px] bg-[#1a365d]/60 mb-10 overflow-hidden rounded-full">
                <div className="w-20 h-full bg-[#1E88E5]"></div>
              </div>

              <h2 className="text-[42px] md:text-[46px] font-bold mb-6 leading-[1.2] tracking-normal text-white">
                Smart Management.<br />
                Better Printing.
              </h2>
              <p className="text-[#a0aec0] text-[18px] md:text-[20px] leading-relaxed font-normal tracking-wide">
                Manage, monitor, and maintain all your<br />printers efficiently in one place.
              </p>
            </div>
          </div>

          {/* 3D Visuals & Image area */}
          <div className="z-10 absolute bottom-0 left-0 right-0 top-32 flex items-center justify-center pointer-events-none">
            <img src="/assets/printer_plant.png" alt="3D Printer with Plant" className="w-[120%] max-w-none transform translate-y-12 translate-x-4 object-contain filter drop-shadow-2xl" />
          </div>



        </div>

        {/* Right Panel - Login Form Container */}
        <div className="w-full lg:w-[45%] h-full flex flex-col justify-center items-center p-4 lg:p-8 z-20">
          <div className="w-full h-full bg-white flex flex-col justify-center items-center rounded-[40px] shadow-2xl">
            <div className="w-full max-w-md px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-5 bg-[#EDF3FA] rounded-full mb-6 shadow-sm border border-blue-100">
                  <Printer className="w-12 h-12 text-blue-600 drop-shadow-sm" />
                </div>
                <h2 className="text-[32px] font-bold text-gray-900 mb-2 flex items-center justify-center gap-2 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-gray-500 font-medium">Sign in to continue to your dashboard</p>
              </div>

              <LoginForm />

              <div className="mt-12 text-center text-xs text-gray-400 flex items-center justify-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-gray-300" />
                <span>Secure login &bull; Your data is protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
