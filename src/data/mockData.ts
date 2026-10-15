import { Cleaner, CleaningJob, Customer, Invoice } from '../types';

export const initialJobs: CleaningJob[] = [
  {
    id: 'job-1',
    customer: 'Eleanor Vance',
    address: '42 Primrose Gardens, Kensington',
    time: '8:30 AM - 11:30 AM',
    service: 'End of Tenancy',
    price: 220,
    cleaner: 'Maria Santos',
    status: 'Scheduled',
    notes: 'Full oven restoration, carpet steaming in bedrooms.'
  },
  {
    id: 'job-2',
    customer: 'Marcus Sterling',
    address: '15 Kensington High St, Apt 4C',
    time: '1:00 PM - 3:00 PM',
    service: 'Regular Domestic',
    price: 140,
    cleaner: 'Maria Santos',
    status: 'Scheduled',
    notes: 'Linens in washing basket, replace guest hand soap.'
  },
  {
    id: 'job-3',
    customer: 'David Miller',
    address: '88 Oak Crest Avenue',
    time: '9:00 AM - 12:00 PM',
    service: 'Deep Clean',
    price: 180,
    cleaner: 'Elena Rostova',
    status: 'In Progress',
    notes: 'Alarm code #4012, beware of golden retriever Charlie.'
  },
  {
    id: 'job-4',
    customer: 'Sarah Jenkins',
    address: '74 Willow Lane, Apt 3B',
    time: '11:30 AM - 1:30 PM',
    service: 'Airbnb Turnover',
    price: 160,
    cleaner: 'Elena Rostova',
    status: 'Scheduled',
    notes: 'Restock mini-shampoos from master cupboard.'
  },
  {
    id: 'job-5',
    customer: 'Oakwood Boutique Offices',
    address: '102 Tech Quarter, Suite 4',
    time: '4:00 PM - 6:30 PM',
    service: 'Deep Clean',
    price: 280,
    cleaner: 'Liam Chen',
    status: 'Scheduled',
    notes: 'Disinfect conference tables, empty recycling bins.'
  },
  {
    id: 'job-6',
    customer: 'Dr. Aris Thorne',
    address: '12 Harley Mews, Marylebone',
    time: '7:30 AM - 9:30 AM',
    service: 'Regular Domestic',
    price: 150,
    cleaner: 'Liam Chen',
    status: 'Completed',
    notes: 'Eco-friendly citrus cleaners only.',
    completedAt: '9:25 AM'
  }
];

export const initialCleaners: Cleaner[] = [
  {
    id: 'cleaner-1',
    name: 'Maria Santos',
    initials: 'MS',
    rating: 4.96,
    totalJobs: 124,
    status: 'On Job',
    assignedToday: 2,
    activeNow: 'Active Now',
    phone: '+1 (555) 392-1104',
    subtext: 'Active Now',
    avatarBg: 'bg-primary-container text-on-primary'
  },
  {
    id: 'cleaner-2',
    name: 'Liam Chen',
    initials: 'LC',
    rating: 4.88,
    totalJobs: 98,
    status: 'Available',
    assignedToday: 2,
    subtext: 'Ready for next',
    phone: '+1 (555) 441-9022',
    avatarBg: 'bg-[#006c4a] text-white'
  },
  {
    id: 'cleaner-3',
    name: 'Elena Rostova',
    initials: 'ER',
    rating: 5.0,
    totalJobs: 210,
    status: 'On Job',
    assignedToday: 3,
    activeNow: 'At 74 Willow',
    subtext: 'At 74 Willow',
    phone: '+1 (555) 882-3199',
    avatarBg: 'bg-[#004ac6] text-white'
  },
  {
    id: 'cleaner-4',
    name: 'Marcus Taylor',
    initials: 'MT',
    rating: 4.75,
    totalJobs: 64,
    status: 'Off Duty',
    assignedToday: 1,
    subtext: 'Resumes tomorrow',
    phone: '+1 (555) 910-4401',
    avatarBg: 'bg-[#a65900] text-white'
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'c-1',
    name: 'Sarah Jenkins',
    phone: '+1 (555) 234-8891',
    address: '74 Willow Lane, Apt 3B',
    notes: 'Key in lockbox #5512. Check terrace windows.',
    frequency: 'Weekly',
    totalSpent: 1680,
    cleaner: 'Elena Rostova',
    avatar: 'SJ',
    lastServiceDate: 'Oct 26, 2024'
  },
  {
    id: 'c-2',
    name: 'David Miller',
    phone: '+1 (555) 723-9090',
    address: '88 Oak Crest Avenue',
    notes: 'Alarm code #4012, beware of golden retriever Charlie.',
    frequency: 'Bi-weekly',
    totalSpent: 1420,
    cleaner: 'Elena Rostova',
    avatar: 'DM',
    lastServiceDate: 'Oct 12, 2024'
  },
  {
    id: 'c-3',
    name: 'Oakwood Boutique Offices',
    phone: '+1 (555) 902-1144',
    address: '102 Tech Quarter, Suite 4',
    notes: 'Night key pass card with security desk. Sanitize keyboards.',
    frequency: 'Weekly',
    totalSpent: 3840,
    cleaner: 'Liam Chen',
    avatar: 'OB',
    lastServiceDate: 'Oct 28, 2024'
  },
  {
    id: 'c-4',
    name: 'Dr. Aris Thorne',
    phone: '+1 (555) 662-3819',
    address: '12 Harley Mews, Marylebone',
    notes: 'Use eco-friendly floor solution only. Do not move medical texts.',
    frequency: 'Bi-weekly',
    totalSpent: 2150,
    cleaner: 'Liam Chen',
    avatar: 'AT',
    lastServiceDate: 'Oct 20, 2024'
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    customer: 'David Miller',
    service: 'Deep Spring Clean & Sanitization',
    date: 'Today',
    amount: 180,
    status: 'Sent',
    address: '88 Oak Crest Avenue',
    dueDate: 'Nov 04, 2024'
  },
  {
    id: 'INV-2024-002',
    customer: 'Oakwood Boutique Offices',
    service: 'Commercial Weekly Office Clean',
    date: 'Oct 28',
    amount: 280,
    status: 'Paid',
    address: '102 Tech Quarter, Suite 4',
    dueDate: 'Nov 02, 2024'
  },
  {
    id: 'INV-2024-003',
    customer: 'Sarah Jenkins',
    service: 'Airbnb Turnover & Bedding Restock',
    date: 'Oct 26',
    amount: 160,
    status: 'Paid',
    address: '74 Willow Lane, Apt 3B',
    dueDate: 'Oct 31, 2024'
  },
  {
    id: 'INV-2024-004',
    customer: 'Dr. Aris Thorne',
    service: 'Domestic Care & Glass Polishing',
    date: 'Oct 20',
    amount: 150,
    status: 'Overdue',
    address: '12 Harley Mews, Marylebone',
    dueDate: 'Oct 25, 2024'
  }
];
