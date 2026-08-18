import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    return [
      {
        source: '/api/documents/:id/pdf',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://exam-test-azure.vercel.app http://localhost:3000" },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/documents/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://exam-test-azure.vercel.app http://localhost:3000" },
        ],
      },
    ];
  },
};

export default nextConfig;

