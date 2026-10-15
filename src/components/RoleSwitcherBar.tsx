import React from 'react';
import { UserRole } from '../types';

interface RoleSwitcherBarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const RoleSwitcherBar: React.FC<RoleSwitcherBarProps> = ({
  currentRole,
  onRoleChange,
}) => {
  const getBadgeLabel = () => {
    switch (currentRole) {
      case 'owner':
        return 'Owner (Full Hub)';
      case 'cleaner':
        return 'Cleaner (Maria S.)';
      case 'customer':
        return 'Customer (David M.)';
    }
  };

  return (
    <aside
      aria-label="Role preview switcher"
      className="sticky top-16 z-40 bg-[#ffffff]/95 backdrop-blur-md px-4 lg:px-8 py-2.5 shadow-sm border-b border-[#eaedff]"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Active persona indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006c4a] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006c4a]"></span>
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#434655]">
            ACTIVE PERSONA:
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-container text-white shadow-sm">
            {getBadgeLabel()}
          </span>
        </div>

        {/* Interactive role switcher tabs */}
        <div
          aria-label="Role Switcher"
          className="flex items-center gap-1.5 p-1 bg-[#eaedff] rounded-full"
          role="tablist"
        >
          <button
            onClick={() => onRoleChange('owner')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentRole === 'owner'
                ? 'bg-primary-container text-white shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            Owner (Full View)
          </button>
          <button
            onClick={() => onRoleChange('cleaner')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentRole === 'cleaner'
                ? 'bg-primary-container text-white shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            Cleaner (Maria S.)
          </button>
          <button
            onClick={() => onRoleChange('customer')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              currentRole === 'customer'
                ? 'bg-primary-container text-white shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            Customer (David M.)
          </button>
        </div>

        {/* Sync status */}
        <div className="hidden lg:flex items-center gap-1.5 text-[#434655] text-xs font-medium">
          <span className="material-symbols-outlined text-[#006c4a] text-[16px] animate-spin">
            sync
          </span>
          <span>Auto-syncing WhatsApp dispatch queue</span>
        </div>
      </div>
    </aside>
  );
};
