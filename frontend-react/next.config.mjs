/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    // Если используете базовый путь
    basePath: '',
    trailingSlash: true,
    assetPrefix: '/',
    // Если нужно отключить строгий режим
    reactStrictMode: true,
    experimental: {
        serverActions: true, // если ты используешь
    },
}

export default nextConfig
