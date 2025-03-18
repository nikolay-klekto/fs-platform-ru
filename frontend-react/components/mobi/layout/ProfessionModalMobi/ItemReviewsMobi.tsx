'use client'

import React, { useRef, useEffect } from 'react'
import { AvatarIconMobi } from '@/components/assets/iconsMobi'

interface IItemReviews {
    question: string
    answer: string
    onWidthChange: (width: number) => void
}

const ItemReviewsMobi: React.FC<IItemReviews> = ({ question, answer, onWidthChange }) => {
    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const updateWidth = () => {
            if (itemRef.current) {
                onWidthChange(itemRef.current.offsetWidth)
            }
        }

        updateWidth()
        window.addEventListener('resize', updateWidth)

        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, [])

    return (
        <div ref={itemRef} className="flex shrink-0">
            <div className="sm_s:max-w-[34px] mr-1 max-w-[40px] sm:max-w-[32px]">
                <AvatarIconMobi className="h-auto w-full" />
            </div>
            <div className="max-w-[246px]">
                <div className="rounded-[16px] border-[1.28px] border-[#878797] p-2">
                    <p className="text12px_mobi mb-2 font-medium text-white">{question}</p>
                    <p className="text-xs font-medium text-[#878797]">{answer}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemReviewsMobi
