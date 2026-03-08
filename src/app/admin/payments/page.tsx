'use client';

import { useState, useEffect } from 'react';
import { Payment, Booking } from '@/types';

export default function AdminPaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [previewSlip, setPreviewSlip] = useState<string | null>(null);

    const fetchData = async () => {
        const [pRes, bRes] = await Promise.all([
            fetch('/api/payments'),
            fetch('/api/bookings'),
        ]);
        setPayments(await pRes.json());
        setBookings(await bRes.json());
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleVerify = async (id: string) => {
        await fetch('/api/payments', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: 'verified' }),
        });
        fetchData();
    };

    const handleReject = async (id: string) => {
        await fetch('/api/payments', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: 'rejected' }),
        });
        fetchData();
    };

    const statusMap: Record<string, { label: string; class: string }> = {
        pending: { label: 'รอตรวจสอบ', class: 'badge-yellow' },
        verified: { label: 'ยืนยันแล้ว', class: 'badge-green' },
        rejected: { label: 'ปฏิเสธ', class: 'badge-red' },
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

    if (loading) return <div className="text-center py-16 text-gray-400">⏳ กำลังโหลด...</div>;

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">💳 การชำระเงิน</h2>
                <p className="text-sm text-gray-500">รายการชำระเงินทั้งหมด {payments.length} รายการ</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">การจอง</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ลูกค้า</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">จำนวนเงิน</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">เวลาโอน</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">สลิป</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">สถานะ</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-600">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => {
                                const booking = bookings.find(b => b.id === payment.booking_id);
                                const st = statusMap[payment.status] || statusMap.pending;
                                return (
                                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 font-mono text-xs text-gray-600">{payment.booking_id}</td>
                                        <td className="py-3 px-4">
                                            {booking ? (
                                                <div>
                                                    <p className="font-semibold text-gray-800">{booking.customer_name}</p>
                                                    <p className="text-xs text-gray-400">{booking.customer_phone}</p>
                                                </div>
                                            ) : '-'}
                                        </td>
                                        <td className="py-3 px-4 font-bold text-gray-800">฿{payment.amount.toLocaleString()}</td>
                                        <td className="py-3 px-4 text-gray-600 text-xs">{formatDate(payment.transfer_time)}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => setPreviewSlip(payment.slip_image)}
                                                className="text-blue-500 hover:text-blue-700 text-xs font-medium underline"
                                            >
                                                ดูสลิป
                                            </button>
                                        </td>
                                        <td className="py-3 px-4"><span className={st.class}>{st.label}</span></td>
                                        <td className="py-3 px-4 text-right">
                                            {payment.status === 'pending' && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => handleVerify(payment.id)} className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-emerald-600">
                                                        ✓ ยืนยัน
                                                    </button>
                                                    <button onClick={() => handleReject(payment.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600">
                                                        ✗ ปฏิเสธ
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {payments.length === 0 && (
                    <p className="text-center py-8 text-gray-400">ยังไม่มีรายการชำระเงิน</p>
                )}
            </div>

            {/* Slip Preview Modal */}
            {previewSlip && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setPreviewSlip(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">📸 สลิปโอนเงิน</h3>
                            <button onClick={() => setPreviewSlip(null)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-8 text-center">
                            {previewSlip.startsWith('data:') ? (
                                <img src={previewSlip} alt="Slip" className="max-h-96 mx-auto rounded-lg" />
                            ) : (
                                <div className="text-gray-400">
                                    <div className="text-5xl mb-2">🧾</div>
                                    <p>สลิปจำลอง (Mock)</p>
                                    <p className="text-xs mt-1">{previewSlip}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
