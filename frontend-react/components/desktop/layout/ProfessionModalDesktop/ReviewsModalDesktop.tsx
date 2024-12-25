'use client'

import React, { useRef, useState } from 'react'
import { contentReviewsDesktop } from './content'
import ItemReviewsDesktop from './ItemReviewsDesktop'

const ReviewsModalDesktop: React.FC = () => {
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

    const scrollbarWidth = `${((contentReviewsDesktop.length * itemWidth) / (contentRef.current?.offsetWidth || window.innerWidth)) * 150}%`
    console.log('scrollbarWidth: ', scrollbarWidth)

    return (
        <div>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="w-full flex gap-[clamp(20px,_1.6vw,_32px)] overflow-x-scroll no-scrollbar_custom select-none"
            >
                {contentReviewsDesktop.map((item) => (
                    <ItemReviewsDesktop
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        onWidthChange={setItemWidth}
                    />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="relative h-[14px] w-[65%] mx-auto mt-[clamp(25px,_2vw,_40px)] overflow-x-scroll scrollbar_custom cursor-pointer"
            >
                <div className="absolute h-2" style={{ width: scrollbarWidth }}></div>
            </div>
        </div>
    )
}

export default ReviewsModalDesktop
