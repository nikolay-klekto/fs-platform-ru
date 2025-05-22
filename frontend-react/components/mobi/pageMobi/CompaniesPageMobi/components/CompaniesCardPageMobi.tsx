'use client'

import React from 'react'
import { Card, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

interface IProfessionCard {
    companyName: string
    image: string
    price: string
    industry?: string
    onClick: () => void
}

const ProfessionCardPageMobi: React.FC<IProfessionCard> = ({ image, companyName, price, industry, onClick }) => {
    return (
        <>
            <div className="relative overflow-hidden rounded-[10px]">
                <div
                    className="absolute inset-0 z-0 rounded-[10px] bg-center opacity-80"
                    style={{ backgroundImage: `url(${image})`, backgroundSize: '150%', backgroundPosition: 'center' }}
                />
                <Card
                    variant={'companies_page_mobi'}
                    size={'companies_page_mobi'}
                    rounded="rounded_10"
                    className="z-5 relative"
                    onClick={onClick}
                >
                    <CardTitle variant={'companies_page_mobi'} size={'companies_page_mobi'}>
                        {industry}
                    </CardTitle>
                    <CardContent className="font-semibold flex grow items-end p-0 px-[4px] text-2xl text-white 2xl:text-base 3xl:text-lg 4xl:text-xl">
                        {companyName}
                    </CardContent>

                    <CardFooter variant={'companies_page_mobi'} size={'companies_page_mobi'} rounded={'rounded_12'}>
                        <p
                            className="3xl:sm text-lg tracking-normal text-[#878797]
                    2xl:text-xs  4xl:text-base"
                        >
                            от{' '}
                            <span className="w-fit bg-gradient-mobi bg-clip-text  text-xl text-transparent">
                                {price} BYN/
                            </span>
                            неделя
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default ProfessionCardPageMobi
