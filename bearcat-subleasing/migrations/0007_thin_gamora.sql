CREATE TYPE "public"."gender_preference" AS ENUM('any', 'female', 'male');--> statement-breakpoint
ALTER TABLE "listing" ADD COLUMN "gender_preference" "gender_preference" DEFAULT 'any' NOT NULL;