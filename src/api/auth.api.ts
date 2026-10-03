import {
  LoginPayload,
  RegistrationPayload,
  VerifyAccountPayload,
  GetMeResponse,
} from "../types";
import apiClient from "../lib/apiClient";

export function userLogin(payload: LoginPayload) {
  return apiClient("/api/auth/login", { method: "POST", body: payload });
}

export function verifyAccount(payload: VerifyAccountPayload) {
  return apiClient("/api/auth/verify-email", { method: "POST", body: payload });
}

export function userRegistration(payload: RegistrationPayload) {
  return apiClient("/api/auth/register", { method: "POST", body: payload });
}

export function userLogout() {
  return apiClient("/api/auth/logout", { method: "POST" });
}

export function getMe() {
  return apiClient("/api/auth/me");
}

export function googleOAuth(payload: { idToken: string }) {
  return apiClient("/api/auth/google", { method: "POST", body: payload });
}
