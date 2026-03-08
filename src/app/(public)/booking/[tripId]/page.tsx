'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import SeatSelector from '@/components/SeatSelector';
import SlipUploader from '@/components/SlipUploader';
import { Trip, Seat } from '@/types';

interface Props {
    params: { tripId: string };
}

export default function BookingPage({ params }: Props) {
    const router = useRouter();
    const { isLoggedIn, customer, setShowAuthModal } = useAuth();
    const [step, setStep] = useState(1);
    const [trip, setTrip] = useState<Trip | null>(null);
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [lineId, setLineId] = useState('');
    const [loading, setLoading] = useState(false);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [bookingComplete, setBookingComplete] = useState(false);

    // Fetch trip data
    useEffect(() => {
        fetch(`/api/trips/${params.tripId}`)
            .then(res => res.json())
            .then(data => {
                setTrip(data);
                setSeats(data.seats || []);
            });
    }, [params.tripId]);

    // Pre-fill customer info
    useEffect(() => {
        if (customer) {
            setName(customer.name);
            setPhone(customer.phone);
            setLineId(customer.line_id);
        }
    }, [customer]);

    // Check login
    useEffect(() => {
        if (!isLoggedIn) {
            setShowAuthModal(true);
        }
    }, [isLoggedIn, setShowAuthModal]);

    const handleSelectSeat = (seatNum: number) => {
        setSelectedSeats(prev =>
            prev.includes(seatNum)
                ? prev.filter(s => s !== seatNum)
                : [...prev, seatNum]
        );
    };

    const handleCreateBooking = async () => {
        if (!trip || !customer) return;
        setLoading(true);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    trip_id: trip.id,
                    customer_id: customer.id,
                    customer_name: name,
                    customer_phone: phone,
                    customer_line_id: lineId,
                    seats: selectedSeats,
                    status: 'pending_payment',
                    total_amount: trip.price * selectedSeats.length,
                }),
            });
            const booking = await res.json();
            setBookingId(booking.id);
            setStep(4);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleUploadSlip = async (data: { amount: number; transferTime: string; slipImage: string }) => {
        if (!bookingId) return;
        setLoading(true);
        try {
            await fetch('/api/payments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    booking_id: bookingId,
                    amount: data.amount,
                    transfer_time: data.transferTime,
                    slip_image: data.slipImage,
                    status: 'pending',
                }),
            });
            setBookingComplete(true);
            setStep(5);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    if (!trip) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-pulse-soft mb-4"><img src="/logo.png" alt="Loading" className="h-16 w-auto mx-auto" /></div>
                    <p className="text-gray-500">กำลังโหลด...</p>
                </div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center card p-8 max-w-md">
                    <div className="text-5xl mb-4">🔐</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">กรุณาเข้าสู่ระบบก่อนจอง</h2>
                    <p className="text-gray-500 mb-6">ลงทะเบียนหรือเข้าสู่ระบบด้วยเบอร์โทรเพื่อจองทริป</p>
                    <button onClick={() => setShowAuthModal(true)} className="btn-primary">
                        เข้าสู่ระบบ / ลงทะเบียน
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8 relative">
                    {[
                        { num: 1, label: 'เลือกที่นั่ง' },
                        { num: 2, label: 'กรอกข้อมูล' },
                        { num: 3, label: 'ยืนยัน' },
                        { num: 4, label: 'ชำระเงิน' },
                        { num: 5, label: 'เสร็จสิ้น' },
                    ].map((s, i) => (
                        <div key={s.num} className="flex flex-col items-center relative z-10">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= s.num
                                    ? 'bg-accent-500 text-white shadow-button'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {step > s.num ? '✓' : s.num}
                            </div>
                            <span className={`text-xs mt-1 hidden sm:block ${step >= s.num ? 'text-accent-500 font-semibold' : 'text-gray-400'}`}>
                                {s.label}
                            </span>
                            {/* Connector line */}
                            {i < 4 && (
                                <div className={`absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 ${step > s.num ? 'bg-accent-500' : 'bg-gray-200'}`}
                                    style={{ width: '80px', left: '55px' }} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Trip Info Header */}
                <div className="card p-4 mb-6 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-ocean-200 to-ocean-400 rounded-xl flex items-center justify-center flex-shrink-0 p-1">
                        <img src="/logo.png" alt="Trip" className="h-full w-auto" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-gray-800 truncate">{trip.trip_name}</h2>
                        <p className="text-sm text-gray-500">
                            ฿{trip.price.toLocaleString()}/คน · {trip.destination}
                        </p>
                    </div>
                </div>

                {/* ======== STEP 1: SELECT SEATS ======== */}
                {step === 1 && (
                    <div className="card p-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">💺 เลือกที่นั่ง</h3>
                        <p className="text-gray-500 text-sm mb-6">เลือกที่นั่งที่ต้องการ (เลือกได้หลายที่นั่ง)</p>

                        <SeatSelector
                            seats={seats}
                            selectedSeats={selectedSeats}
                            onSelectSeat={handleSelectSeat}
                        />

                        {selectedSeats.length > 0 && (
                            <div className="mt-6 p-4 bg-accent-50 rounded-xl">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">
                                        ที่นั่งที่เลือก: <span className="font-bold text-accent-500">{selectedSeats.sort((a, b) => a - b).join(', ')}</span>
                                    </span>
                                    <span className="font-bold text-accent-500 text-lg">
                                        ฿{(trip.price * selectedSeats.length).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => setStep(2)}
                            disabled={selectedSeats.length === 0}
                            className="btn-primary w-full mt-6 disabled:opacity-50"
                        >
                            ถัดไป →
                        </button>
                    </div>
                )}

                {/* ======== STEP 2: FILL INFO ======== */}
                {step === 2 && (
                    <div className="card p-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">📝 ข้อมูลผู้จอง</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ชื่อ - นามสกุล</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="ชื่อ - นามสกุล" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">เบอร์โทร</label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field" placeholder="เบอร์โทร" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Line ID</label>
                                <input type="text" value={lineId} onChange={(e) => setLineId(e.target.value)} className="input-field" placeholder="Line ID" />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setStep(1)} className="btn-outline flex-1">← ย้อนกลับ</button>
                            <button onClick={() => setStep(3)} disabled={!name || !phone} className="btn-primary flex-1 disabled:opacity-50">
                                ถัดไป →
                            </button>
                        </div>
                    </div>
                )}

                {/* ======== STEP 3: CONFIRM ======== */}
                {step === 3 && (
                    <div className="card p-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">✅ ยืนยันการจอง</h3>
                        <div className="space-y-4 bg-gray-50 rounded-xl p-4">
                            <div className="flex justify-between">
                                <span className="text-gray-500">ทริป</span>
                                <span className="font-semibold text-gray-800">{trip.trip_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">ที่นั่ง</span>
                                <span className="font-semibold text-gray-800">{selectedSeats.sort((a, b) => a - b).join(', ')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">จำนวน</span>
                                <span className="font-semibold text-gray-800">{selectedSeats.length} ที่นั่ง</span>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <span className="text-gray-500">ชื่อ</span>
                                <span className="font-semibold text-gray-800">{name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">เบอร์โทร</span>
                                <span className="font-semibold text-gray-800">{phone}</span>
                            </div>
                            {lineId && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Line ID</span>
                                    <span className="font-semibold text-gray-800">{lineId}</span>
                                </div>
                            )}
                            <hr />
                            <div className="flex justify-between text-lg">
                                <span className="font-bold text-gray-800">ยอดรวม</span>
                                <span className="font-bold text-accent-500">฿{(trip.price * selectedSeats.length).toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setStep(2)} className="btn-outline flex-1">← ย้อนกลับ</button>
                            <button onClick={handleCreateBooking} disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
                                {loading ? '⏳ กำลังจอง...' : '🎫 ยืนยันจอง'}
                            </button>
                        </div>
                    </div>
                )}

                {/* ======== STEP 4: UPLOAD SLIP ======== */}
                {step === 4 && (
                    <div className="card p-6 animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">💳 ชำระเงิน</h3>
                        <div className="bg-ocean-50 rounded-xl p-4 mb-6">
                            <h4 className="font-semibold text-ocean-700 mb-2">📋 ข้อมูลการโอนเงิน</h4>
                            <div className="text-sm space-y-1 text-gray-600">
                                <p>ธนาคาร: <span className="font-semibold">กสิกรไทย</span></p>
                                <p>เลขบัญชี: <span className="font-semibold">xxx-x-xxxxx-x</span></p>
                                <p>ชื่อบัญชี: <span className="font-semibold">บจก. พี่พาเที่ยว</span></p>
                                <p>จำนวน: <span className="font-bold text-accent-500 text-lg">฿{(trip.price * selectedSeats.length).toLocaleString()}</span></p>
                            </div>
                        </div>
                        <SlipUploader onUpload={handleUploadSlip} loading={loading} />
                        <p className="text-xs text-gray-400 mt-4 text-center">
                            หมายเลขการจอง: {bookingId}
                        </p>
                    </div>
                )}

                {/* ======== STEP 5: COMPLETE ======== */}
                {step === 5 && bookingComplete && (
                    <div className="card p-8 text-center animate-fade-in">
                        <div className="text-6xl mb-4 animate-float">🎉</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">ส่งข้อมูลเรียบร้อย!</h3>
                        <p className="text-gray-500 mb-2">
                            กรุณารอการตรวจสอบจากทีมงาน
                        </p>
                        <div className="badge-yellow text-sm mb-6">⏳ รอตรวจสอบการชำระเงิน</div>

                        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">หมายเลขจอง</span>
                                <span className="font-mono font-semibold text-gray-800">{bookingId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">ทริป</span>
                                <span className="font-semibold text-gray-800">{trip.trip_name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">ที่นั่ง</span>
                                <span className="font-semibold text-gray-800">{selectedSeats.join(', ')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">ยอดเงิน</span>
                                <span className="font-bold text-accent-500">฿{(trip.price * selectedSeats.length).toLocaleString()}</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400 mb-6">
                            ทีมงานจะตรวจสอบและยืนยันภายใน 30 นาที<br />
                            หากมีข้อสงสัย ติดต่อ Line: @peepateaw
                        </p>

                        <button onClick={() => router.push('/')} className="btn-secondary">
                            ← กลับหน้าหลัก
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
