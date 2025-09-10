import type { Config } from 'tailwindcss'
import colorsConfig from './tailwind-config/colorsConfig'
import screensConfig from './tailwind-config/screensConfig'
import borderRadiusConfig from './tailwind-config/borderRadiusConfig'
import keyframesConfig from './tailwind-config/keyframesConfig'
import animationConfig from './tailwind-config/animationConfig'
import fontSizeConfig from './tailwind-config/fontSizeConfig'
import backgroundImageConfig from './tailwind-config/backgroundImageConfig'
import boxShadowConfig from './tailwind-config/boxShadowConfig'

const config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './modals/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '4xl': '1920px',
            },
        },
        extend: {
            colors: colorsConfig,
            screens: screensConfig,
            borderRadius: borderRadiusConfig,
            keyframes: keyframesConfig,
            animation: animationConfig,
            fontSize: fontSizeConfig,
            backgroundImage: backgroundImageConfig,
            boxShadow: boxShadowConfig,
            padding: {
                'no-right-padding': '2rem 0 2rem 2rem',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
