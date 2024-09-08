import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(100, '30 s'),
});

export async function rateLimiter(req: NextRequest) {
    const ip = req.ip || req.headers.get('x-forwarded-for') || '127.0.0.1';
    console.warn(ip);
    const { success } = await rateLimit.limit(ip);

    if (!success) {
        return new NextResponse('Too many requests', { status: 429 });
    }

    return NextResponse.next();
}
