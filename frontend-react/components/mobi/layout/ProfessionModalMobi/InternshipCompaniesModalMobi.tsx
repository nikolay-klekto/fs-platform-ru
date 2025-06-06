'use client'

import React, { useRef, useEffect } from 'react'
import { contentCompaniesMobi } from './content'
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

const InternshipCompaniesModalMobi: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)

    const contentWidth = contentRef.current?.scrollWidth

    const handleScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            scrollbarRef.current.scrollLeft = contentRef.current.scrollLeft
        }
    }

    const handleScrollbarScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            contentRef.current.scrollLeft = scrollbarRef.current.scrollLeft
        }
    }

    return (
        <div>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="no-scrollbar_custom flex select-none gap-2 overflow-x-scroll"
            >
                {contentCompaniesMobi.map((item) => (
                    <ItemCompaniesMobi key={item.id} image={item.image} onWidthChange={() => {}} />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="sm_s:mt-5 scrollbar_custom relative mt-6 h-2 w-[97%] cursor-pointer overflow-x-scroll sm:mt-5"
            >
                <div className="h-full" style={{ width: `${contentWidth}px` }}></div>
            </div>
        </div>
    )
}

export default InternshipCompaniesModalMobi
