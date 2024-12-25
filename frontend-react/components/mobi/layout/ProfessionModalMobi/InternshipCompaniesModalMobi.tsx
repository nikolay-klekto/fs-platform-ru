'use client'

import React, { useRef, useState } from 'react'
import { contentInternshipCompaniesMobi } from './content'
import ItemCompaniesMobi from './ItemCompaniesMobi'

const InternshipCompaniesModalMobi: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [itemWidth, setItemWidth] = useState<number>(0)

    const gapWidth = 8
    const contentWidth =
        contentInternshipCompaniesMobi.length * itemWidth + (contentInternshipCompaniesMobi.length - 1) * gapWidth

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
                className="pl-3 flex gap-2 overflow-x-scroll no-scrollbar_custom select-none"
            >
                {contentInternshipCompaniesMobi.map((item) => (
                    <ItemCompaniesMobi key={item.id} image={item.image} onWidthChange={setItemWidth} />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="relative h-2 w-[93.6%] mx-auto mt-6 sm_s:mt-5 sm:mt-5 overflow-x-scroll scrollbar_custom cursor-pointer"
            >
                <div className="h-full" style={{ width: `${contentWidth}px` }}></div>
            </div>
        </div>
    )
}

export default InternshipCompaniesModalMobi
