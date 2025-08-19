'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { content } from './ItemProfessionsInCompanyDesktop/contentProfessionsDesktop/content'
import ItemProfessionsInCompanyDesktop from './ItemProfessionsInCompanyDesktop/ItemProfessionsInCompanyDesktop'

const InternshipProfessionsDesktop: React.FC = () => {
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
                className="no-scrollbar_custom container flex select-none gap-[clamp(16px,2.03vw,39px)] overflow-x-scroll pl-0"
            >
                {content.map((item) => (
                    <Link href={`/profession`} key={item.id}>
                        <ItemProfessionsInCompanyDesktop
                            key={item.id}
                            image={item.image}
                            name={item.name}
                            onWidthChange={() => {}}
                        />
                    </Link>
                ))}
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

export default InternshipProfessionsDesktop
