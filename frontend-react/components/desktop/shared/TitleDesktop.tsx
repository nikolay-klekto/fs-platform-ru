import React from 'react'
import Link from 'next/link'
interface PropsTitle {
    title: string
    href: string
}

const TitleDesktop: React.FC<PropsTitle> = ({ title, href }) => {
    return (
        <div className="relative inline-block">
            <h2 className=" px-[47px] text-[160px] 4xl:text-[123px] 3xl:text-[114px] 2xl:text-[96px] xl:text-[72px] lg:text-[50px] m-0 leading-none text-white opacity-[0.030]">
                {title}
            </h2>
            <Link
                href={href}
                className="absolute bottom-[7%] left-[1%] px-[47px] bg-gradient-desktop hover:bg-gradient-desktop-hover bg-clip-text text-transparent"
            >
                <h4 className="uppercase text-35xl 4xl:text-27xl 3xl:text-25xl 2xl:text-21xl xl:text-16xl lg:text-11xl m-0 leading-none">
                    {title}
                </h4>
            </Link>
        </div>
    )
}
export default TitleDesktop
