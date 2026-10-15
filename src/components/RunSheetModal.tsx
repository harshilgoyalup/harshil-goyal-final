import React from 'react';
import { Cleaner, CleaningJob } from '../types';

interface RunSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: CleaningJob[];
  cleaners: Cleaner[];
  onShowToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export const RunSheetModal: React.FC<RunSheetModalProps> = ({
  isOpen,
  onClose,
  jobs,
  cleaners,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Cleaner', 'Time', 'Customer', 'Address', 'Service', 'Price', 'Status', 'Notes'];
    const rows = jobs.map((j) => [
      `"${j.cleaner}"`,
      `"${j.time}"`,
      `"${j.customer}"`,
      `"${j.address}"`,
      `"${j.service}"`,
      `$${j.price}`,
      `"${j.status}"`,
      `"${j.notes.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `flowfix_daily_run_sheet_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('Run sheet exported successfully as CSV!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#283044]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl flex flex-col gap-4 max-h-[92vh] overflow-y-auto border border-[#eaedff]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">assignment</span>
            </span>
            <div>
              <h3 className="text-lg font-bold text-[#131b2e]">Daily Dispatch Run Sheet</h3>
              <span className="text-xs text-[#434655]">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Cleaners Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {cleaners.map((c) => {
            const cleanerJobs = jobs.filter((j) => j.cleaner === c.name);
            return (
              <div key={c.id} className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-xs">
                <div className="font-bold text-[#131b2e] truncate">{c.name}</div>
                <div className="text-[#434655] mt-0.5">{cleanerJobs.length} Assigned</div>
              </div>
            );
          })}
        </div>

        {/* Run Sheet Table */}
        <div className="overflow-x-auto border border-[#eaedff] rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f2f3ff] text-[#434655] font-bold border-b border-[#eaedff]">
                <th className="p-3">Time</th>
                <th className="p-3">Cleaner</th>
                <th className="p-3">Customer &amp; Address</th>
                <th className="p-3">Service</th>
                <th className="p-3">Rate</th>
                <th className="p-3">Access Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaedff]">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-[#faf8ff]">
                  <td className="p-3 font-semibold text-[#131b2e] whitespace-nowrap">{job.time}</td>
                  <td className="p-3 font-bold text-primary-container">{job.cleaner}</td>
                  <td className="p-3">
                    <div className="font-bold text-[#131b2e]">{job.customer}</div>
                    <div className="text-[#434655] text-[11px] truncate max-w-[180px]">{job.address}</div>
                  </td>
                  <td className="p-3 text-[#434655]">{job.service}</td>
                  <td className="p-3 font-bold text-[#006c4a]">${job.price}</td>
                  <td className="p-3 text-[#737686] text-[11px] max-w-[200px]">{job.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#eaedff]">
          <button
            type="button"
            onClick={handleExportCSV}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold hover:bg-[#eaedff] flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">table_view</span>
            <span>Download CSV</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-primary-container text-white text-xs font-bold shadow-sm hover:opacity-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print Run Sheet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
