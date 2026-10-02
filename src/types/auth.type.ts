export interface RegistrationPayload {
  name: string;
  email: string;
  password: string;
  patient: {
    contactNumber?: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyAccountPayload {
  email: string;
  otp: string;
}

export type UserRole = "CUSTOMER" | "TECHNICIAN" | "ADMIN";

export type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED";

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  userId: string;
  address: string | null;
  city: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  googleId: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  authProvider: "CREDENTIAL" | "GOOGLE";
  emailVerified: boolean;
  status: UserStatus;
  needPasswordChange: boolean;
  imageUrl: string | null;
  imagePublicId: string | null;
  isDeleted: boolean;
  customerProfile?: CustomerProfile | null;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type GetMeResponse = ApiResponse<User>;