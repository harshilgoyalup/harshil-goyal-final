import React from 'react';
import { ToastNotification } from '../types';

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let bgStyle = 'bg-[#283044] text-[#eef0ff]';
        let icon = 'info';

        if (toast.type === 'success') {
          bgStyle = 'bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20 shadow-md';
          icon = 'check_circle';
        } else if (toast.type === 'warning') {
          bgStyle = 'bg-[#ffdcc3] text-[#824500] border border-[#824500]/20 shadow-md';
          icon = 'warning';
        }

        return (
          <div
            key={toast.id}
            onClick={() => onDismiss(toast.id)}
            className={`pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl shadow-lg transition-all transform duration-300 cursor-pointer ${bgStyle}`}
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">{icon}</span>
            <span className="text-[13px] font-semibold leading-snug flex-1">{toast.message}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss(toast.id);
              }}
              className="opacity-70 hover:opacity-100 text-xs shrink-0"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};
