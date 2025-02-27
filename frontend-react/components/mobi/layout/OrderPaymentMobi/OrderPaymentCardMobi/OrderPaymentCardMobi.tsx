'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { TrashIconMobi } from '@/components/assets/iconsMobi'

interface OrderPaymentCardMobi {
    profession: string
    company_name: string
    start_day: string
    end_day: string
    category: string
    location: string
    image: string
    price: number
    contract: string
    daysForPayOrder: string
    onClick?: () => void
}

const OrderPaymentCardMobi: React.FC<OrderPaymentCardMobi> = ({
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
        <div className="flex flex-col flex-wrap rounded-[40px] bg-[#272745] px-[12px] py-[40px]">
            <div className="flex flex-col leading-none ">
                <div className="text18px_mobi text-gradient_mobi_custom pb-[30px]">ОПЛАТА ЗАКАЗА</div>
                <div className="relative h-[184px]">
                    <Image
                        src={image}
                        fill
                        alt={profession}
                        className="pointer-events-none select-none rounded-[25px]"
                    />
                </div>
                <div className="grid grid-cols-2 gap-[20px] text-wrap text-left pb-[30px] pt-[20px]">
                    <div className="text-[#878797] font-medium text12px_mobi">Профессия:</div>
                    <div className="text14px_mobi text-white leading-[1.2]">{profession}</div>
                    <div className="text-[#878797] font-medium text12px_mobi">Компания:</div>
                    <div className="text14px_mobi text-white leading-[1.2]">{company_name}</div>
                    <div className="text-[#878797] font-medium text12px_mobi">Дата стажировки:</div>
                    <div className="text14px_mobi text-white text-nowrap">
                        {start_day} - {end_day}
                    </div>
                    <div className="text-[#878797] font-medium text12px_mobi">Вид стажировки:</div>
                    <div className="text14px_mobi text-white leading-[1.2] leading-[1.2]">{category}</div>
                    <div className="text-[#878797] font-medium text12px_mobi">Адрес офиса:</div>
                    <div className="text14px_mobi text-white leading-[1.2]">{location}</div>
                </div>
                <div className="border-t-2 text-right text-xs pt-[4px] text-[#BC8070]">
                    Оплатить заказ до {daysForPayOrder}
                </div>
                <div className="flex justify-between  pt-[4px] items-center ">
                    <div className="text16px_mobi   font-semibold text-white">{price} BYN</div>
                    <button>
                        <TrashIconMobi />
                    </button>
                    <Button variant={'select_mobi'} size={'select_mobi'} className="text-2xl" onClick={onClick}>
                        Оплатить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OrderPaymentCardMobi
