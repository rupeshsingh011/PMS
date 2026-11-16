import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';

// Layouts
import AdminLayout from '../components/layouts/AdminLayout';
import ClientLayout from '../components/layouts/ClientLayout';

// Admin - Dashboard
import AdminDashboard from '../features/admin/dashboard/Dashboard';

// Admin - Clients Module
import ClientList from '../features/admin/clients/ClientList';
import AddClient from '../features/admin/clients/AddClient';
import EditClient from '../features/admin/clients/EditClient';
import ClientDetails from '../features/admin/clients/ClientDetails';
import MembershipDetails from '../features/admin/clients/MembershipDetails';
import MembershipPlans from '../features/admin/clients/MembershipPlans';
import PurchaseHistory from '../features/admin/clients/PurchaseHistory';
import BranchManagement from '../features/admin/clients/BranchManagement';
import ContactManagement from '../features/admin/clients/ContactManagement';
import ClientDocuments from '../features/admin/clients/ClientDocuments';
import ClientAgreements from '../features/admin/clients/ClientAgreements';
import ImportExportClients from '../features/admin/clients/ImportExportClients';

// Admin - Printers Module
import PrinterDashboard from '../features/admin/printers/PrinterDashboard';
import PrinterList from '../features/admin/printers/PrinterList';
import AddPrinter from '../features/admin/printers/AddPrinter';
import PrinterDetails from '../features/admin/printers/PrinterDetails';
import InstallationSchedule from '../features/admin/printers/InstallationSchedule';
import AssignedPrinters from '../features/admin/printers/AssignedPrinters';
import UnassignedPrinters from '../features/admin/printers/UnassignedPrinters';
import WarrantyManagement from '../features/admin/printers/WarrantyManagement';
import AMCManagement from '../features/admin/printers/AMCManagement';
import PreventiveMaintenance from '../features/admin/printers/PreventiveMaintenance';
import PrinterHealthStatus from '../features/admin/printers/PrinterHealthStatus';

// Admin - Sales Module
import SalesManagement from '../features/admin/sales/SalesManagement';

// Admin - Management Module
import ManagementDashboard from '../features/admin/management/ManagementDashboard';
import TicketList from '../features/admin/management/TicketList';
import TicketDetails from '../features/admin/management/TicketDetails';
import CreateTicket from '../features/admin/management/CreateTicket';
import EngineerManagement from '../features/admin/management/EngineerManagement';
import FieldVisits from '../features/admin/management/FieldVisits';
import ManagementPreventiveMaintenance from '../features/admin/management/PreventiveMaintenance';
import SpareParts from '../features/admin/management/SpareParts';
import RemoteSupport from '../features/admin/management/RemoteSupport';
import SLATracking from '../features/admin/management/SLATracking';
import CustomerFeedback from '../features/admin/management/CustomerFeedback';
import ClosedTickets from '../features/admin/management/ClosedTickets';

// Admin - Accounts Module
import AccountsDashboard from '../features/admin/accounts/AccountsDashboard';
import CustomerInvoices from '../features/admin/accounts/CustomerInvoices';
import AdminPayments from '../features/admin/accounts/Payments';
import PendingPayments from '../features/admin/accounts/PendingPayments';
import Receipts from '../features/admin/accounts/Receipts';
import CreditNotes from '../features/admin/accounts/CreditNotes';
import DebitNotes from '../features/admin/accounts/DebitNotes';
import Expenses from '../features/admin/accounts/Expenses';
import VendorPayments from '../features/admin/accounts/VendorPayments';
import Taxes from '../features/admin/accounts/Taxes';
import GSTReports from '../features/admin/accounts/GSTReports';
import ProfitLoss from '../features/admin/accounts/ProfitLoss';
import OutstandingAmounts from '../features/admin/accounts/OutstandingAmounts';
import FinancialSummary from '../features/admin/accounts/FinancialSummary';

// Admin - Reports, Notifications & Settings
import AdminReports from '../features/admin/reports/ReportsAnalytics';
import NotificationsDashboard from '../features/admin/notifications/NotificationsDashboard';
import NewSale from '../features/admin/notifications/NewSale';
import InstallationDue from '../features/admin/notifications/InstallationDue';
import TicketAssigned from '../features/admin/notifications/TicketAssigned';
import TicketClosed from '../features/admin/notifications/TicketClosed';
import AMCExpiry from '../features/admin/notifications/AMCExpiry';
import AdminSettings from '../features/admin/settings/Settings';

// Client Portal Features
import ClientDashboard from '../features/client/ClientDashboard';
import MyProfile from '../features/client/MyProfile';
import MyPrinters from '../features/client/MyPrinters';
import ClientPurchaseHistory from '../features/client/PurchaseHistory';
import Invoices from '../features/client/Invoices';
import Payments from '../features/client/Payments';
import ServiceRequest from '../features/client/ServiceRequest';
import CustomerSupport from '../features/client/CustomerSupport';
import ClientNotifications from '../features/client/Notifications';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* Admin Routes */}
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />

      {/* Clients Module Routes */}
      <Route path="clients" element={<ClientList />} />
      <Route path="clients/add" element={<AddClient />} />
      <Route path="clients/edit/:id" element={<EditClient />} />
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

      <Route path="settings" element={<AdminSettings />} />
    </Route>

    {/* Client Routes */}
    <Route path="/client" element={<ClientLayout />}>
      <Route index element={<ClientDashboard />} />
      <Route path="profile" element={<MyProfile />} />
      <Route path="printers" element={<MyPrinters />} />
      <Route path="buy-rent" element={<ClientPurchaseHistory />} />
      <Route path="purchases" element={<ClientPurchaseHistory />} />
      <Route path="invoices" element={<Invoices />} />
      <Route path="payments" element={<Payments />} />
      <Route path="service-request" element={<ServiceRequest />} />
      <Route path="support" element={<CustomerSupport />} />
      <Route path="notifications" element={<ClientNotifications />} />
    </Route>
  </Routes>
);

export default AppRoutes;

