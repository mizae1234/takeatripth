'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

const menuItems = [
    { icon: '📊', label: 'Dashboard', href: '/admin' },
    { icon: '🗺️', label: 'จัดการทริป', href: '/admin/trips' },
    { icon: '📋', label: 'จัดการการจอง', href: '/admin/bookings' },
    { icon: '💳', label: 'การชำระเงิน', href: '/admin/payments' },
    { icon: '🚐', label: 'จัดการรถตู้', href: '/admin/vans' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-primary-500 text-white
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 mb-1">
                        <img src="/logo.png" alt="พี่พาเที่ยว" className="h-14 w-auto drop-shadow-lg" />
                    </Link>
                    <p className="text-white/50 text-xs">Admin Panel</p>
                </div>

                <nav className="px-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${isActive
                                        ? 'bg-white/20 text-white shadow-lg'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                    }
                `}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-6 left-4 right-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-3 text-white/50 hover:text-white text-sm transition-colors"
                    >
                        ← กลับหน้าเว็บ
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-600 hover:text-primary-500"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="font-semibold text-gray-800">
                        {menuItems.find(m => m.href === pathname)?.label || 'Admin'}
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Admin</span>
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
