export type AuthLoginFields = {
  email: string;
  password: string;
}

export type AuthRecoverFields = {
  email: string;
}

export type AuthResetFields = {
  newPassword: string;
  confirmPassword: string; 
}

export type AuthUser = {
  userId: number;
  userFullname: string;
  userEmail: string;
}