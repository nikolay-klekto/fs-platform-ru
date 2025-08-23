'use client'

import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import SelectInternshipTypeDesktop from './components/SelectInternshipTypeDesktop'
import ProfessionsSelectDesktop from './components/ProfessionsSelectDesktop'
import ProfessionCard from './components/ProfessionCardPageDesktop'
import ProfessionsPaginationDesktop from './components/ProfessionsPaginationDesktop'
import ProfessionSearchDesktop from './components/ProfessionSendDesktop'

//Интерфейс для карточки профессии:
interface ProfessionCardType {
    id: number
    name: string
    imagePath: string
    pricePerWeek: string
    professionIndustry: string
}

const ProfessionsPageDesktop: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedInternshipTypes, setselectedInternshipTypes] = useState<string[]>([])

    //Создала массив профессий:
    const professionsCards: ProfessionCardType[] = [
        {
            id: 1,
            name: 'Бизнес-аналитик',
            imagePath: 'profession_1.jpg',
            pricePerWeek: '100',
            professionIndustry: 'Финансы',
        },
        {
            id: 2,
            name: 'Маркетолог',
            imagePath: 'profession_2.jpg',
            pricePerWeek: '85',
            professionIndustry: 'Маркетинг',
        },
        {
            id: 3,
            name: 'Программист',
            imagePath: 'profession_3.jpg',
            pricePerWeek: '150',
            professionIndustry: 'IT',
        },
        {
            id: 4,
            name: 'Финансист',
            imagePath: 'profession_4.jpg',
            pricePerWeek: '75',
            professionIndustry: 'Финансы',
        },
    ]

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategories, selectedInternshipTypes])

    const filteredContent = professionsCards.filter((item) => {
        const matchesSearch =
            searchQuery.length < 3 || item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())

        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(item.professionIndustry || '')

        const matchesInternshipTypes =
            selectedInternshipTypes.length === 0 ||
            selectedInternshipTypes.some((selectedType) => internshipTypeIds.includes(selectedType))

        return matchesSearch && matchesCategory && matchesInternshipTypes
    })

    const cardsPerPage = 12
    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)

    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    const handleCategoryChange = (categories: string[]) => {
        setSelectedCategories(categories)
    }

    const handleIntenshipType = (categories: string[]) => {
        setselectedInternshipTypes(categories)
    }

    return (
        <>
            <HeaderDesktop />
            <main className="bg-[#101030] text-white">
                <div className="container relative overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px] 3xl:p-[76px_130px_150px_130px]">
                    <div className="radial-gradient_desktop left-[176px] top-[-330px]"></div>
                    <div className="radial-gradient_desktop right-[150px] top-[933px]"></div>
                    <div className="radial-gradient_desktop bottom-[-425px] left-[274px]"></div>
                    <h1 className="title80px_desktop relative z-[1]">Профессии</h1>
                    <div className="relative z-[1] flex items-center gap-[5%] py-[80px]">
                        <div className="relative w-full">
                            <EnhancedInput
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                variant={'gradient_desktop'}
                                size={'gradient_search_desktop'}
                                rounded={'full'}
                                className={`${isFocused ? 'bg-transparent' : 'bg-[#101030]'}`}
                                wrapperClassName={`h-[64px] justify-between flex rounded-[50px] p-[2px] ${isFocused ? 'border-[2px] border-[#878797] bg-transparent' : 'bg-gradient-desktop border-none'}`}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Поиск"
                            />
                            <Button variant={'circle_btn_gradient_desktop'} size={'circle_btn_gradient_desktop'}>
                                <Search color="white" width={37.5} height={37.5} strokeWidth={1} />
                            </Button>
                        </div>
                        <div className="ml-[5%] flex items-center gap-[20px]">
                            <SelectInternshipTypeDesktop onCategoryChange={handleIntenshipType} />
                            <ProfessionsSelectDesktop onCategoryChange={handleCategoryChange} />
                        </div>
                    </div>

                    {filteredContent.length > 0 ? (
                        <div className="grid grid-cols-4 justify-items-center gap-[45px] 2xl:gap-[20px] 3xl:gap-[25px] 4xl:gap-[30px]">
                            {filteredContent
                                .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                                .map((item) => (
                                    <ProfessionCard
                                        key={item.id}
                                        profession={item.name}
                                        image={item.imagePath}
                                        price={item.pricePerWeek}
                                    />
                                ))}
                        </div>
                    ) : (
                        <p className="my-20 min-h-[250px] text-center text-4xl text-white">Ничего не найдено</p>
                    )}

                    {totalPages <= 1 && <div className="h-[80px]"></div>}

                    {totalPages > 1 && filteredContent.length > 0 && (
                        <ProfessionsPaginationDesktop
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}

                    <ProfessionSearchDesktop />
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default ProfessionsPageDesktop
