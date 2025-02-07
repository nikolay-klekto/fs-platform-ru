import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowBtn } from '@/components/assets/icons'
import { useModal } from '@/context/ContextModal'

const PromoDesktop: React.FC = () => {
    const { openModal } = useModal()

    const handleOpenModal = () => {
        openModal('registration_desktop', 'desktop')
    }

    return (
        <div
            style={{
                backgroundImage: 'url(/background/background-promo.webp)',
            }}
            className="flex h-[607px] w-full items-center justify-center bg-cover bg-center"
        >
            <div className="container flex items-center p-6 lg:flex-col xl:flex-col">
                <div className="max-w-[68rem]">
                    <h3 className="text-18xl font-semibold text-white lg:text-9xl xl:text-15xl 2xl:text-16xl">
                        РЕГИСТРИРУЙСЯ, ВЫБИРАЙ ПРОФЕССИЮ И КОМПАНИЮ, ПОЛУЧАЙ НОВЫЕ ЗНАНИЯ И ОПЫТ
                    </h3>
                    <p className="text-6xl font-medium text-white lg:text-3xl xl:text-5xl">
                        Поможем пройти стажировку в любой интересующей профессии или компании, независимо от наличия
                        опыта и навыков
                    </p>
                </div>
                <div className="ml-8 flex justify-center lg:mt-10 xl:mt-10">
                    <Button variant="registration" size="four_xl" onClick={handleOpenModal}>
                        <span className="bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-transparent">
                            Зарегистрироваться
                        </span>
                    </Button>
                    <Button variant="arrow" size="four_xl" onClick={handleOpenModal}>
                        <ArrowBtn width={54} height={54} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PromoDesktop
