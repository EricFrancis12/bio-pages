/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: [
            '@react-email/components',
            '@react-email/render',
            '@react-email/tailwind'
        ]
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
                port: '',
                pathname: '/*',
            }
        ]
    }
};

module.exports = nextConfig;
