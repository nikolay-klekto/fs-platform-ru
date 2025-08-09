'use client'

import React, { useState, useReducer, useCallback, useEffect } from 'react'
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

type Stage = 'initial' | 'setRating' | 'saved'
type Action = { type: 'SET_RATING' } | { type: 'SAVE' }

function stageReducer(state: Stage, action: Action): Stage {
    switch (action.type) {
        case 'SET_RATING':
            return 'setRating'
        case 'SAVE':
            return 'saved'
        default:
            return state
    }
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
    const [stage, dispatch] = useReducer(stageReducer, 'initial')

    useEffect(() => {
        setDraftRating(rating)
    }, [rating])

    const handleSetRating = useCallback((newRating: number) => {
        setDraftRating(newRating)
        dispatch({ type: 'SET_RATING' })
    }, [])

    const handleButtonClick = useCallback(() => {
        if (stage === 'setRating' && draftRating > 0 && draftRating !== rating) {
            onRatingChange(draftRating)
            dispatch({ type: 'SAVE' })
        }
    }, [stage, draftRating, onRatingChange, rating])

    const buttonText = {
        initial: 'Отправить отзыв',
        setRating: 'Сохранить оценку',
        saved: 'Написать отзыв',
    }[stage] as string

    return (
        <Card className="w-full flex flex-col items-center bg-white/10 backdrop-blur-[5px] rounded-[50px] px-6 pt-6 pb-8 min-h-[500px]">
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
            >
                <span className="absolute inset-0 bg-white/10" aria-hidden />
                <span className="relative">{buttonText}</span>
            </Button>
        </Card>
    )
}

export default ItemCardArchiveDesktop
