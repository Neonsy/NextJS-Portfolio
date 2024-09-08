import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter } from './middleware/upStashRateLimit';

const IGNORED_PATHS = ['/_vercel/insights', '/_vercel/speed-insights'];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (IGNORED_PATHS.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    return await rateLimiter(req);
}

export const config = {
    matcher: '/:path*',
};
