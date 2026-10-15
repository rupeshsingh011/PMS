import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Printer, ShoppingCart,
  HeadphonesIcon, Calculator, BarChart3, Bell,
  Settings, LogOut, Menu, X, Search, ChevronDown, ChevronRight, Briefcase
} from 'lucide-react';

// Navigation configuration with sub-items
const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  {
    name: 'Clients', icon: Users,
    subItems: [
      { name: 'Client List', href: '/admin/clients' },
      { name: 'Add Client', href: '/admin/clients/add' },
      { name: 'Membership Details', href: '/admin/clients/membership' },
      { name: 'Purchase History', href: '/admin/clients/history' },
    ]
  },
  {
    name: 'Printers', icon: Printer, href: '/admin/printers',
    subItems: [
      { name: 'Printer List', href: '/admin/printers?tab=list' },
      { name: 'Add Printer', href: '/admin/printers?tab=add' },
    ]
  },
  {
    name: 'Sales', href: '/admin/sales', icon: ShoppingCart
  },
  {
    name: 'Management', href: '/admin/management', icon: Briefcase
  },
  {
    name: 'Accounts', href: '/admin/accounts', icon: Calculator,
    subItems: [
      { name: 'Customer Invoices', href: '/admin/accounts/invoices' },
      { name: 'Payments', href: '/admin/accounts/payments' },
      { name: 'Pending Payments', href: '/admin/accounts/pending' },
      { name: 'Receipts', href: '/admin/accounts/receipts' },
      { name: 'Credit Notes', href: '/admin/accounts/credit-notes' },
      { name: 'Debit Notes', href: '/admin/accounts/debit-notes' },
      { name: 'Expenses', href: '/admin/accounts/expenses' },
      { name: 'Vendor Payments', href: '/admin/accounts/vendors' },
      { name: 'Taxes', href: '/admin/accounts/taxes' },
      { name: 'GST Reports', href: '/admin/accounts/gst' },
      { name: 'Profit & Loss', href: '/admin/accounts/pl' },
      { name: 'Outstanding Amounts', href: '/admin/accounts/outstanding' },
      { name: 'Financial Summary', href: '/admin/accounts/financial-summary' },
    ]
  },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
  {
    name: 'Notifications', href: '/admin/notifications', icon: Bell,
    subItems: [
      { name: 'New Sale', href: '/admin/notifications/new-sale' },
      { name: 'Installation Due', href: '/admin/notifications/installation-due' },
      { name: 'Ticket Assigned', href: '/admin/notifications/ticket-assigned' },
      { name: 'Ticket Closed', href: '/admin/notifications/ticket-closed' },
      { name: 'AMC Expiry', href: '/admin/notifications/amc-expiry' },
      { name: 'Warranty Expiry', href: '/admin/notifications/warranty-expiry' },
      { name: 'Payment Due', href: '/admin/notifications/payment-due' },
      { name: 'Invoice Generated', href: '/admin/notifications/invoice-generated' },
      { name: 'New Client', href: '/admin/notifications/new-client' },
      { name: 'System Alerts', href: '/admin/notifications/system-alerts' },
    ]
  },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const NavItem = ({ item, isActive, location, navigate, expandedMenu, setExpandedMenu, sidebarOpen, setSidebarOpen }) => {
  const currentPath = location.pathname + location.search;

  const hasSubItems = !!item.subItems;
  const isMainActive = isActive || (hasSubItems && location.pathname.startsWith(item.href || item.subItems[0].href.split('?')[0]));
  const isOpen = expandedMenu === item.name;

  if (hasSubItems) {
    return (
      <div className="mb-1">
        <button
          onClick={() => {
            if (!sidebarOpen) setSidebarOpen(true);
            setExpandedMenu(isOpen ? null : item.name);
            if (!isOpen) {
              navigate(item.href || item.subItems[0].href);
            }
          }}
          className={`w-full flex items-center ${sidebarOpen ? 'justify-between px-4' : 'justify-center'} py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isMainActive && !isOpen
            ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
            }`}
        >
          {isMainActive && !isOpen && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-md"></div>}
          <div className="flex items-center gap-3">
            <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isMainActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`} />
            <span className={`whitespace-nowrap transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>{item.name}</span>
          </div>
          {sidebarOpen && (isOpen ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />)}
        </button>

        {/* Sub-menu Dropdown */}
        {isOpen && sidebarOpen && (
          <div className="mt-1 space-y-1 pl-11 pr-3">
            {item.subItems.map((sub) => {
              const isSubActive = currentPath === sub.href;
              return (
                <Link
                  key={sub.name}
                  to={sub.href}
                  className={`block px-3 py-2 text-sm rounded-lg transition-colors ${isSubActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  {sub.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Regular single link
  return (
    <Link
      to={item.href}
      className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center'} py-3 mb-1 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
        ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
        }`}
    >
      {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-md"></div>}
      <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`} />
      <span className={`whitespace-nowrap transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>{item.name}</span>
    </Link>
  );
};

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  // Accordion state: only one menu expanded at a time
  const [expandedMenu, setExpandedMenu] = useState(() => {
    const activeItem = navigation.find(item => item.subItems && (location.pathname === item.href || location.pathname.startsWith(item.href + '/')));
    return activeItem ? activeItem.name : null;
  });

  // Automatically update expanded menu when route changes
  React.useEffect(() => {
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

  // Automatically update expanded menu when route changes
  React.useEffect(() => {
    const activeItem = navigation.find(item => item.subItems && (location.pathname === item.href || location.pathname.startsWith(item.href + '/')));
    if (activeItem) {
      setExpandedMenu(activeItem.name);
    } else {
      setExpandedMenu(null);
    }
  }, [location.pathname]);

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
      <div className={`fixed inset-y-0 left-0 z-30 bg-white border-r border-gray-200 transform transition-all duration-300 flex flex-col shadow-sm ${sidebarOpen ? 'w-72 translate-x-0 lg:relative' : 'w-72 -translate-x-full lg:w-20 lg:translate-x-0 lg:relative'}`}>
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between h-20 border-b border-gray-100 bg-white shrink-0 ${sidebarOpen ? 'px-6' : 'px-0 justify-center'}`}>
          <Link to="/admin" className={`flex items-center group ${sidebarOpen ? 'gap-3' : 'justify-center w-full'}`} onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}>
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors shrink-0">
              <Printer className="w-6 h-6 text-white" />
            </div>
            <div className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
              <h1 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">Admin<span className="text-blue-600">Portal</span></h1>
              <p className="text-xs text-gray-500 font-medium">Printer Management System</p>
            </div>
          </Link>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600 shrink-0">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 bg-white custom-scrollbar">
          <p className={`px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 whitespace-nowrap transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 h-0 m-0 overflow-hidden'}`}>Main Menu</p>
          <div className="space-y-1 w-full">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={location.pathname === item.href}
                location={location}
                navigate={navigate}
                expandedMenu={expandedMenu}
                setExpandedMenu={setExpandedMenu}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 shrink-0 w-full">
          <a
            href="#"
            onClick={handleLogout}
            className={`flex items-center ${sidebarOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 text-red-600 font-medium rounded-xl hover:bg-red-50 transition-colors overflow-hidden`}
          >
            <LogOut className="w-5 h-5 text-red-500 shrink-0" />
            <span className={`whitespace-nowrap transition-all duration-300 ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Logout</span>
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full relative z-0">

        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 sticky top-0 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all w-80">
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
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>

            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md border-2 border-white">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-gray-700 leading-none group-hover:text-blue-600 transition-colors">Admin User</p>
                <p className="text-xs text-gray-500 font-medium mt-1">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block ml-1 group-hover:text-blue-600 transition-colors" />
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

export default AdminLayout;
