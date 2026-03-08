import { NextResponse } from 'next/server';
import { getBookingById, updateBookingStatus } from '@/lib/data-service';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    const booking = getBookingById(params.id);
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    return NextResponse.json(booking);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { status } = await request.json();
    const booking = updateBookingStatus(params.id, status);
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    return NextResponse.json(booking);
}
