'use client'

import React, { useRef, useEffect, useState } from 'react'
import { content } from './contentProfessionReviewsDesktop/content'
import ItemProfessionReviewsDesktop from './ItemProfessionReviewsDesktop/ItemProfessionReviewsDesktop'

const ReviewsDesktop: React.FC = () => {
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
        <div>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(20px,_1.6vw,_32px)] overflow-x-scroll "
            >
                {content.map((item) => (
                    <ItemProfessionReviewsDesktop
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        onWidthChange={() => {}}
                    />
                ))}
                <div className="w-[58px] shrink-0"> </div>
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="scrollbar_custom relative mx-auto mb-[85px] mt-[58px] w-[65%] cursor-pointer overflow-x-scroll"
            >
                <div
                    className="absolute h-2 min-w-[1000px] bg-transparent"
                    style={{ width: `${scrollbarWidth}px` }}
                ></div>
            </div>
        </div>
    )
}

export default ReviewsDesktop
