import { db } from "../../config/db.config";
import { eq } from "drizzle-orm";
import { resetTokensTable, usersTable } from "../../db/schema";
import { AuthLoginFields } from "../../types/auth.types";
import { comparePassword } from "../../utils/password.utils";
import { logger } from "../../utils/logger.utils";

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

  if (user.idStatus == 0) {
    logger.warn(`Inactive user login attempt for email: ${email}`);
    throw new Error("Lo sentimos, Su cuenta esta inactiva");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    logger.warn(`Failed login attempt (incorrect password) for email: ${email}`);
    throw new Error("Verifique sus contraseña e intente de nuevo.");
  }

  return user;
};

export const getUserResetToken = async (token: string) => {
  const [userToken] = await db
    .select({
      id: resetTokensTable.id,
      idUser: resetTokensTable.idUser,
      token: resetTokensTable.value,
      fullname: usersTable.fullname,
      email: usersTable.email
    })
    .from(resetTokensTable)
    .where(eq(resetTokensTable.value, token))
    .innerJoin(usersTable, eq(usersTable.id, resetTokensTable.idUser))
    .execute();

  if (!userToken) {
    logger.warn(`Failed attempt to get user reset token: ${token}`);
    throw new Error("Token de autorización inválido");
  }

  return userToken;
};

export const deleteUserResetTokens = async (userId: number) => {
  return await db
    .delete(resetTokensTable)
    .where(eq(resetTokensTable.idUser, userId));
};

export const insertResetToken = async (tokenValue: string, id: number) => {
  return await db
    .insert(resetTokensTable)
    .values({value: tokenValue, idUser: id})
    .$returningId();
};

export const setUserPassword = async (userId: number, password: string) => {
  const values = {password: password};
  return await db.update(usersTable).set(values).where(eq(usersTable.id, userId))
};
