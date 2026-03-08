import Link from 'next/link';
import { getTripById, getSeatsByTrip } from '@/lib/data-service';
import { notFound } from 'next/navigation';

interface Props {
    params: { id: string };
}

export default async function TripDetailPage({ params }: Props) {
    const trip = await getTripById(params.id);
    if (!trip) notFound();

    const seats = await getSeatsByTrip(params.id);
    const availableSeats = seats.filter(s => s.status === 'available').length;

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });

    const destinationEmoji: Record<string, string> = {
        'เชียงใหม่': '🏔️',
        'กระบี่': '🏝️',
        'นครราชสีมา': '🌿',
        'น่าน': '⛰️',
        'ตราด': '🐘',
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-primary-500 to-ocean-600 flex items-center justify-center">
                <div className="text-center text-white z-10 px-4 animate-slide-up">
                    <span className="text-7xl mb-4 block">{destinationEmoji[trip.destination] || '✈️'}</span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{trip.trip_name}</h1>
                    <p className="text-white/80 text-lg">📍 {trip.destination}</p>
                </div>
                <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { icon: '📅', label: 'วันเดินทาง', value: formatDate(trip.date) },
                        { icon: '📅', label: 'วันกลับ', value: formatDate(trip.end_date) },
                        { icon: '💰', label: 'ราคา', value: `฿${trip.price.toLocaleString()}/คน` },
                        { icon: '💺', label: 'ที่นั่งว่าง', value: `${availableSeats}/${trip.total_seats}` },
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-4 text-center">
                            <span className="text-2xl">{item.icon}</span>
                            <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                            <p className="font-bold text-gray-800">{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* Gallery */}
                <div className="card p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">📸 แกลเลอรี่</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {(trip.gallery_images.length > 0 ? trip.gallery_images : ['1', '2', '3']).map((_, i) => (
                            <div key={i} className="aspect-video bg-gradient-to-br from-ocean-200 to-ocean-400 rounded-xl flex items-center justify-center text-5xl">
                                {destinationEmoji[trip.destination] || '✈️'}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="card p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 รายละเอียดทริป</h2>
                    <p className="text-gray-600 leading-relaxed text-lg">{trip.description}</p>

                    {trip.highlights.length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-800 mb-3">✨ ไฮไลท์ของทริป</h3>
                            <div className="flex flex-wrap gap-2">
                                {trip.highlights.map((h, i) => (
                                    <span key={i} className="badge-blue !text-sm !px-4 !py-2">
                                        {h}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Schedule */}
                {trip.schedule.length > 0 && (
                    <div className="card p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">🗓️ กำหนดการ</h2>
                        <div className="space-y-6">
                            {trip.schedule.map((day) => (
                                <div key={day.day} className="relative pl-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-ocean-200">
                                    <div className="absolute left-0 top-0 w-7 h-7 bg-ocean-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        {day.day}
                                    </div>
                                    <div className="bg-ocean-50 rounded-xl p-4">
                                        <h4 className="font-bold text-gray-800 mb-2">วันที่ {day.day}: {day.title}</h4>
                                        <ul className="space-y-1">
                                            {day.activities.map((activity, i) => (
                                                <li key={i} className="text-gray-600 text-sm flex items-start gap-2">
                                                    <span className="text-ocean-500 mt-0.5">•</span>
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Booking CTA */}
                <div className="card p-8 mb-8 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-center">
                    <h2 className="text-2xl font-bold mb-2">พร้อมจองทริปนี้แล้วหรือยัง?</h2>
                    <p className="text-white/80 mb-6">เหลือที่นั่งว่างอีก {availableSeats} ที่นั่ง รีบจองก่อนเต็ม!</p>
                    {trip.status === 'open' && availableSeats > 0 ? (
                        <Link
                            href={`/booking/${trip.id}`}
                            className="inline-block bg-white text-accent-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
                        >
                            🎫 จองทริปนี้เลย!
                        </Link>
                    ) : (
                        <p className="text-white/80 text-lg font-semibold">ทริปนี้เต็มแล้ว หรือยังไม่เปิดจอง</p>
                    )}
                </div>
            </div>
        </div>
    );
}
