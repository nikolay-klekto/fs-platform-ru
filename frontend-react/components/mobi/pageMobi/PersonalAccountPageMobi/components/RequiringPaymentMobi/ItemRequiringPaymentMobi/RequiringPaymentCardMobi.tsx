'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { TrashIconMobi } from '@/components/assets/iconsMobi'

interface IRequiringPaymentCard {
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

const RequiringPaymentCardMobi: React.FC<IRequiringPaymentCard> = ({
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
            <div className="flex flex-col gap-[20px] leading-none">
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
                    <div className="text12px_mobi font-medium text-[#878797]">Профессия:</div>
                    <div className="text14px_mobi leading-[1.2] text-white">{profession}</div>
                    <div className="text12px_mobi font-medium text-[#878797]">Компания:</div>
                    <div className="text14px_mobi leading-[1.2] text-white">{company_name}</div>
                    <div className="text12px_mobi font-medium text-[#878797]">Начало стажировки:</div>
                    <div className="text14px_mobi text-white">{start_day}</div>
                    <div className="text12px_mobi font-medium text-[#878797]">Конец стажировки:</div>
                    <div className="text14px_mobi text-white">{end_day}</div>
                    <div className="text12px_mobi font-medium text-[#878797]">Вид стажировки:</div>
                    <div className="text14px_mobi leading-[1.2] text-white">{category}</div>
                    <div className="text12px_mobi font-medium text-[#878797]">Адрес офиса:</div>
                    <div className="text14px_mobi leading-[1.2] text-white">{location}</div>
                </div>
                <div className="flex items-center justify-between border-t-2 pt-[20px]">
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
