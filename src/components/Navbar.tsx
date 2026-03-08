'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useState } from 'react';

export default function Navbar() {
    const { isLoggedIn, customer, logout, setShowAuthModal } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img src="/logo.png" alt="พี่พาเที่ยว" className="h-12 w-auto" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-600 hover:text-primary-500 font-medium transition-colors">
                            หน้าหลัก
                        </Link>
                        <Link href="/#trips" className="text-gray-600 hover:text-primary-500 font-medium transition-colors">
                            ทริปทั้งหมด
                        </Link>
                        <Link href="/#reviews" className="text-gray-600 hover:text-primary-500 font-medium transition-colors">
                            รีวิว
                        </Link>
                    </div>

                    {/* Auth / Profile */}
                    <div className="hidden md:flex items-center gap-3">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <div className="text-sm text-gray-600">
                                    <span className="font-semibold text-primary-500">{customer?.name}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    ออกจากระบบ
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="btn-primary text-sm !py-2 !px-4"
                            >
                                เข้าสู่ระบบ
                            </button>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-gray-600 hover:text-primary-500"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4 space-y-3 animate-slide-up">
                        <Link href="/" className="block text-gray-600 hover:text-primary-500 font-medium" onClick={() => setMobileOpen(false)}>
                            หน้าหลัก
                        </Link>
                        <Link href="/#trips" className="block text-gray-600 hover:text-primary-500 font-medium" onClick={() => setMobileOpen(false)}>
                            ทริปทั้งหมด
                        </Link>
                        <Link href="/#reviews" className="block text-gray-600 hover:text-primary-500 font-medium" onClick={() => setMobileOpen(false)}>
                            รีวิว
                        </Link>
                        {isLoggedIn ? (
                            <div className="pt-3 border-t border-gray-100 space-y-2">
                                <p className="text-sm font-semibold text-primary-500">{customer?.name}</p>
                                <button onClick={() => { logout(); setMobileOpen(false); }} className="text-sm text-red-500">
                                    ออกจากระบบ
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => { setShowAuthModal(true); setMobileOpen(false); }}
                                className="btn-primary text-sm w-full"
                            >
                                เข้าสู่ระบบ
                            </button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
