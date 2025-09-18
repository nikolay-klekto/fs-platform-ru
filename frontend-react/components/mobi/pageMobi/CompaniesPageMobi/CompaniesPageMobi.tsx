'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useDebounce from '@/hooks/useDebounce'
import { useDataContext } from '@/context/DataContext'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import CompaniesCardPageMobi from './components/CompaniesCardPageMobi'
import PaginationMobi from '../../shared/PaginationMobi'
import CompaniesSendMobi from './components/CompaniesSendMobi'
import CompaniesSelectMobi from './components/CompaniesSelectMobi'

const cardsPerPage = 6

const CompaniesPageMobi: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearchQuery = useDebounce(searchQuery)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const { companies } = useDataContext()

    const filteredContent = companies.filter((item) => {
        const matchesSearch =
            (debouncedSearchQuery ?? '').length < 3 ||
            item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase().trim())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.companyIndustry)
        return matchesSearch && matchesCategory
    })

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategories])

    if (!companies) return null

    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)
    const paginatedItems = filteredContent.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

    const handleCategoryChange = (categories: string[]) => {
        setSelectedCategories(categories)
    }

    return (
        <>
            <div className="h-[20px] bg-[#101030]">
                <HeaderMobi />
                <main className="bg-[#101030] text-white">
                    <div className="px-[15px] py-[40px]">
                        <h1 className="title28px_mobi_custom">Компании</h1>
                        <div className="flex items-center gap-[21px] py-[30px]">
                            <div className="relative w-full max-w-[282px]">
                                <div className="relative rounded-[50px] bg-transparent p-[2.5px] transition">
                                    <EnhancedInput
                                        type="text"
                                        value={searchQuery}
                                        onChange={setSearchQuery}
                                        variant={'search_mobi'}
                                        size={'search_companies_mobi'}
                                        rounded={'full'}
                                        wrapperClassName={
                                            'relative h-[48px] border-[2px] border-[#878797] bg-[#101030] flex-1 justify-bitween flex rounded-[50px]'
                                        }
                                        placeholder="Поиск"
                                    />
                                </div>
                                <Button variant="circle_btn_mobi" size="circle_btn_mobi">
                                    <Search color="#878797" width={24} height={24} strokeWidth={2} />
                                </Button>
                            </div>
                            <CompaniesSelectMobi onCategoryChange={handleCategoryChange} />
                        </div>
                        {filteredContent.length > 0 ? (
                            <>
                                <div className="flex flex-wrap justify-center gap-[20px] sm_xl:gap-[15px]">
                                    {paginatedItems.map((item) => (
                                     //здесь будет открываться страница компании
                                            <Link href={`/company/${item.id}`} key={item.id}>
                                                <CompaniesCardPageMobi
                                                    key={item.id}
                                                    image={item.imagePath}
                                                    industry={item.companyIndustry}
                                                    price={item.pricePerWeek}
                                                    companyName={item.name}
                                                />
                                            </Link>
                                    ))}
                                </div>
                                {totalPages >= 1 && (
                                    <PaginationMobi
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        onPageChange={setCurrentPage}
                                    />
                                )}
                            </>
                        ) : (
                            <p className="my-16 min-h-[60px] text-center text-xl text-white">Ничего не найдено</p>
                        )}
                        <CompaniesSendMobi />
                    </div>
                </main>
                <FooterMobi />
            </div>
        </>
    )
}
export default CompaniesPageMobi
