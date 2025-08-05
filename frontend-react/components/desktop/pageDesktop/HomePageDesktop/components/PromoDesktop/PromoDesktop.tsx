'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowBtnDesktop } from '@/components/assets/iconsDesktop'
import { useModal } from '@/context/ContextModal'
import { useIsAuth } from '@/hooks/useIsAuth'

const PromoDesktop: React.FC = () => {
    const { openModal } = useModal()
    const isAuth = useIsAuth()

    return (
        <div
            style={{
                backgroundImage: 'url(/background/background-promo.webp)',
            }}
            className="flex h-[607px] w-full items-center justify-center bg-cover bg-center"
        >
            <div className="container flex items-center gap-[100px] p-6 lg:flex-col xl:flex-col">
                <div className="max-w-[68rem]">
                    <h3 className="text-18xl font-semibold uppercase text-white lg:text-9xl xl:text-15xl 2xl:text-16xl">
                        Регистрируйся, выбирай профессию и компанию, получай новые знания и опыт
                    </h3>
                    <p className="text-6xl font-medium text-white lg:text-3xl xl:text-5xl">
                        Поможем пройти стажировку в любой интересующей профессии или компании, независимо от наличия
                        опыта и навыков
                    </p>
                </div>
                <div className="group ml-auto flex justify-center lg:mt-10 xl:mt-10">
                    {isAuth ? (
                        <>
                            <Link href="/professions" className="flex">
                                <Button
                                    variant="registration_desktop"
                                    size="registration_desktop"
                                    className="group-hover:button-shadow_around_desktop_custom"
                                >
                                    <span className="bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-transparent">
                                        Найти стажировку
                                    </span>
                                </Button>
                                <Button
                                    variant="arrow_registration_desktop"
                                    size="arrow_registration_desktop"
                                    className="group-hover:button-shadow_right_desktop_custom"
                                >
                                    <ArrowBtnDesktop width="57%" height="57%" />
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="registration_desktop"
                                size="registration_desktop"
                                className="group-hover:button-shadow_around_desktop_custom"
                                onClick={() => openModal('registration_desktop', 'desktop')}
                            >
                                <span className="bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-transparent">
                                    Зарегистрироваться
                                </span>
                            </Button>
                            <Button
                                variant="arrow_registration_desktop"
                                size="arrow_registration_desktop"
                                className="group-hover:button-shadow_right_desktop_custom"
                                onClick={() => openModal('registration_desktop', 'desktop')}
                            >
                                <ArrowBtnDesktop width="57%" height="57%" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PromoDesktop
