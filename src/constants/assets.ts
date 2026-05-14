const MINIO_URL = process.env.NEXT_PUBLIC_MINIO_URL ?? "http://localhost:9000";

export const ASSETS = {
  logoDefault: `${MINIO_URL}/defaults/logo-default.png`,
  servicesHero: `${MINIO_URL}/services/hero-banner.jpg`,
} as const;
