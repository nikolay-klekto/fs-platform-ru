import React from 'react'
import Link from 'next/link'
interface PropsTitle {
    title: string
    href: string
}

const TitleDesktop: React.FC<PropsTitle> = ({ title, href }) => {
    return (
        <div className="relative mb-[80px] px-[47px]">
            <h2 className="text-[160px] text-white opacity-[0.030]">{title}</h2>
            <Link
                href={href}
                className="absolute bottom-[37px] left-[57px] bg-gradient-desktop hover:bg-gradient-desktop-hover bg-clip-text text-transparent"
            >
                <h4 className="text-35xl">{title}</h4>
            </Link>
        </div>
    )
}
export default TitleDesktop
