import { relations } from 'drizzle-orm';
import { datetime, int, mysqlTable, serial, tinyint, varchar } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm/sql';

export const usersTable = mysqlTable('users', {
  userId: int('user_id').primaryKey().autoincrement(),
  userCreated: datetime('user_created', {mode: 'date'}).notNull().default(sql`CURRENT_TIMESTAMP`),
  userUpdated: datetime('user_updated', {mode: 'date'}).notNull().default(sql`CURRENT_TIMESTAMP`),
  userDeleted: datetime('user_deleted', {mode: 'date'}).default(sql`NULL`),
  userFullname: varchar('user_fullname', { length: 255 }).notNull(),
  userEmail: varchar('user_email', { length: 255 }).notNull().unique(),
  userPassword: varchar('user_password', { length: 255 }).notNull(),
  idStatus: tinyint('id_status').default(0)
});

export const usersRelations = relations(usersTable, ({many}) => ({
  roles: many(rolesTable),
  sessions: many(sessionsTable)
}));

export const rolesTable = mysqlTable('roles', {
  roleId: int('role_id').primaryKey().autoincrement(),
  roleCreated: datetime('role_created', {mode: 'date'}).notNull().default(sql`CURRENT_TIMESTAMP`),
  roleUpdated: datetime('role_updated', {mode: 'date'}).notNull().default(sql`CURRENT_TIMESTAMP`),
  roleDeleted: datetime('role_updated', {mode: 'date'}).default(sql`NULL`),
  roleName: varchar('role_name', {length: 100}).notNull(),
  idStatus: tinyint('id_status').default(1)
});

export const usersRolesTable = mysqlTable('users_roles', {
  userRoleId: int('user_role_id').primaryKey().autoincrement(),
  id_role: int('id_role').references(()=>rolesTable.roleId),
  id_user: int('id_user').references(() => usersTable.userId),
});

export const permissionsTable = mysqlTable('permissions', {
  permissionId: int('permission_id').primaryKey().autoincrement(),
  permissionCreated: datetime('permission_created', {mode: 'date'}).notNull().default(sql`CURRENT_TIMESTAMP`),
  permissionUpdated: datetime('permission_updated', {mode: 'date'}).notNull().default(sql`CURRENT_TIMESTAMP`),
  permissionDeleted: datetime('permission_deleted', {mode: 'date'}).default(sql`NULL`),
  permissionLabel: varchar('permission_label', {length: 100}).notNull(), // create users | delete Users, etc...
  permissionAction: varchar('permission_action', {length: 50}).notNull() // users:create | users:edit, etc...
});

export const rolesPermissionsTable = mysqlTable('roles_permissions', {
  rolePermissionId: int('role_id').primaryKey().autoincrement(),
  id_role: int('id_role').references(()=>rolesTable.roleId),
  id_permission: int('id_user').references(() => permissionsTable.permissionId),
});

export const sessionsTable = mysqlTable('sessions', {
  sessionId: int('session_id').primaryKey().autoincrement(),
  sessionCreated: datetime('session_created', {mode: 'date'}).notNull().default(sql`CURRENT_TIMESTAMP`),
  sessionToken: varchar('session_token', {length: 255}).notNull(),
  idUser: int('id_user').references(()=>usersTable.userId)
});