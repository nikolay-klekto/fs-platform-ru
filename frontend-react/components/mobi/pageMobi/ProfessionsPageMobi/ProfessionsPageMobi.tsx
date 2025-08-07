'use client'

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useModal } from '@/context/ContextModal'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '@/components/mobi/layout/FooterMobi/FooterMobi'
import ProfessionCardPageMobi from './components/ProfessionCardPageMobi'
import PaginationMobi from '../../shared/PaginationMobi'
import ProfessionSendMobi from './components/ProfessionSendMobi'
import ProfessionsSelectMobi from './components/ProfessionsSelectMobi'
import { content } from './contentProfessionsPageMobi/content'

const cardsPerPage = 6
const minSearchLength = 3

const ProfessionsPageMobi: React.FC = () => {
    const { openModal } = useModal()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    const filteredContent = (() => {
        const normalizedQuery = searchQuery.trim().toLowerCase()
        return content.filter(({ profession = '', category }) => {
            const profLower = profession.toLowerCase()
            if (normalizedQuery.length >= minSearchLength && !profLower.includes(normalizedQuery)) {
                return false
            }
            return !(selectedCategories.length > 0 && !selectedCategories.includes(category))
        })
    })()

    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)
    const paginatedItems = filteredContent.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

    const handleSearch = () => {
        console.log('Поиск профессий:', searchQuery)
        setSearchQuery('')
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategories])

    return (
        <>
            <div className="h-[20px] bg-[#101030]">
                <HeaderMobi />
                <main className="bg-[#101030] text-white">
                    <div className="px-[15px] py-[40px]">
                        <h1 className="title28px_mobi_custom">Профессии</h1>
                        <div className="flex items-center gap-[20px] py-[30px] md:justify-center">
                            <div className="relative w-full max-w-[386px] rounded-full [@media(min-width:617px)]:max-w-[600px]">
                                <EnhancedInput
                                    type="text"
                                    className="text-white"
                                    value={searchQuery}
                                    onChange={(value) => setSearchQuery(value)}
                                    variant={'search_mobi'}
                                    size={'search_mobi'}
                                    rounded={'full'}
                                    wrapperClassName={`relative h-[48px] border-[2px] border-[#878797] bg-transparent flex-1 justify-between flex rounded-[50px] px-[10px]}`}
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
                                    {paginatedItems.map((item) => (
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

                        <ProfessionSendMobi />
                    </div>
                </main>
                <FooterMobi />
            </div>
        </>
    )
}
export default ProfessionsPageMobi
