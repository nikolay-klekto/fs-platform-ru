'use client'
import React, { useState } from 'react'
import ProfessionCardPageMobi from './ProfessionCardPageMobi'
import ProfessionsPaginationMobi from './ProfessionsPaginationMobi'
import ProfessionSendMobi from './ProfessionSendMobi'
import { content } from './content'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useModal } from '@/context/ContextModal'
import ProfessionsSelectMobi from './ProfessionsSelectMobi'

const ProfessionsPageMobi: React.FC = () => {
    const { openModal } = useModal()
    const [searchQuery, setSearchQuery] = useState('')
    //const [isFocused, setIsFocused] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 6
    const totalPages = Math.ceil(content.length / cardsPerPage)

    const handleSearch = () => {
        console.log('Поиск профессий:', searchQuery)
        setSearchQuery('')
    }
    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className="px-[15px] py-[40px]">
                <h1 className="title28px_mobi_custom">Профессии</h1>
                <div className="flex items-center gap-[20px] py-[30px]">
                    <div className="relative w-full md:max-w-[430px]">
                        <EnhancedInput
                            type="text"
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                            variant={'search_mobi'}
                            size={'search_mobi'}
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
                    <ProfessionsSelectMobi />
                </div>
                <div className="sm_xl:gap-[15px] flex flex-wrap justify-center gap-[20px]">
                    {content.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((item) => (
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
                <ProfessionsPaginationMobi
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                <ProfessionSendMobi />
            </div>
        </>
    )
}
export default ProfessionsPageMobi
