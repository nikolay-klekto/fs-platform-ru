import React from 'react'
import Link from 'next/link'
interface ITitle {
    title: string
    href: string
}

const TitleMobi: React.FC<ITitle> = ({ title, href }) => {
    return (
        <Link href={href}>
            <h2 className="md:text-11xl sm_xl:text-10xl sm_l:text-9xl sm_s:text-8xl text-[32px] font-medium uppercase text-white sm:text-8xl">
                {title}
            </h2>
        </Link>
    )
}
export default TitleMobi
