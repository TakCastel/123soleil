import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['resend'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.123soleil-cinema.fr', pathname: '/assets/**' },
      { protocol: 'http', hostname: 'localhost', pathname: '/assets/**', port: '8055' },
      { protocol: 'http', hostname: 'directus', pathname: '/assets/**', port: '8055' }
    ]
  },
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
