import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define public routes
    const isPublicPath =
        ['/', '/addschool'].includes(path) || path.startsWith('/reset-password');

    // Allow the request if it's a public route or the user is authenticated
    return NextResponse.next();
}

// Export config for route matching
export const config = {
    matcher: '/((?!api|_next/static|favicon.ico).*)', // Match all routes except API, static files, and favicon
};
