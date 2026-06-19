import { DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { awsEnv } from "@/lib/env";

export const s3Client = new S3Client({
	region: awsEnv.AWS_REGION,
	credentials: {
		accessKeyId: awsEnv.AWS_ACCESS_KEY_ID,
		secretAccessKey: awsEnv.AWS_SECRET_ACCESS_KEY,
	},
});

export const BUCKET_NAME = awsEnv.AWS_S3_BUCKET;

export function extractS3Key(url: string): string {
	const prefix = `https://${BUCKET_NAME}.s3.${awsEnv.AWS_REGION}.amazonaws.com/`;
	return url.startsWith(prefix) ? url.slice(prefix.length) : url;
}

export async function deleteS3Objects(keys: string[]): Promise<void> {
	if (keys.length === 0) return;
	try {
		await s3Client.send(
			new DeleteObjectsCommand({
				Bucket: BUCKET_NAME,
				Delete: { Objects: keys.map((Key) => ({ Key })), Quiet: true },
			}),
		);
	} catch (error) {
		console.error("S3 batch delete failed:", error);
	}
}
