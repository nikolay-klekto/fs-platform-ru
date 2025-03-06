'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { TrashIconMobi } from '@/components/assets/iconsMobi'

interface RequiringPaymentCardMobi {
    profession: string
    company_name: string
    start_day: string
    end_day: string
    category: string
    location: string
    image: string
    price: number
    onClick?: () => void
}

const RequiringPaymentCardMobi: React.FC<RequiringPaymentCardMobi> = ({
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
        <div className="flex flex-col flex-wrap rounded-[40px] bg-[#272745] px-[12px] py-[40px]">
            <div className="flex flex-col leading-none gap-[20px]">
                <div className="text18px_mobi text-gradient_mobi_custom pb-[10px]">ОФОРМЛЕНИЕ ЗАКАЗА</div>
                <div className="relative h-[184px]">
                    <Image
                        src={image}
                        fill
                        alt={profession}
                        className="pointer-events-none select-none rounded-[25px]"
                    />
                </div>
                <div className="grid grid-cols-2 gap-[20px] text-wrap text-left">
                    <div className="text-[#878797] font-medium text12px_mobi">Профессия:</div>
                    <div className="text14px_mobi text-white leading-[1.2]">{profession}</div>
                    <div className="text-[#878797] font-medium text12px_mobi">Компания:</div>
                    <div className="text14px_mobi text-white leading-[1.2]">{company_name}</div>
                    <div className="text-[#878797] font-medium text12px_mobi">Начало стажировки:</div>
                    <div className="text14px_mobi text-white">{start_day}</div>
                    <div className="text-[#878797] font-medium text12px_mobi">Конец стажировки:</div>
                    <div className="text14px_mobi text-white">{end_day}</div>
                    <div className="text-[#878797] font-medium text12px_mobi">Вид стажировки:</div>
                    <div className="text14px_mobi text-white leading-[1.2]">{category}</div>
                    <div className="text-[#878797] font-medium text12px_mobi">Адрес офиса:</div>
                    <div className="text14px_mobi text-white leading-[1.2]">{location}</div>
                </div>
                <div className="flex justify-between border-t-2 pt-[20px] items-center">
                    <div className="text16px_mobi   font-semibold text-white">{price} BYN</div>
                    <button>
                        <TrashIconMobi />
                    </button>
                    <Button variant={'select_mobi'} size={'select_mobi'} className="text-2xl" onClick={onClick}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RequiringPaymentCardMobi
