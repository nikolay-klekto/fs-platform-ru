'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import StarRatingMobi from '../StarRatingMobi'

interface IItemCardArchive {
    id: number
    image: string
    companyName: string
    profession: string
    dates: string
    rating: number
    onRatingChange: (rating: number) => void
}

const ItemCardArchiveMobi: React.FC<IItemCardArchive> = ({
    image,
    companyName,
    profession,
    dates,
    rating,
    onRatingChange,
}) => {
    const [draftRating, setDraftRating] = useState<number>(rating)
    const [isClicked, setIsClicked] = useState<boolean>(false);

    useEffect(() => {
        setDraftRating(rating)
    }, [rating])

    const handleSetRating = useCallback((newRating: number) => {
        setDraftRating(newRating)
    }, [])

    const hasUnsavedRating = draftRating > 0 && draftRating !== rating
    const isDisabled = hasUnsavedRating ? false : rating === 0
    const buttonText = hasUnsavedRating
        ? 'Сохранить оценку'
        : rating > 0 ? 'Написать отзыв' : 'Отправить отзыв'

    const handleButtonClick = useCallback(() => {
        if (hasUnsavedRating) {
            onRatingChange(draftRating)
        }
    }, [hasUnsavedRating, draftRating, onRatingChange])

    return (
        <Card className="flex flex-col items-center bg-white/10 backdrop-blur-[5px] rounded-[20px] p-3 w-[167px] ">
            <div className="w-full aspect-[144/141] rounded-[20px] overflow-hidden mb-3 h-[141px] max-w-[144px]">
                <Image
                    src={image}
                    alt={`Изображение компании ${companyName}`}
                    width={144}
                    height={141}
                    className="object-cover size-full"
                />
            </div>

            <Link
                href="/company"
                className={`
                text-[14px] font-medium mb-[4px] uppercase tracking-wider text-center transition-colors duration-100
                ${isClicked
                        ? 'text-white'
                        : 'bg-gradient-mobi bg-clip-text text-transparent'
                    }
                `}
                onClick={() => setIsClicked(!isClicked)}
            >
                {companyName}
            </Link>

            <div className="text-[10px] font-medium mb-[4px] text-white text-center">
                {profession}
            </div>

            <div className="text-[6px] font-medium text-[#878797] text-center mb-[12px]">
                {dates}
            </div>

            <div className="mb-[8px]">
                <StarRatingMobi rating={draftRating} onRate={handleSetRating} />
            </div>

            <Button
                variant="send_btn_mobi"
                className="relative overflow-hidden border-[1.5px] text-[8px] font-semibold w-[107px] h-[26px] sm:text-[8px]"
                onClick={handleButtonClick}
                disabled={isDisabled}
            >
                <span className="absolute inset-0 bg-white/10" aria-hidden />
                <span className="relative">{buttonText}</span>
            </Button>
        </Card>
    )
}

export default ItemCardArchiveMobi