import type { NextConfig } from "next";

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const directusPattern = directusUrl
  ? (() => {
      const u = new URL(directusUrl);
      return {
        protocol: u.protocol.replace(":", "") as "http" | "https",
        hostname: u.hostname,
        pathname: "/assets/**" as const,
        ...(u.port && u.port !== "80" && u.port !== "443" ? { port: u.port } : {}),
      };
    })()
  : null;

const nextConfig: NextConfig = {
  serverExternalPackages: ['resend'],
  // En dev sous Docker, les volumes ne déclenchent pas toujours les événements fichier ; le polling assure le watch
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      ...(directusPattern ? [directusPattern] : []),
      { protocol: 'http', hostname: 'directus', pathname: '/assets/**', port: '8055' }
    ]
  },
  async redirects() {
    const baseUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
    if (!baseUrl) return [];
    const normalized = baseUrl.replace(/\/$/, "");
    return [
      { source: "/admin", destination: `${normalized}/admin`, permanent: false },
      { source: "/admin/:path*", destination: `${normalized}/admin/:path*`, permanent: false }
    ];
  }
};

export default nextConfig;
