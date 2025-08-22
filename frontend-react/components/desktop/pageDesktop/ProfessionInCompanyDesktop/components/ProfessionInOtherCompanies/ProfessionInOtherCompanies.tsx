'use client'
import React, { useEffect, useRef, useState } from 'react'
import { content } from './contentProfessionInOtherCompanies/content'

const ProfessionInOtherCompanies: React.FC = () => {
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
                className="no-scrollbar_custom flex w-full select-none gap-[20px] overflow-x-scroll pl-0 pr-[60px]
                "
            >
                {content.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-center"
                        style={{
                            width: '316px',
                            height: '123px',
                            border: '3.5px solid #878797',
                            borderRadius: '50px',
                        }}
                    >
                        <img src={item.logo.src} alt={item.logo.alt} className="max-w-full max-h-full object-contain" />
                    </div>
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

export default ProfessionInOtherCompanies
