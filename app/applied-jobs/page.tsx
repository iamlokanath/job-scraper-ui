'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { appliedJobsApi, AppliedJob } from '@/services/api';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import {
    MapPin,
    Building,
    DollarSign,
    ExternalLink,
    Trash2,
    ClipboardList,
    Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AppliedJobsPage() {
    const { user, loading: authLoading } = useAuth();
    const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && user) {
            loadAppliedJobs();
        }
    }, [authLoading, user]);

    const loadAppliedJobs = async () => {
        try {
            const response = await appliedJobsApi.list();
            setAppliedJobs(response.applied_jobs);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (appliedJobId: number) => {
        try {
            await appliedJobsApi.remove(appliedJobId);
            setAppliedJobs(prev => prev.filter(aj => aj.id !== appliedJobId));
            toast.success('Application removed');
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <DashboardLayout>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Applied Jobs</h1>
                <p className="text-gray-600 dark:text-gray-400">Track all your job applications in one place</p>
            </div>

            {/* Stats Card */}
            <div className="mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Applications</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{appliedJobs.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                                <ClipboardList className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Applied Jobs List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                </div>
            ) : appliedJobs.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <ClipboardList className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't applied to any jobs yet.</p>
                        <Link href="/jobs">
                            <Button>
                                Browse Jobs
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid lg:grid-cols-2 gap-4">
                    {appliedJobs.map(appliedJob => (
                        <Card key={appliedJob.id} className="hover:shadow-medium transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Building className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                    {appliedJob.job.title}
                                                </h3>
                                                <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                                                    {appliedJob.job.company}
                                                </p>

                                                <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                    {appliedJob.job.location && (
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" />
                                                            {appliedJob.job.location}
                                                        </span>
                                                    )}
                                                    {appliedJob.job.salary_range && (
                                                        <span className="flex items-center gap-1 text-success">
                                                            <DollarSign className="w-4 h-4" />
                                                            {appliedJob.job.salary_range}
                                                        </span>
                                                    )}
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(appliedJob.applied_at)}
                                                    </span>
                                                </div>

                                                <Badge variant="success">Applied</Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row xl:flex-col gap-2 xl:w-32">
                                        {appliedJob.job.apply_url && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => window.open(appliedJob.job.apply_url!, '_blank')}
                                            >
                                                <ExternalLink className="w-4 h-4 mr-1" />
                                                View
                                            </Button>
                                        )}
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleRemove(appliedJob.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" />
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
