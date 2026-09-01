import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // The preview is served through a proxied host, so the dev origin must be
  // allowed explicitly or Next refuses the request.
  allowedDevOrigins: ["*.e2b.app", "*.e2b.dev", "localhost", "127.0.0.1"],
};

export default nextConfig;
