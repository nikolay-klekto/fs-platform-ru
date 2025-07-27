'use client'

import Image from 'next/image'

interface IEventSection {
    image: string
    title: string
    date: string
    adress: string
}

const ItemEventsMobi: React.FC<IEventSection> = ({ image, title, date, adress }) => {
    const [day, month] = date.split(' ')

    return (
        <div className="sm_xl:min-w-[345px] sm_xl:max-w-[345px] flex min-w-full max-w-full pb-8 md:min-w-[345px] md:max-w-[345px]">
            <div className="relative aspect-[4/3] w-full">
                <Image
                    src={image}
                    fill
                    alt={title}
                    className="pointer-events-none select-none rounded-3xl object-cover "
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent to-[#232341]" />
                <div className="absolute right-[5%] top-[4%] flex aspect-[113/100] w-[25%] flex-col items-center justify-center rounded-2xl bg-white bg-opacity-[80%]">
                    <p className="text-4xl font-semibold text-[#1f203f]">{day}</p>
                    <p className="text-base font-medium leading-[15px] text-[#878797]">{month}</p>
                </div>
                <div className="absolute bottom-3.5 left-3.5 flex max-w-[85%] flex-col items-start pr-3.5">
                    <p className="sm_l:text-4xl sm_s:text-2xl max-w-full overflow-hidden  pb-3.5 text-4xl font-semibold uppercase text-white sm:text-2xl">
                        {title}
                    </p>
                    <p className="max-w-full truncate text-base font-medium text-[#878797]">{adress}</p>
                </div>
            </div>
        </div>
    )
}
export default ItemEventsMobi
