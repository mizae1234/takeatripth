import { NextResponse } from 'next/server';
import { loginByPhone } from '@/lib/data-service';

export async function POST(req: Request) {
    const { phone } = await req.json();

    if (!phone) {
        return NextResponse.json({ error: 'Phone required' }, { status: 400 });
    }

    const result = await loginByPhone(phone);

    if (result.success) {
        return NextResponse.json({
            success: true,
            customer: result.customer,
            otp: result.otp, // Demo only
        });
    }

    // Phone not registered - send OTP for registration
    return NextResponse.json({
        success: false,
        otp: '1234', // Demo OTP
        message: 'Phone not registered',
    });
}
