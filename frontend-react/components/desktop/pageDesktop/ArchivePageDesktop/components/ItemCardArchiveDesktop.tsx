'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import StarRatingDesktop from './StarRatingDesktop'

interface IItemCardArchive {
    id: number
    image: string
    companyName: string
    profession: string
    dates: string
    rating: number
    onRatingChange: (rating: number) => void
}

const ItemCardArchiveDesktop: React.FC<IItemCardArchive> = ({
    image,
    companyName,
    profession,
    dates,
    rating,
    onRatingChange,
}) => {
    const [draftRating, setDraftRating] = useState<number>(rating)

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
        } else {
        }
    }, [hasUnsavedRating, draftRating, onRatingChange])

    return (
        <Card className="w-full flex flex-col items-center bg-white/10 backdrop-blur-[5px] rounded-[50px] p-8 3xl:p-7 2xl:p-6 min-h-[500px]">
            <div className="w-full aspect-[367/360] rounded-[50px] overflow-hidden mb-6 max-w-[367px]">
                <Image
                    src={image}
                    alt={`Изображение компании ${companyName}`}
                    width={367}
                    height={360}
                    className="object-cover w-full h-full"
                />
            </div>

            <Link
                href="#"
                className="
        text-[36px] 2xl:text-[32px] 3xl:text-[28px]
        font-medium mb-[10px] uppercase tracking-wider text-center
        bg-gradient-desktop bg-clip-text text-transparent
        hover:bg-none hover:text-white
        transition-colors duration-100
        cursor-pointer"
            >
                {companyName}
            </Link>

            <div className="text-[24px] 2xl:text-[20px] 3xl:text-[18px] font-medium mb-[10px] text-white text-center">
                {profession}
            </div>

            <div className="text-[15px] 2xl:text-[14px] 3xl:text-[13px] font-medium text-[#878797] text-center mb-[30px]">
                {dates}
            </div>

            <div className="mb-[20px]">
                <StarRatingDesktop rating={draftRating} onRate={handleSetRating} />
            </div>

            <Button
                variant="send_btn_desktop"
                size="send_btn_desktop"
                className="relative overflow-hidden border-4"
                onClick={handleButtonClick}
                disabled={isDisabled}
            >
                <span className="absolute inset-0 bg-white/10" aria-hidden />
                <span className="relative">{buttonText}</span>
            </Button>
        </Card>
    )
}

export default ItemCardArchiveDesktop
