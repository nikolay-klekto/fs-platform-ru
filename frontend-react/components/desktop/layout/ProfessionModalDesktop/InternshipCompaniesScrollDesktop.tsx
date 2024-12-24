'use client'

import React, { useRef, useState } from 'react'
import { contentInternshipCompanies } from './content'
import ItemCompaniesDesktop from './ItemCompaniesDesktop'

const InternshipCompaniesScrollDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [itemWidth, setItemWidth] = useState<number>(0)
    console.log('itemWidth ', itemWidth)
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

    const scrollbarWidth = `${((contentInternshipCompanies.length * itemWidth) / (contentRef.current?.offsetWidth || window.innerWidth)) * 150}%`
    console.log('scrollbarWidth: ', scrollbarWidth)

    /*const visibleWidth = contentRef.current?.offsetWidth || window.innerWidth
    console.log('visibleWidth ', visibleWidth)
    const totalContentWidth = contentInternshipCompanies.length * itemWidth
    console.log('totalContentWidth ', totalContentWidth)
    const scrollbarWidth = `${(visibleWidth / totalContentWidth) * 100}%`
    console.log('scrollbarWidth: ', scrollbarWidth)*/

    return (
        <div className="border border-yellow-500">
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="w-full flex gap-[clamp(16px,_1.3vw,_25px)] overflow-x-scroll no-scrollbar_custom select-none border border-red-500"
            >
                {contentInternshipCompanies.map((item) => (
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
                className="relative h-[14px] w-[65%] mx-auto mt-[clamp(25px,_2vw,_40px)] overflow-x-scroll scrollbar_custom cursor-pointer border border-red-500"
            >
                <div className="absolute h-2 border border-red-500" style={{ width: scrollbarWidth }}></div>
            </div>
        </div>
    )
}

export default InternshipCompaniesScrollDesktop
