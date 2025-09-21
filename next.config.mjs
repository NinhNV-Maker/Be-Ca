// @ts-check

/**
 * @type {import('next').NextConfig}
 */

/** @type {import('next').NextConfig} */
const nextConfig = {

    typescript: {
        ignoreBuildErrors: true, // Bỏ qua lỗi TypeScript khi build
    },
    eslint: {
        ignoreDuringBuilds: true, // Bỏ qua lỗi ESLint khi build
    },
    reactStrictMode: false,

};

export default nextConfig;