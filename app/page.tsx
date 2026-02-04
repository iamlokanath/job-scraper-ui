import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, ClipboardList, Briefcase } from 'lucide-react';
import { Navbar, Footer } from '@/components/ui';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow pt-24 pb-20">
                {/* Hero Section */}
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <div className="mb-8 flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                            <Search className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="gradient-text">Job Scraper</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Find your next opportunity. We aggregate jobs from multiple platforms
                        so you can search once and apply everywhere.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login">
                            <Button size="lg" variant="gradient">
                                Get Started
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button size="lg" variant="outline">
                                Create Account
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Features */}
                <div className="container mx-auto px-4 mt-20 grid md:grid-cols-3 gap-8 max-w-5xl">
                    <Card className="hover:shadow-medium transition-shadow">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                                <Search className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Search Jobs</h3>
                            <p className="text-gray-600 dark:text-gray-400">Find jobs from multiple platforms in one place.</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-medium transition-shadow">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 bg-accent-green-100 dark:bg-accent-green-900 rounded-lg flex items-center justify-center mb-4">
                                <Briefcase className="w-6 h-6 text-accent-green-600 dark:text-accent-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Apply Instantly</h3>
                            <p className="text-gray-600 dark:text-gray-400">Apply to jobs with one click and redirect to source.</p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-medium transition-shadow">
                        <CardContent className="pt-6">
                            <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center mb-4">
                                <ClipboardList className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Track Applications</h3>
                            <p className="text-gray-600 dark:text-gray-400">Keep track of all your job applications in one place.</p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
}
