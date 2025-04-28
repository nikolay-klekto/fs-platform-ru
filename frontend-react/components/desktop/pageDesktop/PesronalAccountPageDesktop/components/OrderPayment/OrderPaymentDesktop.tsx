import Link from 'next/link'
import { contentOrderPayment } from './contentOrderPaymentDesktop/content'
import { Button } from '@/components/ui/button'
import OrderPaymentCardDesktop from './ItemOrderPaymentDesktop/OrderPaymentCardDesktop'

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
            <div className="3xl:pt-[50px] pb-[49px] pt-[80px] 2xl:pt-[40px] grid">
                <div className="grid grid-cols-2 justify-between gap-[34px] self-end pb-[87px]">
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
