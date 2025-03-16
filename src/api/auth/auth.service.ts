import { db } from "../../config/db.config";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema";
import { AuthLoginFields, AuthUser } from "../../types/auth.types";
import { generateAccessToken } from "../../helpers/auth.helper";
import { comparePassword } from "../../utils/password.utils";
import { logger } from "../../utils/logger.utils";
import { getUserPermissions } from "../users/users.service";
import { Permission } from "../../types/permission.types";

export const registerUser = async () => {};

export const authenticate = async ({ email, password }: AuthLoginFields) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .execute();

  if (!user) {
    logger.warn(`Failed login attempt for email: ${email}`);
    throw new Error("Verifique sus datos e intente de nuevo.");
  }

  if (user.status == 0) {
    logger.warn(`Inactive user login attempt for email: ${email}`);
    throw new Error("Lo sentimos, Su cuenta esta inactiva");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    logger.warn(
      `Failed login attempt (incorrect password) for email: ${email}`
    );
    throw new Error("Verifique sus contraseña e intente de nuevo.");
  }

  return user;
};

export const getUserByResetToken = (token: string) => {
  return {};
};

export const setUserPassword = async (id: number, pasword: string) => {};
