import React from 'react'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ShoppingCartPageMobi: React.FC = () => {
    return (
        <>
            <div className="h-[20px] bg-[#101030]"></div>
            <HeaderMobi />
            <main className="flex justify-center overflow-hidden bg-[#101030] text-white">
                <div className="relative min-h-screen overflow-x-visible px-[15px] xl:px-[212px] lg:px-[180px] md:px-8 pt-[40px]">
                    <div className="relative z-10 flex w-full flex-col items-center justify-center gap-[5%] ">
                        <div className="flex flex-col items-center justify-center px-[15px]">
                            <h2 className="title28px_mobi_custom sm_s:text-[24px] sm:text-[24px]">личный кабинет</h2>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-[89px]">
                            <div className="pb-[47px] xl:w-[65%] text-center text16px_mobi font-semibold text-[#353652]">
                                <p>Ваша корзина пуста</p>
                                <p>
                                    Загляните на главную, чтобы выбрать понравившуюся стажировку, либо войдите в Ваш
                                    аккаунт
                                </p>
                            </div>
                            <Link href={'/professions'}>
                                <Button className="h-[50px] w-[294px] text-[17px]" variant={'send_btn_desktop'}>
                                    Выбрать профессию
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default ShoppingCartPageMobi
