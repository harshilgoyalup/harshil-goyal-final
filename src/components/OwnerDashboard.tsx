import React from 'react';

interface OwnerDashboardProps {
  onOpenAddJob: () => void;
  onOpenBroadcast: () => void;
  onExportRunSheet: () => void;
  totalJobsCount: number;
  completedJobsCount: number;
  inProgressJobsCount: number;
  totalRevenue: number;
  pendingInvoicesAmount: number;
  cleanersOnDutyCount: number;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  onOpenAddJob,
  onOpenBroadcast,
  onExportRunSheet,
  totalJobsCount,
  completedJobsCount,
  inProgressJobsCount,
  totalRevenue,
  pendingInvoicesAmount,
  cleanersOnDutyCount,
}) => {
  return (
    <section id="section-dashboard" className="py-8 px-4 lg:px-8 bg-[#f2f3ff] border-b border-[#eaedff]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header & Quick Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-container">
              OPERATIONS CENTRAL
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#131b2e] tracking-tight">
              Owner Dashboard
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenAddJob}
              className="min-h-[46px] px-4 py-2.5 rounded-xl bg-primary-container text-white font-semibold text-xs lg:text-sm shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ New Booking</span>
            </button>

            <button
              onClick={onOpenBroadcast}
              className="min-h-[46px] px-4 py-2.5 rounded-xl bg-white text-[#131b2e] font-semibold text-xs lg:text-sm shadow-sm border border-[#c3c6d7] hover:bg-[#eaedff] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[#006c4a] text-[18px]">forum</span>
              <span>Message All Cleaners</span>
            </button>

            <button
              onClick={onExportRunSheet}
              className="min-h-[46px] px-4 py-2.5 rounded-xl bg-white text-[#131b2e] font-semibold text-xs lg:text-sm shadow-sm border border-[#c3c6d7] hover:bg-[#eaedff] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Export Run Sheet</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#434655]">Today's Jobs</span>
              <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[20px]">calendar_view_day</span>
              </span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-[#131b2e]">
              {totalJobsCount} Scheduled
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-[#006c4a]">{completedJobsCount} Done</span>
              <span className="text-[#737686]">•</span>
              <span className="text-[#a65900]">{inProgressJobsCount} In Progress</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#434655]">Earned This Month</span>
              <span className="w-8 h-8 rounded-lg bg-[#82f5c1] flex items-center justify-center text-[#00714e]">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-[#131b2e]">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#006c4a]">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>+18% vs last month</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#434655]">Pending Invoices</span>
              <span className="w-8 h-8 rounded-lg bg-[#ffdcc3] flex items-center justify-center text-[#824500]">
                <span className="material-symbols-outlined text-[20px]">pending_actions</span>
              </span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-[#131b2e]">
              ${pendingInvoicesAmount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#a65900]">
              <span>4 outstanding client invoices</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#434655]">Cleaners on Duty</span>
              <span className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#004ac6]">
                <span className="material-symbols-outlined text-[20px]">group</span>
              </span>
            </div>
            <div className="text-2xl lg:text-3xl font-extrabold text-[#131b2e]">
              {cleanersOnDutyCount} On Duty
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#006c4a]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#006c4a]"></span>
              <span>All reports on track</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
