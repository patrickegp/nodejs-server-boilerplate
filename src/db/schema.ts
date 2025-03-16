import { relations } from "drizzle-orm";
import { datetime, int, mysqlTable, tinyint, varchar } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm/sql";

export const usersTable = mysqlTable("users", {
  id: int("user_id").primaryKey().autoincrement(),
  created: datetime("user_created", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updated: datetime("user_updated", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  deleted: datetime("user_deleted", { mode: "date" }).default(sql`NULL`),
  fullname: varchar("user_fullname", { length: 255 }).notNull(),
  email: varchar("user_email", { length: 255 }).notNull().unique(),
  password: varchar("user_password", { length: 255 }).notNull(),
  idStatus: tinyint("id_status").default(0),
});

export const resetTokensTable = mysqlTable("reset_tokens", {
  id: int("token_id").primaryKey().autoincrement(),
  created: datetime("token_created", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  value: varchar("token_value", { length: 32 }).notNull(),
  idUser: int("id_user").references(() => usersTable.id),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  roles: many(rolesTable),
  sessions: many(sessionsTable),
  tokens: many(resetTokensTable),
}));

export const rolesTable = mysqlTable("roles", {
  id: int("role_id").primaryKey().autoincrement(),
  created: datetime("role_created", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updated: datetime("role_updated", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  deleted: datetime("role_deleted", { mode: "date" }).default(sql`NULL`),
  name: varchar("role_name", { length: 100 }).notNull(),
  idStatus: tinyint("id_status").default(1),
});

export const usersRolesTable = mysqlTable("users_roles", {
  id: int("user_role_id").primaryKey().autoincrement(),
  id_role: int("id_role").references(() => rolesTable.id),
  id_user: int("id_user").references(() => usersTable.id),
});

export const permissionsTable = mysqlTable("permissions", {
  id: int("permission_id").primaryKey().autoincrement(),
  created: datetime("permission_created", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updated: datetime("permission_updated", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  deleted: datetime("permission_deleted", { mode: "date" }).default(sql`NULL`),
  label: varchar("permission_label", { length: 100 }).notNull(),
  action: varchar("permission_action", { length: 50 }).notNull(),
});

export const rolesPermissionsTable = mysqlTable("roles_permissions", {
  id: int("role_permission_id").primaryKey().autoincrement(),
  id_role: int("id_role").references(() => rolesTable.id),
  id_permission: int("id_permission").references(() => permissionsTable.id),
});

export const sessionsTable = mysqlTable("sessions", {
  id: int("session_id").primaryKey().autoincrement(),
  created: datetime("session_created", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  expires: datetime("session_expires", { mode: "date" }).notNull(),
  token: varchar("session_token", { length: 255 }).notNull(),
  idUser: int("id_user").references(() => usersTable.id),
});
