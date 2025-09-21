CREATE TYPE "public"."user_role" AS ENUM('staff', 'student');--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"middlename" varchar(255),
	"department" varchar(255) NOT NULL,
	"identifier" varchar(255) NOT NULL,
	"role" "user_role" NOT NULL,
	"passport_photo_link" varchar(255) NOT NULL,
	"created_at" text DEFAULT 'now()'
);
