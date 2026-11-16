import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/authService';
import { 
  LayoutDashboard, User, Printer, ShoppingBag, ShoppingCart,
  FileText, CreditCard, Wrench, HeadphonesIcon, 
  Bell, LogOut, Menu, X, Search, ArrowLeft
} from 'lucide-react';

const ClientLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Desktop default open, mobile default closed
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  // Responsive listener for window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigation = [
    { name: 'Dashboard', href: '/client', icon: LayoutDashboard },
    { name: 'My Profile', href: '/client/profile', icon: User },
    { name: 'My Printers', href: '/client/printers', icon: Printer },
    { name: 'Buy or Rent', href: '/client/buy-rent', icon: ShoppingCart },
    { name: 'Purchase History', href: '/client/purchases', icon: ShoppingBag },
    { name: 'Invoices', href: '/client/invoices', icon: FileText },
    { name: 'Payments', href: '/client/payments', icon: CreditCard },
    { name: 'Service Request', href: '/client/service-request', icon: Wrench },
    { name: 'Customer Support', href: '/client/support', icon: HeadphonesIcon },
    { name: 'Notifications', href: '/client/notifications', icon: Bell },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    navigate('/login');
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/client');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Collapsible on desktop (w-72 <-> w-20) and mobile slide-over */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 transform transition-all duration-300 flex flex-col shadow-sm ${
          sidebarOpen 
            ? 'w-72 translate-x-0 lg:relative' 
            : 'w-72 -translate-x-full lg:w-20 lg:translate-x-0 lg:relative'
        }`}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between h-20 border-b border-gray-100 bg-white shrink-0 ${sidebarOpen ? 'px-6' : 'px-0 justify-center'}`}>
          <Link 
            to="/client" 
            className={`flex items-center group ${sidebarOpen ? 'gap-3' : 'justify-center w-full'}`}
            onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
            title="Client Portal"
          >
            <div className="bg-emerald-600 p-2 rounded-lg group-hover:bg-emerald-700 transition-colors shrink-0">
              <Printer className="w-6 h-6 text-white" />
            </div>
            <div className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              <h1 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors">Client<span className="text-emerald-600">Portal</span></h1>
              <p className="text-xs text-gray-500 font-medium">Printer Management</p>
            </div>
          </Link>
          {sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden text-gray-400 hover:text-gray-600 shrink-0 p-1 rounded-lg hover:bg-gray-100"
              title="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 space-y-1 bg-white">
          <p className={`px-3 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 whitespace-nowrap transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 h-0 m-0 overflow-hidden'}`}>
            Main Menu
          </p>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
                title={!sidebarOpen ? item.name : undefined}
                className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600 rounded-r-md"></div>}
                <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-emerald-600'}`} />
                <span className={`whitespace-nowrap transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/50 shrink-0 w-full">
          <a
            href="#"
            onClick={handleLogout}
            title={!sidebarOpen ? 'Logout' : undefined}
            className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors overflow-hidden`}
          >
            <LogOut className="w-5 h-5 text-red-500 shrink-0" />
            <span className={`whitespace-nowrap transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Logout</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative z-0">
        
        {/* Header */}
        <header className={`bg-white/80 backdrop-blur-md border-b border-gray-200 h-20 flex items-center justify-between transition-all duration-300 z-10 sticky top-0 shrink-0 ${
          sidebarOpen ? 'px-4 sm:px-6 lg:px-8' : 'px-3 sm:px-4 lg:px-4'
        }`}>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sidebar toggle button (collapsible on both mobile and desktop) */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer group flex items-center justify-center"
              title="Go Back"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200 transition-all w-80">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none ml-2 w-full text-sm placeholder-gray-400 text-gray-700 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Bell Icon: Clickable, opens Notification page with live unread badge */}
            <button 
              onClick={() => navigate('/client/notifications')}
              className="relative p-2.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer group"
              title="View Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-6 h-6 group-hover:scale-105 transition-transform" />
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </button>
            
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            
            <div 
              onClick={() => navigate('/client/profile')}
              className="flex items-center gap-3 cursor-pointer group"
              title="View My Profile"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                C
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-700 leading-none group-hover:text-emerald-700 transition-colors">Customer Name</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Acme Corp</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC]">
          <div 
            className={`w-full transition-all duration-300 ${
              sidebarOpen 
                ? 'max-w-7xl mx-auto p-4 sm:p-6 lg:p-8' 
                : 'max-w-[1720px] mx-auto p-3 sm:p-4 lg:px-4 lg:py-6'
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
