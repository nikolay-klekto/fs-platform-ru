import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const PromoDesktop: React.FC = () => {
    return (
        <div
            style={{
                backgroundImage: 'url(/background/background-promo.jpg)',
                backgroundSize: 'cover',
            }}
            className="flex lg:flex-col xl:flex-col items-center justify-center p-6 h-[650px]"
        >
            <div className="max-w-[68rem]">
                <h3 className="lg:text-9xl xl:text-15xl text-18xl font-semibold text-white">
                    РЕГИСТРИРУЙСЯ, ВЫБИРАЙ ПРОФЕССИЮ И КОМПАНИЮ, ПОЛУЧАЙ НОВЫЕ ЗНАНИЯ И ОПЫТ
                </h3>
                <p className="lg:text-3xl xl:text-5xl text-6xl font-medium text-white mt-4 mt-6">
                    Поможем пройти стажировку в любой интересующей профессии или компании, независимо от наличия опыта и
                    навыков
                </p>
            </div>
            <div className="flex space-x-4 justify-center lg:mt-10 xl:mt-10">
                <Button className="bg-white hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8] lg:text-9xl text-13xl font-semibold rounded-[45px] w-[500px] h-[95px]">
                    <span className="bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-transparent">
                        Зарегистрироваться
                    </span>
                </Button>
                <Button className="bg-white hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8] rounded-[45px] w-[95px] h-[95px]">
                    <Image src="/images/arrow-promo.svg" alt="arrow" width={54} height={54} />
                </Button>
            </div>
        </div>
    )
}

export default PromoDesktop
