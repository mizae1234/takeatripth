import { NextResponse } from 'next/server';
import { getPayments, createPayment, updatePaymentStatus } from '@/lib/data-service';

export async function GET() {
    const payments = getPayments();
    return NextResponse.json(payments);
}

export async function POST(request: Request) {
    const data = await request.json();
    const payment = createPayment(data);
    return NextResponse.json(payment, { status: 201 });
}

export async function PUT(request: Request) {
    const { id, status } = await request.json();
    const payment = updatePaymentStatus(id, status);
    if (!payment) return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    return NextResponse.json(payment);
}
