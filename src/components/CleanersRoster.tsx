import React from 'react';
import { Cleaner } from '../types';

interface CleanersRosterProps {
  cleaners: Cleaner[];
  onInviteCleaner: () => void;
  onDispatchWhatsApp: (cleaner: Cleaner) => void;
}

export const CleanersRoster: React.FC<CleanersRosterProps> = ({
  cleaners,
  onInviteCleaner,
  onDispatchWhatsApp,
}) => {
  const getStatusBadge = (status: Cleaner['status']) => {
    switch (status) {
      case 'On Job':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c4a]"></span>
            On Job
          </span>
        );
      case 'Available':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaedff] text-primary-container border border-primary-container/20">
            Available
          </span>
        );
      case 'Off Duty':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaedff] text-[#434655]">
            Off Duty
          </span>
        );
    }
  };

  return (
    <section id="section-cleaners" className="py-10 px-4 lg:px-8 bg-[#f2f3ff] border-b border-[#eaedff]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header & Invite */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#006c4a]">
              ROSTER &amp; DISPATCH
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#131b2e] tracking-tight">
              Cleaners &amp; Instant WhatsApp Dispatch
            </h2>
          </div>

          <button
            onClick={onInviteCleaner}
            className="min-h-[46px] px-4 py-2.5 rounded-xl bg-white text-[#131b2e] font-semibold text-xs lg:text-sm shadow-sm border border-[#c3c6d7] hover:bg-[#eaedff] transition-all flex items-center gap-2 self-start cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Invite Cleaner</span>
          </button>
        </div>

        {/* 4 Cleaners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cleaners.map((cleaner) => (
            <div
              key={cleaner.id}
              className="p-5 rounded-2xl bg-white shadow-sm border border-[#eaedff] flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
            >
              {/* Top Avatar, Name, Rating & Status Badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${cleaner.avatarBg} font-bold flex items-center justify-center text-lg shadow-sm`}
                  >
                    {cleaner.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-[#131b2e] leading-snug">
                      {cleaner.name}
                    </span>
                    <span className="text-xs text-[#434655] flex items-center gap-1 font-medium mt-0.5">
                      <span className="material-symbols-outlined text-[14px] text-[#824500]">
                        star
                      </span>
                      <span>
                        {cleaner.rating} ({cleaner.totalJobs} jobs)
                      </span>
                    </span>
                  </div>
                </div>

                <div>{getStatusBadge(cleaner.status)}</div>
              </div>

              {/* Today's Jobs Pill */}
              <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-between text-xs">
                <span className="text-[#434655] font-medium">Today's Jobs:</span>
                <span className="font-semibold text-[#131b2e]">
                  {cleaner.assignedToday} assigned{' '}
                  {cleaner.status === 'On Job' ? '(1 active)' : ''}
                </span>
              </div>

              {/* Phone & Subtext */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#434655] font-medium">{cleaner.phone}</span>
                  <span
                    className={`font-semibold ${
                      cleaner.status === 'On Job'
                        ? 'text-[#006c4a]'
                        : cleaner.status === 'Available'
                        ? 'text-primary-container'
                        : 'text-[#737686]'
                    }`}
                  >
                    {cleaner.subtext}
                  </span>
                </div>

                {/* Dispatch Button */}
                <button
                  onClick={() => onDispatchWhatsApp(cleaner)}
                  className={`min-h-[46px] w-full rounded-xl text-xs lg:text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm cursor-pointer ${
                    cleaner.status === 'Off Duty'
                      ? 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dbe1ff]'
                      : 'bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20 hover:bg-[#85f8c4]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      cleaner.status === 'Off Duty' ? 'text-[#434655]' : 'text-[#006c4a]'
                    }`}
                  >
                    chat
                  </span>
                  <span>
                    {cleaner.status === 'Off Duty'
                      ? 'Send Ping / WhatsApp'
                      : 'Send Job via WhatsApp'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
