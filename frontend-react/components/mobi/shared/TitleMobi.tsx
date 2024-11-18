import React from 'react'
import Link from 'next/link'
interface PropsTitleMobi {
    title: string
    href: string
}

//исправленный под макет
const TitleMobi: React.FC<PropsTitleMobi> = ({ title, href }) => {
    return (
        <Link href={href}>
            <h2 className="md:text-11xl sm_xl:text-10xl sm_l:text-9xl sm_s:text-8xl text-[32px] font-medium uppercase text-white sm:text-8xl">
                {title}
            </h2>
        </Link>
    )
}
export default TitleMobi

/*
исходный вариант, несоответствует макету
const TitleMobi: React.FC<PropsTitleMobi> = ({ title, href }) => {
    return (
        <Link href={href} className="text-white hover:text-gradient_mobi_custom">
            <h2 className="text-11xl sm_l:text-8xl sm_s:text-8xl sm:text-8xl">{title}</h2>
        </Link>
    )
}
export default TitleMobi
*/
