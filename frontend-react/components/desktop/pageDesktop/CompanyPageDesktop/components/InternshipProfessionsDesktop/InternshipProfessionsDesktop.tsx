'use client'

import React, { useRef, useEffect, useState } from 'react'
import { contentInternshipProfessionsDesktop } from './contentInternshipProfessionsDesktop/content'
import ItemProfessionsDesktop from './ItemInternshipProfessionsDesktop/ItemProfessionsDesktop'

const InternshipProfessionsDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [scrollbarWidth, setScrollbarWidth] = useState(0)
    const [needsScroll, setNeedsScroll] = useState(false)

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

    const checkIfNeedsScroll = () => {
        if (!contentRef.current) return
        const scrollable = contentRef.current.scrollWidth > contentRef.current.clientWidth
        setNeedsScroll(scrollable)
    }

    useEffect(() => {
        checkIfNeedsScroll()
        window.addEventListener('resize', checkIfNeedsScroll)
        return () => window.removeEventListener('resize', checkIfNeedsScroll)
    }, [])

    useEffect(() => {
        if (needsScroll) {
            const timeout = setTimeout(() => {
                const width = calculateScrollbarWidth()
                setScrollbarWidth(width)
            }, 0)
            return () => clearTimeout(timeout)
        }
    }, [needsScroll])

    return (
        <>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="no-scrollbar_custom flex w-full select-none snap-x snap-mandatory gap-[clamp(16px,_1.3vw,_38px)] overflow-x-auto"
            >
                {contentInternshipProfessionsDesktop.map((item) => (
                    <div key={item.id} className="shrink-0 snap-start">
                        {' '}
                        <ItemProfessionsDesktop image={item.image} name={item.name} onWidthChange={() => {}} />
                    </div>
                ))}
            </div>
            {needsScroll && (
                <div
                    ref={scrollbarRef}
                    onScroll={handleScrollbarScroll}
                    className="scrollbar_custom relative ml-[314px] mr-[321px]  mt-[92px] w-[65%] cursor-pointer overflow-x-scroll"
                >
                    <div className="absolute h-2 bg-transparent" style={{ width: `${scrollbarWidth}px` }}></div>
                </div>
            )}
        </>
    )
}

export default InternshipProfessionsDesktop
