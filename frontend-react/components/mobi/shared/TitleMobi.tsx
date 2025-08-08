import React from 'react'
import Link from 'next/link'
interface ITitle {
    title: string
    href: string
}

const TitleMobi: React.FC<ITitle> = ({ title, href }) => {
    return (
        <Link href={href}>
            <h2 className="text32px_mobi font-medium uppercase text-white">{title}</h2>
        </Link>
    )
}
export default TitleMobi
