import { NextResponse } from 'next/server';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { adminAuth } from '@/lib/firebase-admin';
import { db } from '@/index';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    console.log('Authorization Header:', authHeader); // Debug: Log header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid Authorization header' }, { status: 401 });
    }

    // Extract and verify Firebase ID token
    const token = authHeader.split(' ')[1];
    console.log('Token:', token); // Debug: Log token (be cautious in production)
    const decodedToken = await adminAuth.verifyIdToken(token);
    console.log('Decoded Token:', decodedToken); // Debug: Log decoded token

    // Check for admin privileges using custom claims
    if (!decodedToken.admin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Fetch data from Neon DB
    const data = await db.select().from(usersTable).execute();
    if (data.length === 0) {
      console.log('No data'); // Log if no data is found
      return NextResponse.json({ success: true, data: [], message: 'No data found' });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    // Handle Firebase-specific errors
    interface FirebaseAuthError {
      code: string;
      message?: string;
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof (error as FirebaseAuthError).code === 'string' &&
      (error as FirebaseAuthError).code.startsWith('auth/')
    ) {
      console.error('Firebase Auth Error:', (error as FirebaseAuthError).message);
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }
  
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}