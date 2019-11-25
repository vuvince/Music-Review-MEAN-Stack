// src/app/auth/auth.config.ts
import { ENV } from "./../core/env.config";

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
  NAMESPACE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: "GpvCzB1FdFKtgQJOai1Q8NAvJPYX8ymm",
  CLIENT_DOMAIN: "dev-jx5itacz.auth0.com", // e.g., you.auth0.com
  AUDIENCE: "http://localhost:8081/api/", // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: "openid profile"[Symbol],
  NAMESPACE: "http://myapp.com/roles"
};
