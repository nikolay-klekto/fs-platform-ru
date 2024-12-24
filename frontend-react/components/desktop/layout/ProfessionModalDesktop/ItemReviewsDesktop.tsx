'use client'

import React, { useRef, useEffect } from 'react'
import { AvatarIconDesktop } from '@/components/assets/icons'

interface ItemReviewsDesktopProps {
    question: string
    answer: string
    onWidthChange: (width: number) => void
}

const ItemReviewsDesktop: React.FC<ItemReviewsDesktopProps> = ({ question, answer, onWidthChange }) => {
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
            <div className="mr-[9px] max-w-[60px] 3xl:max-w-[50px]">
                <AvatarIconDesktop className="w-full h-auto" />
            </div>
            <div className="w-[clamp(251px,_20vw,_389px)]">
                <div className="border-2 border-[#878797] rounded-[25px] p-[clamp(9px,_0.7vw,_15px)]">
                    <p className="text18px_modal_desktop text-white mb-[clamp(6px,_0.5vw,_10px)]">{question}</p>
                    <p className="text15px_desktop text-[#878797]">{answer}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemReviewsDesktop
