'use client'

import Link from 'next/link'
import { content } from '@/components/desktop/pageDesktop/DuePaymentsPageDesktop/contentDuePaymentsPageDesktop/content'
import { Button } from '@/components/ui/button'
import ItemCardDuePaymentsDesktop from '../ItemCardDuePaymentsDesktop/ItemCardDuePaymentsDesktop'

const DuePaymentsDesktop: React.FC = () => {
    if (!content) {
        return (
            <div className="flex flex-col items-center pb-[370px]">
                <p className="mb-4 text-7xl font-medium leading-[40px] text-[#353652]">Заказов требующих оплаты нет</p>
                <Link href={'/professions'}>
                    <Button variant={'send_btn_desktop'} size={'send_btn_desktop'}>
                        Выбрать профессию
                    </Button>
                </Link>
            </div>
        )
    }
    return (
        <>
            <div className="grid pb-[49px]">
                <div className="grid grid-cols-2 justify-between gap-[34px] self-end pb-[80px] 2xl:pb-[40px]">
                    {content.map((item) => (
                        <ItemCardDuePaymentsDesktop
                            key={item.id}
                            profession={item.profession}
                            company_name={item.company_name}
                            start_day={item.start_day}
                            end_day={item.end_day}
                            category={item.category}
                            location={item.location}
                            image={item.image}
                            price={item.price}
                            contract={item.contract}
                            daysForPayOrder={item.daysForPayOrder}
                            tooltipMessage="Расторгнуть договор"
                        />
                    ))}
                </div>
                <Button className="flex justify-self-center" variant={'send_btn_desktop'} size={'send_btn_desktop'}>
                    Очистить всё
                </Button>
            </div>
        </>
    )
}
export default DuePaymentsDesktop
