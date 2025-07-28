import React from 'react'
import Link from 'next/link'

interface ITitle {
    title: string
    href?: string
}

const TitleDesktop: React.FC<ITitle> = ({ title, href }) => {
    const shadowTitle = (
        <h2
            className="4xl:text-[7.5rem] 3xl:text-[7rem] absolute bottom-0 z-0 text-[160px] font-semibold uppercase leading-none text-white opacity-[2%] 2xl:text-[96px]"
            style={{
                lineHeight: 0.76,
                marginLeft: '-0.1em',
            }}
        >
            {title}
        </h2>
    )

    const mainTitle = (
        <h2
            className={`4xl:text-27xl 3xl:text-25xl 2xl:text-21xl ${
                href ? 'hover:bg-gradient-desktop hover:bg-clip-text hover:text-transparent' : ''
            } relative z-10 w-fit text-[80px] font-medium uppercase leading-none text-white`}
            style={{
                lineHeight: 0.8,
                marginLeft: '-0.1em',
            }}
        >
            {title}
        </h2>
    )

    return (
        <div className="relative">
            {shadowTitle}
            {href ? <Link href={href}>{mainTitle}</Link> : mainTitle}
        </div>
    )
}

export default TitleDesktop
