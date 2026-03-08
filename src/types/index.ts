// ==========================================
// พี่พาเที่ยว - Trip Booking System Types
// ==========================================

export interface Trip {
  id: string;
  trip_name: string;
  destination: string;
  description: string;
  price: number;
  date: string;
  end_date: string;
  total_seats: number;
  gallery_images: string[];
  schedule: DaySchedule[];
  vans_assigned: string[];
  cover_image: string;
  highlights: string[];
  status: 'open' | 'closed' | 'full' | 'completed';
}

export interface DaySchedule {
  day: number;
  title: string;
  activities: string[];
}

export interface Van {
  id: string;
  name: string;
  total_seats: number;
  seat_layout: SeatLayout;
}

export interface SeatLayout {
  rows: number;
  cols: number;
}

export interface Seat {
  id: string;
  van_id: string;
  trip_id: string;
  seat_number: number;
  status: 'available' | 'reserved' | 'booked';
  booking_id?: string;
}

export interface Customer {
  id: string;
  phone: string;
  name: string;
  line_id: string;
  created_at: string;
}

export interface Booking {
  id: string;
  trip_id: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  customer_line_id: string;
  seats: number[];
  status: BookingStatus;
  created_at: string;
  total_amount: number;
}

export type BookingStatus = 
  | 'pending_payment'
  | 'waiting_verification'
  | 'confirmed'
  | 'cancelled';

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  transfer_time: string;
  slip_image: string;
  status: 'pending' | 'verified' | 'rejected';
  created_at: string;
}

export interface Review {
  id: string;
  customer_name: string;
  avatar: string;
  rating: number;
  comment: string;
  trip_name: string;
}

export interface DashboardStats {
  totalBookings: number;
  activeTrips: number;
  seatsRemaining: number;
  estimatedRevenue: number;
}
