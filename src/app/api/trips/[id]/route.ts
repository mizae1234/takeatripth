import { NextResponse } from 'next/server';
import { getTripById, updateTrip, deleteTrip, getSeatsByTrip } from '@/lib/data-service';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    const trip = getTripById(params.id);
    if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    const seats = getSeatsByTrip(params.id);
    return NextResponse.json({ ...trip, seats });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const data = await request.json();
    const trip = updateTrip(params.id, data);
    if (!trip) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    return NextResponse.json(trip);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
    const success = deleteTrip(params.id);
    if (!success) return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
    return NextResponse.json({ success: true });
}
