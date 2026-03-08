import { NextResponse } from 'next/server';
import { loginByPhone, getCustomerByPhone } from '@/lib/data-service';

export async function POST(request: Request) {
    const { phone, otp } = await request.json();

    if (!phone) {
        return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Step 1: Request OTP
    if (!otp) {
        const result = loginByPhone(phone);
        if (result.success) {
            return NextResponse.json({
                success: true,
                message: 'OTP sent (demo: 1234)',
                exists: true
            });
        }
        return NextResponse.json({
            success: true,
            message: 'OTP sent (demo: 1234)',
            exists: false
        });
    }

    // Step 2: Verify OTP (mock - always accept 1234)
    if (otp === '1234') {
        const customer = getCustomerByPhone(phone);
        return NextResponse.json({
            success: true,
            verified: true,
            customer: customer || null
        });
    }

    return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 400 });
}
