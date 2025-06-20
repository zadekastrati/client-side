import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_ROUTES = ['/', '/about', '/contact', '/events', '/auth'];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip middleware for public files and specified routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname) ||
    PUBLIC_ROUTES.includes(pathname)
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Handle auth protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // Handle admin protected routes
  if (pathname.startsWith('/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}