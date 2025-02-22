'use client'

import React, { useRef } from 'react'
import { contentInternshipCompaniesDesktop } from './content'
import ItemCompaniesDesktop from './ItemCompaniesDesktop'

const InternshipCompaniesModalDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)

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
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(16px,_1.3vw,_25px)] overflow-x-scroll"
            >
                {contentInternshipCompaniesDesktop.map((item) => (
                    <ItemCompaniesDesktop
                        key={item.id}
                        image={item.image}
                        price={item.price}
                        onWidthChange={() => {}}
                    />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="scrollbar_custom relative mx-auto mt-[clamp(25px,_2vw,_40px)] h-2 w-[65%] cursor-pointer overflow-x-scroll"
            >
                <div className="h-full" style={{ width: `${calculateScrollbarWidth()}px` }}></div>
            </div>
        </>
    )
}

export default InternshipCompaniesModalDesktop
