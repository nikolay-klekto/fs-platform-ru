import React from 'react'
import Link from 'next/link'
interface PropsTitleMobi {
    title: string
    href: string
}

const TitleMobi: React.FC<PropsTitleMobi> = ({ title, href }) => {
    return (
        <Link href={href} className="text-white hover:text-gradient_mobi_custom">
            <h2 className="text-11xl sm_l:text-8xl sm_s:text-8xl sm:text-8xl">{title}</h2>
        </Link>
    )
}
export default TitleMobi
