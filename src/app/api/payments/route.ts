import { NextResponse } from 'next/server';
import { getPayments, createPayment, updatePaymentStatus } from '@/lib/data-service';

export async function GET() {
    const payments = await getPayments();
    return NextResponse.json(payments);
}

export async function POST(req: Request) {
    const data = await req.json();
    const payment = await createPayment(data);
    return NextResponse.json(payment, { status: 201 });
}

export async function PUT(req: Request) {
    const { id, status } = await req.json();
    const payment = await updatePaymentStatus(id, status);
    if (!payment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(payment);
}
