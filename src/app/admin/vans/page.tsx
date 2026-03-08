'use client';

import { useState, useEffect } from 'react';
import { Van } from '@/types';

export default function AdminVansPage() {
    const [vans, setVans] = useState<Van[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editVan, setEditVan] = useState<Van | null>(null);
    const [form, setForm] = useState({ name: '', total_seats: '', rows: '', cols: '' });

    const fetchVans = async () => {
        const res = await fetch('/api/vans');
        setVans(await res.json());
        setLoading(false);
    };

    useEffect(() => { fetchVans(); }, []);

    const openCreate = () => {
        setEditVan(null);
        setForm({ name: '', total_seats: '10', rows: '5', cols: '2' });
        setShowModal(true);
    };

    const openEdit = (van: Van) => {
        setEditVan(van);
        setForm({
            name: van.name,
            total_seats: String(van.total_seats),
            rows: String(van.seat_layout.rows),
            cols: String(van.seat_layout.cols),
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        const body = {
            id: editVan?.id,
            name: form.name,
            total_seats: Number(form.total_seats),
            seat_layout: { rows: Number(form.rows), cols: Number(form.cols) },
        };

        if (editVan) {
            await fetch('/api/vans', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
        } else {
            await fetch('/api/vans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
        }

        setShowModal(false);
        fetchVans();
    };

    if (loading) return <div className="text-center py-16 text-gray-400">⏳ กำลังโหลด...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">🚐 จัดการรถตู้</h2>
                    <p className="text-sm text-gray-500">รถตู้ทั้งหมด {vans.length} คัน</p>
                </div>
                <button onClick={openCreate} className="btn-primary">
                    + เพิ่มรถตู้
                </button>
            </div>

            {/* Van Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vans.map((van) => (
                    <div key={van.id} className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-2xl text-white">
                                    🚐
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{van.name}</h3>
                                    <p className="text-sm text-gray-500">{van.total_seats} ที่นั่ง</p>
                                </div>
                            </div>
                            <button onClick={() => openEdit(van)} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                                แก้ไข
                            </button>
                        </div>

                        {/* Seat Preview */}
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-xs text-gray-400 mb-3 text-center">ผังที่นั่ง ({van.seat_layout.rows} แถว × {van.seat_layout.cols} คอลัมน์)</p>
                            <div className="max-w-[180px] mx-auto grid gap-2" style={{ gridTemplateColumns: `repeat(${van.seat_layout.cols}, 1fr)` }}>
                                {Array.from({ length: van.total_seats }, (_, i) => (
                                    <div key={i} className="aspect-square bg-emerald-100 border border-emerald-300 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-700">
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                {editVan ? '✏️ แก้ไขรถตู้' : '➕ เพิ่มรถตู้ใหม่'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">ชื่อรถ</label>
                                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="เช่น Van A" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">จำนวนที่นั่ง</label>
                                <input type="number" value={form.total_seats} onChange={(e) => setForm({ ...form, total_seats: e.target.value })} className="input-field" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">จำนวนแถว</label>
                                    <input type="number" value={form.rows} onChange={(e) => setForm({ ...form, rows: e.target.value })} className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">จำนวนคอลัมน์</label>
                                    <input type="number" value={form.cols} onChange={(e) => setForm({ ...form, cols: e.target.value })} className="input-field" />
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-400 mb-2 text-center">ตัวอย่างผังที่นั่ง</p>
                                <div className="max-w-[150px] mx-auto grid gap-1" style={{ gridTemplateColumns: `repeat(${Number(form.cols) || 2}, 1fr)` }}>
                                    {Array.from({ length: Number(form.total_seats) || 0 }, (_, i) => (
                                        <div key={i} className="aspect-square bg-emerald-100 border border-emerald-300 rounded text-[10px] flex items-center justify-center font-bold text-emerald-700">
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button onClick={() => setShowModal(false)} className="btn-outline flex-1">ยกเลิก</button>
                                <button onClick={handleSave} className="btn-primary flex-1">
                                    {editVan ? 'บันทึก' : 'สร้างรถตู้'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
