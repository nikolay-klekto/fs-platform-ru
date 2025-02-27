import RequiringPaymentCardMobi from './RequiringPaymentCardMobi/RequiringPaymentCardMobi'
import { content } from '@/components/mobi/layout/RequiringPaymentMobi/RequiringPaymentCardMobi/content'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const RequiringPaymentMobi: React.FC = () => {
    if (!content) {
        return (
            <div className="flex flex-col items-center  pt-[77px]">
                <p className="mb-4 text-[#353652] hover:underline">Ваша корзина пуста</p>
                <Link href={'/professions'}>
                    <Button variant={'select_mobi'} size={'promo_mobi'} className="text-[17px] w-[294px]">
                        Выбрать стажировку
                    </Button>
                </Link>
            </div>
        )
    }
    return (
        <>
            <div className="py-[44px]">
                <div className="flex flex-wrap justify-center gap-[34px] self-end pb-[87px] md:gap-[12px] 2xl:pt-[75px]">
                    {content.map((item) => (
                        <RequiringPaymentCardMobi
                            key={item.id}
                            profession={item.profession}
                            company_name={item.company_name}
                            start_day={item.start_day}
                            end_day={item.end_day}
                            category={item.category}
                            location={item.location}
                            image={item.image}
                            price={item.price}
                        />
                    ))}
                </div>
                <Button variant={'select_mobi'} size={'promo_mobi'} className="text-[17px] w-[294px]">
                    Очистить всё
                </Button>
            </div>
        </>
    )
}
export default RequiringPaymentMobi
