import { NextResponse } from 'next/server';
import { getBookings, createBooking } from '@/lib/data-service';

export async function GET() {
    const bookings = await getBookings();
    return NextResponse.json(bookings);
}

export async function POST(req: Request) {
    const data = await req.json();
    const booking = await createBooking(data);
    return NextResponse.json(booking, { status: 201 });
}
