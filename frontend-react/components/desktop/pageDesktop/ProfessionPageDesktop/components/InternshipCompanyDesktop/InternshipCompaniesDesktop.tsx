'use client'

import React, { useRef, useEffect, useState } from 'react'
import { content } from './contentInternshipCompanyDesktop/content'
import ItemInternshipCompaniesDesktop from './ItemInternshipCompaniesDesktop/ItemCompaniesDesktop'

const InternshipCompaniesDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [scrollbarWidth, setScrollbarWidth] = useState(0)

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
        const calculateScrollbarWidth = () => {
            if (!contentRef.current || !scrollbarRef.current) return 0
            const visibleContentWidth = contentRef.current.offsetWidth
            const visibleScrollBarWidth = scrollbarRef.current.offsetWidth
            return contentRef.current.scrollWidth - (visibleContentWidth - visibleScrollBarWidth)
        }

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

    useEffect(() => {
        const scrollbar = scrollbarRef.current
        if (!scrollbar) return
        const timer = setInterval(() => {
            scrollbar.scrollLeft += 1
            scrollbar.scrollLeft -= 1
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(25px,_2.6vw,_50px)] overflow-x-scroll"
            >
                {content.map((item) => (
                    <ItemInternshipCompaniesDesktop
                        key={item.id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        industry={item.industry}
                        onWidthChange={() => {}}
                    />
                ))}
                <div className="w-[58px] shrink-0"> </div>
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="scrollbar_custom relative mx-auto mb-[192px] mt-[77px] w-[65%] cursor-pointer overflow-x-scroll 2xl:mb-[120px] 3xl:mb-[160px]"
            >
                <div
                    className="absolute h-2 min-w-[1000px] bg-transparent"
                    style={{ width: `${scrollbarWidth}px` }}
                ></div>
            </div>
        </>
    )
}

export default InternshipCompaniesDesktop
