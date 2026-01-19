import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const directusBaseUrl =
      process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://api.123soleil-cinema.fr";
    const normalizedBaseUrl = directusBaseUrl.replace(/\/$/, "");

    return [
      {
        source: "/admin",
        destination: `${normalizedBaseUrl}/admin`,
        permanent: false
      },
      {
        source: "/admin/:path*",
        destination: `${normalizedBaseUrl}/admin/:path*`,
        permanent: false
      }
    ];
  }
};

export default nextConfig;
