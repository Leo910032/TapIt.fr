// middleware.js
import { NextResponse } from 'next/server';
import { auth } from './lib/firebase/admin';

export async function middleware(request) {
  // Paths that require authentication
  const protectedPaths = ['/api/payment', '/api/email', '/api/store/orders'];
  
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    try {
      await auth.verifyIdToken(token);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
