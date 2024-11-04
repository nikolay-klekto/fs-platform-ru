import React from 'react'
import Link from 'next/link'
interface PropsTitleMobi {
    title: string
    href: string
}

const TitleMobi: React.FC<PropsTitleMobi> = ({ title, href }) => {
    return (
        <Link href={href} className="bg-gradient-desktop hover:bg-gradient-desktop-hover bg-clip-text text-transparent">
            <h2 className="text-11xl md:text-11xl sm_xl:text-10xl sm_l:text-9xl sm:text-8xl">{title}</h2>
        </Link>
    )
}
export default TitleMobi
