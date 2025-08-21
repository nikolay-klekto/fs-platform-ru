'use client'

import React, { useState } from 'react'
import InternshipRegistrationSelecttypeDesktop from './components/SelectTypeDesktop/SelectTypeDesktop'
import InternshipSelectAllDatesDesktop from './components/InternshipDatesDesktop/SelectAllDatesDesktop'
import InternshipSelectAddressDesktop from './components/SelectAddressDesktop/SelectAddressDesktop'
import { Button } from '@/components/ui/button'

const InternshipRegistrationDesktop: React.FC = () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedAddresses, setSelectedAddresses] = useState<string[]>([])
    const [addInternship, setAddInternship] = useState('')

    const handleAddInternship = () => {
        setAddInternship('')
    }

    const handleTypeChange = (types: string[]) => {
        setSelectedTypes(types)
        console.log('Выбранные типы стажировки:', types)
    }

    const handleAddressChange = (addresses: string[]) => {
        setSelectedAddresses(addresses)
        console.log('Выбранные адреса стажировки:', addresses)
    }

    return (
        <div className="mx-auto mb-[136px] mt-[98px] max-w-[1637px] rounded-[92px] bg-[#1F203F] p-10 text-white">
            <h2 className="title66px_desktop bg-gradient-desktop bg-clip-text text-center font-medium  uppercase text-transparent">
                Оформление стажировки
            </h2>
            <div className="flex-start mt-[55px] mb-[36px] flex border-b border-white/20 pb-2">
                <p className="text28px_desktop font-medium-500 text-[#878797]">Профессия</p>
                <p className="text32px_desktop font-medium-500 text-[#FFFFF] pl-[291px]">Программист</p>
            </div>
            <div className="flex-start my-[36px] flex border-b border-white/20 pb-2">
                <p className="text28px_desktop font-medium-500 text-[#878797]">Компания</p>
                <p className="text32px_desktop font-medium-500 text-[#FFFFF] pl-[300px]">EPAM</p>
            </div>
            {/* Вид стажировки */}
            <div className="flex-start my-[36px] flex border-b border-white/20 pb-2">
                <p className="text28px_desktop font-medium-500 text-[#878797]">Вид стажировки</p>
                <div className="pl-[200px]">
                    {' '}
                    <InternshipRegistrationSelecttypeDesktop onTypeChange={handleTypeChange} />
                </div>
            </div>
            <div className="flex-start my-[36px] flex border-b border-white/20 pb-2">
                <span className="text28px_desktop font-medium-500 text-[#878797]">Даты стажировки</span>
                <InternshipSelectAllDatesDesktop />
            </div>

            {/* Адрес стажировки */}
            <div className="flex-start my-[36px] flex border-b border-white pb-2">
                <span className="text28px_desktop font-medium-500 text-[#878797]">Адрес стажировки</span>
                <div className="pl-[200px]">
                    {' '}
                    <InternshipSelectAddressDesktop onAddressChange={handleAddressChange} />
                </div>
            </div>

            {/* Цена + кнопка */}
            <div className="flex flex-row items-center justify-between mt-[62px] mb-[102px] px-[74px]">
                <p className="title66px_desktop font-medium">100 BYN</p>
                <Button
                    variant={'add_to_chart_btn_desktop'}
                    size={'add_to_chart_btn_desktop'}
                    className="text38px_desktop font-semibold text-white"
                    onClick={handleAddInternship}
                >
                    Добавить в корзину
                </Button>
            </div>
        </div>
    )
}

export default InternshipRegistrationDesktop
