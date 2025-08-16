'use client'

import React, { useRef } from 'react'
import { contentReviewsDesktop } from './data/content'
import ItemReviewsDesktop from './ItemReviewsDesktop'
import useScrollbarSync from '@/hooks/useScrollbarSync'

const ReviewsModalDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const { scrollContentWidth } = useScrollbarSync(contentRef, scrollbarRef)

    return (
        <div>
            <div
                ref={contentRef}
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(20px,_1.6vw,_32px)] overflow-x-scroll"
            >
                {contentReviewsDesktop.map((item) => (
                    <ItemReviewsDesktop
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        onWidthChange={() => { }}
                    />
                ))}
            </div>
            <div className="mt-[clamp(25px,_2vw,_40px)] w-full">
                <div
                    ref={scrollbarRef}
                    className="scrollbar_custom relative mx-auto h-[14px] w-[65%] cursor-pointer overflow-x-scroll"
                >
                    <div className="absolute h-2" style={{ width: `${scrollContentWidth}px` }}></div>
                </div>
            </div>
        </div>
    )
}

export default ReviewsModalDesktop
