// ==========================================
// พี่พาเที่ยว - Data Service Layer
// Abstraction over mock data - swap to Prisma/PostgreSQL later
// ==========================================

import { Trip, Van, Seat, Customer, Booking, Payment, Review, DashboardStats } from '@/types';
import { mockTrips, mockVans, mockSeats, mockCustomers, mockBookings, mockPayments, mockReviews } from './mock-data';

// In-memory mutable copies
let trips = [...mockTrips];
let vans = [...mockVans];
let seats = [...mockSeats];
let customers = [...mockCustomers];
let bookings = [...mockBookings];
let payments = [...mockPayments];

// ==========================================
// TRIP OPERATIONS
// ==========================================
export function getTrips(): Trip[] {
    return trips;
}

export function getTripById(id: string): Trip | undefined {
    return trips.find(t => t.id === id);
}

export function createTrip(data: Omit<Trip, 'id'>): Trip {
    const trip: Trip = { ...data, id: `trip-${Date.now()}` };
    trips.push(trip);
    return trip;
}

export function updateTrip(id: string, data: Partial<Trip>): Trip | null {
    const idx = trips.findIndex(t => t.id === id);
    if (idx === -1) return null;
    trips[idx] = { ...trips[idx], ...data };
    return trips[idx];
}

export function deleteTrip(id: string): boolean {
    const len = trips.length;
    trips = trips.filter(t => t.id !== id);
    return trips.length < len;
}

// ==========================================
// VAN OPERATIONS
// ==========================================
export function getVans(): Van[] {
    return vans;
}

export function getVanById(id: string): Van | undefined {
    return vans.find(v => v.id === id);
}

export function updateVan(id: string, data: Partial<Van>): Van | null {
    const idx = vans.findIndex(v => v.id === id);
    if (idx === -1) return null;
    vans[idx] = { ...vans[idx], ...data };
    return vans[idx];
}

export function createVan(data: Omit<Van, 'id'>): Van {
    const van: Van = { ...data, id: `van-${Date.now()}` };
    vans.push(van);
    return van;
}

// ==========================================
// SEAT OPERATIONS
// ==========================================
export function getSeatsByTrip(tripId: string): Seat[] {
    return seats.filter(s => s.trip_id === tripId);
}

export function updateSeatStatus(seatId: string, status: Seat['status'], bookingId?: string): Seat | null {
    const idx = seats.findIndex(s => s.id === seatId);
    if (idx === -1) return null;
    seats[idx] = { ...seats[idx], status, booking_id: bookingId };
    return seats[idx];
}

export function initializeSeatsForTrip(tripId: string, vanId: string, totalSeats: number): Seat[] {
    const newSeats: Seat[] = Array.from({ length: totalSeats }, (_, i) => ({
        id: `seat-${tripId}-${i + 1}`,
        van_id: vanId,
        trip_id: tripId,
        seat_number: i + 1,
        status: 'available' as const,
    }));
    seats.push(...newSeats);
    return newSeats;
}

// ==========================================
// CUSTOMER OPERATIONS
// ==========================================
export function getCustomers(): Customer[] {
    return customers;
}

export function getCustomerByPhone(phone: string): Customer | undefined {
    return customers.find(c => c.phone === phone);
}

export function getCustomerById(id: string): Customer | undefined {
    return customers.find(c => c.id === id);
}

export function registerCustomer(phone: string, name: string, lineId: string): Customer {
    const existing = getCustomerByPhone(phone);
    if (existing) return existing;

    const customer: Customer = {
        id: `cust-${Date.now()}`,
        phone,
        name,
        line_id: lineId,
        created_at: new Date().toISOString(),
    };
    customers.push(customer);
    return customer;
}

export function loginByPhone(phone: string): { success: boolean; customer?: Customer; otp?: string } {
    const customer = getCustomerByPhone(phone);
    if (customer) {
        return { success: true, customer, otp: '1234' }; // Mock OTP
    }
    return { success: false };
}

// ==========================================
// BOOKING OPERATIONS
// ==========================================
export function getBookings(): Booking[] {
    return bookings;
}

export function getBookingById(id: string): Booking | undefined {
    return bookings.find(b => b.id === id);
}

export function getBookingsByCustomer(customerId: string): Booking[] {
    return bookings.filter(b => b.customer_id === customerId);
}

export function createBooking(data: Omit<Booking, 'id' | 'created_at'>): Booking {
    const booking: Booking = {
        ...data,
        id: `booking-${Date.now()}`,
        created_at: new Date().toISOString(),
    };
    bookings.push(booking);

    // Update seat statuses
    const tripSeats = getSeatsByTrip(data.trip_id);
    data.seats.forEach(seatNum => {
        const seat = tripSeats.find(s => s.seat_number === seatNum);
        if (seat) {
            updateSeatStatus(seat.id, 'reserved', booking.id);
        }
    });

    return booking;
}

export function updateBookingStatus(id: string, status: Booking['status']): Booking | null {
    const idx = bookings.findIndex(b => b.id === id);
    if (idx === -1) return null;
    bookings[idx] = { ...bookings[idx], status };

    // If confirmed, update seats to booked. If cancelled, free seats
    const booking = bookings[idx];
    const tripSeats = getSeatsByTrip(booking.trip_id);
    booking.seats.forEach(seatNum => {
        const seat = tripSeats.find(s => s.seat_number === seatNum);
        if (seat) {
            if (status === 'confirmed') {
                updateSeatStatus(seat.id, 'booked', booking.id);
            } else if (status === 'cancelled') {
                updateSeatStatus(seat.id, 'available', undefined);
            }
        }
    });

    return bookings[idx];
}

// ==========================================
// PAYMENT OPERATIONS
// ==========================================
export function getPayments(): Payment[] {
    return payments;
}

export function getPaymentByBooking(bookingId: string): Payment | undefined {
    return payments.find(p => p.booking_id === bookingId);
}

export function createPayment(data: Omit<Payment, 'id' | 'created_at'>): Payment {
    const payment: Payment = {
        ...data,
        id: `payment-${Date.now()}`,
        created_at: new Date().toISOString(),
    };
    payments.push(payment);

    // Update booking status
    updateBookingStatus(data.booking_id, 'waiting_verification');

    return payment;
}

export function updatePaymentStatus(id: string, status: Payment['status']): Payment | null {
    const idx = payments.findIndex(p => p.id === id);
    if (idx === -1) return null;
    payments[idx] = { ...payments[idx], status };

    // Update related booking
    if (status === 'verified') {
        updateBookingStatus(payments[idx].booking_id, 'confirmed');
    } else if (status === 'rejected') {
        updateBookingStatus(payments[idx].booking_id, 'pending_payment');
    }

    return payments[idx];
}

// ==========================================
// REVIEWS
// ==========================================
export function getReviews(): Review[] {
    return mockReviews;
}

// ==========================================
// DASHBOARD STATS
// ==========================================
export function getDashboardStats(): DashboardStats {
    const activeTrips = trips.filter(t => t.status === 'open');
    const totalSeats = activeTrips.reduce((sum, t) => sum + t.total_seats, 0);
    const bookedSeats = seats.filter(s =>
        activeTrips.some(t => t.id === s.trip_id) && (s.status === 'booked' || s.status === 'reserved')
    ).length;

    return {
        totalBookings: bookings.length,
        activeTrips: activeTrips.length,
        seatsRemaining: totalSeats - bookedSeats,
        estimatedRevenue: bookings
            .filter(b => b.status === 'confirmed' || b.status === 'waiting_verification')
            .reduce((sum, b) => sum + b.total_amount, 0),
    };
}
