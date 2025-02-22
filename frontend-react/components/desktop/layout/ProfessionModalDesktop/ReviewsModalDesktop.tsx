'use client'

import React, { useRef } from 'react'
import { contentReviewsDesktop } from './content'
import ItemReviewsDesktop from './ItemReviewsDesktop'

const ReviewsModalDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)

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

    const calculateScrollbarWidth = () => {
        if (!contentRef.current || !scrollbarRef.current) return 0
        const visibleContentWidth = contentRef.current.offsetWidth
        const visibleScrollBarWidth = scrollbarRef.current.offsetWidth
        return contentRef.current.scrollWidth - (visibleContentWidth - visibleScrollBarWidth)
    }

    return (
        <div>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(20px,_1.6vw,_32px)] overflow-x-scroll"
            >
                {contentReviewsDesktop.map((item) => (
                    <ItemReviewsDesktop
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
                className="scrollbar_custom relative mx-auto mt-[clamp(25px,_2vw,_40px)] h-[14px] w-[65%] cursor-pointer overflow-x-scroll"
            >
                <div className="absolute h-2" style={{ width: `${calculateScrollbarWidth()}px` }}></div>
            </div>
        </div>
    )
}

export default ReviewsModalDesktop
