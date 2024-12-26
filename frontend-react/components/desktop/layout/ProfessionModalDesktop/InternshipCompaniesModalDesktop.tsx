'use client'

import React, { useRef, useState } from 'react'
import { contentInternshipCompaniesDesktop } from './content'
import ItemCompaniesDesktop from './ItemCompaniesDesktop'

const InternshipCompaniesModalDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [itemWidth, setItemWidth] = useState<number>(0)

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

    const calculateScrollbarWidth = () => {
        if (!contentRef.current || !scrollbarRef.current) return 0
        const visibleContentWidth = contentRef.current.offsetWidth
        const visibleScrollBarWidth = scrollbarRef.current.offsetWidth
        return contentRef.current.scrollWidth - (visibleContentWidth - visibleScrollBarWidth)
    }

    return (
        <>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="w-full flex gap-[clamp(16px,_1.3vw,_25px)] overflow-x-scroll no-scrollbar_custom select-none"
            >
                {contentInternshipCompaniesDesktop.map((item) => (
                    <ItemCompaniesDesktop
                        key={item.id}
                        image={item.image}
                        price={item.price}
                        onWidthChange={setItemWidth}
                    />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="relative h-2 w-[65%] mx-auto mt-[clamp(25px,_2vw,_40px)] overflow-x-scroll scrollbar_custom cursor-pointer"
            >
                <div className="h-full" style={{ width: `${calculateScrollbarWidth()}px` }}></div>
            </div>
        </>
    )
}

export default InternshipCompaniesModalDesktop
