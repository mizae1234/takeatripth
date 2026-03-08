'use client';

import { useState, useEffect } from 'react';
import { Booking, Trip } from '@/types';

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    const fetchData = async () => {
        const [bRes, tRes] = await Promise.all([
            fetch('/api/bookings'),
            fetch('/api/trips'),
        ]);
        setBookings(await bRes.json());
        setTrips(await tRes.json());
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleApprove = async (id: string) => {
        await fetch(`/api/bookings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'confirmed' }),
        });
        fetchData();
    };

    const handleReject = async (id: string) => {
        if (!confirm('ต้องการปฏิเสธการจองนี้?')) return;
        await fetch(`/api/bookings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'cancelled' }),
        });
        fetchData();
    };

    const statusDisplay: Record<string, { label: string; class: string }> = {
        pending_payment: { label: 'รอชำระเงิน', class: 'badge-yellow' },
        waiting_verification: { label: 'รอตรวจสอบ', class: 'badge-blue' },
        confirmed: { label: 'ยืนยันแล้ว', class: 'badge-green' },
        cancelled: { label: 'ยกเลิก', class: 'badge-red' },
    };

    const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

    if (loading) return <div className="text-center py-16 text-gray-400">⏳ กำลังโหลด...</div>;

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">📋 จัดการการจอง</h2>
                    <p className="text-sm text-gray-500">การจองทั้งหมด {bookings.length} รายการ</p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 flex-wrap">
                    {[
                        { key: 'all', label: 'ทั้งหมด' },
                        { key: 'waiting_verification', label: 'รอตรวจสอบ' },
                        { key: 'confirmed', label: 'ยืนยันแล้ว' },
                        { key: 'pending_payment', label: 'รอชำระ' },
                        { key: 'cancelled', label: 'ยกเลิก' },
                    ].map(f => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f.key
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ลูกค้า</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ทริป</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ที่นั่ง</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ยอดเงิน</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">วันที่จอง</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">สถานะ</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-600">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((booking) => {
                                const trip = trips.find(t => t.id === booking.trip_id);
                                const st = statusDisplay[booking.status] || statusDisplay.pending_payment;
                                return (
                                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <p className="font-semibold text-gray-800">{booking.customer_name}</p>
                                            <p className="text-xs text-gray-400">{booking.customer_phone}</p>
                                            {booking.customer_line_id && (
                                                <p className="text-xs text-gray-400">Line: {booking.customer_line_id}</p>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 max-w-[200px] truncate">{trip?.trip_name || booking.trip_id}</td>
                                        <td className="py-3 px-4 text-gray-700">{booking.seats.join(', ')}</td>
                                        <td className="py-3 px-4 font-semibold text-gray-800">฿{booking.total_amount.toLocaleString()}</td>
                                        <td className="py-3 px-4 text-gray-600 text-xs">{formatDate(booking.created_at)}</td>
                                        <td className="py-3 px-4"><span className={st.class}>{st.label}</span></td>
                                        <td className="py-3 px-4 text-right">
                                            {booking.status === 'waiting_verification' && (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button onClick={() => handleApprove(booking.id)} className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-emerald-600">
                                                        ✓ อนุมัติ
                                                    </button>
                                                    <button onClick={() => handleReject(booking.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-red-600">
                                                        ✗ ปฏิเสธ
                                                    </button>
                                                </div>
                                            )}
                                            {booking.status === 'confirmed' && (
                                                <span className="text-xs text-gray-400">อนุมัติแล้ว</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <p className="text-center py-8 text-gray-400">ไม่มีข้อมูลการจอง</p>
                )}
            </div>
        </div>
    );
}
