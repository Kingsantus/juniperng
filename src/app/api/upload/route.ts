import { NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const bucketName = process.env.GCP_BUCKET_NAME || "my-app-images";

export async function POST(req: Request) {
  try {
    const { fileName, fileType, firstName, lastName } = await req.json();

    if (!fileName || !fileType || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing fileName, fileType, firstName, or lastName" },
        { status: 400 }
      );
    }

    // Extract file extension from fileType (e.g., "image/jpeg" -> ".jpg")
    const extension = fileType.split("/")[1] === "jpeg" ? "jpg" : fileType.split("/")[1];
    // Generate unique file name using firstName, lastName, and timestamp
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, "");
    const sanitizedFirstName = firstName.replace(/[^a-zA-Z0-9]/g, "");
    const sanitizedLastName = lastName.replace(/[^a-zA-Z0-9]/g, "");
    const newFileName = `uploads/${sanitizedFirstName}_${sanitizedLastName}_${timestamp}.${extension}`;

    const options = {
      version: "v4" as const,
      action: "write" as const,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: fileType,
    };

    const [url] = await storage
      .bucket(bucketName)
      .file(newFileName)
      .getSignedUrl(options);

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${newFileName}`;

    return NextResponse.json({ uploadUrl: url, publicUrl });
  } catch (err: unknown) {
    console.error("Error generating signed URL:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}