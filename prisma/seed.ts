import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await prisma.payment.deleteMany();
    await prisma.seat.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.trip.deleteMany();
    await prisma.van.deleteMany();
    await prisma.review.deleteMany();

    // ==========================================
    // VANS
    // ==========================================
    const vanA = await prisma.van.create({
        data: { name: 'Van A', total_seats: 10, seat_rows: 5, seat_cols: 2 },
    });
    const vanB = await prisma.van.create({
        data: { name: 'Van B', total_seats: 10, seat_rows: 5, seat_cols: 2 },
    });
    console.log('✅ Vans created');

    // ==========================================
    // TRIPS
    // ==========================================
    const trip1 = await prisma.trip.create({
        data: {
            trip_name: 'เชียงใหม่ ม่อนแจ่ม - ดอยอินทนนท์',
            destination: 'เชียงใหม่',
            description: 'สัมผัสธรรมชาติเชียงใหม่ เที่ยวม่อนแจ่ม ชมวิวทะเลหมอก พิชิตยอดดอยอินทนนท์ จุดสูงสุดของประเทศไทย แวะเที่ยวน้ำตกวชิรธาร ปิดท้ายด้วยช้อปปิ้งถนนคนเดินท่าแพ',
            price: 4500,
            date: new Date('2026-04-12'),
            end_date: new Date('2026-04-14'),
            total_seats: 10,
            gallery_images: ['/images/cm1.jpg', '/images/cm2.jpg', '/images/cm3.jpg'],
            schedule: [
                { day: 1, title: 'กรุงเทพ - เชียงใหม่ - ม่อนแจ่ม', activities: ['05:00 ออกเดินทางจากกรุงเทพ', '12:00 ถึงเชียงใหม่ รับประทานอาหารกลางวัน', '14:00 เดินทางสู่ม่อนแจ่ม', '17:00 ชมวิวพระอาทิตย์ตก', '19:00 รับประทานอาหารเย็น'] },
                { day: 2, title: 'ดอยอินทนนท์ - น้ำตกวชิรธาร', activities: ['06:00 ออกเดินทางสู่ดอยอินทนนท์', '08:00 พิชิตยอดดอยอินทนนท์', '10:00 ชมพระมหาธาตุนภเมทนีดล', '14:00 เที่ยวน้ำตกวชิรธาร', '18:00 รับประทานอาหารเย็น'] },
                { day: 3, title: 'วัดพระธาตุดอยสุเทพ - ถนนคนเดิน - กลับกรุงเทพ', activities: ['08:00 ไหว้พระวัดพระธาตุดอยสุเทพ', '10:00 ช้อปปิ้งถนนคนเดินท่าแพ', '12:00 รับประทานอาหารกลางวัน', '14:00 เดินทางกลับกรุงเทพ', '22:00 ถึงกรุงเทพโดยสวัสดิภาพ'] },
            ],
            vans_assigned: [vanA.id],
            highlights: ['ม่อนแจ่มชมทะเลหมอก', 'พิชิตยอดดอยอินทนนท์', 'น้ำตกวชิรธาร', 'วัดพระธาตุดอยสุเทพ'],
            status: 'open',
        },
    });

    const trip2 = await prisma.trip.create({
        data: {
            trip_name: 'กระบี่ - เกาะพีพี - ทะเลแหวก',
            destination: 'กระบี่',
            description: 'ดำน้ำชมปะการังเกาะพีพี ถ่ายรูปสวยๆทะเลแหวก เล่นกีฬาทางน้ำ นั่งเรือหางยาว ชิมอาหารทะเลสดๆจากทะเล รับแสง',
            price: 5900,
            date: new Date('2026-04-25'),
            end_date: new Date('2026-04-28'),
            total_seats: 10,
            gallery_images: ['/images/kb1.jpg', '/images/kb2.jpg', '/images/kb3.jpg'],
            schedule: [
                { day: 1, title: 'กรุงเทพ - กระบี่', activities: ['06:00 เดินทางสู่กระบี่', '12:00 ถึงกระบี่ รับประทานอาหาร', '14:00 เข้าที่พัก', '17:00 ชมอาอาทิตย์ตก'] },
                { day: 2, title: 'ทัวร์เกาะพีพี', activities: ['07:00 ออกเรือสู่เกาะพีพี', '09:00 ดำน้ำชมปะการัง', '12:00 รับประทานอาหารบนเกาะ', '14:00 ถ่ายรูปทะเลแหวก'] },
                { day: 3, title: 'กิจกรรมทางทะเล', activities: ['08:00 พายเรือคายัค', '10:00 เล่นกีฬาทางน้ำ', '14:00 พักผ่อนริมหาด'] },
                { day: 4, title: 'กลับกรุงเทพ', activities: ['08:00 ชมตลาดเช้า', '10:00 เดินทางกลับกรุงเทพ'] },
            ],
            vans_assigned: [vanB.id],
            highlights: ['ดำน้ำเกาะพีพี', 'ทะเลแหวก', 'เรือหางยาว', 'อาหารทะเลสด'],
            status: 'open',
        },
    });

    const trip3 = await prisma.trip.create({
        data: {
            trip_name: 'เขาใหญ่ - ปากช่อง - แก่งกระจาน',
            destination: 'นครราชสีมา',
            description: 'เที่ยวอุทยานแห่งชาติเขาใหญ่ ชมวิวทางหมอก เดินป่าศึกษาธรรมชาติ เขาใหญ่คือ PB Valley รื่นรมย์กับ Primo Place',
            price: 3200,
            date: new Date('2026-05-01'),
            end_date: new Date('2026-05-03'),
            total_seats: 10,
            gallery_images: ['/images/ky1.jpg', '/images/ky2.jpg'],
            schedule: [
                { day: 1, title: 'กรุงเทพ - เขาใหญ่', activities: ['06:00 ออกเดินทาง', '10:00 ถึงเขาใหญ่', '14:00 เดินป่า'] },
                { day: 2, title: 'ท่องเที่ยวเขาใหญ่', activities: ['08:00 ชมวิวทะเลหมอก', '10:00 ไร่ PB Valley', '14:00 พักผ่อน'] },
                { day: 3, title: 'กลับกรุงเทพ', activities: ['08:00 ช้อปปิ้ง', '12:00 เดินทางกลับ'] },
            ],
            vans_assigned: [vanA.id],
            highlights: ['เขาใหญ่', 'ทะเลหมอก', 'PB Valley'],
            status: 'open',
        },
    });

    const trip4 = await prisma.trip.create({
        data: {
            trip_name: 'น่าน - บ่อเกลือ - ปัว',
            destination: 'น่าน',
            description: 'สัมผัสเสน่ห์เมืองน่าน วิวงามละเมียดน้ำรอบตัว สัมผัสวิถีชาวบ้านเขาหลวงพะเลิบ บ่อเกลือ - เที่ยวน้ำตกยูงทอง ผาชมดาวสงบเงียบ หลงรัก ให้หลงไปอีกนาน',
            price: 4200,
            date: new Date('2026-05-15'),
            end_date: new Date('2026-05-18'),
            total_seats: 10,
            gallery_images: ['/images/nan1.jpg', '/images/nan2.jpg'],
            schedule: [
                { day: 1, title: 'กรุงเทพ - น่าน', activities: ['05:00 ออกเดินทาง', '14:00 ถึงน่าน', '16:00 วัดภูมินทร์'] },
                { day: 2, title: 'บ่อเกลือ - ปัว', activities: ['07:00 เดินทางสู่บ่อเกลือ', '10:00 ชมบ่อเกลือโบราณ', '14:00 ผาชมดาว'] },
                { day: 3, title: 'น้ำตก - กลับน่าน', activities: ['08:00 น้ำตกยูงทอง', '12:00 อาหารกลางวัน', '14:00 ช้อปปิ้ง'] },
                { day: 4, title: 'กลับกรุงเทพ', activities: ['07:00 ออกเดินทาง', '18:00 ถึงกรุงเทพ'] },
            ],
            vans_assigned: [vanB.id],
            highlights: ['วัดภูมินทร์', 'บ่อเกลือโบราณ', 'ผาชมดาว', 'น้ำตกยูงทอง'],
            status: 'open',
        },
    });

    console.log('✅ Trips created');

    // ==========================================
    // SEATS for each trip
    // ==========================================
    for (const trip of [trip1, trip2, trip3, trip4]) {
        const vanId = trip.vans_assigned[0] || vanA.id;
        for (let i = 1; i <= 10; i++) {
            await prisma.seat.create({
                data: { van_id: vanId, trip_id: trip.id, seat_number: i, status: 'available' },
            });
        }
    }
    console.log('✅ Seats initialized');

    // ==========================================
    // CUSTOMERS
    // ==========================================
    const cust1 = await prisma.customer.create({
        data: { phone: '0891234567', name: 'สมชาย ใจดี', line_id: '@somchai' },
    });
    const cust2 = await prisma.customer.create({
        data: { phone: '0899876543', name: 'สมหญิง รักเที่ยว', line_id: '@somying' },
    });
    console.log('✅ Customers created');

    // ==========================================
    // BOOKINGS
    // ==========================================
    const booking1 = await prisma.booking.create({
        data: {
            trip_id: trip1.id,
            customer_id: cust1.id,
            customer_name: cust1.name,
            customer_phone: cust1.phone,
            customer_line_id: cust1.line_id,
            seats_json: [8],
            status: 'confirmed',
            total_amount: 4500,
        },
    });

    // Update seat 8 to booked
    await prisma.seat.updateMany({
        where: { trip_id: trip1.id, seat_number: 8 },
        data: { status: 'booked', booking_id: booking1.id },
    });

    const booking2 = await prisma.booking.create({
        data: {
            trip_id: trip2.id,
            customer_id: cust2.id,
            customer_name: cust2.name,
            customer_phone: cust2.phone,
            customer_line_id: cust2.line_id,
            seats_json: [1, 2],
            status: 'waiting_verification',
            total_amount: 11800,
        },
    });

    // Update seats 1, 2 to reserved
    await prisma.seat.updateMany({
        where: { trip_id: trip2.id, seat_number: { in: [1, 2] } },
        data: { status: 'reserved', booking_id: booking2.id },
    });
    console.log('✅ Bookings created');

    // ==========================================
    // PAYMENTS
    // ==========================================
    await prisma.payment.create({
        data: {
            booking_id: booking1.id,
            amount: 4500,
            transfer_time: new Date('2026-03-05T14:30:00'),
            slip_image: 'mock-slip-001.jpg',
            status: 'verified',
        },
    });

    await prisma.payment.create({
        data: {
            booking_id: booking2.id,
            amount: 11800,
            transfer_time: new Date('2026-03-07T10:15:00'),
            slip_image: 'mock-slip-002.jpg',
            status: 'pending',
        },
    });
    console.log('✅ Payments created');

    // ==========================================
    // REVIEWS
    // ==========================================
    await prisma.review.createMany({
        data: [
            { customer_name: 'คุณเอม', avatar: '😊', rating: 5, comment: 'ไปมาหลายทริปแล้ว ทุกทริปจัดได้ดีมาก คุ้มค่าทุกบาท พี่ๆทีมงานใจดีมาก', trip_name: 'เชียงใหม่ - เมษายัน' },
            { customer_name: 'คุณมิ้น', avatar: '😄', rating: 5, comment: 'ชอบมากค่ะ วิวสวย โปรแกรมไม่เร่งรีบ ได้เที่ยวเต็มอิ่ม จะกลับมาจองอีกแน่นอน', trip_name: 'เขาใหญ่ - ปากช่อง' },
            { customer_name: 'คุณบอส', avatar: '😎', rating: 4, comment: 'ไปกลางสมัยเป็นรุ่น ทุกอย่างจัดได้ดีมีความเป็นมืออาชีพ คุ้มค่าทุกบาท สำหรับคำเดินทริป มาก', trip_name: 'กระบี่ - เกาะพีพี' },
            { customer_name: 'คุณเจ', avatar: '🤩', rating: 5, comment: 'ทริปน่านดีมากครับ ได้ไปเที่ยวที่ไม่เคยไป บรรยากาศดี อากาศเย็นสบาย', trip_name: 'น่าน - บ่อเกลือ' },
        ],
    });
    console.log('✅ Reviews created');

    console.log('🎉 Seed completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
