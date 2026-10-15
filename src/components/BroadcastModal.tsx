import React, { useState } from 'react';
import { Cleaner } from '../types';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  cleaners: Cleaner[];
  onSendBroadcast: (msg: string) => void;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({
  isOpen,
  onClose,
  cleaners,
  onSendBroadcast,
}) => {
  const [broadcastText, setBroadcastText] = useState(
    '📢 Team update: Traffic congestion reported near Kensington High St. Please plan for 15-min transit buffers between afternoon deep cleans. Stay safe and hydrated!'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl flex flex-col gap-4 border border-[#eaedff]">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-[#82f5c1] text-[#00714e] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">forum</span>
            </span>
            <div>
              <h3 className="text-base font-bold text-[#131b2e]">Broadcast to All Cleaners</h3>
              <span className="text-xs text-[#434655]">Sending via verified WhatsApp Business Gateway</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-xs text-[#434655]">
          <span className="font-bold text-[#131b2e]">Recipients: </span>
          <span>{cleaners.map((c) => c.name).join(', ')} (4 active recipients)</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#434655] mb-1">WhatsApp Broadcast Message</label>
          <textarea
            rows={4}
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-[#faf8ff] text-xs font-medium text-[#131b2e] border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#eaedff]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#434655] hover:bg-[#f2f3ff] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSendBroadcast(broadcastText)}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20 text-xs font-bold shadow-sm hover:bg-[#85f8c4] flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Broadcast via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
