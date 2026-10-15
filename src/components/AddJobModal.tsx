import React, { useState } from 'react';
import { Cleaner, CleaningJob } from '../types';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  cleaners: Cleaner[];
  onAddJob: (job: Omit<CleaningJob, 'id' | 'status'>) => void;
}

export const AddJobModal: React.FC<AddJobModalProps> = ({
  isOpen,
  onClose,
  cleaners,
  onAddJob,
}) => {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState<CleaningJob['service']>('Regular Domestic');
  const [price, setPrice] = useState<number>(160);
  const [time, setTime] = useState('9:00 AM - 11:30 AM');
  const [cleaner, setCleaner] = useState(cleaners[0]?.name || 'Maria Santos');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.trim() || !address.trim()) return;

    onAddJob({
      customer: customer.trim(),
      address: address.trim(),
      service,
      price: Number(price) || 150,
      time,
      cleaner,
      notes: notes.trim() || 'Standard checklist applies. Key in lockbox.',
    });

    // Reset
    setCustomer('');
    setAddress('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl flex flex-col gap-4 max-h-[92vh] overflow-y-auto border border-[#eaedff]">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </span>
            <h3 className="text-lg font-bold text-[#131b2e]">Schedule New Cleaning Job</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center hover:bg-[#eaedff] text-[#131b2e] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-[#434655] mb-1">
              Customer Full Name
            </label>
            <input
              type="text"
              required
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="e.g. Julian Henderson"
              className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#434655]/60 text-xs lg:text-sm font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#434655] mb-1">
              Property Address
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 18 Canterbury Rd, Flat 2"
              className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#434655]/60 text-xs lg:text-sm font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#434655] mb-1">Service Type</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value as CleaningJob['service'])}
                className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs lg:text-sm font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                <option value="Regular Domestic">Regular Domestic</option>
                <option value="Deep Clean">Deep Clean</option>
                <option value="End of Tenancy">End of Tenancy</option>
                <option value="Airbnb Turnover">Airbnb Turnover</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#434655] mb-1">Price ($)</label>
              <input
                type="number"
                required
                min={50}
                max={1500}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="160"
                className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs lg:text-sm font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#434655] mb-1">Time Slot</label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="9:00 AM - 11:30 AM"
                className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs lg:text-sm font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#434655] mb-1">Assign Cleaner</label>
              <select
                value={cleaner}
                onChange={(e) => setCleaner(e.target.value)}
                className="w-full min-h-[46px] px-3.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs lg:text-sm font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
              >
                {cleaners.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.status})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#434655] mb-1">
              Special Entry / Task Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Key location, access codes, pets, priorities..."
              className="w-full p-3.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs lg:text-sm font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#eaedff]">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs lg:text-sm font-semibold hover:bg-[#eaedff] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2 rounded-xl bg-primary-container text-white text-xs lg:text-sm font-bold shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Save Job &amp; Notify Cleaner</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
