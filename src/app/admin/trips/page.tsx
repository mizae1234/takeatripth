'use client';

import { useState, useEffect } from 'react';
import { Trip } from '@/types';

export default function AdminTripsPage() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editTrip, setEditTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState(true);

    // Form state
    const [form, setForm] = useState({
        trip_name: '',
        destination: '',
        description: '',
        price: '',
        date: '',
        end_date: '',
        total_seats: '',
        status: 'open' as Trip['status'],
    });

    const fetchTrips = async () => {
        const res = await fetch('/api/trips');
        const data = await res.json();
        setTrips(data);
        setLoading(false);
    };

    useEffect(() => { fetchTrips(); }, []);

    const openCreate = () => {
        setEditTrip(null);
        setForm({
            trip_name: '', destination: '', description: '', price: '', date: '', end_date: '', total_seats: '', status: 'open',
        });
        setShowModal(true);
    };

    const openEdit = (trip: Trip) => {
        setEditTrip(trip);
        setForm({
            trip_name: trip.trip_name,
            destination: trip.destination,
            description: trip.description,
            price: String(trip.price),
            date: trip.date,
            end_date: trip.end_date,
            total_seats: String(trip.total_seats),
            status: trip.status,
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        const body = {
            ...form,
            price: Number(form.price),
            total_seats: Number(form.total_seats),
            gallery_images: [],
            schedule: [],
            vans_assigned: [],
            highlights: [],
            cover_image: '',
        };

        if (editTrip) {
            await fetch(`/api/trips/${editTrip.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
        } else {
            await fetch('/api/trips', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
        }

        setShowModal(false);
        fetchTrips();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('ต้องการลบทริปนี้?')) return;
        await fetch(`/api/trips/${id}`, { method: 'DELETE' });
        fetchTrips();
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });

    const statusMap: Record<string, { label: string; class: string }> = {
        open: { label: 'เปิดจอง', class: 'badge-green' },
        closed: { label: 'ปิดรับ', class: 'badge-gray' },
        full: { label: 'เต็ม', class: 'badge-red' },
        completed: { label: 'เสร็จสิ้น', class: 'badge-blue' },
    };

    if (loading) return <div className="text-center py-16 text-gray-400">⏳ กำลังโหลด...</div>;

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">🗺️ จัดการทริป</h2>
                    <p className="text-sm text-gray-500">ทริปทั้งหมด {trips.length} ทริป</p>
                </div>
                <button onClick={openCreate} className="btn-primary">
                    + เพิ่มทริป
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ชื่อทริป</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">จุดหมาย</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">วันที่</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ราคา</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ที่นั่ง</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">สถานะ</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-600">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trips.map((trip) => {
                                const st = statusMap[trip.status] || statusMap.open;
                                return (
                                    <tr key={trip.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 font-semibold text-gray-800">{trip.trip_name}</td>
                                        <td className="py-3 px-4 text-gray-600">{trip.destination}</td>
                                        <td className="py-3 px-4 text-gray-600">{formatDate(trip.date)}</td>
                                        <td className="py-3 px-4 font-semibold text-gray-800">฿{trip.price.toLocaleString()}</td>
                                        <td className="py-3 px-4 text-gray-600">{trip.total_seats}</td>
                                        <td className="py-3 px-4"><span className={st.class}>{st.label}</span></td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEdit(trip)} className="text-blue-500 hover:text-blue-700 text-xs font-medium">
                                                    แก้ไข
                                                </button>
                                                <button onClick={() => handleDelete(trip.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">
                                                    ลบ
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                {editTrip ? '✏️ แก้ไขทริป' : '➕ เพิ่มทริปใหม่'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ชื่อทริป</label>
                                <input type="text" value={form.trip_name} onChange={(e) => setForm({ ...form, trip_name: e.target.value })} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">จุดหมายปลายทาง</label>
                                <input type="text" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">รายละเอียด</label>
                                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field h-24 resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">ราคา (บาท)</label>
                                    <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">จำนวนที่นั่ง</label>
                                    <input type="number" value={form.total_seats} onChange={(e) => setForm({ ...form, total_seats: e.target.value })} className="input-field" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">วันเดินทาง</label>
                                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">วันกลับ</label>
                                    <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="input-field" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">สถานะ</label>
                                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Trip['status'] })} className="input-field">
                                    <option value="open">เปิดจอง</option>
                                    <option value="closed">ปิดรับ</option>
                                    <option value="full">เต็ม</option>
                                    <option value="completed">เสร็จสิ้น</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setShowModal(false)} className="btn-outline flex-1">ยกเลิก</button>
                                <button onClick={handleSave} className="btn-primary flex-1">
                                    {editTrip ? 'บันทึก' : 'สร้างทริป'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
