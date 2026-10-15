import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, User, Printer, ShoppingBag, 
  FileText, CreditCard, Wrench, HeadphonesIcon, 
  Bell, LogOut, Menu, X, Search 
} from 'lucide-react';

const ClientLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/client', icon: LayoutDashboard },
    { name: 'My Profile', href: '/client/profile', icon: User },
    { name: 'My Printers', href: '/client/printers', icon: Printer },
    { name: 'Purchase History', href: '/client/purchases', icon: ShoppingBag },
    { name: 'Invoices', href: '/client/invoices', icon: FileText },
    { name: 'Payments', href: '/client/payments', icon: CreditCard },
    { name: 'Service Request', href: '/client/service-request', icon: Wrench },
    { name: 'Customer Support', href: '/client/support', icon: HeadphonesIcon },
    { name: 'Notifications', href: '/client/notifications', icon: Bell },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
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

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Printer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">Client<span className="text-emerald-600">Portal</span></h1>
              <p className="text-xs text-gray-500 font-medium">Printer Management</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 bg-white">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Main Menu</p>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-600 rounded-r-md"></div>}
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-400 group-hover:text-emerald-600'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <a
            href="#"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            Logout
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative z-0">
        
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-700 lg:hidden rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
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
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold shadow-md border-2 border-white">
                C
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-700 leading-none">Customer Name</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Acme Corp</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC]">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;
