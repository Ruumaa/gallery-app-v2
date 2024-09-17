import { NextResponse } from 'next/server';

export async function middleware(req) {
  const secretKey = process.env.API_SECRET_KEY;
  const clientKey = req.headers.get('x-api-key');
  if (clientKey !== secretKey) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/images', '/api/images/upload'],
};
