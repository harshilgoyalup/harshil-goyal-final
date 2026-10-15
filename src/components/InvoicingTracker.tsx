import React from 'react';
import { Invoice } from '../types';

interface InvoicingTrackerProps {
  invoices: Invoice[];
  onMarkPaid: (invoiceId: string) => void;
  onViewInvoice: (invoice: Invoice) => void;
  onCreateInvoice: () => void;
}

export const InvoicingTracker: React.FC<InvoicingTrackerProps> = ({
  invoices,
  onMarkPaid,
  onViewInvoice,
  onCreateInvoice,
}) => {
  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20">
            Paid
          </span>
        );
      case 'Sent':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#eaedff] text-primary-container border border-primary-container/20">
            Sent
          </span>
        );
      case 'Overdue':
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ffdcc3] text-[#824500] border border-[#824500]/20">
            Overdue
          </span>
        );
    }
  };

  return (
    <section id="section-invoicing" className="py-10 px-4 lg:px-8 bg-[#f2f3ff] border-b border-[#eaedff]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header & Create Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#006c4a]">
              ACCOUNTS &amp; CASHFLOW
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#131b2e] tracking-tight">
              Invoicing &amp; Payment Tracker
            </h2>
          </div>

          <button
            onClick={onCreateInvoice}
            className="min-h-[46px] px-5 py-2.5 rounded-xl bg-primary-container text-white font-semibold text-xs lg:text-sm shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 self-start cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            <span>Create Custom Invoice</span>
          </button>
        </div>

        {/* Invoices Table Container */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#eaedff] overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="text-[#434655] text-xs font-bold uppercase tracking-wider border-b border-[#eaedff]">
                <th className="py-3 px-3.5">Invoice #</th>
                <th className="py-3 px-3.5">Customer</th>
                <th className="py-3 px-3.5">Service</th>
                <th className="py-3 px-3.5">Date</th>
                <th className="py-3 px-3.5">Amount</th>
                <th className="py-3 px-3.5">Status</th>
                <th className="py-3 px-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs lg:text-sm text-[#131b2e] divide-y divide-[#eaedff]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#f2f3ff]/60 transition-colors">
                  <td className="py-3.5 px-3.5 font-bold text-primary-container">
                    {inv.id}
                  </td>
                  <td className="py-3.5 px-3.5 font-semibold text-[#131b2e]">
                    {inv.customer}
                  </td>
                  <td className="py-3.5 px-3.5 text-[#434655]">{inv.service}</td>
                  <td className="py-3.5 px-3.5 text-[#434655]">{inv.date}</td>
                  <td className="py-3.5 px-3.5 font-bold text-[#131b2e]">
                    ${inv.amount}.00
                  </td>
                  <td className="py-3.5 px-3.5">{getStatusBadge(inv.status)}</td>
                  <td className="py-3.5 px-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {inv.status !== 'Paid' && (
                        <button
                          onClick={() => onMarkPaid(inv.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20 text-xs font-semibold hover:bg-[#85f8c4] transition-colors cursor-pointer"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        onClick={() => onViewInvoice(inv)}
                        className="px-3 py-1 rounded-lg bg-[#eaedff] text-[#131b2e] text-xs font-semibold hover:bg-[#dbe1ff] transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
