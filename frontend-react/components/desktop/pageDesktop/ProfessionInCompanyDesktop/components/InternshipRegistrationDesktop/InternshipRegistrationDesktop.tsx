'use client'

import React, { useCallback, useState } from 'react'
import SelectTypeDesktop from './components/SelectTypeDesktop/SelectTypeDesktop'
import SelectAddressDesktop from './components/SelectAddressDesktop/SelectAddressDesktop'
import SelectDatesDesktop from './components/SelectDatesDesktop/SelectDatesDesktop'
import { Button } from '@/components/ui/button'

const InternshipRegistrationDesktop: React.FC = () => {
   const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([])

  const [datesValidity, setDatesValidity] = useState<boolean | null>(null)
   const [submitAttempted, setSubmitAttempted] = useState(false)

  const typeHasError = submitAttempted && selectedTypes.length === 0
  const addressHasError = submitAttempted && selectedAddresses.length === 0
  const datesHasError = submitAttempted && datesValidity !== true

  const handleAddInternship = () => {
    setSubmitAttempted(true)

  }

  const handleTypeChange = useCallback((types: string[]) => {
  setSelectedTypes(types)
}, [])

const handleDatesValidationChange = useCallback((isValid: boolean | null) => {
  setDatesValidity(isValid)
}, [])

  const handleAddressChange = (addresses: string[]) => {
    setSelectedAddresses(addresses)
  }


  return (
    <div className=" rounded-[92px] bg-[#1F203F] text-white">
      <h2 className="title66px_desktop bg-gradient-desktop bg-clip-text pt-[73px] text-center font-medium uppercase text-transparent">
        Оформление стажировки
      </h2>
      <div className="flex flex-col pl-[81px] pr-[74px] pt-[55px]">
        <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b-[3.71px] border-[#353652] pb-[37px] 2xl:grid-cols-[255px_1fr] 2xl:gap-[100px] ">
          <div className="flex items-center">
            <p className="text28px_desktop font-medium text-[#878797]">Профессия</p>
          </div>
          <div className="flex items-center">
            <p className="text32px_desktop font-medium text-white">Программист</p>
          </div>
        </div>
        <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b-[3.71px] border-[#353652] py-[37px] 2xl:grid-cols-[255px_1fr] 2xl:gap-[100px]">
          <div className=" flex items-center">
            <p className="text28px_desktop font-medium text-[#878797]">Компания</p>
          </div>
          <div className=" flex items-center">
            <p className="text32px_desktop font-medium text-white">EPAM</p>
          </div>
        </div>
        <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b-[3.71px] border-[#353652] py-[37px] 2xl:grid-cols-[255px_1fr] 2xl:gap-[100px]">
          <div className="flex items-center">
            <p className="text28px_desktop font-medium text-[#878797]">Вид стажировки</p>
          </div>
          <div className="flex">
            <SelectTypeDesktop onTypeChange={handleTypeChange}   error={submitAttempted && typeHasError} />
          </div>
        </div>
        <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b-[3.71px] border-[#353652] pt-[37px] 2xl:grid-cols-[255px_1fr] 2xl:gap-[100px]">
          <div className=" flex items-center">
            <p className="text28px_desktop pb-[116px] font-medium text-[#878797]">Даты стажировки</p>
          </div>
          <div className="flex flex-col">
            <SelectDatesDesktop onErrorChange={handleDatesValidationChange} submitted={submitAttempted} />
          </div>
        </div>
        <div className="grid grid-cols-[291px_1fr] gap-x-[150px] border-b-[3.71px] border-[#FFFFFF] py-[37px] 2xl:grid-cols-[255px_1fr]  2xl:gap-[100px]">
          <div className=" flex items-center">
            <p className="text28px_desktop font-medium text-[#878797]">Адрес стажировки</p>
          </div>
          <div className=" flex items-center">
            <SelectAddressDesktop onTypeChange={handleAddressChange}   error={submitAttempted && typeHasError} />
          </div>
        </div>
      </div>
      <div className="mt-[80px] flex flex-row items-center justify-between px-[74px] pb-[102px]">
        <p className="title66px_desktop font-medium">100 BYN</p>
        <Button
          variant={'internship_add_to_chart_btn_desktop'}
          size={'add_to_chart_btn_desktop'}
          onClick={handleAddInternship}
           disabled={submitAttempted && (typeHasError || addressHasError ||datesHasError )}
        >
          Добавить в корзину
        </Button>
      </div>
    </div>
  )
}

export default InternshipRegistrationDesktop
