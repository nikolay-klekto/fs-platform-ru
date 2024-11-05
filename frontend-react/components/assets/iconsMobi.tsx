import React from 'react'

interface ArrowBtnProps {
    width?: number
    height?: number
}

export const ArrowBtn: React.FC<ArrowBtnProps> = ({ width = 56, height = 56 }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M48.2331 27.8018L29.5038 9.92383V20.1398C11.58 20.1398 7.36914 32.9918 7.36914 45.6798C12.5421 39.0564 17.1169 35.4638 29.5038 35.4638V45.6798L48.2331 27.8018Z"
                fill="url(#paint0_linear_782_18439)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_782_18439"
                    x1="4.043"
                    y1="28.2176"
                    x2="48.2331"
                    y2="28.2176"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8333F3" />
                    <stop offset="0.485532" stopColor="#5F4AF3" />
                    <stop offset="1" stopColor="#3B51A8" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export const ArrowGradientMobi: React.FC = (props) => {
    return (
        <svg width="22.5" height="19.69" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M20.0827 8.61822L11.4081 0.337891V5.06951C3.10656 5.06951 1.15625 11.022 1.15625 16.8986C3.55212 13.8309 5.671 12.1669 11.4081 12.1669V16.8986L20.0827 8.61822Z"
                fill="url(#paint0_linear_46_24033)"
                stroke="url(#paint1_linear_46_24033)"
                strokeWidth="0.647059"
                strokeLinejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_46_24033"
                    x1="-0.384277"
                    y1="8.81079"
                    x2="20.0827"
                    y2="8.81079"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8333F3" />
                    <stop offset="0.485532" stopColor="#5F4AF3" />
                    <stop offset="1" stopColor="#3B51A8" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_46_24033"
                    x1="-0.384277"
                    y1="8.81079"
                    x2="20.0827"
                    y2="8.81079"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8333F3" />
                    <stop offset="0.485532" stopColor="#5F4AF3" />
                    <stop offset="1" stopColor="#3B51A8" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export const ArrowWhiteMobi: React.FC = (props) => {
    return (
        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M23.5 10.8438L13.1875 1V6.625C3.31856 6.625 1 13.7014 1 20.6875C3.84824 17.0406 6.36719 15.0625 13.1875 15.0625V20.6875L23.5 10.8438Z"
                fill="white"
                stroke="white"
                stroke-width="0.814815"
                stroke-linejoin="round"
            />
        </svg>
    )
}
