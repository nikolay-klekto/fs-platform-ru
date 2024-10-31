import React from 'react'

export const TestIcon: React.FC = (props) => {
    return (
        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
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

export const ForwardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width={props.width || '29'}
            height={props.height || '26'}
            viewBox="0 0 31 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M30.125 13.5L16.7188 0.703125V8.01562C3.88912 8.01562 0.875 17.2149 0.875 26.2969C4.57771 21.5559 7.85234 18.9844 16.7188 18.9844V26.2969L30.125 13.5Z"
                fill="url(#paint0_linear_847_15423)"
                stroke="url(#paint1_linear_847_15423)"
                stroke-linejoin="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_847_15423"
                    x1="-1.50581"
                    y1="13.7976"
                    x2="30.125"
                    y2="13.7976"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#8333F3" />
                    <stop offset="0.485532" stop-color="#5F4AF3" />
                    <stop offset="1" stop-color="#3B51A8" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_847_15423"
                    x1="-1.50581"
                    y1="13.7976"
                    x2="30.125"
                    y2="13.7976"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#8333F3" />
                    <stop offset="0.485532" stop-color="#5F4AF3" />
                    <stop offset="1" stop-color="#3B51A8" />
                </linearGradient>
            </defs>
        </svg>
    )
}
