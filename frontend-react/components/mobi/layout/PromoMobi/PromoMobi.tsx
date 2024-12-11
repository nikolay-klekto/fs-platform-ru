import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowBtn } from '@/components/assets/iconsMobi'

const PromoMobi: React.FC = () => {
    return (
        <div
            style={{
                backgroundImage: 'url(/background/background-promo.webp)',
                height: '400px',
                backgroundSize: 'cover',
            }}
            className="flex flex-col justify-center text-left px-4 py-6"
        >
            <div className="container">
                <h3 className="text-white text-xl font-semibold">
                    РЕГИСТРИРУЙСЯ, ВЫБИРАЙ ПРОФЕССИЮ И КОМПАНИЮ, ПОЛУЧАЙ НОВЫЕ ЗНАНИЯ И ОПЫТ
                </h3>
                <p className="text-white mt-2 text-sm font-light">
                    Стажируйся в любой профессии или компании, независимо от опыта и навыков
                </p>

                <div className="flex justify-center space-x-4 mt-8">
                    <Button variant="registration_mobi" size="promo_mobi">
                        <span className="bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-transparent">
                            Зарегистрироваться
                        </span>
                    </Button>
                    <Button variant="arrow_mobi" size="promo_mobi">
                        <ArrowBtn width={24} height={24} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PromoMobi
