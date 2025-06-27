'use client'
import React, { useEffect, useRef, useState } from 'react'
import { content } from './contentProfessionsDesktop/content'
import ItemProfessionsInCompanyDesktop from './ItemProfessionsInCompanyDesktop/ItemProfessionsInCompanyDesktop'

const InternshipProfessionsDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [scrollbarWidth, setScrollbarWidth] = useState(0)

    const calculateScrollbarWidth = () => {
        if (!contentRef.current || !scrollbarRef.current) return 0
        const visibleContentWidth = contentRef.current.offsetWidth
        const visibleScrollBarWidth = scrollbarRef.current.offsetWidth
        return contentRef.current.scrollWidth - (visibleContentWidth - visibleScrollBarWidth)
    }

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

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current && scrollbarRef.current) {
                const calculatedScrollbarWidth = calculateScrollbarWidth()
                setScrollbarWidth(calculatedScrollbarWidth)
            }
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(16px,_1.3vw,_25px)] overflow-x-scroll"
            >
                {content.map((item) => (
                    <ItemProfessionsInCompanyDesktop
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        onWidthChange={() => {}}
                    />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="scrollbar_custom relative mb-[120px] mx-auto mt-[92px] w-[65%] cursor-pointer overflow-x-scroll"
            >
                <div className="absolute h-2" style={{ width: `${scrollbarWidth}px` }}></div>
            </div>
        </>
    )
}

export default InternshipProfessionsDesktop
