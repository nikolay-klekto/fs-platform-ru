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
                className="mx-auto h-[496px] w-full rounded-[40px] bg-cover bg-center bg-no-repeat px-[13px] pb-[14px] pt-[84px]"
            >
                <h3 className="m-0 w-[320px] text-9xl font-medium leading-tight text-white md:w-full md:text-12xl">
                    РЕГИСТРИРУЙСЯ, ВЫБИРАЙ ПРОФЕССИЮ И&nbsp;КОМПАНИЮ, ПОЛУЧАЙ НОВЫЕ ЗНАНИЯ И ОПЫТ
                </h3>
                <p className="mt-[63px] w-[300px] text-[12px] leading-tight tracking-wide text-white md:w-[420px] md:text-xl">
                    Пройди стажировку в абсолютно разных компаниях на многообразнейших понравившихся профессиях
                </p>

                <div className="mt-[33px] flex justify-center md:mt-[80px]">
                    <Button
                        variant="registration_mobi"
                        size="registration_mobi"
                        className="flex-1 md:w-[270px] md:flex-none"
                        onClick={() => openModal('registration_mobi', 'mobi')}
                    >
                        <span className="bg-gradient-to-r from-[#8333F3] to-[#3B51A8] bg-clip-text text-4xl text-transparent">
                            Найти стажировку
                        </span>
                    </Button>
                    <Button
                        variant="registration_mobi"
                        size="registration_mobi"
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
