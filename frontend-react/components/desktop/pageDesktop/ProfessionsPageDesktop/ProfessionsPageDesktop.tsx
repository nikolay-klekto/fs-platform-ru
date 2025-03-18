'use client'

import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useModal } from '@/context/ContextModal'
import ProfessionsSelectDesktop from './ProfessionsSelectDesktop'
import ProfessionCardPageDesktop from './ProfessionCardPageDesktop'
import ProfessionsPaginationDesktop from './ProfessionsPaginationDesktop'
import ProfessionSearchDesktop from './ProfessionSendDesktop'
import { content } from './content'

const ProfessionsPageDesktop: React.FC = () => {
    const { openModal } = useModal()
    const [searchQuery, setSearchQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [isClient, setIsClient] = useState(false)
    const cardsPerPage = 12

    const filteredContent =
        searchQuery.length < 3
            ? content
            : content.filter((item) => item.profession.toLowerCase().includes(searchQuery.toLowerCase().trim()))

    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)

    useEffect(() => {
        setIsClient(true)
        setCurrentPage(1)
    }, [searchQuery])

    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    if (!isClient) {
        return null
    }

    return (
        <>
            <div className="3xl:p-[76px_130px_150px_130px] container relative overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px]">
                <div className="radial-gradient_desktop left-[176px] top-[-330px]"></div>
                <div className="radial-gradient_desktop right-[150px] top-[933px]"></div>
                <div className="radial-gradient_desktop bottom-[-425px] left-[274px]"></div>
                <h1 className="title80px_desktop relative z-[1]">Профессии</h1>
                <div className="relative z-[1] flex items-center justify-between py-[80px]">
                    <div className="relative">
                        <EnhancedInput
                            type="text"
                            value={searchQuery}
                            onChange={(value) => setSearchQuery(value)}
                            variant={'gradient_desktop'}
                            size={'gradient_search_desktop'}
                            rounded={'full'}
                            className={`${isFocused ? 'bg-transparent' : 'bg-[#101030]'}`}
                            wrapperClassName={`2xl:w-[600px] relative 4xl:max-w-[700px] 3xl:w-[650px] h-[64px] w-[741px] justify-bitween flex rounded-[50px] p-[2px] ${isFocused ? 'border-[2px] border-[#878797] bg-transparent' : 'bg-gradient-desktop border-none'}`}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Поиск"
                        />
                        <Button
                            variant={'circle_btn_gradient_desktop'}
                            size={'circle_btn_gradient_desktop'}
                            onClick={handleSearch}
                        >
                            <Search color="white" width={37.5} height={37.5} strokeWidth={1} />
                        </Button>
                    </div>
                    <ProfessionsSelectDesktop />
                </div>
                <div className="3xl:gap-[25px] 4xl:gap-[30px] grid grid-cols-4 justify-items-center gap-[45px] 2xl:gap-[20px]">
                    {content.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((item) => (
                        <ProfessionCardPageDesktop
                            key={item.id}
                            image={item.image}
                            profession={item.profession}
                            price={item.price.toString()}
                            onClick={() => {
                                openModal('profession_modal_desktop', 'desktop', {
                                    profession: item.profession,
                                    professionId: item.id,
                                })
                            }}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-white text-4xl mt-10 mb-20">Ничего не найдено</p>
            )}

            {totalPages > 1 && filteredContent.length > 0 && (
                <ProfessionsPaginationDesktop
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}

            <ProfessionSearchDesktop />
        </div>
    )
}

export default ProfessionsPageDesktop
