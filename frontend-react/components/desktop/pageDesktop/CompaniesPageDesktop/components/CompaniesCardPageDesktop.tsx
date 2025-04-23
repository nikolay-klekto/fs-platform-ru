'use client'

import React from 'react'
import { Card, CardTitle, CardFooter, CardContent } from '@/components/ui/card'

interface ICompanieCard {
    companyName: string
    industry: string
    image: string
    price: string
    onClick: () => void
}

const CompaniesCardPageDesktop: React.FC<ICompanieCard> = ({ image, companyName, price, industry, onClick }) => {
    return (
        <>
            <Card
                variant={'companies_page_desktop'}
                size={'companies_page_desktop'}
                style={{ backgroundImage: `url(${image})` }}
                onClick={onClick}
            >
                <CardTitle variant={'companies_page_desktop'} size={'companies_page_desktop'} rounded={'rounded_25'}>
                    {industry}
                </CardTitle>
                <CardContent className="flex grow items-end px-[10px] py-0 text-[30px] text-white">
                    {companyName}
                </CardContent>
                <CardFooter variant={'profession_page_desktop'} size={'profession_page_desktop'} rounded={'rounded_25'}>
                    <p className="text-7xl leading-[40px]  tracking-normal text-[#878797] 2xl:text-3xl 3xl:text-4xl  4xl:text-4xl">
                        от{' '}
                        <span className="bg-gradient-desktop bg-clip-text text-8xl text-transparent 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl">
                            {price} BYN/
                        </span>
                        неделя
                    </p>
                </CardFooter>
            </Card>
        </>
    )
}

export default CompaniesCardPageDesktop
