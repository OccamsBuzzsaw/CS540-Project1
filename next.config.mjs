/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Enables static export
  images: {
    unoptimized: true, // Fix for GitHub Pages not supporting Next.js image optimization
  },
  basePath: "/Project_1", // GitHub Pages serves files under /repo-name
  assetPrefix: "/Project_1",
};

export default nextConfig;