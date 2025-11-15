'use client'

import React, { useRef } from 'react'
import ItemReviewsMobi from './ItemReviewsMobi'
import useScrollbarSync from '@/hooks/useScrollbarSync'

interface IReviewsModalMobi {
    feedback: {
        id: number
        question: string
        answer: string
    }[]
}

const ReviewsModalMobi: React.FC<IReviewsModalMobi> = ({feedback}) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const { scrollContentWidth } = useScrollbarSync(contentRef, scrollbarRef)

    return (
        <div>
            <div
                ref={contentRef}
                className="no-scrollbar_custom flex select-none gap-2 overflow-x-scroll"
            >
                {feedback.map((item) => (
                    <ItemReviewsMobi
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        onWidthChange={() => {}}
                    />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                className="sm_s:mt-5 scrollbar_custom relative mt-6 h-2 w-[97%] overflow-x-scroll sm:mt-5"
            >
                <div className="h-full" style={{ width: `${scrollContentWidth}px` }}></div>
            </div>
        </div>
    )
}

export default ReviewsModalMobi
