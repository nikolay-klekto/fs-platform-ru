'use client'

import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { content } from './contentCompanyAdvantageDesktop/content'
import ItemCompanyAdvantageDesktop from './ItemCompanyAdvantageDesktop/ItemCompanyAdvantageDesktop'

const CompanyAdvantageDesktop: React.FC = () => {
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
            requestAnimationFrame(() => {
                const calculated = calculateScrollbarWidth()
                setScrollbarWidth(calculated)
            })
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
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(20px,_1.6vw,_32px)] overflow-x-scroll"
            >
                {content.map((item) => (
                    <ItemCompanyAdvantageDesktop
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        onWidthChange={() => {}}
                    />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="scrollbar_custom relative mx-auto mb-[132px] mt-[52px] w-[65%] cursor-pointer overflow-x-scroll"
            >
                <div
                    className="absolute h-2 min-w-[1000px] bg-transparent"
                    style={{ width: `${scrollbarWidth}px` }}
                ></div>
            </div>
        </>
    )
}

export default CompanyAdvantageDesktop
