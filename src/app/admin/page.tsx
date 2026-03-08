import { getDashboardStats, getBookings, getTrips } from '@/lib/data-service';

export default function AdminDashboard() {
    const stats = getDashboardStats();
    const recentBookings = getBookings().slice(-5).reverse();
    const trips = getTrips();

    const statCards = [
        { icon: '📋', label: 'การจองทั้งหมด', value: stats.totalBookings, color: 'from-blue-500 to-blue-600' },
        { icon: '🗺️', label: 'ทริปที่เปิด', value: stats.activeTrips, color: 'from-emerald-500 to-emerald-600' },
        { icon: '💺', label: 'ที่นั่งคงเหลือ', value: stats.seatsRemaining, color: 'from-amber-500 to-amber-600' },
        { icon: '💰', label: 'รายได้โดยประมาณ', value: `฿${stats.estimatedRevenue.toLocaleString()}`, color: 'from-purple-500 to-purple-600' },
    ];

    const statusDisplay: Record<string, { label: string; class: string }> = {
        pending_payment: { label: 'รอชำระเงิน', class: 'badge-yellow' },
        waiting_verification: { label: 'รอตรวจสอบ', class: 'badge-blue' },
        confirmed: { label: 'ยืนยันแล้ว', class: 'badge-green' },
        cancelled: { label: 'ยกเลิก', class: 'badge-red' },
    };

    return (
        <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, i) => (
                    <div key={i} className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-lg`}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl">{card.icon}</span>
                            <span className="text-3xl font-bold">{card.value}</span>
                        </div>
                        <p className="text-white/80 text-sm">{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">📋 การจองล่าสุด</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ลูกค้า</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ทริป</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ที่นั่ง</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">ยอดเงิน</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map((booking) => {
                                const trip = trips.find(t => t.id === booking.trip_id);
                                const st = statusDisplay[booking.status] || statusDisplay.pending_payment;
                                return (
                                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <p className="font-semibold text-gray-800">{booking.customer_name}</p>
                                            <p className="text-xs text-gray-400">{booking.customer_phone}</p>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700">{trip?.trip_name || booking.trip_id}</td>
                                        <td className="py-3 px-4 text-gray-700">{booking.seats.join(', ')}</td>
                                        <td className="py-3 px-4 font-semibold text-gray-800">฿{booking.total_amount.toLocaleString()}</td>
                                        <td className="py-3 px-4">
                                            <span className={st.class}>{st.label}</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {recentBookings.length === 0 && (
                    <p className="text-center py-8 text-gray-400">ยังไม่มีการจอง</p>
                )}
            </div>
        </div>
    );
}
