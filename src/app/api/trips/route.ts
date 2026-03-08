import { NextResponse } from 'next/server';
import { getTrips, createTrip } from '@/lib/data-service';

export async function GET() {
    const trips = getTrips();
    return NextResponse.json(trips);
}

export async function POST(request: Request) {
    const data = await request.json();
    const trip = createTrip(data);
    return NextResponse.json(trip, { status: 201 });
}
