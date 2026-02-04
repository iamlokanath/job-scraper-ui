'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { jobsApi, appliedJobsApi, Job } from '@/services/api';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Search,
    MapPin,
    Building,
    Clock,
    DollarSign,
    ExternalLink,
    RefreshCw,
    CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function JobsPage() {
    const { user, loading: authLoading } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [appliedJobIds, setAppliedJobIds] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [scraping, setScraping] = useState(false);

    useEffect(() => {
        if (!authLoading && user) {
            loadJobs();
            loadAppliedJobs();
        }
    }, [authLoading, user]);

    const loadJobs = async () => {
        try {
            const response = await jobsApi.list();
            setJobs(response.jobs);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadAppliedJobs = async () => {
        try {
            const response = await appliedJobsApi.list();
            setAppliedJobIds(new Set(response.applied_jobs.map(aj => aj.job_id)));
        } catch (err) {
            // Ignore
        }
    };

    const handleScrape = async () => {
        setScraping(true);
        try {
            await jobsApi.scrape();
            await loadJobs();
            toast.success('Jobs scraped successfully!');
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setScraping(false);
        }
    };

    const handleApply = async (job: Job) => {
        try {
            await appliedJobsApi.apply(job.id);
            setAppliedJobIds(prev => new Set(prev).add(job.id));
            toast.success('Application saved!');
            if (job.apply_url) {
                window.open(job.apply_url, '_blank');
            }
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

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Job Listings</h1>
                <p className="text-gray-600 dark:text-gray-400">Browse and apply to jobs from multiple platforms</p>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search jobs by title or company..."
                        leftIcon={<Search className="w-4 h-4" />}
                    />
                </div>
                <Button onClick={handleScrape} loading={scraping}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Scrape Jobs
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Jobs</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{jobs.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                                <Building className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Applied</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{appliedJobIds.size}</p>
                            </div>
                            <div className="w-12 h-12 bg-accent-green-100 dark:bg-accent-green-900 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-accent-green-600 dark:text-accent-green-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Matching</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredJobs.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center">
                                <Search className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Jobs List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                </div>
            ) : filteredJobs.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <Building className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 mb-4">No jobs found. Try scraping for new jobs!</p>
                        <Button onClick={handleScrape} loading={scraping}>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Scrape Jobs
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {filteredJobs.map(job => (
                        <Card key={job.id} className="hover:shadow-medium transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Building className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{job.title}</h3>
                                                <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{job.company}</p>

                                                <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                                    {job.location && (
                                                        <span className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4" />
                                                            {job.location}
                                                        </span>
                                                    )}
                                                    {job.experience_level && (
                                                        <Badge variant="secondary">{job.experience_level}</Badge>
                                                    )}
                                                    {job.salary_range && (
                                                        <span className="flex items-center gap-1 text-success">
                                                            <DollarSign className="w-4 h-4" />
                                                            {job.salary_range}
                                                        </span>
                                                    )}
                                                    {job.platform && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4" />
                                                            via {job.platform}
                                                        </span>
                                                    )}
                                                </div>

                                                {job.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{job.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row lg:flex-col gap-2 lg:w-32">
                                        {appliedJobIds.has(job.id) ? (
                                            <Badge variant="success" className="justify-center py-2">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Applied
                                            </Badge>
                                        ) : (
                                            <Button onClick={() => handleApply(job)} size="sm" className="flex-1">
                                                Apply Now
                                            </Button>
                                        )}
                                        {job.apply_url && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                onClick={() => window.open(job.apply_url!, '_blank')}
                                            >
                                                <ExternalLink className="w-4 h-4 mr-1" />
                                                View
                                            </Button>
                                        )}
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
