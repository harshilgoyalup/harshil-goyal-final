import React from 'react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryAddJob: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onTryAddJob }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl flex flex-col gap-5 border border-[#eaedff]">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">play_circle</span>
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#131b2e]">FlowFix Operations In 2 Minutes</h3>
              <span className="text-xs text-[#434655]">How automated WhatsApp dispatch replaces paper diaries</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* 3 Step Interactive Walkthrough */}
        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex items-start gap-3">
            <span className="w-7 h-7 rounded-lg bg-primary-container text-white font-bold text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#131b2e]">Schedule Cleaner with 1 Click</span>
              <span className="text-xs text-[#434655] mt-0.5 leading-relaxed">
                Add the customer address, time slot, lockbox code, and assign any available cleaner in seconds.
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex items-start gap-3">
            <span className="w-7 h-7 rounded-lg bg-[#006c4a] text-white font-bold text-xs flex items-center justify-center shrink-0">
              2
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#131b2e]">Instant Automated WhatsApp Dispatch</span>
              <span className="text-xs text-[#434655] mt-0.5 leading-relaxed">
                Cleaner gets an official WhatsApp notification containing Google Maps navigation link and special entry instructions without needing any app install.
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex items-start gap-3">
            <span className="w-7 h-7 rounded-lg bg-[#a65900] text-white font-bold text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#131b2e]">Automated Check-off &amp; Instant Invoicing</span>
              <span className="text-xs text-[#434655] mt-0.5 leading-relaxed">
                When the cleaner marks job done, the client automatically receives their invoice PDF with 1-tap card payment.
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#eaedff]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#434655] hover:bg-[#f2f3ff] cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onTryAddJob();
            }}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-primary-container text-white text-xs font-bold shadow-sm hover:opacity-95 flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_task</span>
            <span>Try It Now (Book A Shift)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
