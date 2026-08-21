ALTER TABLE "listing" ADD COLUMN "image_url" varchar(512);
--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "image_key" varchar(512);
--> statement-breakpoint
UPDATE "listing" AS l
SET "image_url" = li."url",
    "image_key" = replace(li."url", 'https://bearcat-subleasing.s3.us-east-2.amazonaws.com/', '')
FROM "listing_image" AS li
WHERE li."listing_id" = l."id";
--> statement-breakpoint
DROP TABLE "listing_image" CASCADE;
