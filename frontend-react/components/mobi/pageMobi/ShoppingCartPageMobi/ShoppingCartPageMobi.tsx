'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import HeaderMobi from '@/components/mobi/layout/HeaderMobi/HeaderMobi'
import FooterMobi from '../../layout/FooterMobi/FooterMobi'
import { AccountNavigationMobi } from '@/components/mobi/layout/AccountNavigationMobi/AccountNavigationMobi'
import ItemCardShoppingCartMobi from '@/components/mobi/pageMobi/ShoppingCartPageMobi/components/ItemCardShoppingCartMobi/ItemCardShoppingCartMobi'
import { content } from './contentShoppingCartPageMobi/content'
import { useIsAuth } from '@/hooks/useIsAuth'

const ShoppingCartPageMobi: React.FC = () => {
    const isAuth = useIsAuth()
    const hasOrders = content && content.length > 0

    return (
        <>
            <HeaderMobi />
            <main className="grow bg-[#101030] px-[15px] pb-10">
                {isAuth && (
                    <div className="flex flex-col items-center justify-center pt-10">
                        <h1 className="title28px_mobi_custom mb-5 uppercase">Личный кабинет</h1>
                        <AccountNavigationMobi />
                    </div>
                )}

                {!isAuth && !hasOrders && (
                    <div className="flex flex-col items-center pb-[270px] pt-[160px]">
                        <div className="mb-11 max-w-[350px] text-center text-3xl font-semibold leading-[26px] text-[#353652]">
                            <p> Ваша корзина пуста</p>
                            <p>
                                Загляните на главную, чтобы выбрать понравившуюся стажировку, либо войдите в Ваш аккаунт
                            </p>
                        </div>
                        <Link href="/professions">
                            <Button variant="send_btn_mobi" size="choose_profession_btn_mobi">
                                Выбрать профессию
                            </Button>
                        </Link>
                    </div>
                )}

                {isAuth && !hasOrders && (
                    <div className="flex flex-col items-center pb-[270px] pt-16">
                        <p className="mb-5 text-center text-3xl font-semibold leading-[26px] text-[#353652]">
                            Ваша корзина пуста
                        </p>
                        <Link href="/professions">
                            <Button variant="send_btn_mobi" size="choose_profession_btn_mobi">
                                Выбрать профессию
                            </Button>
                        </Link>
                    </div>
                )}

                {hasOrders && (
                    <div className="pt-9 text-center">
                        <div className="flex flex-col items-center gap-[30px] self-end pb-[50px]">
                            {content.map((item) => (
                                <ItemCardShoppingCartMobi
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
                    </div>
                )}
            </main>
            <FooterMobi />
        </>
    )
}
export default ShoppingCartPageMobi
