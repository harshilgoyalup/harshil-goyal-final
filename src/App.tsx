import { useState } from 'react';
import {
  Cleaner,
  CleaningJob,
  Customer,
  Invoice,
  JobStatus,
  ToastNotification,
  UserRole,
} from './types';
import { initialCleaners, initialCustomers, initialInvoices, initialJobs } from './data/mockData';
import { Header } from './components/Header';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { HeroSection } from './components/HeroSection';
import { OwnerDashboard } from './components/OwnerDashboard';
import { JobCalendar } from './components/JobCalendar';
import { CleanersRoster } from './components/CleanersRoster';
import { CustomerDirectory } from './components/CustomerDirectory';
import { InvoicingTracker } from './components/InvoicingTracker';
import { CleanerPortal } from './components/CleanerPortal';
import { CustomerPortal } from './components/CustomerPortal';
import { FooterCTA } from './components/FooterCTA';
import { ToastContainer } from './components/ToastContainer';
import { AddJobModal } from './components/AddJobModal';
import { WhatsAppDispatchModal } from './components/WhatsAppDispatchModal';
import { InvoiceModal } from './components/InvoiceModal';
import { CreateInvoiceModal } from './components/CreateInvoiceModal';
import { RunSheetModal } from './components/RunSheetModal';
import { BroadcastModal } from './components/BroadcastModal';
import { DemoModal } from './components/DemoModal';
import { CustomerDrawer } from './components/CustomerDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('owner');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [jobs, setJobs] = useState<CleaningJob[]>(initialJobs);
  const [cleaners, setCleaners] = useState<Cleaner[]>(initialCleaners);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

  // Modals state
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isRunSheetOpen, setIsRunSheetOpen] = useState(false);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [whatsappCleaner, setWhatsappCleaner] = useState<Cleaner | null>(null);

  // Toasts system
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    const roleNames: Record<UserRole, string> = {
      owner: 'Owner (Full Hub)',
      cleaner: 'Cleaner (Maria Santos)',
      customer: 'Customer (David Miller)',
    };
    addToast(`Switched view to ${roleNames[role]}`, 'info');
  };

  // Job operations
  const handleAddJob = (newJobData: Omit<CleaningJob, 'id' | 'status'>) => {
    const newJob: CleaningJob = {
      ...newJobData,
      id: `job-${Date.now()}`,
      status: 'Scheduled',
    };

    setJobs((prev) => [newJob, ...prev]);

    // Update cleaner assignment count
    setCleaners((prev) =>
      prev.map((c) =>
        c.name === newJob.cleaner ? { ...c, assignedToday: c.assignedToday + 1 } : c
      )
    );

    addToast(
      `Job booked for ${newJob.customer}! Automated WhatsApp notification sent to ${newJob.cleaner}.`,
      'success'
    );
  };

  const handleUpdateJobStatus = (id: string, newStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: newStatus } : j))
    );
    addToast(`Job status updated to "${newStatus}"`, 'info');
  };

  const handlePingCleaner = (cleanerName: string, customerName: string) => {
    addToast(`WhatsApp ping sent to ${cleanerName} regarding ${customerName}'s shift`, 'success');
  };

  // Cleaner operations
  const handleInviteCleaner = () => {
    const inviteLink = `https://flowfix.app/join?team=sparklepro&token=${Math.random().toString(36).substring(2, 8)}`;
    navigator.clipboard?.writeText(inviteLink);
    addToast('Onboarding invite link copied to clipboard! Send via WhatsApp.', 'success');
  };

  const handleDispatchWhatsApp = (cleaner: Cleaner) => {
    setWhatsappCleaner(cleaner);
  };

  const handleConfirmWhatsAppSend = (msg: string) => {
    if (whatsappCleaner) {
      addToast(
        `WhatsApp dispatch message delivered to ${whatsappCleaner.name} (+1 555 392-1104)!`,
        'success'
      );
      setWhatsappCleaner(null);
    }
  };

  // Invoicing operations
  const handleMarkPaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'Paid' } : inv))
    );
    addToast(`Invoice ${invoiceId} marked as Paid! Revenue updated.`, 'success');
  };

  const handleCreateCustomInvoice = (newInv: Invoice) => {
    setInvoices((prev) => [newInv, ...prev]);
    addToast(`Invoice ${newInv.id} created and dispatched to ${newInv.customer}!`, 'success');
  };

  const handleSendInvoiceWhatsApp = () => {
    if (selectedInvoice) {
      addToast(
        `Invoice ${selectedInvoice.id} sent to ${selectedInvoice.customer} via WhatsApp with instant Stripe link!`,
        'success'
      );
      setSelectedInvoice(null);
    }
  };

  const handleSendInvoiceEmail = () => {
    if (selectedInvoice) {
      addToast(
        `Invoice ${selectedInvoice.id} emailed to customer with attached PDF!`,
        'info'
      );
      setSelectedInvoice(null);
    }
  };

  const handleDownloadInvoicePDF = () => {
    if (selectedInvoice) {
      addToast(`Generating official PDF for invoice ${selectedInvoice.id}...`, 'info');
    }
  };

  // Broadcast
  const handleSendBroadcast = (msg: string) => {
    setIsBroadcastOpen(false);
    addToast(`Broadcast sent: All 6 cleaners notified via WhatsApp!`, 'success');
  };

  // Compute stats
  const completedJobsCount = jobs.filter((j) => j.status === 'Completed').length;
  const inProgressJobsCount = jobs.filter((j) => j.status === 'In Progress').length;
  const totalRevenue = jobs.reduce((acc, curr) => acc + curr.price, 0) + 11300;
  const pendingInvoicesAmount = invoices
    .filter((inv) => inv.status !== 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="w-full pt-16 pb-20 md:pb-10 bg-[#faf8ff] flex-1">
        {/* Sticky Role Switcher Bar */}
        <RoleSwitcherBar currentRole={currentRole} onRoleChange={handleRoleChange} />

        {/* Section 1: Hero Section (Visible in all views or previews) */}
        <HeroSection
          onOpenAddJob={() => setIsAddJobOpen(true)}
          onOpenDemo={() => setIsDemoOpen(true)}
          onShowToast={addToast}
        />

        {/* OWNER VIEW: Comprehensive Operations Hub */}
        {(currentRole === 'owner') && (
          <>
            {/* Section 2: Owner Dashboard */}
            <OwnerDashboard
              onOpenAddJob={() => setIsAddJobOpen(true)}
              onOpenBroadcast={() => setIsBroadcastOpen(true)}
              onExportRunSheet={() => setIsRunSheetOpen(true)}
              totalJobsCount={jobs.length}
              completedJobsCount={completedJobsCount}
              inProgressJobsCount={inProgressJobsCount}
              totalRevenue={totalRevenue}
              pendingInvoicesAmount={pendingInvoicesAmount}
              cleanersOnDutyCount={cleaners.filter((c) => c.status !== 'Off Duty').length}
            />

            {/* Section 3: Job Calendar & Allocations */}
            <JobCalendar
              jobs={jobs}
              onOpenAddJob={() => setIsAddJobOpen(true)}
              onUpdateJobStatus={handleUpdateJobStatus}
              onPingCleaner={handlePingCleaner}
              onShowToast={addToast}
            />

            {/* Section 4: Cleaners Roster & WhatsApp Dispatch */}
            <CleanersRoster
              cleaners={cleaners}
              onInviteCleaner={handleInviteCleaner}
              onDispatchWhatsApp={handleDispatchWhatsApp}
            />

            {/* Section 5: Customer Directory & History */}
            <CustomerDirectory
              customers={customers}
              onSelectCustomer={(c) => setSelectedCustomer(c)}
            />

            {/* Section 6: Invoicing & Payment Tracker */}
            <InvoicingTracker
              invoices={invoices}
              onMarkPaid={handleMarkPaid}
              onViewInvoice={(inv) => setSelectedInvoice(inv)}
              onCreateInvoice={() => setIsCreateInvoiceOpen(true)}
            />

            {/* Section 7: Cleaner Mobile Portal Preview */}
            <CleanerPortal onShowToast={addToast} />

            {/* Section 8: Customer Portal Preview */}
            <CustomerPortal onShowToast={addToast} />
          </>
        )}

        {/* CLEANER VIEW: Dedicated mobile experience for Maria Santos */}
        {currentRole === 'cleaner' && (
          <div className="py-6">
            <CleanerPortal onShowToast={addToast} />
          </div>
        )}

        {/* CUSTOMER VIEW: Dedicated self-service portal for David Miller */}
        {currentRole === 'customer' && (
          <div className="py-6">
            <CustomerPortal onShowToast={addToast} />
          </div>
        )}

        {/* Footer & Conversion Banner */}
        <FooterCTA
          onClaimFreeTrial={() => setIsAddJobOpen(true)}
          onShowToast={addToast}
        />
      </main>

      {/* Mobile Sticky Quick Navigation Bar */}
      <MobileBottomNav
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAddJob={() => setIsAddJobOpen(true)}
      />

      {/* Dialog Modals */}
      <AddJobModal
        isOpen={isAddJobOpen}
        onClose={() => setIsAddJobOpen(false)}
        cleaners={cleaners}
        onAddJob={handleAddJob}
      />

      <WhatsAppDispatchModal
        isOpen={!!whatsappCleaner}
        onClose={() => setWhatsappCleaner(null)}
        cleaner={whatsappCleaner}
        onConfirmSend={handleConfirmWhatsAppSend}
      />

      <InvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        onSendWhatsApp={handleSendInvoiceWhatsApp}
        onSendEmail={handleSendInvoiceEmail}
        onDownloadPDF={handleDownloadInvoicePDF}
      />

      <CreateInvoiceModal
        isOpen={isCreateInvoiceOpen}
        onClose={() => setIsCreateInvoiceOpen(false)}
        customers={customers}
        onCreateInvoice={handleCreateCustomInvoice}
      />

      <RunSheetModal
        isOpen={isRunSheetOpen}
        onClose={() => setIsRunSheetOpen(false)}
        jobs={jobs}
        cleaners={cleaners}
        onShowToast={addToast}
      />

      <BroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        cleaners={cleaners}
        onSendBroadcast={handleSendBroadcast}
      />

      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onTryAddJob={() => setIsAddJobOpen(true)}
      />

      <CustomerDrawer
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        onMessageWhatsApp={(cust) => {
          setSelectedCustomer(null);
          addToast(`Opening WhatsApp chat thread with ${cust.name}...`, 'info');
        }}
      />
    </div>
  );
}
