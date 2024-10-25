import type { Config } from 'tailwindcss'
import colorsConfig from './tailwind-config/colorsConfig'
import screensConfig from './tailwind-config/screensConfig'
import borderRadiusConfig from './tailwind-config/borderRadiusConfig'
import keyframesConfig from './tailwind-config/keyframesConfig'
import animationConfig from './tailwind-config/animationConfig'

const config = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: colorsConfig,
            screens: screensConfig,
            borderRadius: borderRadiusConfig,
            keyframes: keyframesConfig,
            animation: animationConfig,
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
