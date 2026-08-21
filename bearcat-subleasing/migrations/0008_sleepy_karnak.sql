CREATE TYPE "public"."preferred_contact_method" AS ENUM('email', 'phone');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "preferred_contact_method" "preferred_contact_method" DEFAULT 'email' NOT NULL;