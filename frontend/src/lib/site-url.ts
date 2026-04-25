const CANDIDATE_ENV_KEYS = [
  "NEXT_PUBLIC_SITE_URL",
  "SITE_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
  "VERCEL_URL",
] as const;

function normalizeCandidateUrl(value?: string | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const withProtocol =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function getSiteUrl(): string | null {
  for (const key of CANDIDATE_ENV_KEYS) {
    const resolved = normalizeCandidateUrl(process.env[key]);
    if (resolved) return resolved;
  }
  return null;
}
