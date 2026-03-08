'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/Navbar';
import AuthModal from '@/components/AuthModal';

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <Navbar />
            <AuthModal />
            <main className="pt-16">
                {children}
            </main>
            {/* Footer */}
            <footer className="bg-primary-500 text-white py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <img src="/logo.png" alt="พี่พาเที่ยว" className="h-14 w-auto drop-shadow-lg" />
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed">
                                ทริปคุณภาพ ราคาเป็นกันเอง<br />
                                จองง่าย จ่ายสะดวก เที่ยวสนุก
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">เมนู</h4>
                            <ul className="space-y-2 text-white/70 text-sm">
                                <li><a href="/#trips" className="hover:text-white transition-colors">ทริปทั้งหมด</a></li>
                                <li><a href="/#reviews" className="hover:text-white transition-colors">รีวิวจากลูกค้า</a></li>
                                <li><a href="/#highlights" className="hover:text-white transition-colors">ทำไมต้องเรา</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">ติดต่อเรา</h4>
                            <ul className="space-y-2 text-white/70 text-sm">
                                <li>📞 02-123-4567</li>
                                <li>📱 Line: @peepateaw</li>
                                <li>📧 info@peepateaw.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/20 mt-8 pt-6 text-center text-white/50 text-sm">
                        © 2026 พี่พาเที่ยว - สงวนลิขสิทธิ์
                    </div>
                </div>
            </footer>
        </AuthProvider>
    );
}
