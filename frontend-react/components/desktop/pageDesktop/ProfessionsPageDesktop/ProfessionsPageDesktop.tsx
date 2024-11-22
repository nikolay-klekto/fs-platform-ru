'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import SelectDemo from './ProfessionsSelectDesktop'

const ProfessionsPageDesktop: React.FC = () => {
    return (
        <div className="relative overflow-hidden p-[76px_212px_200px_212px]">
            <h1 className="title_desktop">Professions</h1>
            <div className="radial-gradient_desktop top-[-330px]"></div>
            <div className="flex items-center justify-between pt-[80px]">
                <div
                    className="relative h-[64px] w-[768px] rounded-[50px] p-[2px]"
                    style={{
                        background: 'linear-gradient(90deg, #8333f3, #5f4af3, #3b51a8)',
                    }}
                >
                    <Input
                        type="text"
                        className="size-full rounded-full border-none bg-[#101030] pl-[20px] pr-[70px] text-5xl placeholder:font-semibold placeholder:text-[#353652]"
                        placeholder="Поиск"
                    />
                    <Button
                        variant="header_desktop_btn_gradient"
                        className="absolute right-0 top-1/2 flex size-[60px] -translate-y-1/2 items-center justify-center rounded-full"
                    >
                        <Search color="white" width={37.5} height={37.5} strokeWidth={1} />
                    </Button>
                </div>
                <SelectDemo />
            </div>
        </div>
    )
}
export default ProfessionsPageDesktop
