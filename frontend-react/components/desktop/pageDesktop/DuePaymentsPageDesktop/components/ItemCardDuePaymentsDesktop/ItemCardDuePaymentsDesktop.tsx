'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { TrashTooltipDesktop } from '@/components/ui/tooltip'

interface IItemCardDuePayments {
    profession: string
    company_name: string
    start_day: string
    end_day: string
    category: string
    location: string
    image: string
    price: number
    tooltipMessage: string
    contract: string
    daysForPayOrder: string
    onClick?: () => void
}

const ItemCardDuePaymentsDesktop: React.FC<IItemCardDuePayments> = ({
    profession,
    company_name,
    start_day,
    end_day,
    category,
    location,
    image,
    price,
    contract,
    daysForPayOrder,
    onClick,
}) => {
    return (
        <div className="flex flex-col flex-wrap rounded-[50px] bg-[#272745] px-[32px] py-[40px]">
            <div className="grid grid-cols-[4fr_4fr_5fr] grid-rows-8 pb-[13px] leading-none">
                <div className="text30px_desktop text-gradient_desktop_custom col-span-2">ОПЛАТА ЗАКАЗА</div>
                <div className="relative row-span-6 mb-[20px] ml-[32px] max-h-[328px] max-w-[290px]">
                    <Image
                        src={image}
                        fill
                        alt={profession}
                        className="pointer-events-none select-none rounded-[3.125rem] 2xl:rounded-[2rem]"
                    />
                </div>
                <div className="text18px_desktop border-b-2 border-[#353652] py-[20px] font-medium text-[#878797]">
                    Номер договора
                </div>
                <div className="text18px_modal_desktop border-b-2 border-[#353652] py-[20px] leading-none text-white ">
                    № {contract}
                </div>
                <div className="text18px_desktop border-b-2 border-[#353652] py-[20px] font-medium text-[#878797]">
                    Профессия:
                </div>
                <div className="text18px_modal_desktop border-b-2 border-[#353652] py-[20px] leading-none text-white">
                    {profession}
                </div>
                <div className="text18px_desktop border-b-2 border-[#353652] py-[20px] font-medium text-[#878797]">
                    Компания:
                </div>
                <div className="text18px_modal_desktop border-b-2 border-[#353652] py-[20px] text-white">
                    {company_name}
                </div>
                <div className="text18px_desktop border-b-2 border-[#353652] py-[20px] font-medium text-[#878797]">
                    Дата стажировки
                </div>
                <div className="text18px_modal_desktop border-b-2 border-[#353652] py-[20px] text-white">
                    {start_day} - {end_day}
                </div>
                <div className="text18px_desktop py-[20px] font-medium text-[#878797]">Вид стажировки:</div>
                <div className="text18px_modal_desktop  text-nowrap py-[20px] text-white">{category}</div>
                <div className="text18px_desktop border-t-2 border-[#353652] py-[20px] text-[#878797]">
                    Адрес офиса:
                </div>
                <div className="text18px_modal_desktop col-span-2 auto-cols-max border-t-2 border-[#353652] pt-[20px] text-white">
                    {location}
                </div>
                <div className="text24px_desktop border-t-2 pt-[20px] font-semibold text-white">Стоимость:</div>
                <div className="text28px_desktop col-span-2 border-t-2 pt-[20px] font-semibold text-white">
                    {price} BYN
                </div>
            </div>
            <div className="flex items-center justify-between pt-[13px]">
                <div className="text18px_desktop text-[#BC8070] "> Оплатить заказ до {daysForPayOrder}</div>
                <div className="flex gap-[20px] self-end">
                    <button>
                        <TrashTooltipDesktop tooltipMessage="Расторгнуть договор" />
                    </button>
                    <Button variant={'send_btn_desktop'} size={'send_btn_desktop'} onClick={onClick}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ItemCardDuePaymentsDesktop
