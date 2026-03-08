import Link from 'next/link';
import TripCard from '@/components/TripCard';
import { getTrips, getReviews } from '@/lib/data-service';

export default function LandingPage() {
    const trips = getTrips().filter(t => t.status === 'open');
    const reviews = getReviews();

    return (
        <>
            {/* ============ HERO SECTION ============ */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-hero-gradient" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 text-8xl animate-float" style={{ animationDelay: '0s' }}>🏔️</div>
                    <div className="absolute top-40 right-20 text-7xl animate-float" style={{ animationDelay: '0.5s' }}>🏝️</div>
                    <div className="absolute bottom-30 left-1/4 text-6xl animate-float" style={{ animationDelay: '1s' }}>✈️</div>
                    <div className="absolute bottom-20 right-1/3 text-8xl animate-float" style={{ animationDelay: '1.5s' }}>🌊</div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <div className="animate-slide-up">
                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                            🎉 เปิดจองทริปซัมเมอร์ 2026 แล้ววันนี้!
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                            พี่พาเที่ยว
                            <br />
                            <span className="text-sand-200">ทริปดีๆ เริ่มต้นที่นี่</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                            จองทริปท่องเที่ยวคุณภาพ ราคาเป็นกันเอง
                            <br className="hidden sm:block" />
                            ดูแลทุกรายละเอียด ตั้งแต่ที่นั่งยันที่พัก
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="#trips" className="btn-primary text-lg px-8 py-4 shadow-2xl">
                                🗺️ ดูทริปทั้งหมด
                            </a>
                            <a href="#highlights" className="btn-outline !border-white !text-white hover:!bg-white hover:!text-primary-500 text-lg px-8 py-4">
                                ทำไมต้องเรา?
                            </a>
                        </div>
                    </div>
                </div>

                {/* Wave Bottom */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb" />
                    </svg>
                </div>
            </section>

            {/* ============ HIGHLIGHTS SECTION ============ */}
            <section id="highlights" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="section-title">ทำไมต้อง พี่พาเที่ยว?</h2>
                    <p className="section-subtitle">เราใส่ใจทุกรายละเอียดเพื่อให้ทริปของคุณสมบูรณ์แบบ</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: '🎯', title: 'ทริปคัดสรร', desc: 'คัดเลือกเส้นทางท่องเที่ยวที่ดีที่สุด ไม่มีซ้ำ ไม่น่าเบื่อ' },
                            { icon: '💰', title: 'ราคาเป็นกันเอง', desc: 'ราคาคุ้มค่า ไม่มีค่าใช้จ่ายแอบแฝง โปร่งใสทุกบาท' },
                            { icon: '🛡️', title: 'ดูแลตลอดทริป', desc: 'ทีมงานมืออาชีพดูแลตลอดทริป ปลอดภัย อุ่นใจ 100%' },
                        ].map((item, i) => (
                            <div key={i} className="card p-8 text-center group hover:bg-primary-500 transition-all duration-300">
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                                <p className="text-gray-500 group-hover:text-white/80 transition-colors">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ UPCOMING TRIPS SECTION ============ */}
            <section id="trips" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="section-title">🗓️ ทริปที่กำลังเปิดจอง</h2>
                    <p className="section-subtitle">เลือกทริปที่คุณสนใจ แล้วจองเลย!</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.map((trip) => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>

                    {trips.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🏝️</div>
                            <p className="text-xl text-gray-400">ยังไม่มีทริปที่เปิดจองในตอนนี้</p>
                            <p className="text-gray-400">กลับมาเช็คใหม่เร็วๆ นี้นะ!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ============ REVIEWS SECTION ============ */}
            <section id="reviews" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h2 className="section-title">⭐ รีวิวจากลูกค้า</h2>
                    <p className="section-subtitle">ความรู้สึกจริงๆ จากผู้ร่วมทริป</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="card p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{review.avatar}</span>
                                    <div>
                                        <p className="font-semibold text-gray-800">{review.customer_name}</p>
                                        <p className="text-xs text-gray-400">{review.trip_name}</p>
                                    </div>
                                </div>
                                <div className="flex gap-0.5 mb-3">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                            ⭐
                                        </span>
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ CTA SECTION ============ */}
            <section className="py-20 bg-gradient-to-r from-primary-500 to-ocean-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">พร้อมออกเดินทางหรือยัง?</h2>
                    <p className="text-lg text-white/80 mb-8">
                        จองทริปกับเราวันนี้ รับส่วนลด Early Bird สูงสุด 15%
                    </p>
                    <a href="#trips" className="btn-primary text-lg px-10 py-4 !bg-white !text-primary-500 hover:!bg-gray-100">
                        🎒 จองทริปเลย!
                    </a>
                </div>
            </section>
        </>
    );
}
