import { NextResponse } from 'next/server';
import { getBookings, createBooking } from '@/lib/data-service';

export async function GET() {
    const bookings = getBookings();
    return NextResponse.json(bookings);
}

export async function POST(request: Request) {
    const data = await request.json();
    const booking = createBooking(data);
    return NextResponse.json(booking, { status: 201 });
}
