import { S3Client } from "@aws-sdk/client-s3";
import { awsEnv } from "@/lib/env";

export const s3Client = new S3Client({
	region: awsEnv.AWS_REGION,
	credentials: {
		accessKeyId: awsEnv.AWS_ACCESS_KEY_ID,
		secretAccessKey: awsEnv.AWS_SECRET_ACCESS_KEY,
	},
});

export const BUCKET_NAME = awsEnv.AWS_S3_BUCKET;
