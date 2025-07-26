import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowBtn } from '@/components/assets/iconsMobi'
import { useModal } from '@/context/ContextModal'

const PromoMobi: React.FC = () => {
    const { openModal } = useModal()

    return (
        <div className="w-full px-[20px] md:pt-14">
            <div
                style={{
                    backgroundImage: 'url(/background/background-promo.webp)',
                }}
                className="sm_xl:pt-[80px] mx-auto flex h-[496px] w-full flex-col justify-between rounded-[40px] bg-cover bg-center bg-no-repeat px-[15px] pb-[14px] pt-[85px] md:h-auto md:rounded-[80px] md:py-[clamp(35px,13vw,100px)]"
            >
                <h3 className="sm_s:text-7xl m-0 mb-[30px] text-9xl font-medium leading-tight text-white sm:text-7xl md:max-w-[624px] md:text-[clamp(35px,8vw,54px)]">
                    РЕГИСТРИРУЙСЯ, ВЫБИРАЙ ПРОФЕССИЮ И&nbsp;КОМПАНИЮ, ПОЛУЧАЙ НОВЫЕ ЗНАНИЯ И ОПЫТ
                </h3>
                <p className="mb-10 text-[12px] font-medium leading-tight tracking-wide text-white md:mb-[clamp(40px,11vw,80px)] md:max-w-[624px] md:text-[clamp(12px,4vw,24px)]">
                    Пройди стажировку в абсолютно разных компаниях на многообразнейших понравившихся профессиях
                </p>
                <div className="flex">
                    <Button variant="registration_mobi" size="home_registration_mobi">
                        <span className="sm_s:text-3xl bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-4xl text-transparent sm:text-3xl md:text-[clamp(23px,5vw,38px)]">
                            Найти стажировку
                        </span>
                    </Button>
                    <Button
                        variant="arrow_registration_mobi"
                        size="arrow_registration_mobi"
                        className="p-[10px] md:p-[clamp(10px,4vw,23px)]"
                        onClick={() => openModal('registration_mobi', 'mobi')}
                    >
                        <ArrowBtn />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PromoMobi
