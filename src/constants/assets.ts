const MINIO_URL = process.env.NEXT_PUBLIC_MINIO_URL ?? "http://localhost:9000";

export const ASSETS = {
  logoDefault: `${MINIO_URL}/images/defaults/logo-default.png`,
  servicesHero: `${MINIO_URL}/images/services/hero-banner.jpg`,
} as const;
