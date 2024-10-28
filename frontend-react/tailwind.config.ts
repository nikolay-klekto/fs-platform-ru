import type { Config } from 'tailwindcss'
import colorsConfig from './tailwind-config/colorsConfig'
import screensConfig from './tailwind-config/screensConfig'
import borderRadiusConfig from './tailwind-config/borderRadiusConfig'
import keyframesConfig from './tailwind-config/keyframesConfig'
import animationConfig from './tailwind-config/animationConfig'
import fontSizeConfig from './tailwind-config/fontSizeConfig'
import backgroundImageConfig from './tailwind-config/backgroundImageConfig'
import plugin from 'tailwindcss/plugin'

const config = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                'sm': '320px',
                'sm_l': '375px',
                'sm_xl': '375px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1440px',
                '3xl': '1560px',
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
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-custom': {
                    /* Для веб-китовских браузеров */
                    '&::-webkit-scrollbar': {
                        width: '12px',
                        height: '12px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#ac1313',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                    '&::-webkit-scrollbar-button': {
                        display: 'none' /* Убираем стрелочки */,
                    },
                    /* Для Firefox */
                    'scrollbar-width': 'thin' /* Уменьшаем ширину скроллбара */,
                    'scrollbar-color': '#888 #ac1313' /* Цвет скроллбара и трека */,
                },
            })
        }),
    ],
} satisfies Config

export default config
