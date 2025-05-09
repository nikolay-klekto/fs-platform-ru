'use client'
import React, { useState, useEffect } from 'react'
import ProfessionCardPageMobi from './components/ProfessionCardPageMobi'
import ProfessionsPaginationMobi from './components/ProfessionsPaginationMobi'
import ProfessionSendMobi from './components/ProfessionSendMobi'
import { content } from './contentProfessionsPageMobi/content'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useModal } from '@/context/ContextModal'
import ProfessionsSelectMobi from './components/ProfessionsSelectMobi'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'

const ProfessionsPageMobi: React.FC = () => {
    const { openModal } = useModal()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 6

    const filteredContent = content.filter((item) => {
        const matchesSearch =
            searchQuery.length < 3 || item.profession.toLowerCase().includes(searchQuery.toLowerCase().trim())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category)
        return matchesSearch && matchesCategory
    })

    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)

    const handleSearch = () => {
        console.log('Поиск профессий:', searchQuery)
        setSearchQuery('')
    }
    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategories])

    return (
        <>
            <div className="h-[20px] bg-[#101030]">
                <HeaderMobi />
                <div className="bg-[#101030] text-white">
                    <div className="px-[15px] py-[40px]">
                        <h1 className="title28px_mobi_custom">Профессии</h1>
                        <div className="flex items-center gap-[20px] py-[30px]">
                            <div className="relative w-full rounded-full  md:max-w-[430px]">
                                <EnhancedInput
                                    type="text"
                                    value={searchQuery}
                                    onChange={(value) => setSearchQuery(value)}
                                    variant={'search_mobi'}
                                    size={'search_mobi'}
                                    rounded={'full'}
                                    wrapperClassName={
                                        'relative h-[48px] border-[2px] border-[#878797] bg-transparent flex-1 justify-bitween flex rounded-[50px] px-[10px]'
                                    }
                                    placeholder="Поиск"
                                />
                                <Button variant="circle_btn_mobi" size="circle_btn_mobi" onClick={handleSearch}>
                                    <Search color="#878797" width={24} height={24} strokeWidth={2} />
                                </Button>
                            </div>
                            <ProfessionsSelectMobi
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                            />
                        </div>
                        {filteredContent.length > 0 ? (
                            <>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {filteredContent
                                        .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                                        .map((item) => (
                                            <ProfessionCardPageMobi
                                                key={item.id}
                                                image={item.image}
                                                profession={item.profession}
                                                price={item.price.toString()}
                                                onClick={() => {
                                                    openModal('profession_modal_mobi', 'mobi', {
                                                        profession: item.profession,
                                                        professionId: item.id,
                                                    })
                                                }}
                                            />
                                        ))}
                                </div>
                                {totalPages > 1 && (
                                    <ProfessionsPaginationMobi
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </>
                        ) : (
                            <p className="my-20 min-h-[250px] text-center text-xl text-white">Ничего не найдено</p>
                        )}

                        <ProfessionSendMobi />
                    </div>
                </div>
                <FooterMobi />
            </div>
        </>
    )
}
export default ProfessionsPageMobi
