import Link from 'next/link';
import { Trip } from '@/types';

interface TripCardProps {
    trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
    const availableSeats = trip.total_seats; // In real app, calculate from seats data
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="card-hover group">
            {/* Image */}
            <div className="relative h-48 bg-gradient-to-br from-ocean-200 to-ocean-400 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    {trip.destination === 'เชียงใหม่' && '🏔️'}
                    {trip.destination === 'กระบี่' && '🏝️'}
                    {trip.destination === 'นครราชสีมา' && '🌿'}
                    {trip.destination === 'น่าน' && '⛰️'}
                    {trip.destination === 'ตราด' && '🐘'}
                    {!['เชียงใหม่', 'กระบี่', 'นครราชสีมา', 'น่าน', 'ตราด'].includes(trip.destination) && '✈️'}
                </div>
                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-20">
                    {trip.status === 'open' ? (
                        <span className="badge-green">เปิดจอง</span>
                    ) : trip.status === 'full' ? (
                        <span className="badge-red">เต็ม</span>
                    ) : trip.status === 'closed' ? (
                        <span className="badge-gray">ปิดรับ</span>
                    ) : (
                        <span className="badge-blue">เสร็จสิ้น</span>
                    )}
                </div>
                {/* Destination Badge */}
                <div className="absolute bottom-3 left-3 z-20">
                    <span className="bg-white/90 backdrop-blur-sm text-primary-500 px-3 py-1 rounded-full text-sm font-semibold">
                        📍 {trip.destination}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-primary-500 transition-colors">
                    {trip.trip_name}
                </h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{trip.description}</p>

                {/* Info Row */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                        📅 {formatDate(trip.date)}
                    </span>
                    <span className="flex items-center gap-1">
                        💺 เหลือ {availableSeats} ที่นั่ง
                    </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-accent-500">
                            ฿{trip.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400 text-sm">/คน</span>
                    </div>
                    <Link
                        href={`/trips/${trip.id}`}
                        className="bg-primary-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-600 transition-all transform hover:scale-105"
                    >
                        ดูทริป →
                    </Link>
                </div>
            </div>
        </div>
    );
}
