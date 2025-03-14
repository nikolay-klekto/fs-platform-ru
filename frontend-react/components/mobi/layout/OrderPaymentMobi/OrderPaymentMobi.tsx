import { IContent, contentOrderPayment } from './OrderPaymentCardMobi/content'
import { Button } from '@/components/ui/button'
import OrderPaymentCardMobi from './OrderPaymentCardMobi/OrderPaymentCardMobi'
import Link from 'next/link'

const OrderPaymentMobi: React.FC = () => {
    if (!contentOrderPayment) {
        return (
            <div className="flex flex-col items-center  pt-[57px]">
                <p className="mb-4 text-[#353652] hover:underline">Заказов требующих оплаты нет</p>
                <Link href={'/professions'}>
                    <Button variant={'select_mobi'} size={'registration_mobi'} className="w-[294px] text-[17px]">
                        Выбрать стажировку
                    </Button>
                </Link>
            </div>
        )
    }
    return (
        <>
            <div className="py-[40px]">
                <div className="flex flex-wrap justify-center gap-[34px] self-end pb-[87px] md:gap-[12px] 2xl:pt-[75px]">
                    {contentOrderPayment.map((item: IContent) => (
                        <OrderPaymentCardMobi
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
                        />
                    ))}
                </div>
                <Button variant={'select_mobi'} size={'registration_mobi'} className="w-[294px] text-[17px]">
                    Очистить всё
                </Button>
            </div>
        </>
    )
}
export default OrderPaymentMobi
