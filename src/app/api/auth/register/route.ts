import { NextResponse } from 'next/server';
import { registerCustomer } from '@/lib/data-service';

export async function POST(request: Request) {
    const { phone, name, line_id } = await request.json();

    if (!phone || !name) {
        return NextResponse.json({ error: 'Phone and name are required' }, { status: 400 });
    }

    const customer = registerCustomer(phone, name, line_id || '');
    return NextResponse.json({ success: true, customer }, { status: 201 });
}
