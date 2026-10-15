import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Admin/Login/LoginPage';

// Admin Components
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './components/Admin/Dashboard';

// Admin - Clients Module
import ClientList from './components/Admin/Client/ClientList';
import AddClient from './components/Admin/Client/AddClient';
import EditClient from './components/Admin/Client/EditClient';
import ClientDetails from './components/Admin/Client/ClientDetails';
import MembershipDetails from './components/Admin/Client/MembershipDetails';
import MembershipPlans from './components/Admin/Client/MembershipPlans';
import PurchaseHistory from './components/Admin/Client/PurchaseHistory';
import BranchManagement from './components/Admin/Client/BranchManagement';
import ContactManagement from './components/Admin/Client/ContactManagement';
import ClientDocuments from './components/Admin/Client/ClientDocuments';
import ClientAgreements from './components/Admin/Client/ClientAgreements';
import ImportExportClients from './components/Admin/Client/ImportExportClients';

// Admin - Printers Module
import PrinterDashboard from './components/Admin/Printer/PrinterDashboard';
import PrinterList from './components/Admin/Printer/PrinterList';
import AddPrinter from './components/Admin/Printer/AddPrinter';
import PrinterDetails from './components/Admin/Printer/PrinterDetails';
import InstallationSchedule from './components/Admin/Printer/InstallationSchedule';
import AssignedPrinters from './components/Admin/Printer/AssignedPrinters';
import UnassignedPrinters from './components/Admin/Printer/UnassignedPrinters';
import WarrantyManagement from './components/Admin/Printer/WarrantyManagement';
import AMCManagement from './components/Admin/Printer/AMCManagement';
import PreventiveMaintenance from './components/Admin/Printer/PreventiveMaintenance';
import PrinterHealthStatus from './components/Admin/Printer/PrinterHealthStatus';

import SalesManagement from './components/Admin/Sales/SalesManagement';

// Admin - Management Module
import ManagementDashboard from './components/Admin/Management/ManagementDashboard';
import TicketList from './components/Admin/Management/TicketList';
import TicketDetails from './components/Admin/Management/TicketDetails';
import CreateTicket from './components/Admin/Management/CreateTicket';
import EngineerManagement from './components/Admin/Management/EngineerManagement';
import FieldVisits from './components/Admin/Management/FieldVisits';
import ManagementPreventiveMaintenance from './components/Admin/Management/PreventiveMaintenance';
import SpareParts from './components/Admin/Management/SpareParts';
import RemoteSupport from './components/Admin/Management/RemoteSupport';
import SLATracking from './components/Admin/Management/SLATracking';
import CustomerFeedback from './components/Admin/Management/CustomerFeedback';
import ClosedTickets from './components/Admin/Management/ClosedTickets';

// Admin - Accounts Module
import AccountsDashboard from './components/Admin/Account/AccountsDashboard';
import CustomerInvoices from './components/Admin/Account/CustomerInvoices';
import AdminPayments from './components/Admin/Account/Payments';
import PendingPayments from './components/Admin/Account/PendingPayments';
import Receipts from './components/Admin/Account/Receipts';
import CreditNotes from './components/Admin/Account/CreditNotes';
import DebitNotes from './components/Admin/Account/DebitNotes';
import Expenses from './components/Admin/Account/Expenses';
import VendorPayments from './components/Admin/Account/VendorPayments';
import Taxes from './components/Admin/Account/Taxes';
import GSTReports from './components/Admin/Account/GSTReports';
import ProfitLoss from './components/Admin/Account/ProfitLoss';
import OutstandingAmounts from './components/Admin/Account/OutstandingAmounts';
import FinancialSummary from './components/Admin/Account/FinancialSummary';

import AdminReports from './components/Admin/Reports/ReportsAnalytics';

// Admin - Notifications Module
import NotificationsDashboard from './components/Admin/Notification/NotificationsDashboard';
import NewSale from './components/Admin/Notification/NewSale';
import InstallationDue from './components/Admin/Notification/InstallationDue';
import TicketAssigned from './components/Admin/Notification/TicketAssigned';
import TicketClosed from './components/Admin/Notification/TicketClosed';
import AMCExpiry from './components/Admin/Notification/AMCExpiry';
import WarrantyExpiry from './components/Admin/Notification/WarrantyExpiry';
import PaymentDue from './components/Admin/Notification/PaymentDue';
import InvoiceGenerated from './components/Admin/Notification/InvoiceGenerated';
import NewClient from './components/Admin/Notification/NewClient';
import SystemAlerts from './components/Admin/Notification/SystemAlerts';

import AdminSettings from './components/Admin/Settings/Settings';

// Client Components
import ClientLayout from './components/Admin/ClientLayout';
import ClientDashboard from './components/Admin/Dashboard';
import MyProfile from './components/Admin/MyProfile';
import MyPrinters from './components/Admin/MyPrinters';
import ClientPurchaseHistory from './components/Admin/PurchaseHistory';
import Invoices from './components/Admin/Invoices';
import Payments from './components/Admin/Payments';
import ServiceRequest from './components/Admin/ServiceRequest';
import CustomerSupport from './components/Admin/CustomerSupport';
import ClientNotifications from './components/Admin/Notifications';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        {/* Clients Module Routes */}
        <Route path="clients" element={<ClientList />} />
        <Route path="clients/add" element={<AddClient />} />
        <Route path="clients/membership" element={<MembershipDetails />} />
        <Route path="clients/membership-plans" element={<MembershipPlans />} />
        <Route path="clients/history" element={<PurchaseHistory />} />
        <Route path="clients/branches" element={<BranchManagement />} />
        <Route path="clients/contacts" element={<ContactManagement />} />
        <Route path="clients/documents" element={<ClientDocuments />} />
        <Route path="clients/agreements" element={<ClientAgreements />} />
        <Route path="clients/import-export" element={<ImportExportClients />} />
        <Route path="clients/:id" element={<ClientDetails />} />

        {/* Printers Module Routes */}
        <Route path="printers" element={<PrinterDashboard />} />
        <Route path="printers/inventory" element={<PrinterList />} />
        <Route path="printers/add" element={<AddPrinter />} />
        <Route path="printers/installations" element={<InstallationSchedule />} />
        <Route path="printers/assigned" element={<AssignedPrinters />} />
        <Route path="printers/unassigned" element={<UnassignedPrinters />} />
        <Route path="printers/warranty" element={<WarrantyManagement />} />
        <Route path="printers/amc" element={<AMCManagement />} />
        <Route path="printers/maintenance" element={<PreventiveMaintenance />} />
        <Route path="printers/health" element={<PrinterHealthStatus />} />
        <Route path="printers/:id" element={<PrinterDetails />} />

        <Route path="sales" element={<SalesManagement />} />
        
        {/* Management Module Routes */}
        <Route path="management" element={<ManagementDashboard />} />
        <Route path="management/tickets" element={<TicketList />} />
        <Route path="management/tickets/create" element={<CreateTicket />} />
        <Route path="management/engineers" element={<EngineerManagement />} />
        <Route path="management/field-visits" element={<FieldVisits />} />
        <Route path="management/preventive" element={<ManagementPreventiveMaintenance />} />
        <Route path="management/parts" element={<SpareParts />} />
        <Route path="management/remote" element={<RemoteSupport />} />
        <Route path="management/sla" element={<SLATracking />} />
        <Route path="management/feedback" element={<CustomerFeedback />} />
        <Route path="management/closed" element={<ClosedTickets />} />
        <Route path="management/tickets/:id" element={<TicketDetails />} />
        
        {/* Accounts Module Routes */}
        <Route path="accounts" element={<AccountsDashboard />} />
        <Route path="accounts/invoices" element={<CustomerInvoices />} />
        <Route path="accounts/payments" element={<AdminPayments />} />
        <Route path="accounts/pending" element={<PendingPayments />} />
        <Route path="accounts/receipts" element={<Receipts />} />
        <Route path="accounts/credit-notes" element={<CreditNotes />} />
        <Route path="accounts/debit-notes" element={<DebitNotes />} />
        <Route path="accounts/expenses" element={<Expenses />} />
        <Route path="accounts/vendors" element={<VendorPayments />} />
        <Route path="accounts/taxes" element={<Taxes />} />
        <Route path="accounts/gst" element={<GSTReports />} />
        <Route path="accounts/pl" element={<ProfitLoss />} />
        <Route path="accounts/outstanding" element={<OutstandingAmounts />} />
        <Route path="accounts/financial-summary" element={<FinancialSummary />} />

        <Route path="reports" element={<AdminReports />} />

        {/* Notifications Module Routes */}
        <Route path="notifications" element={<NotificationsDashboard />} />
        <Route path="notifications/new-sale" element={<NewSale />} />
        <Route path="notifications/installation-due" element={<InstallationDue />} />
        <Route path="notifications/ticket-assigned" element={<TicketAssigned />} />
        <Route path="notifications/ticket-closed" element={<TicketClosed />} />
        <Route path="notifications/amc-expiry" element={<AMCExpiry />} />
        <Route path="notifications/warranty-expiry" element={<WarrantyExpiry />} />
        <Route path="notifications/payment-due" element={<PaymentDue />} />
        <Route path="notifications/invoice-generated" element={<InvoiceGenerated />} />
        <Route path="notifications/new-client" element={<NewClient />} />
        <Route path="notifications/system-alerts" element={<SystemAlerts />} />

        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Client Routes */}
      <Route path="/client" element={<ClientLayout />}>
        <Route index element={<ClientDashboard />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="printers" element={<MyPrinters />} />
        <Route path="purchases" element={<ClientPurchaseHistory />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="payments" element={<Payments />} />
        <Route path="service-request" element={<ServiceRequest />} />
        <Route path="support" element={<CustomerSupport />} />
        <Route path="notifications" element={<ClientNotifications />} />
      </Route>
    </Routes>
  );
}

export default App;
