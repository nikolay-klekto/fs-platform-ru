'use client'

import React, { useRef, useEffect } from 'react'
import { AvatarIconMobi } from '@/components/assets/iconsMobi'

interface ItemReviewsMobiProps {
    question: string
    answer: string
    onWidthChange: (width: number) => void
}

const ItemReviewsMobi: React.FC<ItemReviewsMobiProps> = ({ question, answer, onWidthChange }) => {
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
        <div ref={itemRef} className="flex flex-shrink-0">
            <div className="mr-1 max-w-[40px] sm_s:max-w-[34px] sm:max-w-[32px]">
                <AvatarIconMobi className="w-full h-auto" />
            </div>
            <div className="max-w-[246px]">
                <div className="border-[1.28px] border-[#878797] rounded-[16px] p-2">
                    <p className="text12px_mobi text-white font-medium mb-2">{question}</p>
                    <p className="text-xs text-[#878797] font-medium">{answer}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemReviewsMobi
