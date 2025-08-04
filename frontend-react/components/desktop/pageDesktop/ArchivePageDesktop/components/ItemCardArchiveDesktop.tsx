'use client'

import React, { useState, useReducer, useCallback } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
    rating: initialRating,
    onRatingChange,
}) => {
    const [rating, setRating] = useState(initialRating)
    const [stage, dispatch] = useReducer(stageReducer, 'initial')

    const handleSetRating = useCallback((newRating: number) => {
        setRating(newRating)
        dispatch({ type: 'SET_RATING' })
    }, [])

    const handleButtonClick = useCallback(() => {
        if (stage === 'setRating' && rating > 0 && rating !== initialRating) {
            onRatingChange(rating)
            dispatch({ type: 'SAVE' })
        }
    }, [stage, rating, onRatingChange, initialRating])

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
                    priority
                />
            </div>

            <div className="text-[36px] 2xl:text-[32px] 3xl:text-[28px] font-medium mb-[10px] uppercase tracking-wider text-center bg-gradient-desktop bg-clip-text text-transparent">
                {companyName}
            </div>

            <div className="text-[24px] 2xl:text-[20px] 3xl:text-[18px] font-medium mb-[10px] text-white text-center">
                {profession}
            </div>

            <div className="text-[15px] 2xl:text-[14px] 3xl:text-[13px] font-medium text-[#878797] text-center mb-[30px]">
                {dates}
            </div>

            <div className="mb-[20px]">
                <StarRatingDesktop rating={rating} onRate={handleSetRating} />
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
