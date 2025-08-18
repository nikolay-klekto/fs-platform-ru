'use client'

import React from 'react'
import { Card, CardTitle, CardFooter, CardContent } from '@/components/ui/card'

interface ICompanieCard {
    companyName: string
    image: string
    price: string
    industry?: string
}

const CompaniesCardPageDesktop: React.FC<ICompanieCard> = ({ image, companyName, price, industry }) => {
    return (
        <Card
            variant={'companies_page_desktop'}
            size={'companies_page_desktop'}
            rounded="rounded_20"
            className="z-5 relative hover:button-shadow_around_desktop_custom overflow-hidden"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: '150%',
                backgroundPosition: 'center',
            }}
        >
            <CardTitle variant={'companies_page_desktop'} size={'companies_page_desktop'}>
                {industry}
            </CardTitle>

            <CardContent className="flex grow items-end p-0 px-[10px] text-10xl font-semibold text-white 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl">
                {companyName}
            </CardContent>

            <CardFooter
                variant={'profession_page_desktop'}
                size={'companies_page_desktop'}
                rounded={'rounded_25'}
            >
                <p className="text-7xl leading-[40px] tracking-normal text-[#878797] 2xl:text-3xl 3xl:text-4xl  4xl:text-6xl">
                    от{' '}
                    <span className="bg-gradient-desktop bg-clip-text text-8xl text-transparent 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl">
                        {price} BYN/
                    </span>
                    неделя
                </p>
            </CardFooter>
        </Card>
    )
}
export default CompaniesCardPageDesktop





