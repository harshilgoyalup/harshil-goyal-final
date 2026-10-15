export type UserRole = 'owner' | 'cleaner' | 'customer';

export type JobStatus = 'Scheduled' | 'In Progress' | 'Completed';

export interface CleaningJob {
  id: string;
  customer: string;
  address: string;
  time: string;
  service: 'Regular Domestic' | 'Deep Clean' | 'End of Tenancy' | 'Airbnb Turnover';
  price: number;
  cleaner: string;
  status: JobStatus;
  notes: string;
  completedAt?: string;
}

export interface Cleaner {
  id: string;
  name: string;
  initials: string;
  rating: number;
  totalJobs: number;
  status: 'On Job' | 'Available' | 'Off Duty';
  assignedToday: number;
  activeNow?: string;
  phone: string;
  subtext: string;
  avatarBg: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
  frequency: 'Weekly' | 'Bi-weekly' | 'Monthly';
  totalSpent: number;
  cleaner: string;
  avatar: string;
  lastServiceDate?: string;
}

export interface Invoice {
  id: string;
  customer: string;
  service: string;
  date: string;
  amount: number;
  status: 'Sent' | 'Paid' | 'Overdue';
  address: string;
  dueDate?: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}
