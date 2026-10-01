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

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "ACTIVE" |"INACTIVE"|"BANNED";
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
}