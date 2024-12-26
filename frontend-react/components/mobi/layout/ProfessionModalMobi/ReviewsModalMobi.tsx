'use client'

import React, { useRef, useState } from 'react'
import { contentReviewsMobi } from './content'
import ItemReviewsMobi from './ItemReviewsMobi'

const ReviewsModalMobi: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [itemWidth, setItemWidth] = useState<number>(0)

    const contentWidth = contentRef.current?.scrollWidth

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

    return (
        <div>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="flex gap-2 overflow-x-scroll no-scrollbar_custom select-none"
            >
                {contentReviewsMobi.map((item) => (
                    <ItemReviewsMobi
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
                className="relative h-2 w-[97%] mx-auto mt-6 sm_s:mt-5 sm:mt-5 overflow-x-scroll scrollbar_custom cursor-pointer"
            >
                <div className="h-full" style={{ width: `${contentWidth}px` }}></div>
            </div>
        </div>
    )
}

export default ReviewsModalMobi
