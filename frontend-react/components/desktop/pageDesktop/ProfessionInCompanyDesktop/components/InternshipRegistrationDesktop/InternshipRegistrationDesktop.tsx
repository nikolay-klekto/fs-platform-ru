'use client'

import React, { useState } from 'react'
import SelectTypeDesktop from './components/SelectTypeDesktop/SelectTypeDesktop'
import SelectAddressDesktop from './components/SelectAddressDesktop/SelectAddressDesktop'
import SelectDatesDesktop from './components/SelectDatesDesktop/SelectDatesDesktop'
import { Button } from '@/components/ui/button'

const InternshipRegistrationDesktop: React.FC = () => {
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedAddresses, setSelectedAddresses] = useState<string[]>([])
    const [errorDates, setErrorDates] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleAddInternship = () => {
        setErrorDates(true)
        setButtonDisabled(true)
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
            <h2 className="title66px_desktop bg-gradient-desktop bg-clip-text text-center font-medium uppercase text-transparent">
                Оформление стажировки
            </h2>

            {/* таблица */}
            <div className="pl-[86px] pr-[74px] mt-[55px] flex flex-col">
                {/* Профессия */}
                <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b border-white pt-[55px] pb-[36px]">
                    <div className="flex items-center">
                        <p className="text28px_desktop font-medium text-[#878797]">Профессия</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text32px_desktop font-medium text-white">Программист</p>
                    </div>
                </div>

                {/* Компания */}
                <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b border-white py-[36px]">
                    <div className=" flex items-center">
                        <p className="text28px_desktop font-medium text-[#878797]">Компания</p>
                    </div>
                    <div className=" flex items-center">
                        <p className="text32px_desktop font-medium text-white">EPAM</p>
                    </div>
                </div>

                {/* Вид стажировки */}
                <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b border-white  py-[36px]">
                    <div className="flex items-center">
                        <p className="text28px_desktop font-medium text-[#878797]">Вид стажировки</p>
                    </div>
                    <div className=" flex items-center">
                        <SelectTypeDesktop onTypeChange={handleTypeChange} />
                    </div>
                </div>

                {/* Даты стажировки */}
                <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b border-white py-[36px]">
                    <div className=" flex items-center">
                        <p className="text28px_desktop font-medium text-[#878797]">Даты стажировки</p>
                    </div>
                    <div className="flex flex-col">
                        <SelectDatesDesktop error={errorDates} />
                    </div>
                </div>

                {/* Адрес стажировки */}
                <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b border-white  py-[36px]">
                    <div className=" flex items-center">
                        <p className="text28px_desktop font-medium text-[#878797]">Адрес стажировки</p>
                    </div>
                    <div className=" flex items-center">
                        <SelectAddressDesktop onAddressChange={handleAddressChange} />
                    </div>
                </div>
            </div>

            {/* Цена + кнопка */}
            <div className="mb-[102px] mt-[62px] flex flex-row items-center justify-between px-[74px]">
                <p className="title66px_desktop font-medium">100 BYN</p>
                <Button
                    variant={'add_to_chart_btn_desktop'}
                    size={'add_to_chart_btn_desktop'}
                    className={`text38px_desktop font-semibold ${
                        buttonDisabled ? 'cursor-not-allowed bg-[#878797] text-white' : 'text-white'
                    }`}
                    onClick={handleAddInternship}
                    disabled={buttonDisabled}
                >
                    Добавить в корзину
                </Button>
            </div>
        </div>
    )
}

export default InternshipRegistrationDesktop
