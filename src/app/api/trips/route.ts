import { NextResponse } from 'next/server';
import { getTrips, createTrip } from '@/lib/data-service';

export async function GET() {
    const trips = await getTrips();
    return NextResponse.json(trips);
}

export async function POST(req: Request) {
    const data = await req.json();
    const trip = await createTrip(data);
    return NextResponse.json(trip, { status: 201 });
}
