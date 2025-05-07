'use client'
import React, { useState } from 'react'
import CompaniesCardPageMobi from './components/CompaniesCardPageMobi'
import CompaniesPaginationMobi from './components/CompaniesPaginationMobi'
import CompaniesSendMobi from './components/CompaniesSendMobi'
import { content } from './contentCompaniesPageMobi/content'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useModal } from '@/context/ContextModal'
import CompaniesSelectMobi from './components/CompaniesSelectMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'

const CompaniesPageMobi: React.FC = () => {
    const { openModal } = useModal()
    const [searchQuery, setSearchQuery] = useState('')
    //const [isFocused, setIsFocused] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const cardsPerPage = 6
    const totalPages = Math.ceil(content.length / cardsPerPage)

    const filteredContent = content.filter((item) => {
        const matchesSearch =
            searchQuery.length < 3 || item.companyName.toLowerCase().includes(searchQuery.toLowerCase().trim())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.industry)
        return matchesSearch && matchesCategory
    })

    const handleCategoryChange = (categories: string[]) => {
        setSelectedCategories(categories)
    }

    const handleSearch = () => {
        console.log('Поиск компаний:', searchQuery)
        setSearchQuery('')
    }
    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className="h-[20px] bg-[#101030]">
                <HeaderMobi />
                <div className="bg-[#101030] text-white">
                    <div className="px-[15px] py-[40px]">
                        <h1 className="title28px_mobi_custom">Компании</h1>
                        <div className="flex items-center gap-[21px] py-[30px]">
                            <div className="relative w-full max-w-[282px]">
                                <EnhancedInput
                                    type="text"
                                    value={searchQuery}
                                    onChange={(value) => setSearchQuery(value)}
                                    variant={'search_mobi'}
                                    size={'search_companies_mobi'}
                                    rounded={'full'}
                                    wrapperClassName={
                                        'relative h-[48px] border-[2px] border-[#878797] bg-transparent flex-1 justify-bitween flex rounded-[50px]'
                                    }
                                    placeholder="Поиск"
                                />
                                <Button variant="circle_btn_mobi" size="circle_btn_mobi" onClick={handleSearch}>
                                    <Search color="#878797" width={24} height={24} strokeWidth={2} />
                                </Button>
                            </div>
                            <CompaniesSelectMobi onCategoryChange={handleCategoryChange} />
                        </div>
                        <div className="flex flex-wrap justify-center gap-[20px] sm_xl:gap-[15px]">
                            {filteredContent
                                .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                                .map((item) => (
                                    <CompaniesCardPageMobi
                                        key={item.id}
                                        image={item.image}
                                        industry={item.industry}
                                        price={item.price.toString()}
                                        onClick={() => {
                                            openModal('profession_modal_mobi', 'mobi', {
                                                profession: item.companyName,
                                                professionId: item.id,
                                            })
                                        }}
                                        companyName={item.companyName}
                                    />
                                ))}
                        </div>
                        <CompaniesPaginationMobi
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                        <CompaniesSendMobi />
                    </div>
                </div>
                <FooterMobi />
            </div>
        </>
    )
}
export default CompaniesPageMobi
