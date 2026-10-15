import React from 'react';

interface FooterCTAProps {
  onClaimFreeTrial: () => void;
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export const FooterCTA: React.FC<FooterCTAProps> = ({ onClaimFreeTrial, onShowToast }) => {
  return (
    <footer className="w-full py-12 px-4 lg:px-8 bg-[#f2f3ff] border-t border-[#eaedff]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Blue CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-primary-container text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Ready to stop running your cleaning business on scraps of paper?
            </h2>
            <p className="text-sm sm:text-base text-[#eeefff] max-w-xl">
              Start your 14-day free trial. Setup takes under 90 seconds. No credit card required.
            </p>
          </div>

          <button
            onClick={onClaimFreeTrial}
            className="min-h-[48px] px-8 py-3.5 rounded-xl bg-white text-primary-container font-bold text-sm shadow-md hover:bg-[#faf8ff] active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            Claim 14 Days Free
          </button>
        </div>

        {/* Corporate Legal & Verified Badge */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#434655] text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-primary-container text-white flex items-center justify-center font-bold text-[10px]">
              FF
            </div>
            <span className="font-bold text-[#131b2e]">FlowFix Operations Ltd</span>
            <span>© 2024. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#006c4a] font-semibold">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>WhatsApp Business API Verified</span>
            </span>

            <button
              onClick={() => onShowToast('Operations SLA: 99.98% WhatsApp dispatch uptime guaranteed', 'info')}
              className="hover:text-[#131b2e] transition-colors cursor-pointer"
            >
              Operations SLA
            </button>
            <button
              onClick={() => onShowToast('WhatsApp Gateway API connected to Meta Cloud Webhook', 'success')}
              className="hover:text-[#131b2e] transition-colors cursor-pointer"
            >
              WhatsApp Gateway
            </button>
            <button
              onClick={() => onShowToast('Support Desk: support@flowfixclean.com (24/7 Priority)', 'info')}
              className="hover:text-[#131b2e] transition-colors cursor-pointer"
            >
              Support Desk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
