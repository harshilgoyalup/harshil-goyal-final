import React, { useState } from 'react';
import { Cleaner } from '../types';

interface WhatsAppDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  cleaner: Cleaner | null;
  onConfirmSend: (msg: string) => void;
}

export const WhatsAppDispatchModal: React.FC<WhatsAppDispatchModalProps> = ({
  isOpen,
  onClose,
  cleaner,
  onConfirmSend,
}) => {
  if (!isOpen || !cleaner) return null;

  const defaultMsg = `👋 Hi ${cleaner.name.split(' ')[0]}!\n\nHere is your dispatched cleaning job details for today:\n\n📍 Property: 74 Willow Lane, Apt 3B\n⏰ Time: 11:30 AM - 1:30 PM\n🧹 Service: Deep Clean & Sanitization\n💰 Rate: $180.00\n\n🔑 Entry code: Key under grey flower pot (#5512)\n📝 Note: Focus heavily on oven, master bath, and kitchen surfaces.\n\nReply 'CONFIRMED' to lock in this shift! 🚀`;

  const [message, setMessage] = useState(defaultMsg);

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl bg-[#0b141a] text-white shadow-2xl flex flex-col overflow-hidden border border-[#202c33]">
        {/* WhatsApp Header */}
        <div className="bg-[#1f2c34] px-4 py-3 flex items-center justify-between border-b border-[#2a3942]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00a884] text-white font-bold flex items-center justify-center text-sm shadow-sm">
              {cleaner.initials}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-[#e9edef] flex items-center gap-1.5">
                {cleaner.name}
                <span className="text-[10px] bg-[#00a884]/20 text-[#00a884] px-1.5 py-0.5 rounded-full font-semibold">
                  WhatsApp
                </span>
              </span>
              <span className="text-[11px] text-[#8696a0]">{cleaner.phone} • Online</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-[#2a3942] flex items-center justify-center hover:bg-[#374248] text-[#e9edef] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* WhatsApp Chat Canvas */}
        <div className="p-4 bg-[#0b141a] bg-radial flex flex-col gap-3 min-h-[260px]">
          <div className="self-center bg-[#182229] text-[#8696a0] text-[11px] px-3 py-1 rounded-lg border border-[#222e35]">
            TODAY • END-TO-END ENCRYPTED
          </div>

          <div className="self-end max-w-[92%] bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-xs p-3.5 shadow-md flex flex-col gap-2 border border-[#00745e]">
            <textarea
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-[13px] text-[#e9edef] font-mono leading-relaxed resize-none focus:outline-none"
            />
            <div className="flex items-center justify-end gap-1 text-[10px] text-[#8696a0]">
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-[#53bdeb] font-bold">✓✓</span>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-[#1f2c34] p-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#2a3942]">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(message);
              alert('WhatsApp message copied to clipboard!');
            }}
            className="px-3.5 py-2 rounded-xl bg-[#2a3942] hover:bg-[#374248] text-[#e9edef] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">content_copy</span>
            <span>Copy Text</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8696a0] hover:text-[#e9edef] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirmSend(message)}
              className="px-5 py-2.5 rounded-xl bg-[#00a884] text-[#111b21] hover:bg-[#02be94] text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Send WhatsApp Dispatch</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
