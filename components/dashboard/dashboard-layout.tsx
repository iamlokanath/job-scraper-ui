'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import {
    Briefcase,
    ClipboardList,
    LogOut,
    Menu,
    X,
    Search
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface SidebarProps {
    children: React.ReactNode;
}

const navItems = [
    { href: '/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/applied-jobs', label: 'Applied Jobs', icon: ClipboardList },
];

export function DashboardLayout({ children }: SidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
                        <Link href="/jobs" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <Search className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">Job Scraper</span>
                        </Link>
                        <button
                            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav items */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                                        isActive
                                            ? "bg-primary-500 text-white"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                    )}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User info */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        {user && (
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                </div>
                            </div>
                        )}
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
                            onClick={logout}
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <header className="sticky top-0 z-30 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between h-full px-4 lg:px-8">
                        <button
                            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex-1" />
                        <ThemeToggle />
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
