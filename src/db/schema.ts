import { pgTable, varchar, integer, pgEnum, text } from "drizzle-orm/pg-core";

// Enum for role type
export const userRoleEnum = pgEnum("user_role", ["staff", "student"]);

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("firstname", { length: 255 }).notNull(),
  lastName: varchar("lastname", { length: 255 }).notNull(),
  middleName: varchar("middlename", { length: 255 }), // optional
  department: varchar("department", { length: 255 }).notNull(),
  identifier: varchar("identifier", { length: 255 }).notNull(), // stores staff or reg number
  role: userRoleEnum("role").notNull(), // staff or student
  passportPhotoLink: varchar("passport_photo_link", { length: 255 }).notNull(),
  createdAt: text("created_at").default("now()"),
});
