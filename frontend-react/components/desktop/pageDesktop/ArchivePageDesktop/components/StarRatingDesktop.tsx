'use client'

import React, { useState, useCallback } from 'react'
import { StarIconDesktop } from '@/components/assets/iconsDesktop'

export interface IStarRating {
    rating?: number
    onRate?: (newRating: number) => void
}

const TOTAL_STARS = 5

const StarRatingDesktop: React.FC<IStarRating> = ({ rating = 0, onRate }) => {
    const [hovered, setHovered] = useState<number | null>(null)

    const handleMouseEnter = useCallback((starIndex: number) => setHovered(starIndex), [])
    const handleMouseLeave = useCallback(() => setHovered(null), [])
    const handleClick = useCallback(
        (star: number) => {
            onRate?.(star)
        },
        [onRate],
    )

    return (
        <div className="flex gap-[5px]" onMouseLeave={handleMouseLeave}>
            {Array.from({ length: TOTAL_STARS }).map((_, index) => {
                const shouldFill = hovered !== null ? index < hovered : index < rating
                const starNumber = index + 1
                return (
                    <button
                        key={starNumber}
                        type="button"
                        className="focus:outline-none cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(starNumber)}
                        onClick={() => handleClick(starNumber)}
                        aria-label={`Поставить ${starNumber} звёзд`}
                    >
                        <StarIconDesktop filled={shouldFill} />
                    </button>
                )
            })}
        </div>
    )
}

export default StarRatingDesktop
