import React from 'react';

interface HeroSectionProps {
  onOpenAddJob: () => void;
  onOpenDemo: () => void;
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAddJob,
  onOpenDemo,
  onShowToast,
}) => {
  return (
    <section className="relative overflow-hidden py-10 lg:py-16 px-4 lg:px-8 border-b border-[#eaedff]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#eaedff] text-xs font-semibold text-primary-container border border-[#dbe1ff]">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Zero paper diary. Zero chaotic group chats.</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#131b2e] tracking-tight leading-[1.15]">
            All your cleaning jobs <br className="hidden sm:inline" />
            <span className="text-primary-container">in one place.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#434655] max-w-xl leading-relaxed">
            Ditch the paper diary and messy WhatsApp groups. Schedule cleaners, track jobs,
            and get paid 2x faster with automated WhatsApp confirmations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenAddJob}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-primary-container text-white font-semibold text-sm shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">add_task</span>
              <span>Get Started Free</span>
            </button>

            <button
              onClick={onOpenDemo}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-white text-[#131b2e] font-semibold text-sm shadow-sm border border-[#c3c6d7] hover:bg-[#f2f3ff] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-primary-container">play_circle</span>
              <span>Watch 2-Min Demo</span>
            </button>
          </div>

          {/* Trust Stats Ribbon */}
          <div className="grid grid-cols-3 gap-3 pt-6 max-w-lg">
            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#eaedff] flex flex-col">
              <span className="text-2xl font-bold text-[#131b2e]">450+</span>
              <span className="text-xs text-[#434655] font-medium mt-0.5">Independent cleaners</span>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#eaedff] flex flex-col">
              <span className="text-2xl font-bold text-[#006c4a]">0 min</span>
              <span className="text-xs text-[#434655] font-medium mt-0.5">Setup required</span>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-sm border border-[#eaedff] flex flex-col">
              <span className="text-2xl font-bold text-primary-container">100%</span>
              <span className="text-xs text-[#434655] font-medium mt-0.5">WhatsApp native</span>
            </div>
          </div>
        </div>

        {/* Right Column: Realistic Interactive Phone Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[340px] rounded-[40px] p-3.5 bg-[#283044] shadow-2xl border-4 border-[#131b2e]">
            {/* Top Speaker notch */}
            <div className="w-28 h-4 bg-[#131b2e] rounded-b-xl mx-auto absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
              <div className="w-8 h-1 bg-[#434655] rounded-full"></div>
            </div>

            <div className="rounded-[30px] bg-[#faf8ff] p-4 flex flex-col gap-3 overflow-hidden text-[#131b2e] border border-[#eaedff]">
              {/* Phone Mock Header */}
              <div className="flex items-center justify-between pt-3 pb-1 border-b border-[#eaedff]/60">
                <span className="text-xs font-semibold text-[#434655]">FlowFix Cleaner Run</span>
                <span className="text-[11px] font-bold bg-[#82f5c1] text-[#00714e] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006c4a] animate-pulse"></span>
                  Live Shift
                </span>
              </div>

              {/* WhatsApp Alert Card */}
              <div
                onClick={() =>
                  onShowToast(
                    'WhatsApp dispatch active: Elena received instant booking confirmation',
                    'success'
                  )
                }
                className="p-3 rounded-xl bg-[#82f5c1]/70 border border-[#006c4a]/30 text-[#00714e] shadow-sm flex items-start gap-2.5 cursor-pointer hover:bg-[#82f5c1] transition-colors"
              >
                <span className="material-symbols-outlined text-[22px] text-[#006c4a] shrink-0 mt-0.5">
                  chat
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold leading-tight">WhatsApp Notification</span>
                  <span className="text-[11px] text-[#005137] mt-0.5 leading-snug">
                    "Elena, your 11:30 AM deep clean at 74 Willow Lane is confirmed!"
                  </span>
                </div>
              </div>

              {/* Phone Hero Live Job Card */}
              <div className="p-4 rounded-xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eaedff] text-primary-container">
                    Next Job • 11:30 AM
                  </span>
                  <span className="text-sm font-bold text-[#006c4a]">$180.00</span>
                </div>

                <div className="text-base font-bold text-[#131b2e]">Sarah Jenkins</div>

                <div className="text-xs text-[#434655] flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[16px] text-primary-container shrink-0">
                    location_on
                  </span>
                  <span className="truncate">74 Willow Lane, Apt 3B</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#434655] leading-relaxed border border-[#eaedff]">
                  <span className="font-semibold text-[#131b2e]">Note:</span> Key under plant pot. Focus on oven &amp; master bath.
                </div>

                <button
                  onClick={() => onShowToast('Directions opened in Google Maps for 74 Willow Lane', 'success')}
                  className="w-full min-h-[42px] rounded-lg bg-primary-container text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-95 active:scale-98 transition-all shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">near_me</span>
                  <span>Open Navigation</span>
                </button>
              </div>

              {/* Bottom Daily Projected Summary */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] text-[#434655] text-xs font-medium border border-[#eaedff]">
                <span>Today's Total: 3 Cleanings</span>
                <span className="text-[#131b2e] font-bold text-xs">$420 Projected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
