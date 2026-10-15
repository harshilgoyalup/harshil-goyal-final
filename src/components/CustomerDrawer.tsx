import React from 'react';
import { Customer } from '../types';

interface CustomerDrawerProps {
  customer: Customer | null;
  onClose: () => void;
  onMessageWhatsApp: (customer: Customer) => void;
}

export const CustomerDrawer: React.FC<CustomerDrawerProps> = ({
  customer,
  onClose,
  onMessageWhatsApp,
}) => {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/40 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div className="flex flex-col gap-5">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-container">
              Client Profile
            </span>
            <button
              onClick={onClose}
              aria-label="Close client profile"
              className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center hover:bg-[#eaedff] text-[#131b2e] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Profile Header */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-[#eaedff]">
            <div className="w-13 h-13 rounded-2xl bg-[#dbe1ff] text-[#00174b] font-bold flex items-center justify-center text-lg shadow-sm">
              {customer.avatar}
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-[#131b2e] leading-snug">
                {customer.name}
              </h3>
              <span className="text-xs text-[#434655] font-medium">{customer.phone}</span>
            </div>
          </div>

          {/* Primary Address */}
          <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-[#434655] uppercase tracking-wider">
              Primary Address:
            </span>
            <span className="text-xs lg:text-sm font-bold text-[#131b2e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-container text-[16px]">
                location_on
              </span>
              {customer.address}
            </span>
          </div>

          {/* Special Instructions */}
          <div className="p-3.5 rounded-xl bg-[#ffdcc3]/50 border border-[#ffb77d]/50 flex flex-col gap-1">
            <span className="text-[11px] font-bold text-[#824500] uppercase tracking-wider">
              Special Instructions:
            </span>
            <p className="text-xs text-[#131b2e] leading-relaxed font-medium">
              {customer.notes}
            </p>
          </div>

          {/* Stats 2-column */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col">
              <span className="text-[11px] text-[#434655] font-semibold">Cleaning Frequency</span>
              <span className="text-sm font-bold text-[#131b2e] mt-1">
                {customer.frequency}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col">
              <span className="text-[11px] text-[#434655] font-semibold">Total Spent</span>
              <span className="text-sm font-bold text-[#006c4a] mt-1">
                ${customer.totalSpent.toLocaleString()}.00
              </span>
            </div>
          </div>

          {/* Job History Log */}
          <div className="flex flex-col gap-2.5 pt-1">
            <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
              Job History Log:
            </span>
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-[#131b2e]">Weekly Domestic Cleaning</div>
                  <div className="text-[#434655] text-[11px] mt-0.5">
                    Last Thursday by {customer.cleaner}
                  </div>
                </div>
                <span className="font-bold text-[#006c4a] bg-[#82f5c1] px-2 py-0.5 rounded-full text-[11px]">
                  $140 (Paid)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-[#131b2e]">Deep Oven &amp; Floor Clean</div>
                  <div className="text-[#434655] text-[11px] mt-0.5">
                    2 weeks ago by {customer.cleaner}
                  </div>
                </div>
                <span className="font-bold text-[#006c4a] bg-[#82f5c1] px-2 py-0.5 rounded-full text-[11px]">
                  $210 (Paid)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-[#131b2e]">Initial Setup &amp; Surface Sanitize</div>
                  <div className="text-[#434655] text-[11px] mt-0.5">
                    Last month by {customer.cleaner}
                  </div>
                </div>
                <span className="font-bold text-[#006c4a] bg-[#82f5c1] px-2 py-0.5 rounded-full text-[11px]">
                  $180 (Paid)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6">
          <button
            onClick={() => onMessageWhatsApp(customer)}
            className="min-h-[48px] w-full rounded-xl bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20 font-bold text-xs lg:text-sm flex items-center justify-center gap-2 hover:bg-[#85f8c4] transition-all active:scale-98 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#006c4a]">chat</span>
            <span>Message on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
