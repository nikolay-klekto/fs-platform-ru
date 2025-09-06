'use client'

import React, { useCallback } from 'react'
import { StarIconMobi } from '@/components/assets/iconsMobi'

export interface IStarRating {
    rating?: number
    onRate?: (newRating: number) => void
}

const TOTAL_STARS = 5

const StarRatingMobi: React.FC<IStarRating> = ({ rating = 0, onRate }) => {
    const handleClick = useCallback(
        (star: number) => {
            onRate?.(star)
        },
        [onRate],
    )

    return (
        <div className="flex gap-[2px]">
            {Array.from({ length: TOTAL_STARS }).map((_, index) => {
                const starNumber = index + 1
                const shouldFill = starNumber <= rating
                return (
                    <button
                        key={starNumber}
                        type="button"
                        className="focus:outline-none"
                        onClick={() => handleClick(starNumber)}
                        aria-label={`Поставить ${starNumber} ${starNumber === 1 ? 'звезду' : starNumber < 5 ? 'звезды' : 'звезд'}`}
                    >
                        <StarIconMobi fill={shouldFill ? 'white' : 'none'} />
                    </button>
                )
            })}
        </div>
    )
}

export default StarRatingMobi