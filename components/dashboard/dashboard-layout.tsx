import { Navbar, Footer } from '@/components/ui';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Navbar />

            {/* Main content with padding for fixed navbar */}
            <main className="flex-1 container mx-auto px-4 lg:px-8 pt-24 pb-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}
