'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authApi, isAuthenticated, User } from '@/services/api';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated()) {
                setLoading(false);
                // Redirect to login if on protected route
                if (pathname.startsWith('/jobs') || pathname.startsWith('/applied-jobs')) {
                    router.push('/login');
                }
                return;
            }

            try {
                const userData = await authApi.getMe();
                setUser(userData);
            } catch (error) {
                // Token invalid, clear it
                authApi.logout();
                if (pathname.startsWith('/jobs') || pathname.startsWith('/applied-jobs')) {
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router]);

    const logout = () => {
        authApi.logout();
        setUser(null);
        router.push('/login');
    };

    return { user, loading, logout, isAuthenticated: !!user };
}
