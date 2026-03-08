import { NextResponse } from 'next/server';
import { getVans, createVan, updateVan } from '@/lib/data-service';

export async function GET() {
    const vans = getVans();
    return NextResponse.json(vans);
}

export async function POST(request: Request) {
    const data = await request.json();
    const van = createVan(data);
    return NextResponse.json(van, { status: 201 });
}

export async function PUT(request: Request) {
    const { id, ...data } = await request.json();
    const van = updateVan(id, data);
    if (!van) return NextResponse.json({ error: 'Van not found' }, { status: 404 });
    return NextResponse.json(van);
}
