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

    const handleAddInternship = () => {
        setErrorDates(true)
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
        <div className="mx-auto mb-[136px] mt-[98px] w-full max-w-[1637px] rounded-[92px] bg-[#1F203F] text-white">
            <h2 className="title66px_desktop bg-gradient-desktop bg-clip-text pt-[73px] text-center font-medium uppercase text-transparent">
                Оформление стажировки
            </h2>
            <div className="flex flex-col pl-[81px] pr-[74px] pt-[55px]">
                <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b border-white pb-[37px] ">
                    <div className="flex items-center">
                        <p className="text28px_desktop font-medium text-[#878797]">Профессия</p>
                    </div>
                    <div className="flex items-center">
                        <p className="text32px_desktop font-medium text-white">Программист</p>
                    </div>
                </div>
                <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b border-white py-[37px]">
                    <div className=" flex items-center">
                        <p className="text28px_desktop font-medium text-[#878797]">Компания</p>
                    </div>
                    <div className=" flex items-center">
                        <p className="text32px_desktop font-medium text-white">EPAM</p>
                    </div>
                </div>
                <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b border-white  py-[37px]">
                    <div className="flex items-center">
                        <p className="text28px_desktop font-medium text-[#878797]">Вид стажировки</p>
                    </div>
                    <div className=" flex items-center">
                        <SelectTypeDesktop onTypeChange={handleTypeChange} />
                    </div>
                </div>
                <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b border-white pt-[37px]">
                    <div className=" flex items-center">
                        <p className="text28px_desktop pb-[116px] font-medium text-[#878797]">Даты стажировки</p>
                    </div>
                    <div className="flex flex-col">
                        <SelectDatesDesktop error={errorDates} onErrorChange={setErrorDates} />
                    </div>
                </div>
                <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b border-white  py-[37px]">
                    <div className=" flex items-center">
                        <p className="text28px_desktop font-medium text-[#878797]">Адрес стажировки</p>
                    </div>
                    <div className=" flex items-center">
                        <SelectAddressDesktop onAddressChange={handleAddressChange} />
                    </div>
                </div>
            </div>
            <div className="mt-[80px] flex flex-row items-center justify-between px-[74px] pb-[102px]">
                <p className="title66px_desktop font-medium">100 BYN</p>
                <Button
                    variant={'internship_add_to_chart_btn_desktop'}
                    size={'add_to_chart_btn_desktop'}
                    onClick={handleAddInternship}
                    disabled={errorDates}
                >
                    Добавить в корзину
                </Button>
            </div>
        </div>
    )
}

export default InternshipRegistrationDesktop
