import { db } from "../../config/db.config";
import { eq } from "drizzle-orm";
import { usersTable } from "../../db/schema";
import { AuthLoginFields, AuthUser } from "../../types/auth.types";
import { generateAccessToken } from "../../helpers/auth.helper";
import { comparePassword } from "../../utils/password.utils";
import { logger } from "../../utils/logger.utils";

export const registerUser = async () => {};

export const authUser = async ({ email, password }: AuthLoginFields) => {

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userEmail, email))
    .execute();

  if (!user) {
    logger.warn(`Failed login attempt for email: ${email}`);
    throw new Error("Verifique sus datos e intente de nuevo.");
  }

  if(user.idStatus == 0){
    logger.warn(`Inactive user login attempt for email: ${email}`);
    throw new Error("Lo sentimos, Su cuenta esta inactiva");
  }

  const isMatch = await comparePassword(password, user.userPassword);
  if (!isMatch) {
    logger.warn(
      `Failed login attempt (incorrect password) for email: ${email}`
    );
    throw new Error("Verifique sus contraseña e intente de nuevo.");
  }

  const session: AuthUser = {
    userId: user.userId,
    userEmail: user.userEmail,
    userFullname: user.userFullname,
  };

  const payload = { user: session };
  const token = generateAccessToken(payload);

  return { token, user: session };
};
