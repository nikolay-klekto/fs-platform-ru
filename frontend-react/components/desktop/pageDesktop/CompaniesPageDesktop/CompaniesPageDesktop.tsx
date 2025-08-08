'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAvailableCompanies } from '@/hooks/useAvailableCompanies'
import useDebounce from '@/hooks/useDebounce'
import HeaderDesktop from '@/components/desktop/layout/HeaderDesktop/HeaderDesktop'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import CompaniesSelectDesktop from './components/CompaniesSelectDesktop'
import CompaniesCardPageDesktop from './components/CompaniesCardPageDesktop'
import CompaniesPaginationDesktop from './components/CompaniesPaginationDesktop'
import CompaniesSearchDesktop from './components/CompaniesSendDesktop'

const cardsPerPage = 12

const CompaniesPageDesktop: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery)
    const [isFocused, setIsFocused] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const { companies } = useAvailableCompanies()

    const filteredCompanies = companies.filter((item) => {
        const matchesSearch =
            (debouncedSearchQuery ?? '').length < 3 ||
            item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase().trim())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.companyIndustry)
        return matchesSearch && matchesCategory
    })

    const totalPages = Math.ceil(filteredCompanies.length / cardsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [debouncedSearchQuery, selectedCategories])

    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    const handleCategoryChange = (categories: string[]) => {
        setSelectedCategories(categories)
    }

    return (
        <>
            <HeaderDesktop />
            <main className="bg-[#101030] text-white">
                <div className="3xl:p-[76px_130px_150px_130px] container relative overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px]">
                    <div className="radial-gradient_desktop left-[176px] top-[-330px]"></div>
                    <div className="radial-gradient_desktop right-[150px] top-[933px]"></div>
                    <div className="radial-gradient_desktop bottom-[-425px] left-[274px]"></div>
                    <h1 className="title80px_desktop relative z-[1]">Компании</h1>
                    <div className="relative z-[1] flex items-center gap-[5%] pb-[80px] pt-[65px]">
                        <div className="relative w-full">
                            <EnhancedInput
                                type="text"
                                value={searchQuery}
                                onChange={setSearchQuery}
                                variant={'gradient_desktop'}
                                size={'gradient_search_desktop'}
                                rounded={'full'}
                                className={`${isFocused ? 'border-2' : 'bg-[#101030]'}`}
                                wrapperClassName={`h-[64px] justify-between flex rounded-[50px] p-[2px] ${isFocused ? 'border-[2px] border-[#878797] bg-transparent' : 'bg-gradient-desktop border-none'}`}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Поиск"
                            />
                            <Button variant={'circle_btn_gradient_desktop'} size={'circle_btn_gradient_desktop'}>
                                <Search color="white" width={37.5} height={37.5} strokeWidth={1} />
                            </Button>
                        </div>
                        <div className="ml-[23%] flex items-center gap-[20px]">
                            <CompaniesSelectDesktop onCategoryChange={handleCategoryChange} />
                        </div>
                    </div>
                    {filteredCompanies.length > 0 ? (
                        <div
                            className="max-w-[calc(4*340px +  
                        3*45px)]justify-items-center 3xl:gap-[25px] 4xl:gap-[30px] grid grid-cols-4 gap-[45px] 2xl:gap-[20px]"
                        >
                            {filteredCompanies
                                .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                                .map((item) => (
                                    <Link href={`/company`} key={item.id}>
                                        <CompaniesCardPageDesktop
                                            image={item.imagePath}
                                            industry={item.companyIndustry}
                                            price={item.pricePerWeek}
                                            companyName={item.name}
                                        />
                                    </Link>
                                ))}
                        </div>
                    ) : (
                        <p className="my-20 h-[150px] text-center text-4xl text-white">Ничего не найдено</p>
                    )}
                    {totalPages <= 1 && <div className="h-[80px]"></div>}
                    {totalPages > 1 && filteredCompanies.length > 0 && (
                        <CompaniesPaginationDesktop
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                    <CompaniesSearchDesktop />
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default CompaniesPageDesktop
