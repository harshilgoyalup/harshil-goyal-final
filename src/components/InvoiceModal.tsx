import React from 'react';
import { Invoice } from '../types';

interface InvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onSendWhatsApp: () => void;
  onSendEmail: () => void;
  onDownloadPDF: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  invoice,
  onClose,
  onSendWhatsApp,
  onSendEmail,
  onDownloadPDF,
}) => {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl flex flex-col gap-4 max-h-[92vh] overflow-y-auto border border-[#eaedff]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">receipt</span>
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#131b2e] leading-snug">Invoice Preview</h3>
              <span className="text-xs font-semibold text-[#434655]">{invoice.id}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close invoice preview"
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center hover:bg-[#eaedff] text-[#131b2e] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Realistic Invoice Card Canvas */}
        <div className="p-5 rounded-2xl bg-[#f2f3ff] flex flex-col gap-5 border border-[#eaedff]">
          {/* Company & Client Headers */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <div className="text-lg font-extrabold text-primary-container leading-tight">
                FlowFix Operations Ltd
              </div>
              <div className="text-xs text-[#434655] mt-1 leading-relaxed">
                Tax ID: GB-992-104928
                <br />
                billing@flowfixclean.com • +1 (800) 555-FLOW
              </div>
            </div>

            <div className="sm:text-right">
              <div className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                Billed To
              </div>
              <div className="text-sm font-bold text-[#131b2e] mt-0.5">
                {invoice.customer}
              </div>
              <div className="text-xs text-[#434655] mt-0.5 max-w-[200px]">
                {invoice.address}
              </div>
              <div className="text-[11px] text-[#737686] mt-1">
                Issued: {invoice.date} • Due: {invoice.dueDate || 'Upon receipt'}
              </div>
            </div>
          </div>

          {/* Service Line Item */}
          <div className="p-4 rounded-xl bg-white border border-[#eaedff] flex items-center justify-between shadow-xs">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#131b2e]">{invoice.service}</span>
              <span className="text-xs text-[#434655] mt-0.5">
                Flat rate comprehensive professional cleaning service
              </span>
            </div>
            <span className="text-base font-extrabold text-[#131b2e]">
              ${invoice.amount}.00
            </span>
          </div>

          {/* Calculation Breakdown */}
          <div className="flex flex-col gap-1.5 font-medium text-xs text-[#434655] pt-1 border-t border-[#eaedff]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#131b2e]">${invoice.amount}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (0% Standard Cleaning Exemption):</span>
              <span className="font-semibold text-[#131b2e]">$0.00</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#131b2e] pt-2 border-t border-[#eaedff]">
              <span>Total Payable:</span>
              <span className="text-primary-container">${invoice.amount}.00</span>
            </div>
          </div>
        </div>

        {/* Delivery & Export Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onDownloadPDF}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs lg:text-sm font-semibold hover:bg-[#eaedff] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download PDF</span>
          </button>

          <button
            type="button"
            onClick={onSendEmail}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#eaedff] text-[#131b2e] text-xs lg:text-sm font-semibold hover:bg-[#dbe1ff] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            <span>Send via Email</span>
          </button>

          <button
            type="button"
            onClick={onSendWhatsApp}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20 text-xs lg:text-sm font-bold flex items-center gap-2 hover:bg-[#85f8c4] transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#006c4a]">chat</span>
            <span>Send via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
