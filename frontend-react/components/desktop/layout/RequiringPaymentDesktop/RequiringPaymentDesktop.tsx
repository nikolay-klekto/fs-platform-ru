import RequiringPaymentCardDesktop from './RequiringPaymentCardDesktop'
import { content } from '@/components/desktop/layout/RequiringPaymentDesktop/content'
import { Button } from '@/components/ui/button'

const RequiringPaymentDesktop: React.FC = () => {
    if (!content) {
        return (
            <div className="mt-10 flex flex-col items-center pb-10">
                <p className="mb-4 text-[#353652] hover:underline">Заказов требующих оплаты нет</p>
                <div className="bg-sub-title-gradient-mobi mx-auto flex w-1/5 items-center justify-center rounded-[50px] p-[3px]">
                    <button
                        type="button"
                        className="hover:bg-gradient-desktop-hover h-12 w-full rounded-[55px] bg-[#101030] text-3xl font-semibold
                            text-white"
                    >
                        Выбрать стажировку
                    </button>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="container pt-[80px] pb-[49px]">
                <div className="flex flex-wrap gap-[34px] self-end md:gap-[12px] 2xl:pt-[75px] pb-[87px]">
                    {content.map((item) => (
                        <RequiringPaymentCardDesktop
                            key={item.id}
                            profession={item.profession}
                            company_name={item.company_name}
                            start_day={item.start_day}
                            end_day={item.end_day}
                            category={item.category}
                            location={item.location}
                            image={item.image}
                            price={item.price}
                            tooltipMessage="Удалить из корзины"
                        />
                    ))}
                </div>
                <Button className="justify-self-center flex" variant={'send_btn_desktop'} size={'send_btn_desktop'}>
                    Очистить всё
                </Button>
            </div>
        </>
    )
}
export default RequiringPaymentDesktop
