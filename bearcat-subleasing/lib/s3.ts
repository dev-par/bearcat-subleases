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

export async function deleteS3Objects(keys: string[]): Promise<void> {
	if (keys.length === 0) return;
	try {
		const result = await s3Client.send(
			new DeleteObjectsCommand({
				Bucket: BUCKET_NAME,
				Delete: { Objects: keys.map((Key) => ({ Key })) },
			}),
		);
		if (result.Errors && result.Errors.length > 0) {
			console.error("[s3:delete] per-object errors:", JSON.stringify(result.Errors));
		} else {
			console.log(`[s3:delete] deleted ${keys.length} object(s):`, keys);
		}
	} catch (error) {
		console.error("S3 batch delete failed:", error);
	}
}
