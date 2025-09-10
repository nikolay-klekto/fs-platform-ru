'use client'

import { Button } from '@/components/ui/button'
import { ArrowBtn } from '@/components/assets/iconsMobi'
import Link from 'next/link'
import { useModal } from '@/context/ContextModal'
import { useIsAuth } from '@/hooks/useIsAuth'

const PromoMobi: React.FC = () => {
    const { openModal } = useModal()
    const isAuth = useIsAuth()

    return (
        <section className="w-full px-[15px]">
            <div
                style={{
                    backgroundImage: 'url(/background/background-promo.webp)',
                }}
                className="mx-auto flex h-[496px] w-full flex-col justify-between rounded-[40px] bg-cover bg-center bg-no-repeat px-[15px] pb-[15px] pt-[85px]"
            >
                <h3 className="m-0 mb-[30px] text-8xl font-medium uppercase leading-tight text-white sm:text-7xl sm_s:text-7xl">
                    Регистрируйся, выбирай профессию и&nbsp;компанию, получай новые знания и опыт
                </h3>
                <p className="text-[12px] leading-tight tracking-wide text-white md:text-xl">
                    Пройди стажировку в абсолютно разных компаниях на многообразнейших понравившихся профессиях
                </p>
                <div className="flex justify-center">
                    {isAuth ? (
                        <>
                            <Link href="/professions" className="flex-1 md:w-[270px] md:flex-none">
                                <Button variant="registration_mobi" size="registration_mobi" className="w-full">
                                    <span className="bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-4xl text-transparent sm:text-3xl sm_s:text-3xl">
                                        Найти стажировку
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/professions">
                                <Button variant="arrow_registration_mobi" size="arrow_registration_mobi">
                                    <ArrowBtn width={30} height={30} />
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/professions" className="flex-1 md:w-[270px] md:flex-none">
                                <Button
                                    variant="registration_mobi"
                                    size="registration_mobi"
                                    className="w-full"
                                    onClick={() => openModal('registration_mobi', 'mobi')}
                                >
                                    <span className="bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-4xl text-transparent sm:text-3xl sm_s:text-3xl">
                                        Зарегистрироваться
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/professions">
                                <Button
                                    variant="arrow_registration_mobi"
                                    size="arrow_registration_mobi"
                                    onClick={() => openModal('registration_mobi', 'mobi')}
                                >
                                    <ArrowBtn width={30} height={30} />
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default PromoMobi
