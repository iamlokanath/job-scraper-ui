"use client"

import Link from 'next/link'
import { Twitter, Linkedin, Facebook, Instagram, Mail, Phone, MapPin, Search } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <Search className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">Job Scraper</span>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            Aggregating the best opportunities from across the web. Your career journey starts here.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 text-sm transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 text-sm transition-colors">
                                    Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 text-sm transition-colors">
                                    Sign In
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 text-sm transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 text-sm transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 text-sm transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-lg">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400 text-sm">
                                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                                <span>support@jobscraper.com</span>
                            </li>
                            <li className="flex items-start space-x-3 text-gray-600 dark:text-gray-400 text-sm">
                                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                                <span>Global Remote Office</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} Job Scraper. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
