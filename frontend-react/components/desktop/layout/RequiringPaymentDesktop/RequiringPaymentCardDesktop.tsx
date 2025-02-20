'use client'

import React from 'react'
import Image from 'next/image'
import { TrashIcon } from '@/components/assets/icons'
import { Button } from '@/components/ui/button'
import { TrashTooltipDesktop } from '@/components/ui/tooltip'

interface RequiringPaymentCardDesktop {
    profession: string
    company_name: string
    start_day: string
    end_day: string
    category: string
    location: string
    image: string
    price: number
    tooltipMessage: string
    onClick?: () => void
}

const RequiringPaymentCardDesktop: React.FC<RequiringPaymentCardDesktop> = ({
    profession,
    company_name,
    start_day,
    end_day,
    category,
    location,
    image,
    price,
    onClick,
}) => {
    return (
        <div className="flex flex-col flex-wrap rounded-[50px] bg-[#272745] px-[32px] py-[40px]">
            <div className="flex pb-[20px] border-[#353652] border-b-2 leading-[1.2]">
                <div>
                    <div className="text30px_desktop text-gradient_desktop_custom pb-[30px]">ОФОРМЛЕНИЕ ЗАКАЗА</div>
                    <div className="grid grid-cols-2 gap-y-[20px]">
                        <div className="text18px_desktop pb-[20px] text-[#878797] border-[#353652] border-b-2 font-medium">
                            Профессия:
                        </div>
                        <div className="text18px_modal_desktop pb-[20px] text-white border-[#353652] border-b-2 leading-none">
                            {profession}
                        </div>
                        <div className="text18px_desktop pb-[20px] text-[#878797] border-[#353652] border-b-2 font-medium">
                            Компания:
                        </div>
                        <div className="text18px_modal_desktop pb-[20px] text-white border-[#353652] border-b-2">
                            {company_name}
                        </div>
                        <div className="text18px_desktop pb-[20px] text-[#878797] border-[#353652] border-b-2 font-medium">
                            Начало стажировки:
                        </div>
                        <div className="text18px_modal_desktop pb-[20px] text-white border-[#353652] border-b-2">
                            {start_day}
                        </div>
                        <div className="text18px_desktop pb-[20px] text-[#878797] border-[#353652] border-b-2 font-medium">
                            Конец стажировки:
                        </div>
                        <div className="text18px_modal_desktop pb-[20px] text-white border-[#353652] border-b-2">
                            {end_day}
                        </div>
                        <div className="text18px_desktop text-[#878797] font-medium">Вид стажировки:</div>
                        <div className="text18px_modal_desktop text-white">{category}</div>
                    </div>
                </div>
                <div className="w-[290px] h-[328px] ml-[32px]">
                    <Image
                        src={image}
                        width={322}
                        height={328}
                        alt={profession}
                        className="rounded-[3.125rem] 2xl:rounded-[2rem] select-none pointer-events-none"
                    />
                </div>
            </div>
            <div className="flex border-b-2 py-[20px] font-medium leading-none">
                <div className="text18px_desktop text-[#878797] w-[247.55px]">Адрес офиса:</div>
                <div className="text18px_modal_desktop text-white">{location}</div>
            </div>
            <div className="border-solid pt-[24px] flex leading-none">
                <div className="text24px_desktop text-white font-semibold w-[247.55px]">Стоимость:</div>
                <div className="text28px_desktop text-white font-semibold">{price} BYN</div>
            </div>
            <div className="flex justify-center self-end gap-[20px] pt-[13px]">
                <button>
                    <TrashTooltipDesktop tooltipMessage="Удалить из корзины" />
                </button>
                <Button variant={'send_btn_desktop'} size={'send_btn_desktop'}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default RequiringPaymentCardDesktop
