'use client'

import React, { useRef } from 'react'
import { contentInternshipCompaniesDesktop } from './data/content'
import ItemCompaniesDesktop from './ItemCompaniesDesktop'
import useScrollbarSync from '@/hooks/useScrollbarSync'

const InternshipCompaniesModalDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const { scrollContentWidth } = useScrollbarSync(contentRef, scrollbarRef)

    return (
        <>
            <div
                ref={contentRef}
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(16px,_1.3vw,_25px)] overflow-x-scroll"
            >
                {contentInternshipCompaniesDesktop.map((item) => (
                    <ItemCompaniesDesktop
                        key={item.id}
                        image={item.image}
                        price={item.price}
                        onWidthChange={() => { }}
                    />
                ))}
            </div>
            <div className=" mt-[clamp(25px,_2vw,_40px)] w-full">
                <div
                    ref={scrollbarRef}
                    className="scrollbar_custom relative mx-auto h-2 w-[65%] cursor-pointer overflow-x-scroll"
                >
                    <div className="h-full" style={{ width: `${scrollContentWidth}px` }}></div>
                </div>
            </div>
        </>
    )
}

export default InternshipCompaniesModalDesktop
