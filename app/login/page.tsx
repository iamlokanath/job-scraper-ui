'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Mail, Lock, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authApi.login(email, password);
            toast.success('Welcome back!');
            router.push('/jobs');
        } catch (err: any) {
            toast.error(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="absolute top-0 right-0 p-4">
                <ThemeToggle />
            </header>

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                                <Search className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-2xl font-bold gradient-text">Job Scraper</span>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle>Welcome Back</CardTitle>
                            <CardDescription>Sign in to continue to Job Scraper</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        leftIcon={<Mail className="w-4 h-4" />}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        leftIcon={<Lock className="w-4 h-4" />}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    loading={loading}
                                >
                                    Sign In
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{' '}
                                <Link href="/signup" className="text-primary-500 hover:underline font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
