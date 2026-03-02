import { NextRequest, NextResponse } from "next/server";
import { s3Client, BUCKET_NAME } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request: NextRequest) {
    try{
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                {error: "No file provided"},
                {status: 400},
            )
        }

        const allowed_file_types = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
        if (!allowed_file_types.includes(file.type)) {
            return NextResponse.json(
                {error: "Incorrect file type"},
                {status: 400},
            )
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                {error: "File too large"},
                {status: 400},
            )
        }

        // named with date to mullisecond and filename
        const filename = `listing_images/${Date.now()}-${file.name}`;

        // convert file into buffer for upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const input = {
            Bucket: BUCKET_NAME,
            Body: buffer,
            Key: filename,
            ContentType: file.type,
        }

        const command = new PutObjectCommand(input);
        const response = await s3Client.send(command);

        return NextResponse.json({
            success: true,
            key: filename,
            url: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`
        });
    }

    catch (error) {
        console.error("Error uploading to s3:", error)
        return NextResponse.json(
            {error: "Upload failed"},
            {status: 500}
        )
    }
}