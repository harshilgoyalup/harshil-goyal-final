import React, { useState } from 'react';

interface CleanerPortalProps {
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export const CleanerPortal: React.FC<CleanerPortalProps> = ({ onShowToast }) => {
  const [task1Done, setTask1Done] = useState(false);
  const [task1Time, setTask1Time] = useState('');

  const [task2Done, setTask2Done] = useState(false);
  const [task2Time, setTask2Time] = useState('');

  const toggleTask1 = () => {
    if (!task1Done) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTask1Done(true);
      setTask1Time(timeStr);
      onShowToast(
        `Job at 42 Primrose Gardens marked complete at ${timeStr}! Customer notified.`,
        'success'
      );
    } else {
      setTask1Done(false);
      onShowToast('Job reverted to In Progress', 'info');
    }
  };

  const toggleTask2 = () => {
    if (!task2Done) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTask2Done(true);
      setTask2Time(timeStr);
      onShowToast(
        `Job at 15 Kensington High St marked complete at ${timeStr}! Customer notified.`,
        'success'
      );
    } else {
      setTask2Done(false);
      onShowToast('Job reverted to In Progress', 'info');
    }
  };

  return (
    <section id="section-cleaner-view" className="py-10 px-4 lg:px-8 bg-white border-b border-[#eaedff]">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Cleaner Mobile Portal Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/20 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#006c4a] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              MS
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-[#005137]">
                Cleaner Mobile Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                My Jobs Today • Maria Santos
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#006c4a] text-white shadow-sm">
              {task1Done && task2Done ? 'All Jobs Done 🎉' : '2 Jobs Assigned'}
            </span>
          </div>
        </div>

        {/* Task Cards List */}
        <div className="flex flex-col gap-4">
          {/* Cleaner Job 1 */}
          <div
            className={`p-6 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] shadow-sm flex flex-col gap-4 transition-all ${
              task1Done ? 'opacity-80 bg-[#82f5c1]/15 border-[#006c4a]/30' : ''
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-container text-white">
                8:30 AM Slot
              </span>
              <span className="text-sm font-bold text-[#006c4a]">$220.00 Domestic</span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-[#131b2e]">
                42 Primrose Gardens, Kensington
              </h3>
              <p className="text-xs lg:text-sm text-[#434655]">
                End of Lease Deep Clean • Client: Eleanor Vance
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#eaedff] flex items-start gap-3 shadow-xs">
              <span className="material-symbols-outlined text-primary-container text-[20px] shrink-0 mt-0.5">
                vpn_key
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#131b2e]">Entry Instructions:</span>
                <span className="text-xs text-[#434655] mt-0.5 leading-relaxed">
                  Key under grey stone doormat. Alarm deactivate code is 8841. Focus heavily on oven
                  and oven racks.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() =>
                  onShowToast('Directions opened in Google Maps: 42 Primrose Gardens', 'success')
                }
                className="min-h-[46px] px-4 py-2.5 rounded-xl bg-white border border-[#c3c6d7] text-[#131b2e] text-xs lg:text-sm font-semibold flex items-center gap-2 hover:bg-[#eaedff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-primary-container">
                  directions
                </span>
                <span>Open in Google Maps</span>
              </button>

              <button
                onClick={toggleTask1}
                className={`min-h-[46px] px-6 py-2.5 rounded-xl font-bold text-xs lg:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
                  task1Done
                    ? 'bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/30'
                    : 'bg-primary-container text-white hover:opacity-95 active:scale-95'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {task1Done ? 'check_circle' : 'task_alt'}
                </span>
                <span>{task1Done ? `Completed at ${task1Time}` : 'Mark as Done'}</span>
              </button>
            </div>
          </div>

          {/* Cleaner Job 2 */}
          <div
            className={`p-6 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] shadow-sm flex flex-col gap-4 transition-all ${
              task2Done ? 'opacity-80 bg-[#82f5c1]/15 border-[#006c4a]/30' : ''
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#eaedff] text-primary-container border border-[#dbe1ff]">
                1:00 PM Slot
              </span>
              <span className="text-sm font-bold text-[#006c4a]">$140.00 Regular</span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-[#131b2e]">
                15 Kensington High St, Apt 4C
              </h3>
              <p className="text-xs lg:text-sm text-[#434655]">
                Regular Bi-weekly Refresh • Client: Marcus Sterling
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#eaedff] flex items-start gap-3 shadow-xs">
              <span className="material-symbols-outlined text-primary-container text-[20px] shrink-0 mt-0.5">
                inventory_2
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#131b2e]">
                  Cleaner Checklist &amp; Supplies:
                </span>
                <span className="text-xs text-[#434655] mt-0.5 leading-relaxed">
                  Supplies and replacement microfiber mop heads located in the kitchen utility
                  closet.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() =>
                  onShowToast('Directions opened in Google Maps: 15 Kensington High St', 'success')
                }
                className="min-h-[46px] px-4 py-2.5 rounded-xl bg-white border border-[#c3c6d7] text-[#131b2e] text-xs lg:text-sm font-semibold flex items-center gap-2 hover:bg-[#eaedff] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-primary-container">
                  directions
                </span>
                <span>Open in Google Maps</span>
              </button>

              <button
                onClick={toggleTask2}
                className={`min-h-[46px] px-6 py-2.5 rounded-xl font-bold text-xs lg:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
                  task2Done
                    ? 'bg-[#82f5c1] text-[#00714e] border border-[#006c4a]/30'
                    : 'bg-primary-container text-white hover:opacity-95 active:scale-95'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {task2Done ? 'check_circle' : 'task_alt'}
                </span>
                <span>{task2Done ? `Completed at ${task2Time}` : 'Mark as Done'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
