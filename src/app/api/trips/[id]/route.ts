import { NextResponse } from 'next/server';
import { getTripById, updateTrip, deleteTrip, getSeatsByTrip } from '@/lib/data-service';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const trip = await getTripById(params.id);
    if (!trip) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const seats = await getSeatsByTrip(params.id);
    return NextResponse.json({ ...trip, seats });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    const trip = await updateTrip(params.id, data);
    if (!trip) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(trip);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    const ok = await deleteTrip(params.id);
    if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
}
