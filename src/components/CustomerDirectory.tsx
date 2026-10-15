import React, { useState } from 'react';
import { Customer } from '../types';

interface CustomerDirectoryProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
}

export const CustomerDirectory: React.FC<CustomerDirectoryProps> = ({
  customers,
  onSelectCustomer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.cleaner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="section-customers" className="py-10 px-4 lg:px-8 border-b border-[#eaedff]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              CLIENT BASE
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#131b2e] tracking-tight">
              Customer Directory &amp; History
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative min-w-[280px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients or address..."
                className="w-full min-h-[46px] pl-10 pr-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#434655]/60 text-xs lg:text-sm font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#131b2e] text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Customers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCustomers.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-[#eaedff] text-sm text-[#434655]">
              No clients found matching "{searchQuery}".
            </div>
          ) : (
            filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => onSelectCustomer(customer)}
                className="p-5 rounded-2xl bg-white shadow-sm border border-[#eaedff] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between gap-3 group"
              >
                {/* Avatar and frequency badge */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-primary-container font-bold flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform">
                    {customer.avatar}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#eaedff] text-[#434655]">
                    {customer.frequency}
                  </span>
                </div>

                {/* Name, address, and cleaner preference */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-base font-bold text-[#131b2e] leading-snug group-hover:text-primary-container transition-colors">
                    {customer.name}
                  </span>
                  <span className="text-xs text-[#434655] truncate font-medium">
                    {customer.address}
                  </span>
                  <span className="text-xs text-[#006c4a] font-semibold mt-1">
                    Loves {customer.cleaner}
                  </span>
                </div>

                {/* Notes box */}
                <div className="p-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#434655] leading-relaxed line-clamp-2 border border-[#eaedff]">
                  {customer.notes}
                </div>

                {/* Phone and link */}
                <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] text-xs">
                  <span className="text-[#434655] font-medium">{customer.phone}</span>
                  <span className="text-primary-container font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                    View History &rarr;
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
