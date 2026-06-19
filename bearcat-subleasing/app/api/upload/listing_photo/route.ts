import { NextRequest, NextResponse } from "next/server";
import { s3Client, BUCKET_NAME } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { awsEnv } from "@/lib/env";
import { InputValidationError } from "@/lib/errors";
import { validateImageFile } from "@/lib/validation/upload";
import { AuthorizationError, requireUser } from "@/lib/auth-guards";

export async function POST(request: NextRequest) {
	try {
		await requireUser();
		const formData = await request.formData();
		const file = formData.get("file");

		if (!(file instanceof File)) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		validateImageFile(file);

		const filename = `listing_images/${Date.now()}-${file.name}`;
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		await s3Client.send(
			new PutObjectCommand({
				Bucket: BUCKET_NAME,
				Body: buffer,
				Key: filename,
				ContentType: file.type,
			}),
		);

		console.log(`[upload:listing_photo] key=${filename}`);
		return NextResponse.json({
			success: true,
			key: filename,
			url: `https://${BUCKET_NAME}.s3.${awsEnv.AWS_REGION}.amazonaws.com/${filename}`,
		});
	} catch (error) {
		if (error instanceof AuthorizationError) {
			return NextResponse.json(
				{ error: error.message },
				{ status: 401 },
			);
		}

		if (error instanceof InputValidationError) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		console.error("Error uploading listing photo to s3:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}
