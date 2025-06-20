'use client'


import React, { useRef } from 'react'
import { contentCompaniesMobi } from './content'
import ItemCompaniesMobi from './ItemCompaniesMobi'

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
