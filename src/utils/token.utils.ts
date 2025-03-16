import crypto from "node:crypto";

export const generateResetToken = () => {
  return crypto.randomBytes(16).toString("hex");
}