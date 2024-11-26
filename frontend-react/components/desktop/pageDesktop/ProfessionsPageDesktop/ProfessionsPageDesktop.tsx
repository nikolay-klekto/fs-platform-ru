'use client'

import React, { useState } from 'react'
import ProfessionsSelectDesktop from './ProfessionsSelectDesktop'
import ProfessionCardPageDesktop from './ProfessionCardPageDesktop'
import ProfessionsPaginationDesktop from './ProfessionsPaginationDesktop'
import ProfessionSearchDesktop from './ProfessionSearchDesktop'
import { content } from './content'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

const ProfessionsPageDesktop: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12
    const totalPages = Math.ceil(content.length / itemsPerPage)

    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
    }

    return (
        <>
            <div className="3xl:p-[76px_130px_150px_130px] container relative overflow-hidden p-[76px_212px_200px_212px] 2xl:p-[60px_100px_100px_100px]">
                <div className="radial-gradient_desktop left-[176px] top-[-330px]"></div>
                <div className="radial-gradient_desktop right-[-212px] top-[933px]"></div>
                <div className="radial-gradient_desktop bottom-[-425px] left-[274px]"></div>
                <h1 className="title80px_desktop relative z-[1]">Профессии</h1>
                <div className="relative z-[1] flex items-center justify-between py-[80px]">
                    <div
                        className="4xl:max-w-[700px] 3xl:max-w-[50%] relative h-[64px] w-[738px] rounded-[50px] p-[2px] 2xl:max-w-[50%]"
                        style={{
                            background: isFocused ? '#878797' : 'linear-gradient(90deg, #8333f3, #5f4af3, #3b51a8)',
                        }}
                    >
                        <Input
                            type="text"
                            className="focus-visible:ring-ring relative size-full rounded-full border-none bg-[#101030] pl-[20px] pr-[70px] text-5xl placeholder:font-semibold placeholder:text-[#353652] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Поиск"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                        <Button
                            variant="header_desktop_btn_gradient"
                            className="absolute right-0 top-1/2 flex size-[60px] -translate-y-1/2 items-center justify-center rounded-full"
                        >
                            <Search color="white" width={37.5} height={37.5} strokeWidth={1} />
                        </Button>
                    </div>
                    <ProfessionsSelectDesktop />
                </div>
                <div className="4xl:grid-cols-4 3xl:gap-[25px] 4xl:gap-[30px] grid grid-cols-4 grid-rows-3 justify-items-center gap-[45px] 2xl:gap-[20px]">
                    {content.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
                        <ProfessionCardPageDesktop
                            key={item.id}
                            image={item.image}
                            profession={item.profession}
                            price={item.price.toString()}
                        />
                    ))}
                </div>
                <ProfessionsPaginationDesktop
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                <ProfessionSearchDesktop />
            </div>
        </>
    )
}

export default ProfessionsPageDesktop
