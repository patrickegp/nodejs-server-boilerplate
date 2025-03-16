import { db } from "../../config/db.config";
import { eq } from "drizzle-orm";
import {usersTable, usersRolesTable, rolesPermissionsTable, permissionsTable } from "../../db/schema";
import { logger } from "../../utils/logger.utils";

export const getUserByEmail = async (email: string) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .execute();

  if (!user) {
    logger.warn(`Failed attempt to get user by email: ${email}`);
    throw new Error("Verifique sus datos e intente de nuevo.");
  }

  return user;
};


export const getUserPermissions = async (userId: number) => {
  const userPermissions = await db
    .select({
      id: permissionsTable.id,
      label: permissionsTable.label,
      action: permissionsTable.action,
    })
    .from(usersRolesTable)
    .innerJoin(rolesPermissionsTable, eq(usersRolesTable.id_role, rolesPermissionsTable.id_role))
    .innerJoin(permissionsTable, eq(rolesPermissionsTable.id_permission, permissionsTable.id))
    .where(eq(usersRolesTable.id_user, userId));
  return userPermissions;
}