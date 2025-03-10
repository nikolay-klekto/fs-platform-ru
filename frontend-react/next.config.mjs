/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    images: {
        unoptimized: true,
    },
    // Если используете базовый путь
    basePath: '',
    // Если нужно отключить строгий режим
    reactStrictMode: false,
}

export default nextConfig
