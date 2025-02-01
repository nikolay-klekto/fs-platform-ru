'use client'
import React, { useState } from 'react'
import ProfessionCardPageMobi from './ProfessionCardPageMobi'
import ProfessionsPaginationMobi from './ProfessionsPaginationMobi'
import ProfessionSendMobi from './ProfessionSendMobi'
import { content } from './content'
import { EnhancedInput } from '@/components/ui/input'
import { FiltersIconMobi } from '@/components/assets/icons'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import ProfessionModalMobi from '../../layout/ProfessionModalMobi/ProfessionModalMobi'

const ProfessionsPageMobi: React.FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedProfession, setSelectedProfession] = useState<string>('')
    const [selectedIdProfession, setSelectedIdProfession] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [isFilterActive, setIsFilterActive] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const cardsPerPage = 6
    const totalPages = Math.ceil(content.length / cardsPerPage)

    const closeModal = () => {
        setOpenModal(false)
    }

    const handleSearch = () => {
        console.log('Поиск профессий:', searchQuery)
        setSearchQuery('')
    }
    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    const handleFilterIconClick = () => {
        setIsFilterActive(!isFilterActive)
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
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Поиск"
                        />
                        <Button variant="circle_btn_mobi" size="circle_btn_mobi" onClick={handleSearch}>
                            <Search color="#878797" width={24} height={24} strokeWidth={2} />
                        </Button>
                    </div>
                    <FiltersIconMobi
                        className={`size-[32px] ${isFilterActive ? 'text-white' : 'text-[#878797]'}`}
                        onClick={handleFilterIconClick}
                    />
                </div>
                <div className="sm_xl:gap-[15px] flex flex-wrap justify-center gap-[20px]">
                    {content.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((item) => (
                        <ProfessionCardPageMobi
                            key={item.id}
                            image={item.image}
                            profession={item.profession}
                            price={item.price.toString()}
                            onClick={() => {
                                setSelectedProfession(item.profession)
                                setSelectedIdProfession(item.id)
                                setOpenModal(true)
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
                {openModal && (
                    <ProfessionModalMobi
                        closeModal={closeModal}
                        profession={selectedProfession}
                        professionId={selectedIdProfession}
                    />
                )}
            </div>
        </>
    )
}
export default ProfessionsPageMobi
