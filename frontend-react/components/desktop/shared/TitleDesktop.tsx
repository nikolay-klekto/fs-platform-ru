import React from 'react'
import Link from 'next/link'
interface PropsTitleDesktop {
    title: string
    href: string
}

const TitleDesktop: React.FC<PropsTitleDesktop> = ({ title, href }) => {
    return (
        <div className="relative">
            <h2 className="4xl:text-[7.5rem] 3xl:bottom-[-8px] 3xl:text-[7rem] absolute bottom-[-7px] left-[-15px] z-0 text-[160px] font-semibold uppercase leading-none text-white opacity-[2%] 2xl:bottom-[-4px] 2xl:text-[96px]">
                {title}
            </h2>
            <Link href={href}>
                <h2 className="4xl:text-27xl 3xl:text-25xl 2xl:text-21xl hover:bg-gradient-desktop relative left-[-7px] z-10 text-[80px] font-medium uppercase leading-none text-white hover:bg-clip-text hover:text-transparent">
                    {title}
                </h2>
            </Link>
        </div>
    )
}
export default TitleDesktop
