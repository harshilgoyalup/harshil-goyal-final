import React from 'react';
import { UserRole } from '../types';

interface MobileBottomNavProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAddJob: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onOpenAddJob,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md shadow-[0_-2px_10px_rgba(0,0,0,0.06)] h-16 flex items-center justify-around px-2 border-t border-[#eaedff]">
      <button
        onClick={() => {
          onRoleChange('owner');
          onTabChange('dashboard');
          const el = document.getElementById('section-dashboard');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] transition-colors cursor-pointer ${
          currentRole === 'owner' && activeTab === 'dashboard'
            ? 'text-primary-container font-bold'
            : 'text-[#434655] hover:text-[#131b2e]'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">grid_view</span>
        <span className="text-[11px] mt-0.5">Board</span>
      </button>

      <button
        onClick={() => {
          onTabChange('calendar');
          const el = document.getElementById('section-calendar');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] transition-colors cursor-pointer ${
          activeTab === 'calendar'
            ? 'text-primary-container font-bold'
            : 'text-[#434655] hover:text-[#131b2e]'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">calendar_today</span>
        <span className="text-[11px] mt-0.5">Schedule</span>
      </button>

      <button
        onClick={() => {
          onRoleChange('cleaner');
          const el = document.getElementById('section-cleaner-view');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] transition-colors cursor-pointer ${
          currentRole === 'cleaner'
            ? 'text-primary-container font-bold'
            : 'text-[#434655] hover:text-[#131b2e]'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">mop</span>
        <span className="text-[11px] mt-0.5">Cleaner</span>
      </button>

      <button
        onClick={() => {
          onRoleChange('customer');
          const el = document.getElementById('section-customer-view');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] transition-colors cursor-pointer ${
          currentRole === 'customer'
            ? 'text-primary-container font-bold'
            : 'text-[#434655] hover:text-[#131b2e]'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">account_circle</span>
        <span className="text-[11px] mt-0.5">Customer</span>
      </button>

      <button
        onClick={onOpenAddJob}
        className="min-h-[44px] min-w-[44px] px-3 py-1.5 rounded-xl bg-primary-container text-white flex flex-col items-center justify-center shadow-sm active:scale-95 transition-all cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
        <span className="text-[10px] font-bold">New</span>
      </button>
    </nav>
  );
};
