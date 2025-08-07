'use client'

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useExistingProfessions } from '@/hooks/useExistingProfessions'
import useDebounce from '@/hooks/useDebounce'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import SelectInternshipTypeDesktop from './components/SelectInternshipTypeDesktop'
import ProfessionsSelectDesktop from './components/ProfessionsSelectDesktop'
import ProfessionCardPageDesktop from './components/ProfessionCardPageDesktop'
import ProfessionsPaginationDesktop from './components/ProfessionsPaginationDesktop'
import ProfessionSearchDesktop from './components/ProfessionSendDesktop'

const ProfessionsPageDesktop: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery)
    const [isFocused, setIsFocused] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedInternshipTypes, setselectedInternshipTypes] = useState<string[]>([])
    const { professions } = useExistingProfessions()
    const cardsPerPage = 12

    const filteredContent = professions.filter((item) => {
        const matchesSearch =
            (debouncedSearchQuery ?? '').length < 3 ||
            item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase().trim())
        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.some((professionIndustry) => item.professionIndustry === professionIndustry)
        const internshipTypeIds = item.internshipTypeId ? item.internshipTypeId.split(',').map((id) => id.trim()) : []

        const matchesInternshipTypes =
            selectedInternshipTypes.length === 0 ||
            selectedInternshipTypes.some((selectedType) => internshipTypeIds.includes(selectedType))

        return matchesSearch && matchesCategory && matchesInternshipTypes
    })

    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearchQuery, selectedCategories])

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
                <div className="3xl:p-[76px_130px_150px_130px] container relative overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px]">
                    <div className="radial-gradient_desktop left-[176px] top-[-330px]"></div>
                    <div className="radial-gradient_desktop right-[150px] top-[933px]"></div>
                    <div className="radial-gradient_desktop bottom-[-425px] left-[274px]"></div>
                    <h1 className="title80px_desktop relative z-[1]">Профессии</h1>
                    <div className="relative z-[1] flex items-center gap-[5%] py-[80px]">
                        <div className="relative w-full">
                            <EnhancedInput
                                type="text"
                                value={searchQuery}
                                onChange={setSearchQuery}
                                variant={'gradient_desktop'}
                                size={'gradient_search_desktop'}
                                rounded={'full'}
                                className={`${isFocused ? 'bg-transparent' : 'bg-[#101030]'}`}
                                wrapperClassName={`h-[64px] justify-between flex rounded-[50px] p-[2px] ${isFocused ? 'border-[2px] border-[#878797] bg-transparent' : 'bg-gradient-desktop border-none'}`}
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
                        <div className="3xl:gap-[25px] 4xl:gap-[30px] grid grid-cols-4 justify-items-center gap-[45px] 2xl:gap-[20px]">
                            {filteredContent
                                .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                                .map((item) => (
                                    <ProfessionCardPageDesktop
                                        key={item.id}
                                        image={item.imagePath}
                                        profession={item.name}
                                        price={item.pricePerWeek}
                                        category={item.professionIndustry}
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
