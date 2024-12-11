import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowBtn } from '@/components/assets/icons'

const PromoDesktop: React.FC = () => {
    return (
        <div
            style={{
                backgroundImage: 'url(/background/background-promo.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className="w-full h-[650px] flex items-center justify-center"
        >
            <div className="container flex items-center lg:flex-col xl:flex-col p-6">
                <div className="max-w-[68rem]">
                    <h3 className="lg:text-9xl xl:text-15xl 2xl:text-16xl text-18xl font-semibold text-white">
                        РЕГИСТРИРУЙСЯ, ВЫБИРАЙ ПРОФЕССИЮ И КОМПАНИЮ, ПОЛУЧАЙ НОВЫЕ ЗНАНИЯ И ОПЫТ
                    </h3>
                    <p className="lg:text-3xl xl:text-5xl text-6xl font-medium text-white mt-4 mt-6">
                        Поможем пройти стажировку в любой интересующей профессии или компании, независимо от наличия
                        опыта и навыков
                    </p>
                </div>
                <div className="flex space-x-4 justify-center ml-8 lg:mt-10 xl:mt-10">
                    <Button variant="registration" size="four_xl">
                        <span className="bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-transparent">
                            Зарегистрироваться
                        </span>
                    </Button>
                    <Button variant="arrow" size="four_xl">
                        <ArrowBtn width={54} height={54} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PromoDesktop
