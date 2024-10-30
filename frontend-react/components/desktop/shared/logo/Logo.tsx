import React from 'react'

import { LogoIcon } from '@/components/asssets/icons'

interface LogoProps {
    width?: number
    height?: number
    textSize?: string
}

const Logo: React.FC<LogoProps> = ({ width, height, textSize }) => {
    return (
        <div className="flex flex-col justify-center items-center border border-red-500 border-solid">
            <LogoIcon width={width} height={height} />
            <p className={`text-white text-${textSize} font-semibold whitespace-nowrap`}>FUN SCRUT</p>
        </div>
    )
}

export default Logo
