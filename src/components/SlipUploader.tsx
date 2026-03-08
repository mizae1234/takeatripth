'use client';

import { useState, useRef } from 'react';

interface SlipUploaderProps {
    onUpload: (data: { amount: number; transferTime: string; slipImage: string }) => void;
    loading?: boolean;
}

export default function SlipUploader({ onUpload, loading }: SlipUploaderProps) {
    const [amount, setAmount] = useState('');
    const [transferTime, setTransferTime] = useState('');
    const [preview, setPreview] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setPreview(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!amount || !transferTime || !preview) return;
        onUpload({
            amount: parseFloat(amount),
            transferTime,
            slipImage: preview,
        });
    };

    return (
        <div className="space-y-5">
            {/* Amount */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">💰 จำนวนเงินที่โอน (บาท)</label>
                <input
                    type="number"
                    placeholder="เช่น 4500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input-field"
                />
            </div>

            {/* Transfer Time */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">🕐 วัน-เวลาที่โอน</label>
                <input
                    type="datetime-local"
                    value={transferTime}
                    onChange={(e) => setTransferTime(e.target.value)}
                    className="input-field"
                />
            </div>

            {/* Upload Area */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">📸 อัพโหลดสลิปโอนเงิน</label>
                <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-accent-500 hover:bg-accent-50/30 transition-all"
                >
                    {preview ? (
                        <div className="space-y-3">
                            <img src={preview} alt="Slip" className="max-h-64 mx-auto rounded-lg shadow-md" />
                            <p className="text-sm text-gray-500">คลิกเพื่อเปลี่ยนรูป</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="text-4xl">📤</div>
                            <p className="text-gray-500 font-medium">คลิกเพื่ออัพโหลดสลิป</p>
                            <p className="text-gray-400 text-sm">รองรับ JPG, PNG</p>
                        </div>
                    )}
                </div>
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Submit */}
            <button
                onClick={handleSubmit}
                disabled={!amount || !transferTime || !preview || loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? '⏳ กำลังส่ง...' : '✅ ยืนยันการชำระเงิน'}
            </button>
        </div>
    );
}
