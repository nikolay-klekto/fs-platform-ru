import React from 'react'
import Link from 'next/link'
interface PropsTitle {
    title: string
    href: string
}

const TitleDesktop: React.FC<PropsTitle> = ({ title, href }) => {
    return (
        <div className="relative inline-block">
            <h2 className="text-[10rem] 4xl:text-[8rem] 3xl:text-[7.5rem] 2xl:text-[6.5rem] leading-none text-white opacity-[0.030]">
                {title}
            </h2>
            <Link href={href} className="absolute bottom-[7%] left-[1%] text-white hover:text-gradient_desktop_custom">
                <h4 className="uppercase text-35xl 4xl:text-27xl 3xl:text-25xl 2xl:text-21xl leading-none">{title}</h4>
            </Link>
        </div>
    )
}
export default TitleDesktop
