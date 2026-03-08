// ==========================================
// พี่พาเที่ยว - Data Service Layer (Prisma/PostgreSQL)
// ==========================================

import prisma from './prisma';
import { Trip, Van, Seat, Customer, Booking, Payment, Review, DashboardStats, DaySchedule } from '@/types';

// ==========================================
// HELPERS - Convert Prisma records to app types
// ==========================================
function toTrip(record: any): Trip {
    return {
        id: record.id,
        trip_name: record.trip_name,
        destination: record.destination,
        description: record.description,
        price: record.price,
        date: record.date.toISOString().split('T')[0],
        end_date: record.end_date.toISOString().split('T')[0],
        total_seats: record.total_seats,
        gallery_images: record.gallery_images || [],
        schedule: (record.schedule || []) as DaySchedule[],
        vans_assigned: record.vans_assigned || [],
        cover_image: record.cover_image || '',
        highlights: record.highlights || [],
        status: record.status as Trip['status'],
    };
}

function toVan(record: any): Van {
    return {
        id: record.id,
        name: record.name,
        total_seats: record.total_seats,
        seat_layout: { rows: record.seat_rows, cols: record.seat_cols },
    };
}

function toSeat(record: any): Seat {
    return {
        id: record.id,
        van_id: record.van_id,
        trip_id: record.trip_id,
        seat_number: record.seat_number,
        status: record.status as Seat['status'],
        booking_id: record.booking_id || undefined,
    };
}

function toCustomer(record: any): Customer {
    return {
        id: record.id,
        phone: record.phone,
        name: record.name,
        line_id: record.line_id,
        created_at: record.created_at.toISOString(),
    };
}

function toBooking(record: any): Booking {
    return {
        id: record.id,
        trip_id: record.trip_id,
        customer_id: record.customer_id,
        customer_name: record.customer_name,
        customer_phone: record.customer_phone,
        customer_line_id: record.customer_line_id,
        seats: record.seats_json || [],
        status: record.status as Booking['status'],
        total_amount: record.total_amount,
        created_at: record.created_at.toISOString(),
    };
}

function toPayment(record: any): Payment {
    return {
        id: record.id,
        booking_id: record.booking_id,
        amount: record.amount,
        transfer_time: record.transfer_time.toISOString(),
        slip_image: record.slip_image,
        status: record.status as Payment['status'],
        created_at: record.created_at.toISOString(),
    };
}

function toReview(record: any): Review {
    return {
        id: record.id,
        customer_name: record.customer_name,
        avatar: record.avatar,
        rating: record.rating,
        comment: record.comment,
        trip_name: record.trip_name,
    };
}

// ==========================================
// TRIP OPERATIONS
// ==========================================
export async function getTrips(): Promise<Trip[]> {
    const records = await prisma.trip.findMany({ orderBy: { date: 'asc' } });
    return records.map(toTrip);
}

export async function getTripById(id: string): Promise<Trip | null> {
    const record = await prisma.trip.findUnique({ where: { id } });
    return record ? toTrip(record) : null;
}

export async function createTrip(data: Omit<Trip, 'id'>): Promise<Trip> {
    const record = await prisma.trip.create({
        data: {
            trip_name: data.trip_name,
            destination: data.destination,
            description: data.description,
            price: data.price,
            date: new Date(data.date),
            end_date: new Date(data.end_date),
            total_seats: data.total_seats,
            gallery_images: data.gallery_images,
            schedule: data.schedule as any,
            vans_assigned: data.vans_assigned,
            cover_image: data.cover_image,
            highlights: data.highlights,
            status: data.status,
        },
    });
    return toTrip(record);
}

export async function updateTrip(id: string, data: Partial<Trip>): Promise<Trip | null> {
    try {
        const updateData: any = { ...data };
        if (data.date) updateData.date = new Date(data.date);
        if (data.end_date) updateData.end_date = new Date(data.end_date);
        if (data.schedule) updateData.schedule = data.schedule as any;
        // Remove fields that don't map directly
        delete updateData.id;

        const record = await prisma.trip.update({ where: { id }, data: updateData });
        return toTrip(record);
    } catch {
        return null;
    }
}

export async function deleteTrip(id: string): Promise<boolean> {
    try {
        await prisma.trip.delete({ where: { id } });
        return true;
    } catch {
        return false;
    }
}

// ==========================================
// VAN OPERATIONS
// ==========================================
export async function getVans(): Promise<Van[]> {
    const records = await prisma.van.findMany();
    return records.map(toVan);
}

export async function getVanById(id: string): Promise<Van | null> {
    const record = await prisma.van.findUnique({ where: { id } });
    return record ? toVan(record) : null;
}

export async function createVan(data: Omit<Van, 'id'>): Promise<Van> {
    const record = await prisma.van.create({
        data: {
            name: data.name,
            total_seats: data.total_seats,
            seat_rows: data.seat_layout.rows,
            seat_cols: data.seat_layout.cols,
        },
    });
    return toVan(record);
}

export async function updateVan(id: string, data: Partial<Van>): Promise<Van | null> {
    try {
        const updateData: any = {};
        if (data.name) updateData.name = data.name;
        if (data.total_seats) updateData.total_seats = data.total_seats;
        if (data.seat_layout) {
            updateData.seat_rows = data.seat_layout.rows;
            updateData.seat_cols = data.seat_layout.cols;
        }
        const record = await prisma.van.update({ where: { id }, data: updateData });
        return toVan(record);
    } catch {
        return null;
    }
}

// ==========================================
// SEAT OPERATIONS
// ==========================================
export async function getSeatsByTrip(tripId: string): Promise<Seat[]> {
    const records = await prisma.seat.findMany({
        where: { trip_id: tripId },
        orderBy: { seat_number: 'asc' },
    });
    return records.map(toSeat);
}

export async function updateSeatStatus(seatId: string, status: Seat['status'], bookingId?: string): Promise<Seat | null> {
    try {
        const record = await prisma.seat.update({
            where: { id: seatId },
            data: { status, booking_id: bookingId || null },
        });
        return toSeat(record);
    } catch {
        return null;
    }
}

export async function initializeSeatsForTrip(tripId: string, vanId: string, totalSeats: number): Promise<Seat[]> {
    const data = Array.from({ length: totalSeats }, (_, i) => ({
        van_id: vanId,
        trip_id: tripId,
        seat_number: i + 1,
        status: 'available',
    }));

    await prisma.seat.createMany({ data });
    return getSeatsByTrip(tripId);
}

// ==========================================
// CUSTOMER OPERATIONS
// ==========================================
export async function getCustomers(): Promise<Customer[]> {
    const records = await prisma.customer.findMany();
    return records.map(toCustomer);
}

export async function getCustomerByPhone(phone: string): Promise<Customer | null> {
    const record = await prisma.customer.findUnique({ where: { phone } });
    return record ? toCustomer(record) : null;
}

export async function getCustomerById(id: string): Promise<Customer | null> {
    const record = await prisma.customer.findUnique({ where: { id } });
    return record ? toCustomer(record) : null;
}

export async function registerCustomer(phone: string, name: string, lineId: string): Promise<Customer> {
    const existing = await getCustomerByPhone(phone);
    if (existing) return existing;

    const record = await prisma.customer.create({
        data: { phone, name, line_id: lineId },
    });
    return toCustomer(record);
}

export async function loginByPhone(phone: string): Promise<{ success: boolean; customer?: Customer; otp?: string }> {
    const customer = await getCustomerByPhone(phone);
    if (customer) {
        return { success: true, customer, otp: '1234' };
    }
    return { success: false };
}

// ==========================================
// BOOKING OPERATIONS
// ==========================================
export async function getBookings(): Promise<Booking[]> {
    const records = await prisma.booking.findMany({ orderBy: { created_at: 'desc' } });
    return records.map(toBooking);
}

export async function getBookingById(id: string): Promise<Booking | null> {
    const record = await prisma.booking.findUnique({ where: { id } });
    return record ? toBooking(record) : null;
}

export async function getBookingsByCustomer(customerId: string): Promise<Booking[]> {
    const records = await prisma.booking.findMany({ where: { customer_id: customerId } });
    return records.map(toBooking);
}

export async function createBooking(data: Omit<Booking, 'id' | 'created_at'>): Promise<Booking> {
    const record = await prisma.booking.create({
        data: {
            trip_id: data.trip_id,
            customer_id: data.customer_id,
            customer_name: data.customer_name,
            customer_phone: data.customer_phone,
            customer_line_id: data.customer_line_id,
            seats_json: data.seats,
            status: data.status,
            total_amount: data.total_amount,
        },
    });

    // Update seat statuses
    const tripSeats = await getSeatsByTrip(data.trip_id);
    for (const seatNum of data.seats) {
        const seat = tripSeats.find(s => s.seat_number === seatNum);
        if (seat) {
            await updateSeatStatus(seat.id, 'reserved', record.id);
        }
    }

    return toBooking(record);
}

export async function updateBookingStatus(id: string, status: Booking['status']): Promise<Booking | null> {
    try {
        const record = await prisma.booking.update({
            where: { id },
            data: { status },
        });

        const booking = toBooking(record);

        // Update related seat statuses
        const tripSeats = await getSeatsByTrip(booking.trip_id);
        for (const seatNum of booking.seats) {
            const seat = tripSeats.find(s => s.seat_number === seatNum);
            if (seat) {
                if (status === 'confirmed') {
                    await updateSeatStatus(seat.id, 'booked', booking.id);
                } else if (status === 'cancelled') {
                    await updateSeatStatus(seat.id, 'available', undefined);
                }
            }
        }

        return booking;
    } catch {
        return null;
    }
}

// ==========================================
// PAYMENT OPERATIONS
// ==========================================
export async function getPayments(): Promise<Payment[]> {
    const records = await prisma.payment.findMany({ orderBy: { created_at: 'desc' } });
    return records.map(toPayment);
}

export async function getPaymentByBooking(bookingId: string): Promise<Payment | null> {
    const record = await prisma.payment.findFirst({ where: { booking_id: bookingId } });
    return record ? toPayment(record) : null;
}

export async function createPayment(data: Omit<Payment, 'id' | 'created_at'>): Promise<Payment> {
    const record = await prisma.payment.create({
        data: {
            booking_id: data.booking_id,
            amount: data.amount,
            transfer_time: new Date(data.transfer_time),
            slip_image: data.slip_image,
            status: data.status,
        },
    });

    // Update booking status
    await updateBookingStatus(data.booking_id, 'waiting_verification');

    return toPayment(record);
}

export async function updatePaymentStatus(id: string, status: Payment['status']): Promise<Payment | null> {
    try {
        const record = await prisma.payment.update({
            where: { id },
            data: { status },
        });

        if (status === 'verified') {
            await updateBookingStatus(record.booking_id, 'confirmed');
        } else if (status === 'rejected') {
            await updateBookingStatus(record.booking_id, 'pending_payment');
        }

        return toPayment(record);
    } catch {
        return null;
    }
}

// ==========================================
// REVIEWS
// ==========================================
export async function getReviews(): Promise<Review[]> {
    const records = await prisma.review.findMany();
    return records.map(toReview);
}

// ==========================================
// DASHBOARD STATS
// ==========================================
export async function getDashboardStats(): Promise<DashboardStats> {
    const [totalBookings, activeTrips, allActiveTrips, confirmedBookings] = await Promise.all([
        prisma.booking.count(),
        prisma.trip.count({ where: { status: 'open' } }),
        prisma.trip.findMany({ where: { status: 'open' }, select: { id: true, total_seats: true } }),
        prisma.booking.findMany({
            where: { status: { in: ['confirmed', 'waiting_verification'] } },
            select: { total_amount: true },
        }),
    ]);

    const totalSeats = allActiveTrips.reduce((sum, t) => sum + t.total_seats, 0);
    const bookedSeats = await prisma.seat.count({
        where: {
            trip_id: { in: allActiveTrips.map(t => t.id) },
            status: { in: ['booked', 'reserved'] },
        },
    });

    return {
        totalBookings,
        activeTrips,
        seatsRemaining: totalSeats - bookedSeats,
        estimatedRevenue: confirmedBookings.reduce((sum, b) => sum + b.total_amount, 0),
    };
}
