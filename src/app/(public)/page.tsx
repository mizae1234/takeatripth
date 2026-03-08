import { getTrips, getReviews } from '@/lib/data-service';
import TripCard from '@/components/TripCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
    const trips = await getTrips();
    const reviews = await getReviews();
    const openTrips = trips.filter(t => t.status === 'open');

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-400 to-ocean-500 pt-24 pb-16 sm:pt-32 sm:pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <div className="animate-slide-up">
                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                            🎉 เปิดจองทริปซัมเมอร์ 2026 แล้ววันนี้!
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            พี่พาเที่ยว<br />
                            <span className="text-sand-300">ทริปดีๆ เริ่มต้นที่นี่</span>
                        </h1>
                        <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
                            จองทริปท่องเที่ยวคุณภาพ ราคาเป็นกันเองดูแลทุกรายละเอียด
                            ตั้งแต่ที่นั่งยันที่พัก
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="#trips" className="btn-accent text-lg px-8 py-4">
                                🏖️ ดูทริปทั้งหมด
                            </Link>
                            <Link href="#why-us" className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">
                                ทำไมต้องเรา?
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* Why Us */}
            <section id="why-us" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">
                        <span className="text-primary-500">ทริปดีๆ</span>ที่คุณไว้ใจ
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {[
                            { icon: '💎', title: 'ราคาเป็นกันเอง', desc: 'ราคายุติธรรม ไม่มีค่าใช้จ่ายแฝง ไม่จ่ายเพิ่มทีหลัง' },
                            { icon: '🔍', title: 'ดูแลตลอดทริป', desc: 'ทีมงานมืออาชีพดูแลตลอดทริป ปลอดภัย คุ้มค่า 100%' },
                            { icon: '💺', title: 'จองง่าย สะดวก', desc: 'เลือกที่นั่ง จ่ายเงิน รอขึ้นรถ จบ!' },
                        ].map((item, i) => (
                            <div key={i} className="card p-8 text-center hover:shadow-xl transition-shadow">
                                <span className="text-5xl mb-4 block">{item.icon}</span>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Trips */}
            <section id="trips" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            ทริปที่กำลังเปิดจอง
                        </h2>
                        <p className="text-gray-500">เลือกทริปที่คุณสนใจ แล้วจองเลย!</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {openTrips.map(trip => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                    {openTrips.length === 0 && (
                        <p className="text-center py-12 text-gray-400">ยังไม่มีทริปที่เปิดจองในขณะนี้</p>
                    )}
                </div>
            </section>

            {/* Reviews */}
            <section id="reviews" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            📣 รีวิวจากลูกค้า
                        </h2>
                        <p className="text-gray-500">ความรู้สึกจริงๆ จากผู้ร่วมทริป</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.map(review => (
                            <div key={review.id} className="card p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">{review.avatar}</span>
                                    <div>
                                        <p className="font-bold text-gray-800">{review.customer_name}</p>
                                        <p className="text-xs text-gray-400">{review.trip_name}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-3">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span key={i} className={`text-lg ${i < review.rating ? 'text-sand-400' : 'text-gray-200'}`}>★</span>
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">พร้อมออกเดินทางหรือยัง?</h2>
                    <p className="text-white/80 mb-8">จองทริปกับเราวันนี้ รับส่วนลด Early Bird สูงสุด 15%</p>
                    <Link href="#trips" className="inline-block bg-white text-accent-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
                        🏖️ จองทริปเลย!
                    </Link>
                </div>
            </section>
        </div>
    );
}
