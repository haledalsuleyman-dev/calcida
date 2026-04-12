import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.calcida.app' }],
        destination: 'https://calcida.app/:path*',
        permanent: true,
      },
      // Phase 1: Duplicate Page Redirects
      {
        source: '/mortgage-refinance-calculator',
        destination: '/refinance-calculator',
        permanent: true,
      },
      {
        source: '/house-affordability-calculator',
        destination: '/mortgage-affordability-calculator',
        permanent: true,
      },
      {
        source: '/loan-interest-calculator',
        destination: '/loan-payment-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
