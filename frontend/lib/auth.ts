import Cookies from "js-cookie";

function resolveApiUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  // Guard against mixed-content errors: if the page is served over HTTPS but
  // the configured API URL is HTTP, upgrade it to HTTPS rather than let the
  // browser block the request.
  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    configured.startsWith("http://")
  ) {
    return configured.replace("http://", "https://");
  }

  return configured;
}

const API_URL = resolveApiUrl();
const TOKEN_COOKIE = "ms_token";
const USER_COOKIE = "ms_user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Invalid email or password");
  }

  const data: LoginResponse = await res.json();
  Cookies.set(TOKEN_COOKIE, data.accessToken, { expires: 1, sameSite: "lax" });
  Cookies.set(USER_COOKIE, JSON.stringify(data.user), {
    expires: 1,
    sameSite: "lax",
  });
  return data;
}

export function logout() {
  Cookies.remove(TOKEN_COOKIE);
  Cookies.remove(USER_COOKIE);
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_COOKIE);
}

export function getCurrentUser(): AuthUser | null {
  const raw = Cookies.get(USER_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}
