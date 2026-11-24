const configuredApiUrl = process.env.NEXT_PUBLIC_BASE_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, "");

export const BACKEND_API_URL = normalizedApiUrl.endsWith("/api/v1") ? normalizedApiUrl : `${normalizedApiUrl}/api/v1`;
