import React, { useState } from 'react';
import { Customer, Invoice } from '../types';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  onCreateInvoice: (invoice: Invoice) => void;
}

export const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  isOpen,
  onClose,
  customers,
  onCreateInvoice,
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [service, setService] = useState('Deep Clean & Sanitization');
  const [amount, setAmount] = useState<number>(180);
  const [dueDate, setDueDate] = useState('7 days from issue');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

    const newInvoice: Invoice = {
      id: `INV-2024-00${Math.floor(Math.random() * 90 + 10)}`,
      customer: customer.name,
      address: customer.address,
      service,
      date: 'Today',
      amount: Number(amount) || 150,
      status: 'Sent',
      dueDate,
    };

    onCreateInvoice(newInvoice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl flex flex-col gap-4 border border-[#eaedff]">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-container text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </span>
            <h3 className="text-base font-bold text-[#131b2e]">Create Custom Invoice</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-bold text-[#434655] mb-1">Select Customer</label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full min-h-[44px] px-3 rounded-xl bg-[#f2f3ff] text-xs font-semibold border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.address})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#434655] mb-1">Service Description</label>
            <input
              type="text"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="e.g. End of Lease Deep Clean & Carpet"
              className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#f2f3ff] text-xs font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#434655] mb-1">Amount ($)</label>
              <input
                type="number"
                required
                min={20}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#f2f3ff] text-xs font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#434655] mb-1">Payment Terms</label>
              <select
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full min-h-[44px] px-3 rounded-xl bg-[#f2f3ff] text-xs font-semibold border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                <option value="Upon receipt">Due Immediately</option>
                <option value="7 days from issue">Net 7 Days</option>
                <option value="14 days from issue">Net 14 Days</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#eaedff]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#434655] hover:bg-[#f2f3ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary-container text-white text-xs font-bold shadow-sm hover:opacity-95"
            >
              Generate Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
