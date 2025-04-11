import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowBtn } from '@/components/assets/iconsMobi'
import { useModal } from '@/context/ContextModal'

const PromoMobi: React.FC = () => {
    const { openModal } = useModal()

    return (
        <div className="w-full px-[15px]">
            <div
                style={{
                    backgroundImage: 'url(/background/background-promo.webp)',
                }}
                className="mx-auto flex h-[496px] w-full flex-col justify-between rounded-[40px] bg-cover bg-center bg-no-repeat px-[15px] pb-[15px] pt-[85px]"
            >
                <h3 className="sm_s:text-7xl m-0 mb-[30px] text-8xl font-medium leading-tight text-white sm:text-7xl">
                    РЕГИСТРИРУЙСЯ, ВЫБИРАЙ ПРОФЕССИЮ И&nbsp;КОМПАНИЮ, ПОЛУЧАЙ НОВЫЕ ЗНАНИЯ И ОПЫТ
                </h3>
                <p className="text-[12px] leading-tight tracking-wide text-white md:text-xl">
                    Пройди стажировку в абсолютно разных компаниях на многообразнейших понравившихся профессиях
                </p>
                <div className="flex justify-center">
                    <Button variant="registration_mobi" size="registration_mobi" className="flex-1 md:w-[270px] md:flex-none">
                        <span className="sm_s:text-3xl bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-4xl text-transparent sm:text-3xl">
                            Найти стажировку
                        </span>
                    </Button>
                    <Button
                        variant="arrow_registration_mobi"
                        size="arrow_registration_mobi"
                        onClick={() => openModal('registration_mobi', 'mobi')}
                    >
                        <ArrowBtn width={30} height={30} />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PromoMobi
