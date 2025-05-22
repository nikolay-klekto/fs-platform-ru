'use client'

import TitleMobi from '@/components/mobi/shared/TitleMobi'
import { contentCompaniesMobi } from './contentCompaniesSectionMobi/content'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'

interface IItemCompanies {
    image: {
        src: string
        alt: string
        width: number
        height: number
    }
    onWidthChange: (width: number) => void
}

const ItemCompaniesMobi: React.FC<IItemCompanies> = ({ image, onWidthChange }) => {
    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateWidth = () => {
            if (itemRef.current) {
                onWidthChange(itemRef.current.offsetWidth)
                console.log('itemRef ', itemRef)
            }
        }

        updateWidth()
        window.addEventListener('resize', updateWidth)

        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    return (
        <div
            ref={itemRef}
            className="sm_s:[99px] sm_s:h-[38px] sm:[99px] flex h-[45px] w-[116px] shrink-0 items-center justify-center rounded-[16px] border-2 border-[#878797] sm:h-[38px] "
        >
            <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
        </div>
    )
}

const CompaniesSectionMobi: React.FC = () => {
    return (
        <section className="flex max-w-full flex-col gap-4 px-[15px] pb-[60px] sm:gap-[15px] sm:pt-[15px]">
            <TitleMobi title="Компании" href="/companies" />
            <div className="scrollbar_custom mx-auto mb-[20px] flex w-full gap-2 overflow-y-hidden overflow-x-scroll py-[20px]">
                {contentCompaniesMobi.map((item) => (
                    <ItemCompaniesMobi key={item.id} image={item.image} onWidthChange={() => {}} />
                ))}
            </div>
        </section>
    )
}

export default CompaniesSectionMobi
