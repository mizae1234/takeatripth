import { NextResponse } from 'next/server';
import { registerCustomer } from '@/lib/data-service';

export async function POST(req: Request) {
    const { phone, name, line_id } = await req.json();

    if (!phone || !name) {
        return NextResponse.json({ error: 'Phone and name required' }, { status: 400 });
    }

    const customer = await registerCustomer(phone, name, line_id || '');
    return NextResponse.json(customer, { status: 201 });
}
