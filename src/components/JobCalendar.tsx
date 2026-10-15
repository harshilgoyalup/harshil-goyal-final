import React, { useState } from 'react';
import { CleaningJob, JobStatus } from '../types';

interface JobCalendarProps {
  jobs: CleaningJob[];
  onOpenAddJob: () => void;
  onUpdateJobStatus: (id: string, newStatus: JobStatus) => void;
  onPingCleaner: (cleanerName: string, jobCustomer: string) => void;
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export const JobCalendar: React.FC<JobCalendarProps> = ({
  jobs,
  onOpenAddJob,
  onUpdateJobStatus,
  onPingCleaner,
  onShowToast,
}) => {
  const [calendarMode, setCalendarMode] = useState<'week' | 'month'>('week');
  const [currentDayOffset, setCurrentDayOffset] = useState<number>(0);

  const getDayLabel = () => {
    if (calendarMode === 'month') return 'October 2024 Schedule';
    if (currentDayOffset === 0) return 'Thursday, Current Week';
    if (currentDayOffset > 0) return `Thursday +${currentDayOffset} Week(s)`;
    return `Thursday ${currentDayOffset} Week(s) ago`;
  };

  const getServiceBadgeStyle = (service: string) => {
    switch (service) {
      case 'End of Tenancy':
        return 'bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]';
      case 'Deep Clean':
        return 'bg-[#ffdcc3] text-[#824500] border border-[#ffb77d]/40';
      case 'Airbnb Turnover':
        return 'bg-[#dbe1ff] text-[#004ac6] border border-[#b4c5ff]';
      case 'Regular Domestic':
      default:
        return 'bg-[#eaedff] text-primary-container border border-[#dbe1ff]';
    }
  };

  const getStatusBadge = (status: JobStatus, jobId: string) => {
    switch (status) {
      case 'Completed':
        return (
          <button
            onClick={() => onUpdateJobStatus(jobId, 'Scheduled')}
            title="Click to cycle status"
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20 hover:opacity-80 transition-opacity cursor-pointer"
          >
            Completed
          </button>
        );
      case 'In Progress':
        return (
          <button
            onClick={() => onUpdateJobStatus(jobId, 'Completed')}
            title="Click to cycle status"
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaedff] text-primary-container border border-primary-container/20 hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
            In Progress
          </button>
        );
      case 'Scheduled':
      default:
        return (
          <button
            onClick={() => onUpdateJobStatus(jobId, 'In Progress')}
            title="Click to cycle status"
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaedff] text-[#434655] hover:text-[#131b2e] hover:bg-[#dbe1ff] transition-colors cursor-pointer"
          >
            Scheduled
          </button>
        );
    }
  };

  const getCleanerInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <section id="section-calendar" className="py-10 px-4 lg:px-8 border-b border-[#eaedff]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              DISPATCH SCHEDULE
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#131b2e] tracking-tight">
              Job Calendar &amp; Allocations
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Monthly / Weekly toggle */}
            <div className="flex items-center p-1 rounded-xl bg-[#eaedff]">
              <button
                onClick={() => {
                  setCalendarMode('week');
                  onShowToast('Calendar switched to Weekly view', 'info');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  calendarMode === 'week'
                    ? 'bg-white text-primary-container shadow-sm'
                    : 'text-[#434655] hover:text-[#131b2e]'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => {
                  setCalendarMode('month');
                  onShowToast('Calendar switched to Monthly view', 'info');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  calendarMode === 'month'
                    ? 'bg-white text-primary-container shadow-sm'
                    : 'text-[#434655] hover:text-[#131b2e]'
                }`}
              >
                Monthly
              </button>
            </div>

            <button
              onClick={onOpenAddJob}
              className="min-h-[46px] px-5 py-2.5 rounded-xl bg-primary-container text-white font-semibold text-xs lg:text-sm shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Add Job</span>
            </button>
          </div>
        </div>

        {/* Schedule Board Container */}
        <div className="p-5 rounded-2xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-4">
          {/* Subheader bar */}
          <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
            <div className="text-base font-bold text-[#131b2e] flex items-center gap-2.5">
              <span>{getDayLabel()}</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#82f5c1] text-[#00714e]">
                {jobs.length} Bookings
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                aria-label="Previous week"
                onClick={() => {
                  setCurrentDayOffset((prev) => prev - 1);
                  onShowToast('Viewing previous period bookings', 'info');
                }}
                className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center hover:bg-[#dbe1ff] transition-colors cursor-pointer text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button
                aria-label="Next week"
                onClick={() => {
                  setCurrentDayOffset((prev) => prev + 1);
                  onShowToast('Viewing next period bookings', 'info');
                }}
                className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center hover:bg-[#dbe1ff] transition-colors cursor-pointer text-[#131b2e]"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Job Cards Stream (Grid matching screenshot) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col justify-between gap-3 shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Top Badge & Price */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getServiceBadgeStyle(
                      job.service
                    )}`}
                  >
                    {job.service}
                  </span>
                  <span className="text-base font-bold text-[#006c4a]">${job.price}</span>
                </div>

                {/* Customer Details */}
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-bold text-[#131b2e] leading-snug">{job.customer}</h4>
                  <div className="text-xs text-[#434655] flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[16px] text-primary-container shrink-0">
                      location_on
                    </span>
                    <span className="truncate">{job.address}</span>
                  </div>
                  <div className="text-xs text-[#434655] flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[16px] text-[#737686] shrink-0">
                      schedule
                    </span>
                    <span>{job.time}</span>
                  </div>
                </div>

                {/* Instructions Box */}
                <div className="p-2.5 rounded-lg bg-white text-[#434655] text-xs leading-relaxed border border-[#eaedff]">
                  {job.notes}
                </div>

                {/* Footer with cleaner and status */}
                <div className="flex items-center justify-between pt-2 border-t border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-[11px] shadow-sm">
                      {getCleanerInitials(job.cleaner)}
                    </span>
                    <button
                      onClick={() => onPingCleaner(job.cleaner, job.customer)}
                      className="text-xs font-semibold text-[#131b2e] hover:text-primary-container transition-colors text-left flex items-center gap-1"
                      title="Click to ping cleaner on WhatsApp"
                    >
                      <span>{job.cleaner}</span>
                      <span className="material-symbols-outlined text-[14px] text-[#006c4a] opacity-0 group-hover:opacity-100 transition-opacity">
                        chat
                      </span>
                    </button>
                  </div>

                  <div>{getStatusBadge(job.status, job.id)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
