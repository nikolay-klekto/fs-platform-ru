// import React from 'react'
// import Link from 'next/link'
// interface ITitle {
//     title: string
//     href: string
// }

// const TitleDesktop: React.FC<ITitle> = ({ title, href }) => {
//     return (
//         <div className="relative">
//             <h2
//                 className="4xl:text-[7.5rem] 3xl:text-[7rem] absolute bottom-0 z-0 text-[160px] font-semibold uppercase leading-none text-white opacity-[2%] 2xl:text-[96px]"
//                 style={{
//                     lineHeight: 0.76,
//                     marginLeft: '-0.1em',
//                 }}
//             >
//                 {title}
//             </h2>
//             <Link href={href}>
//                 <h2
//                     className="4xl:text-27xl 3xl:text-25xl 2xl:text-21xl hover:bg-gradient-desktop relative z-10 w-fit text-[80px] font-medium uppercase leading-none text-white hover:bg-clip-text hover:text-transparent"
//                     style={{
//                         lineHeight: 0.8,
//                         marginLeft: '-0.1em',
//                     }}
//                 >
//                     {title}
//                 </h2>
//             </Link>
//         </div>
//     )
// }
// export default TitleDesktop
import React from 'react'
import Link from 'next/link'

interface ITitle {
    title: string
    href?: string // Делаем href опциональным
}

const TitleDesktop: React.FC<ITitle> = ({ title, href }) => {
    // Если href есть, то выводим заголовок как ссылку, иначе просто обычный текст
    if (href) {
        return (
            <div className="relative">
                <h2
                    className="4xl:text-[7.5rem] 3xl:text-[7rem] absolute bottom-0 z-0 text-[160px] font-semibold uppercase leading-none text-white opacity-[2%] 2xl:text-[96px]"
                    style={{
                        lineHeight: 0.76,
                        marginLeft: '-0.1em',
                    }}
                >
                    {title}
                </h2>
                <Link href={href}>
                    <h2
                        className="4xl:text-27xl 3xl:text-25xl 2xl:text-21xl hover:bg-gradient-desktop relative z-10 w-fit text-[80px] font-medium uppercase leading-none text-white hover:bg-clip-text hover:text-transparent"
                        style={{
                            lineHeight: 0.8,
                            marginLeft: '-0.1em',
                        }}
                    >
                        {title}
                    </h2>
                </Link>
            </div>
        )
    }

    // Если href нет, то это просто обычный заголовок
    return (
        <div className="relative">
            <h2
                className="4xl:text-[7.5rem] 3xl:text-[7rem] absolute bottom-0 z-0 text-[160px] font-semibold uppercase leading-none text-white opacity-[2%] 2xl:text-[96px]"
                style={{
                    lineHeight: 0.76,
                    marginLeft: '-0.1em',
                }}
            >
                {title}
            </h2>
            <h2
                className="4xl:text-27xl 3xl:text-25xl 2xl:text-21xl relative z-10 w-fit text-[80px] font-medium uppercase leading-none text-white"
                style={{
                    lineHeight: 0.8,
                    marginLeft: '-0.1em',
                }}
            >
                {title}
            </h2>
        </div>
    )
}

export default TitleDesktop
