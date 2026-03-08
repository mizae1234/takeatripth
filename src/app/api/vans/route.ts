import { NextResponse } from 'next/server';
import { getVans, createVan, updateVan } from '@/lib/data-service';

export async function GET() {
    const vans = await getVans();
    return NextResponse.json(vans);
}

export async function POST(req: Request) {
    const data = await req.json();
    const van = await createVan(data);
    return NextResponse.json(van, { status: 201 });
}

export async function PUT(req: Request) {
    const { id, ...data } = await req.json();
    const van = await updateVan(id, data);
    if (!van) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(van);
}
