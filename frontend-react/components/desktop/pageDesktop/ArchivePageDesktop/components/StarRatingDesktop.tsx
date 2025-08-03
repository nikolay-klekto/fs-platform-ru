import React, { useState, useCallback } from 'react'
import { StarIconDesktop } from '@/components/assets/iconsDesktop'

export interface IStarRating {
    rating: number
    onRate?: (newRating: number) => void
}

const StarRatingDesktop: React.FC<IStarRating> = ({ rating, onRate }) => {
    const [hovered, setHovered] = useState<number | null>(null)

    const handleMouseEnter = useCallback((i: number) => setHovered(i), [])
    const handleMouseLeave = useCallback(() => setHovered(null), [])
    const handleClick = useCallback(
        (star: number) => {
            onRate?.(star)
        },
        [onRate],
    )

    return (
        <div className="flex gap-[5px]">
            {Array.from({ length: 5 }).map((_, idx) => {
                const fill = hovered !== null ? idx < hovered : idx < rating
                const starNumber = idx + 1
                return (
                    <button
                        key={starNumber}
                        type="button"
                        className="focus:outline-none cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(idx + 1)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(idx + 1)}
                        aria-label={`Поставить ${idx + 1} звёзд`}
                    >
                        <StarIconDesktop filled={fill} />
                    </button>
                )
            })}
        </div>
    )
}

export default StarRatingDesktop
