import React from 'react'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const ShoppingCartPageMobi: React.FC = () => {
    return (
        <>
            <div className="h-[20px] bg-[#101030]"></div>
            <HeaderMobi />
            <div className="flex justify-center overflow-hidden bg-[#101030] text-white">
                <div className="relative min-h-screen overflow-x-visible p-[76px_15px_200px_15px] xl:px-[212px] lg:px-[180px] md:px-8 sm_l:pt-[60px] sm_s:pt-[50px] sm:pt-[45px]">
                    <div className="relative z-10 flex w-full flex-col items-center justify-center gap-[5%] py-[80px]">
                        <div className="flex flex-col items-center justify-center gap-12">
                            <div className="text-md text-center opacity-20 xl:w-[65%]">
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
            </div>
        </>
    )
}
export default ShoppingCartPageMobi
