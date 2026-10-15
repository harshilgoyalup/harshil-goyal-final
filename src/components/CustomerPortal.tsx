import React, { useState } from 'react';

interface CustomerPortalProps {
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ onShowToast }) => {
  const [specialNote, setSpecialNote] = useState('');
  const [currentSavedNote, setCurrentSavedNote] = useState(
    'Alarm code #4012, beware of golden retriever Charlie.'
  );
  const [invoicePaid, setInvoicePaid] = useState(false);

  const handleSaveNote = () => {
    if (!specialNote.trim()) {
      onShowToast('Please enter instructions for Elena', 'warning');
      return;
    }
    setCurrentSavedNote(specialNote);
    onShowToast(`Elena has received your updated note: "${specialNote}" via WhatsApp`, 'success');
    setSpecialNote('');
  };

  const handlePayCard = () => {
    setInvoicePaid(true);
    onShowToast('Payment of $210.00 successful via Stripe! Receipt sent to email & WhatsApp.', 'success');
  };

  return (
    <section id="section-customer-view" className="py-10 px-4 lg:px-8 bg-[#eaedff] border-b border-[#eaedff]">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Customer Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white shadow-sm border border-[#eaedff]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-white flex items-center justify-center font-bold text-lg shadow-sm">
              DM
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-container">
                Customer Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#131b2e] tracking-tight">
                Welcome back, David Miller
              </h2>
            </div>
          </div>

          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20 self-start sm:self-auto">
            Standard Plan (Bi-weekly)
          </span>
        </div>

        {/* Upcoming Service Reminder Card */}
        <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006c4a]">
              Upcoming Service Reminder
            </span>
            <span className="text-xs font-bold text-primary-container px-2.5 py-0.5 rounded-full bg-[#eaedff] border border-[#dbe1ff]">
              Confirmed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-center gap-3.5">
              <span className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-primary-container shrink-0">
                <span className="material-symbols-outlined text-[24px]">event</span>
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-[#434655] font-medium">Scheduled Day</span>
                <span className="text-sm font-bold text-[#131b2e]">Thursday at 9:00 AM</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#006c4a] text-white flex items-center justify-center font-bold text-sm shrink-0">
                ER
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#434655] font-medium">Assigned Cleaner</span>
                <span className="text-sm font-bold text-[#131b2e]">Elena Rostova (5.0 ★)</span>
              </div>
            </div>
          </div>

          {/* Current Saved Instruction Display */}
          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] text-xs text-[#434655]">
            <span className="font-bold text-[#131b2e]">Active Note on File: </span>
            <span>{currentSavedNote}</span>
          </div>

          {/* Input to Update Instructions */}
          <div className="flex flex-col gap-2 pt-1">
            <label className="text-xs font-bold text-[#131b2e]">Special Instructions for Elena:</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="e.g. Please leave extra fresh towels in guest bathroom"
                className="flex-1 min-h-[46px] px-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] placeholder:text-[#434655]/60 text-xs lg:text-sm font-medium border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
              <button
                onClick={handleSaveNote}
                className="min-h-[46px] px-5 rounded-xl bg-primary-container text-white text-xs lg:text-sm font-bold shadow-sm hover:opacity-95 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">check</span>
                <span>Update Note</span>
              </button>
            </div>
          </div>
        </div>

        {/* Invoices & Receipts Summary Table */}
        <div className="p-6 rounded-2xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#131b2e]">Invoices &amp; Receipts</h3>
            <span className="text-xs font-medium text-[#434655]">Instant PDF and Card Pay</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="text-[#434655] text-xs font-bold uppercase tracking-wider border-b border-[#eaedff]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Service</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Receipt / Pay</th>
                </tr>
              </thead>
              <tbody className="text-xs lg:text-sm text-[#131b2e] divide-y divide-[#eaedff]">
                <tr>
                  <td className="py-3 px-3 text-[#434655]">Oct 12, 2024</td>
                  <td className="py-3 px-3 font-semibold">Bi-weekly Routine Clean</td>
                  <td className="py-3 px-3 font-bold">$140.00</td>
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20">
                      Paid
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => onShowToast('Downloading PDF Receipt for Oct 12 Clean...', 'info')}
                      className="px-3 py-1.5 rounded-lg bg-[#eaedff] text-[#131b2e] text-xs font-semibold hover:bg-[#dbe1ff] transition-colors cursor-pointer"
                    >
                      Download PDF
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="py-3 px-3 text-[#434655]">Oct 26, 2024</td>
                  <td className="py-3 px-3 font-semibold">Deep Clean &amp; Windows</td>
                  <td className="py-3 px-3 font-bold">$210.00</td>
                  <td className="py-3 px-3">
                    {invoicePaid ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ffdcc3] text-[#824500] border border-[#824500]/20">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {invoicePaid ? (
                      <button
                        onClick={() => onShowToast('Downloading PDF Receipt for Oct 26 Clean...', 'info')}
                        className="px-3 py-1.5 rounded-lg bg-[#eaedff] text-[#131b2e] text-xs font-semibold hover:bg-[#dbe1ff] transition-colors cursor-pointer"
                      >
                        Download PDF
                      </button>
                    ) : (
                      <button
                        onClick={handlePayCard}
                        className="px-3.5 py-1.5 rounded-lg bg-primary-container text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all cursor-pointer"
                      >
                        Pay Now via Card
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
