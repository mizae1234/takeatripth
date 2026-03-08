import { NextResponse } from 'next/server';
import { getBookingById, updateBookingStatus } from '@/lib/data-service';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const booking = await getBookingById(params.id);
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(booking);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { status } = await req.json();
    const booking = await updateBookingStatus(params.id, status);
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(booking);
}
