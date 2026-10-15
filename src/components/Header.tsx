import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'cleaners', label: 'Cleaners' },
    { id: 'customers', label: 'Customers' },
    { id: 'invoicing', label: 'Invoicing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff]">
      <div className="h-16 w-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => {
              onRoleChange('owner');
              onTabChange('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[22px]">cleaning_services</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[18px] text-[#131b2e] tracking-tight leading-none">
                FlowFix
              </span>
              <span className="text-[11px] font-semibold text-primary-container leading-none mt-1 uppercase tracking-wider">
                Operations
              </span>
            </div>
          </div>

          {/* Quick Persona Selector */}
          <div className="hidden md:flex items-center bg-[#f2f3ff] p-1 rounded-full border border-[#eaedff]">
            <button
              onClick={() => onRoleChange('owner')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                currentRole === 'owner'
                  ? 'bg-white text-primary-container shadow-sm'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
              type="button"
            >
              Owner
            </button>
            <button
              onClick={() => onRoleChange('cleaner')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                currentRole === 'cleaner'
                  ? 'bg-white text-primary-container shadow-sm'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
              type="button"
            >
              Cleaner
            </button>
            <button
              onClick={() => onRoleChange('customer')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                currentRole === 'customer'
                  ? 'bg-white text-primary-container shadow-sm'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
              type="button"
            >
              Customer
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  const el = document.getElementById(`section-${item.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`transition-all text-sm font-semibold px-3.5 py-2 rounded-lg ${
                  isActive
                    ? 'bg-primary-container text-white shadow-sm'
                    : 'text-[#434655] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Status & User */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#82f5c1] text-[#00714e] text-xs font-semibold border border-[#006c4a]/15">
            <span className="w-2 h-2 rounded-full bg-[#006c4a] animate-pulse"></span>
            <span>WhatsApp Active</span>
          </div>

          <button
            onClick={() => {
              const nextRole = currentRole === 'owner' ? 'cleaner' : currentRole === 'cleaner' ? 'customer' : 'owner';
              onRoleChange(nextRole);
            }}
            title={`Current: ${currentRole} - Click to switch`}
            className="w-8 h-8 rounded-full bg-[#004ac6] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
