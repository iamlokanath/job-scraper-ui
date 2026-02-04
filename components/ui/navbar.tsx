"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import {
    Menu,
    X,
    LogOut,
    Search,
    Briefcase,
    ClipboardList
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
    const { isAuthenticated, logout } = useAuth()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navItems = [
        { href: '/jobs', label: 'Jobs', icon: Briefcase },
        { href: '/applied-jobs', label: 'Applied Jobs', icon: ClipboardList },
    ]

    return (
        <nav className="w-full z-50 transition-all duration-300 fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        {/* <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                            <Search className="w-5 h-5 text-white" />
                        </div> */}
                        <span className="text-xl font-bold gradient-text">Job Scraper</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {isAuthenticated && navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-500",
                                    pathname === item.href ? "text-primary-500" : "text-gray-600 dark:text-gray-400"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="flex items-center space-x-3">
                            {isAuthenticated ? (
                                <Button
                                    variant="ghost"
                                    onClick={() => logout()}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span>Logout</span>
                                </Button>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost">Sign In</Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button>Sign Up</Button>
                                    </Link>
                                </>
                            )}
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                        {isAuthenticated && navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "block px-4 py-2 text-sm font-medium rounded-lg",
                                    pathname === item.href
                                        ? "bg-primary-50 text-primary-600"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <div className="flex items-center">
                                    <item.icon className="w-4 h-4 mr-3" />
                                    {item.label}
                                </div>
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                            {isAuthenticated ? (
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-red-600"
                                    onClick={() => {
                                        logout()
                                        setIsMobileMenuOpen(false)
                                    }}
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
                                        <Button variant="outline" className="w-full">Sign In</Button>
                                    </Link>
                                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block">
                                        <Button className="w-full">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
