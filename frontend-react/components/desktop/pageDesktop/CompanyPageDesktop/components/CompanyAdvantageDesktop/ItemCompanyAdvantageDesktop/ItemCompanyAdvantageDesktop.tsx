'use client'

import React, { useRef, useEffect } from 'react'

interface IItemCompanyAdvantageDesktop {
    question: string
    answer: string
    onWidthChange: (width: number) => void
}

const ItemCompanyAdvantageDesktop: React.FC<IItemCompanyAdvantageDesktop> = ({ question, answer, onWidthChange }) => {
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
    }, [onWidthChange])

    return (
        <div ref={itemRef} className="flex shrink-0">
            <div className="w-[clamp(350px,_40vw,_565px)]">
                <div className="rounded-[25px] border-2 border-[#878797] p-[clamp(9px,_0.7vw,_15px)]">
                    <p className="text26px_desktop mb-[clamp(6px,_0.5vw,_10px)] text-white">{question}</p>
                    <p className="text22px_desktop text-[#878797]">{answer}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemCompanyAdvantageDesktop
