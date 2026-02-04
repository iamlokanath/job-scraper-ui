// API Service for Job Scraper
// Uses Next.js rewrites to proxy to backend

const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';

interface ApiError {
    detail: string;
}

interface Token {
    access_token: string;
    token_type: string;
}

interface User {
    id: number;
    email: string;
    name: string;
    is_active: boolean;
    created_at: string;
}

interface Job {
    id: number;
    title: string;
    company: string;
    location: string | null;
    platform: string | null;
    description: string | null;
    apply_url: string | null;
    posted_date: string | null;
    experience_level: string | null;
    salary_range: string | null;
    created_at: string;
}

interface JobListResponse {
    jobs: Job[];
    total: number;
}

interface AppliedJob {
    id: number;
    job_id: number;
    applied_at: string;
    job: Job;
}

interface AppliedJobListResponse {
    applied_jobs: AppliedJob[];
    total: number;
}

// Token management
const TOKEN_KEY = 'job_scraper_token';

export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
    return !!getToken();
}

// Base fetch wrapper
async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`/api/${API_VERSION}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.detail || 'An error occurred');
    }

    // Handle 204 No Content
    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

// Auth API
export const authApi = {
    signup: async (name: string, email: string, password: string): Promise<User> => {
        return apiFetch<User>('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });
    },

    login: async (email: string, password: string): Promise<Token> => {
        const response = await apiFetch<Token>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        setToken(response.access_token);
        return response;
    },

    logout: (): void => {
        removeToken();
    },

    getMe: async (): Promise<User> => {
        return apiFetch<User>('/auth/me');
    },
};

// Jobs API
export const jobsApi = {
    list: async (query?: string, location?: string): Promise<JobListResponse> => {
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (location) params.append('location', location);
        const queryString = params.toString();
        return apiFetch<JobListResponse>(`/jobs${queryString ? `?${queryString}` : ''}`);
    },

    get: async (id: number): Promise<Job> => {
        return apiFetch<Job>(`/jobs/${id}`);
    },

    scrape: async (query?: string, location?: string): Promise<JobListResponse> => {
        const params = new URLSearchParams();
        if (query) params.append('query', query);
        if (location) params.append('location', location);
        const queryString = params.toString();
        return apiFetch<JobListResponse>(`/jobs/scrape${queryString ? `?${queryString}` : ''}`, {
            method: 'POST',
        });
    },
};

// Applied Jobs API
export const appliedJobsApi = {
    list: async (): Promise<AppliedJobListResponse> => {
        return apiFetch<AppliedJobListResponse>('/applied-jobs');
    },

    apply: async (jobId: number): Promise<AppliedJob> => {
        return apiFetch<AppliedJob>('/applied-jobs', {
            method: 'POST',
            body: JSON.stringify({ job_id: jobId }),
        });
    },

    remove: async (appliedJobId: number): Promise<void> => {
        return apiFetch<void>(`/applied-jobs/${appliedJobId}`, {
            method: 'DELETE',
        });
    },
};

export type { User, Job, JobListResponse, AppliedJob, AppliedJobListResponse, Token };
