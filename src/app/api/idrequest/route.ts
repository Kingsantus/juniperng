import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { usersTable } from '@/db/schema';
import { db } from '@/index';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data)

    // Validate required fields
    if (
      !data.firstName ||
      !data.lastName ||
      !data.department ||
      !data.identifier ||
      !data.role ||
      !data.passportPhotoLink
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Insert into Neon DB
    const result = await db.insert(usersTable).values(data).returning();

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error("Error saving registration:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save registration." },
      { status: 500 }
    );
  }
}
