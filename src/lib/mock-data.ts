// ==========================================
// พี่พาเที่ยว - Mock Data Store
// ==========================================

import { Trip, Van, Seat, Customer, Booking, Payment, Review } from '@/types';

// ==========================================
// TRIPS
// ==========================================
export const mockTrips: Trip[] = [
    {
        id: 'trip-001',
        trip_name: 'เชียงใหม่ ม่อนแจ่ม - ดอยอินทนนท์',
        destination: 'เชียงใหม่',
        description: 'สัมผัสธรรมชาติเชียงใหม่ เที่ยวม่อนแจ่ม ชมวิวทะเลหมอก พิชิตยอดดอยอินทนนท์ จุดสูงสุดของประเทศไทย แวะเที่ยวน้ำตกวชิรธาร ปิดท้ายด้วยช้อปปิ้งถนนคนเดินท่าแพ',
        price: 4500,
        date: '2026-04-12',
        end_date: '2026-04-14',
        total_seats: 10,
        cover_image: '/images/chiangmai.jpg',
        gallery_images: ['/images/chiangmai.jpg', '/images/chiangmai-2.jpg', '/images/chiangmai-3.jpg'],
        schedule: [
            { day: 1, title: 'กรุงเทพ - เชียงใหม่ - ม่อนแจ่ม', activities: ['05:00 ออกเดินทางจากกรุงเทพ', '12:00 ถึงเชียงใหม่ รับประทานอาหารกลางวัน', '14:00 เดินทางสู่ม่อนแจ่ม', '17:00 ชมวิวพระอาทิตย์ตก', '19:00 รับประทานอาหารเย็น'] },
            { day: 2, title: 'ดอยอินทนนท์ - น้ำตกวชิรธาร', activities: ['06:00 ออกเดินทางสู่ดอยอินทนนท์', '08:00 พิชิตยอดดอยอินทนนท์', '10:00 ชมพระมหาธาตุนภเมทนีดล', '12:00 รับประทานอาหารกลางวัน', '14:00 เที่ยวน้ำตกวชิรธาร', '18:00 รับประทานอาหารเย็น'] },
            { day: 3, title: 'วัดพระธาตุดอยสุเทพ - ถนนคนเดิน - กลับกรุงเทพ', activities: ['08:00 ไหว้พระวัดพระธาตุดอยสุเทพ', '10:00 ช้อปปิ้งถนนคนเดินท่าแพ', '12:00 รับประทานอาหารกลางวัน', '14:00 เดินทางกลับกรุงเทพ', '22:00 ถึงกรุงเทพโดยสวัสดิภาพ'] }
        ],
        vans_assigned: ['van-001'],
        highlights: ['ม่อนแจ่มชมทะเลหมอก', 'พิชิตยอดดอยอินทนนท์', 'น้ำตกวชิรธาร', 'วัดพระธาตุดอยสุเทพ'],
        status: 'open',
    },
    {
        id: 'trip-002',
        trip_name: 'กระบี่ - เกาะพีพี - ทะเลแหวก',
        destination: 'กระบี่',
        description: 'ดำน้ำชมปะการังเกาะพีพี ถ่ายรูปอ่าวมาหยา เดินเล่นทะเลแหวก ปีนผาที่ไร่เลย์ เที่ยวสระมรกต น้ำตกร้อน ปิดท้ายด้วยซีฟู้ดสดๆ ริมทะเล',
        price: 5900,
        date: '2026-04-25',
        end_date: '2026-04-28',
        total_seats: 10,
        cover_image: '/images/krabi.jpg',
        gallery_images: ['/images/krabi.jpg', '/images/krabi-2.jpg', '/images/krabi-3.jpg'],
        schedule: [
            { day: 1, title: 'กรุงเทพ - กระบี่ - อ่าวนาง', activities: ['06:00 บินจากกรุงเทพ', '08:00 ถึงกระบี่', '10:00 เช็คอินที่พัก', '14:00 เที่ยวอ่าวนาง', '19:00 ซีฟู้ดริมทะเล'] },
            { day: 2, title: 'เกาะพีพี - อ่าวมาหยา', activities: ['07:00 ออกเรือสู่เกาะพีพี', '09:00 ดำน้ำชมปะการัง', '11:00 ถ่ายรูปอ่าวมาหยา', '13:00 รับประทานอาหารบนเกาะ', '16:00 เดินทางกลับ'] },
            { day: 3, title: 'ทะเลแหวก - ไร่เลย์', activities: ['08:00 เดินเล่นทะเลแหวก', '10:00 ปีนผาไร่เลย์', '12:00 รับประทานอาหาร', '14:00 พักผ่อนริมทะเล', '18:00 ชมพระอาทิตย์ตก'] },
            { day: 4, title: 'สระมรกต - น้ำตกร้อน - กลับกรุงเทพ', activities: ['08:00 เที่ยวสระมรกต', '10:00 แช่น้ำตกร้อน', '12:00 รับประทานอาหาร', '15:00 บินกลับกรุงเทพ'] }
        ],
        vans_assigned: ['van-002'],
        highlights: ['ดำน้ำเกาะพีพี', 'ถ่ายรูปอ่าวมาหยา', 'ทะเลแหวก', 'ปีนผาไร่เลย์'],
        status: 'open',
    },
    {
        id: 'trip-003',
        trip_name: 'เขาใหญ่ - ปากช่อง - แก่งกระจาน',
        destination: 'นครราชสีมา',
        description: 'เที่ยวอุทยานแห่งชาติเขาใหญ่ ชมน้ำตกเหวนรก เดินป่าศึกษาธรรมชาติ แวะไร่องุ่น PB Valley ช้อปปิ้งที่ Primo Place',
        price: 3200,
        date: '2026-05-01',
        end_date: '2026-05-03',
        total_seats: 10,
        cover_image: '/images/khaoyai.jpg',
        gallery_images: ['/images/khaoyai.jpg', '/images/khaoyai-2.jpg', '/images/khaoyai-3.jpg'],
        schedule: [
            { day: 1, title: 'กรุงเทพ - เขาใหญ่', activities: ['06:00 ออกเดินทาง', '09:00 ถึงเขาใหญ่', '10:00 เดินป่าเส้นทางธรรมชาติ', '12:00 อาหารกลางวัน', '14:00 ชมน้ำตกเหวนรก', '18:00 อาหารเย็น'] },
            { day: 2, title: 'ไร่องุ่น - Primo Place', activities: ['08:00 เยี่ยมชมไร่องุ่น PB Valley', '11:00 ชิมไวน์', '12:00 อาหารกลางวัน', '14:00 ช้อปปิ้ง Primo Place', '18:00 อาหารเย็น'] },
            { day: 3, title: 'เขาใหญ่ - กลับกรุงเทพ', activities: ['07:00 ชมพระอาทิตย์ขึ้น', '09:00 อาหารเช้า', '10:00 เดินทางกลับ', '14:00 ถึงกรุงเทพ'] }
        ],
        vans_assigned: ['van-001'],
        highlights: ['น้ำตกเหวนรก', 'เดินป่าเขาใหญ่', 'ไร่องุ่น PB Valley', 'Primo Place'],
        status: 'open',
    },
    {
        id: 'trip-004',
        trip_name: 'น่าน - บ่อเกลือ - ปัว',
        destination: 'น่าน',
        description: 'สัมผัสเสน่ห์เมืองน่าน ไหว้พระวัดภูมินทร์ ชมจิตรกรรมฝาผนังปู่ม่าน - ย่าม่าน เที่ยวบ่อเกลือโบราณ ชมนาขั้นบันไดดอยภูคา',
        price: 4200,
        date: '2026-05-15',
        end_date: '2026-05-18',
        total_seats: 10,
        cover_image: '/images/nan.jpg',
        gallery_images: ['/images/nan.jpg', '/images/nan-2.jpg', '/images/nan-3.jpg'],
        schedule: [
            { day: 1, title: 'กรุงเทพ - น่าน', activities: ['05:00 ออกเดินทาง', '14:00 ถึงน่าน', '15:00 ไหว้พระวัดภูมินทร์', '17:00 เดินเล่นในเมือง', '19:00 อาหารเย็น'] },
            { day: 2, title: 'บ่อเกลือ - ดอยภูคา', activities: ['06:00 เดินทางสู่บ่อเกลือ', '09:00 ชมบ่อเกลือโบราณ', '12:00 อาหารกลางวัน', '14:00 ชมนาขั้นบันได', '18:00 อาหารเย็น'] },
            { day: 3, title: 'ปัว - วัดศรีมงคล', activities: ['08:00 เที่ยวอำเภอปัว', '10:00 วัดศรีมงคล', '12:00 อาหาร', '14:00 ช้อปปิ้งของฝาก', '18:00 อาหารเย็น'] },
            { day: 4, title: 'น่าน - กลับกรุงเทพ', activities: ['07:00 อาหารเช้า', '08:00 เดินทางกลับ', '18:00 ถึงกรุงเทพ'] }
        ],
        vans_assigned: ['van-002'],
        highlights: ['วัดภูมินทร์', 'บ่อเกลือโบราณ', 'นาขั้นบันไดดอยภูคา', 'เมืองน่านสุดคลาสสิก'],
        status: 'open',
    },
    {
        id: 'trip-005',
        trip_name: 'ตราด - เกาะช้าง - หมู่เกาะรัง',
        destination: 'ตราด',
        description: 'เที่ยวเกาะช้างสุดชิล ดำน้ำหมู่เกาะรัง ชมปะการังสวยๆ ขี่ช้างเข้าป่า ปิดท้ายด้วยอาหารทะเลสดๆ',
        price: 4800,
        date: '2026-06-05',
        end_date: '2026-06-08',
        total_seats: 10,
        cover_image: '/images/kohchang.jpg',
        gallery_images: ['/images/kohchang.jpg', '/images/kohchang-2.jpg'],
        schedule: [
            { day: 1, title: 'กรุงเทพ - ตราด - เกาะช้าง', activities: ['05:00 ออกเดินทาง', '10:00 ถึงท่าเรือ', '11:00 ข้ามเรือ', '12:00 เช็คอิน', '15:00 เที่ยวหาดทรายขาว'] },
            { day: 2, title: 'ดำน้ำหมู่เกาะรัง', activities: ['07:00 ออกเรือ', '09:00 ดำน้ำจุดที่ 1', '11:00 ดำน้ำจุดที่ 2', '13:00 อาหารบนเรือ', '15:00 ดำน้ำจุดที่ 3', '17:00 กลับที่พัก'] },
            { day: 3, title: 'ขี่ช้าง - น้ำตก', activities: ['09:00 ขี่ช้าง', '11:00 เที่ยวน้ำตกคลองพลู', '13:00 อาหาร', '15:00 พักผ่อน', '18:00 อาหารทะเล'] },
            { day: 4, title: 'เกาะช้าง - กลับกรุงเทพ', activities: ['08:00 อาหารเช้า', '10:00 ข้ามเรือ', '11:00 เดินทางกลับ', '17:00 ถึงกรุงเทพ'] }
        ],
        vans_assigned: ['van-001'],
        highlights: ['เกาะช้าง', 'ดำน้ำหมู่เกาะรัง', 'ขี่ช้างเข้าป่า', 'ซีฟู้ดสดๆ'],
        status: 'closed',
    },
];

// ==========================================
// VANS
// ==========================================
export const mockVans: Van[] = [
    {
        id: 'van-001',
        name: 'Van A',
        total_seats: 10,
        seat_layout: { rows: 5, cols: 2 },
    },
    {
        id: 'van-002',
        name: 'Van B',
        total_seats: 12,
        seat_layout: { rows: 6, cols: 2 },
    },
];

// ==========================================
// SEATS (per trip)
// ==========================================
export const mockSeats: Seat[] = [
    // Trip 1 - Van A (10 seats)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `seat-t1-${i + 1}`,
        van_id: 'van-001',
        trip_id: 'trip-001',
        seat_number: i + 1,
        status: (i === 2 || i === 5 ? 'reserved' : i === 7 ? 'booked' : 'available') as Seat['status'],
        booking_id: i === 7 ? 'booking-001' : undefined,
    })),
    // Trip 2 - Van B (10 seats shown)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `seat-t2-${i + 1}`,
        van_id: 'van-002',
        trip_id: 'trip-002',
        seat_number: i + 1,
        status: (i === 0 || i === 1 ? 'booked' : i === 4 ? 'reserved' : 'available') as Seat['status'],
        booking_id: (i === 0 || i === 1) ? 'booking-002' : undefined,
    })),
    // Trip 3 - Van A (10 seats all available)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `seat-t3-${i + 1}`,
        van_id: 'van-001',
        trip_id: 'trip-003',
        seat_number: i + 1,
        status: 'available' as Seat['status'],
    })),
    // Trip 4 - Van B (10 seats)
    ...Array.from({ length: 10 }, (_, i) => ({
        id: `seat-t4-${i + 1}`,
        van_id: 'van-002',
        trip_id: 'trip-004',
        seat_number: i + 1,
        status: 'available' as Seat['status'],
    })),
];

// ==========================================
// CUSTOMERS
// ==========================================
export const mockCustomers: Customer[] = [
    {
        id: 'cust-001',
        phone: '0891234567',
        name: 'สมชาย ใจดี',
        line_id: 'somchai_jaidee',
        created_at: '2026-02-01T10:00:00Z',
    },
    {
        id: 'cust-002',
        phone: '0899876543',
        name: 'สมหญิง รักเที่ยว',
        line_id: 'somying_travel',
        created_at: '2026-02-15T14:30:00Z',
    },
];

// ==========================================
// BOOKINGS
// ==========================================
export const mockBookings: Booking[] = [
    {
        id: 'booking-001',
        trip_id: 'trip-001',
        customer_id: 'cust-001',
        customer_name: 'สมชาย ใจดี',
        customer_phone: '0891234567',
        customer_line_id: 'somchai_jaidee',
        seats: [8],
        status: 'confirmed',
        created_at: '2026-03-01T10:00:00Z',
        total_amount: 4500,
    },
    {
        id: 'booking-002',
        trip_id: 'trip-002',
        customer_id: 'cust-002',
        customer_name: 'สมหญิง รักเที่ยว',
        customer_phone: '0899876543',
        customer_line_id: 'somying_travel',
        seats: [1, 2],
        status: 'waiting_verification',
        created_at: '2026-03-05T14:30:00Z',
        total_amount: 11800,
    },
];

// ==========================================
// PAYMENTS
// ==========================================
export const mockPayments: Payment[] = [
    {
        id: 'payment-001',
        booking_id: 'booking-001',
        amount: 4500,
        transfer_time: '2026-03-01T11:00:00Z',
        slip_image: '/mock/slip-1.jpg',
        status: 'verified',
        created_at: '2026-03-01T11:05:00Z',
    },
    {
        id: 'payment-002',
        booking_id: 'booking-002',
        amount: 11800,
        transfer_time: '2026-03-05T15:00:00Z',
        slip_image: '/mock/slip-2.jpg',
        status: 'pending',
        created_at: '2026-03-05T15:05:00Z',
    },
];

// ==========================================
// REVIEWS
// ==========================================
export const mockReviews: Review[] = [
    {
        id: 'review-001',
        customer_name: 'คุณแอน',
        avatar: '👩',
        rating: 5,
        comment: 'ทริปสนุกมากค่ะ พี่ไกด์ดูแลดีมาก อาหารอร่อย ที่พักสะอาด แนะนำเลยค่ะ!',
        trip_name: 'เชียงใหม่ ม่อนแจ่ม',
    },
    {
        id: 'review-002',
        customer_name: 'คุณบอส',
        avatar: '👨',
        rating: 5,
        comment: 'ไปมาหลายทริปแล้ว ทุกทริปจัดได้ดีมาก คุ้มค่าทุกบาท พี่ๆทีมงานใจดีมาก',
        trip_name: 'กระบี่ - เกาะพีพี',
    },
    {
        id: 'review-003',
        customer_name: 'คุณมิ้น',
        avatar: '👧',
        rating: 4,
        comment: 'ชอบมากค่ะ วิวสวย โปรแกรมไม่เร่งรีบ ได้เที่ยวเต็มอิ่ม จะกลับมาจองอีกแน่นอน',
        trip_name: 'เขาใหญ่ - ปากช่อง',
    },
    {
        id: 'review-004',
        customer_name: 'คุณเจ',
        avatar: '🧑',
        rating: 5,
        comment: 'ทริปน่านดีมากครับ ได้ไปเที่ยวที่ไม่เคยไป บรรยากาศดี อากาศเย็นสบาย',
        trip_name: 'น่าน - บ่อเกลือ',
    },
];
