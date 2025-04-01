import React, { useState, useEffect } from 'react'
import ProfessionsTypeOfInternshipSelectDesktop from './ProfessionsTypeOfInternshipSelectDesktop'
import ProfessionsSelectDesktop from './ProfessionsSelectDesktop'
import ProfessionCardPageDesktop from './ProfessionCardPageDesktop'
import ProfessionsPaginationDesktop from './ProfessionsPaginationDesktop'
import ProfessionSearchDesktop from './ProfessionSendDesktop'
import { content } from './content'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useModal } from '@/context/ContextModal'

const ProfessionsPageDesktop: React.FC = () => {
    const { openModal } = useModal()
    const [searchQuery, setSearchQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const cardsPerPage = 12

    const filteredContent = content.filter((item) => {
        const matchesSearch =
            searchQuery.length < 3 || item.profession.toLowerCase().includes(searchQuery.toLowerCase().trim())
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.some((category) => item.category === category)
        return matchesSearch && matchesCategory
    })

    const totalPages = Math.ceil(filteredContent.length / cardsPerPage)

    useEffect(() => {
        setCurrentPage(1)
    }, [searchQuery, selectedCategories])

    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    const handleCategoryChange = (categories: string[]) => {
        setSelectedCategories(categories)
    }

    return (
        <div className="container relative overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px] 3xl:p-[76px_130px_150px_130px]">
            <div className="radial-gradient_desktop left-[176px] top-[-330px]"></div>
            <div className="radial-gradient_desktop right-[150px] top-[933px]"></div>
            <div className="radial-gradient_desktop bottom-[-425px] left-[274px]"></div>
            <h1 className="title80px_desktop relative z-[1]">Профессии</h1>
            <div className="relative z-[1] flex items-center justify-between py-[80px]">
                <div className="relative">
                    <EnhancedInput
                        type="text"
                        value={searchQuery}
                        onChange={setSearchQuery}
                        variant={'gradient_desktop'}
                        size={'gradient_search_desktop'}
                        rounded={'full'}
                        className={`${isFocused ? 'bg-transparent' : 'bg-[#101030]'}`}
                        wrapperClassName={`2xl:w-[600px] relative 4xl:max-w-[700px] 3xl:w-[650px] h-[64px] w-[741px] justify-between flex rounded-[50px] p-[2px] ${isFocused ? 'border-[2px] border-[#878797] bg-transparent' : 'bg-gradient-desktop border-none'}`}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Поиск"
                    />
                    <Button variant={'circle_btn_gradient_desktop'} size={'circle_btn_gradient_desktop'}>
                        <Search color="white" width={37.5} height={37.5} strokeWidth={1} />
                    </Button>
                </div>
                <ProfessionsTypeOfInternshipSelectDesktop onCategoryChange={handleCategoryChange} />{' '}
                <ProfessionsSelectDesktop onCategoryChange={handleCategoryChange} />{' '}
            </div>

            {filteredContent.length > 0 ? (
                <div className="grid grid-cols-4 justify-items-center gap-[45px] 2xl:gap-[20px] 3xl:gap-[25px] 4xl:gap-[30px]">
                    {filteredContent.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((item) => (
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
                            category={item.category}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-white text-4xl mt-20 mb-20 min-h-[250px]">Ничего не найдено</p>
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
    )
}

export default ProfessionsPageDesktop
