/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Check for Docker-specific internal URL first
    let apiBaseUrl = process.env.INTERNAL_API_URL;
    
    // Fallback logic
    if (!apiBaseUrl) {
      if (process.env.NODE_ENV === 'production') {
        apiBaseUrl = 'http://api:8000'; // Default for our Docker setup
      } else {
        apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      }
    }

    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
