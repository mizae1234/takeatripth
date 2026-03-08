'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';

export default function AuthModal() {
    const { showAuthModal, setShowAuthModal, login } = useAuth();
    const [step, setStep] = useState<'phone' | 'otp' | 'register'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [name, setName] = useState('');
    const [lineId, setLineId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    if (!showAuthModal) return null;

    const handleSendOTP = async () => {
        if (!phone || phone.length < 9) {
            setError('กรุณากรอกเบอร์โทรให้ถูกต้อง');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            });
            const data = await res.json();
            if (data.success) {
                setIsNewUser(!data.exists);
                setStep('otp');
            }
        } catch {
            setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
        }
        setLoading(false);
    };

    const handleVerifyOTP = async () => {
        if (!otp) {
            setError('กรุณากรอก OTP');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, otp }),
            });
            const data = await res.json();
            if (data.success && data.verified) {
                if (data.customer) {
                    login(data.customer);
                } else {
                    setStep('register');
                }
            } else {
                setError('OTP ไม่ถูกต้อง (ใช้ 1234 สำหรับ demo)');
            }
        } catch {
            setError('เกิดข้อผิดพลาด');
        }
        setLoading(false);
    };

    const handleRegister = async () => {
        if (!name) {
            setError('กรุณากรอกชื่อ');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, name, line_id: lineId }),
            });
            const data = await res.json();
            if (data.success) {
                login(data.customer);
            }
        } catch {
            setError('เกิดข้อผิดพลาด');
        }
        setLoading(false);
    };

    const handleClose = () => {
        setShowAuthModal(false);
        setStep('phone');
        setPhone('');
        setOtp('');
        setName('');
        setLineId('');
        setError('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary-500">
                        {step === 'phone' && '🔑 เข้าสู่ระบบ'}
                        {step === 'otp' && '📱 ยืนยัน OTP'}
                        {step === 'register' && '✨ ลงทะเบียน'}
                    </h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl">
                        ✕
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {step === 'phone' && (
                    <div className="space-y-4">
                        <p className="text-gray-500 text-sm">กรอกเบอร์โทรเพื่อเข้าสู่ระบบหรือลงทะเบียน</p>
                        <input
                            type="tel"
                            placeholder="เบอร์โทรศัพท์ เช่น 0891234567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input-field text-lg"
                            maxLength={10}
                        />
                        <button
                            onClick={handleSendOTP}
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            {loading ? 'กำลังส่ง...' : 'ส่ง OTP'}
                        </button>
                    </div>
                )}

                {step === 'otp' && (
                    <div className="space-y-4">
                        <p className="text-gray-500 text-sm">
                            ส่ง OTP ไปที่เบอร์ {phone}
                            <br />
                            <span className="text-accent-500 font-semibold">(Demo: ใช้รหัส 1234)</span>
                        </p>
                        <input
                            type="text"
                            placeholder="กรอก OTP 4 หลัก"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="input-field text-center text-2xl tracking-widest"
                            maxLength={4}
                        />
                        <button
                            onClick={handleVerifyOTP}
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            {loading ? 'กำลังตรวจสอบ...' : 'ยืนยัน OTP'}
                        </button>
                        <button
                            onClick={() => setStep('phone')}
                            className="text-sm text-gray-400 hover:text-gray-600 w-full text-center"
                        >
                            ← กลับไปกรอกเบอร์โทร
                        </button>
                    </div>
                )}

                {step === 'register' && (
                    <div className="space-y-4">
                        <p className="text-gray-500 text-sm">
                            {isNewUser ? 'ยินดีต้อนรับ! กรุณากรอกข้อมูลเพื่อลงทะเบียน' : 'กรุณากรอกข้อมูลเพิ่มเติม'}
                        </p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ - นามสกุล *</label>
                            <input
                                type="text"
                                placeholder="ชื่อ - นามสกุล"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Line ID</label>
                            <input
                                type="text"
                                placeholder="Line ID (ไม่บังคับ)"
                                value={lineId}
                                onChange={(e) => setLineId(e.target.value)}
                                className="input-field"
                            />
                        </div>
                        <button
                            onClick={handleRegister}
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50"
                        >
                            {loading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
