import { contentOrderPayment } from '@/components/desktop/layout/OrderPaymentDesktop/OrderPaymentDesktop/contentOrderPayment'
import { Button } from '@/components/ui/button'
import OrderPaymentCardDesktop from './OrderPaymentDesktop/OrderPaymentCardDesktop'
import Link from 'next/link'

const OrderPaymentDesktop: React.FC = () => {
    if (!contentOrderPayment) {
        return (
            <div className="flex flex-col items-center pb-[370px] pt-[80px]">
                <p className="mb-4 text-[#353652] hover:underline">Заказов требующих оплаты нет</p>
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
            <div className="pb-[49px] pt-[80px]">
                <div className="flex flex-wrap justify-between gap-[34px] self-end pb-[87px] md:gap-[12px] 2xl:pt-[75px]">
                    {contentOrderPayment.map((item) => (
                        <OrderPaymentCardDesktop
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
export default OrderPaymentDesktop
