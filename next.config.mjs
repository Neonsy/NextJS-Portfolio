/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                // Proxy requests to the Vercel Analytics endpoint
                source: '/_vercel/insights/:path*',
                destination: 'https://neon-space.vercel.app/_vercel/insights/:path*',
            },
            {
                // Proxy requests to the Vercel Speed Insights endpoint
                source: '/_vercel/speed-insights/:path*',
                destination: 'https://neon-space.vercel.app/_vercel/speed-insights/:path*',
            },
        ];
    },
};

export default nextConfig;
