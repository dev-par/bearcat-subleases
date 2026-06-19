CREATE TYPE "public"."distance_from_campus" AS ENUM('under_5', '5_to_10', '10_to_20', '20_to_30', 'over_30');
--> statement-breakpoint
UPDATE "listing" SET "room_type" = 'private' WHERE "room_type" IS NULL;
--> statement-breakpoint
ALTER TABLE "listing" ALTER COLUMN "room_type" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "distance_from_campus" "distance_from_campus";
--> statement-breakpoint
UPDATE "listing" SET "distance_from_campus" = 'under_5' WHERE "distance_from_campus" IS NULL;
--> statement-breakpoint
ALTER TABLE "listing" ALTER COLUMN "distance_from_campus" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "parking_available" boolean;
--> statement-breakpoint
ALTER TABLE "listing" DROP COLUMN "address";
