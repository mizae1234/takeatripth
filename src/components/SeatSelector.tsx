'use client';

import { Seat } from '@/types';

interface SeatSelectorProps {
    seats: Seat[];
    selectedSeats: number[];
    onSelectSeat: (seatNumber: number) => void;
    cols?: number;
}

export default function SeatSelector({ seats, selectedSeats, onSelectSeat, cols = 2 }: SeatSelectorProps) {
    const getSeatColor = (seat: Seat) => {
        if (selectedSeats.includes(seat.seat_number)) {
            return 'bg-ocean-500 text-white border-ocean-600 shadow-lg scale-110';
        }
        switch (seat.status) {
            case 'available':
                return 'bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200 hover:scale-105 cursor-pointer';
            case 'reserved':
                return 'bg-amber-100 text-amber-700 border-amber-300 cursor-not-allowed opacity-70';
            case 'booked':
                return 'bg-red-100 text-red-700 border-red-300 cursor-not-allowed opacity-70';
            default:
                return 'bg-gray-100 text-gray-400 border-gray-200';
        }
    };

    const handleClick = (seat: Seat) => {
        if (seat.status === 'available') {
            onSelectSeat(seat.seat_number);
        }
    };

    return (
        <div className="bg-gray-50 rounded-2xl p-6">
            {/* Van Header */}
            <div className="flex items-center justify-center mb-6">
                <div className="bg-primary-500 text-white rounded-t-3xl px-8 py-3 text-center">
                    <span className="text-lg">🚐</span>
                    <span className="ml-2 font-semibold">ด้านหน้ารถ (คนขับ)</span>
                </div>
            </div>

            {/* Seat Grid */}
            <div className="max-w-xs mx-auto">
                <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                    {seats.map((seat) => (
                        <button
                            key={seat.id}
                            onClick={() => handleClick(seat)}
                            disabled={seat.status !== 'available'}
                            className={`
                relative w-full aspect-square rounded-xl border-2 
                flex flex-col items-center justify-center
                transition-all duration-200 font-bold text-lg
                ${getSeatColor(seat)}
              `}
                        >
                            <span className="text-2xl mb-1">💺</span>
                            <span>{seat.seat_number}</span>
                            {selectedSeats.includes(seat.seat_number) && (
                                <span className="absolute -top-1 -right-1 bg-accent-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                                    ✓
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-6 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300" />
                    <span className="text-gray-600">ว่าง</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-ocean-500" />
                    <span className="text-gray-600">เลือกแล้ว</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300" />
                    <span className="text-gray-600">จองแล้ว</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-100 border border-red-300" />
                    <span className="text-gray-600">ไม่ว่าง</span>
                </div>
            </div>
        </div>
    );
}
