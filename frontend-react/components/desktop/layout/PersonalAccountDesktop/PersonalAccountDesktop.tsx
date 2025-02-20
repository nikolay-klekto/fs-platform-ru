'use client'

import Link from 'next/link'
import RequiringPaymentDesktop from '../RequiringPaymentDesktop/RequiringPaymentDesktop'

const PersonalAccountDesktop: React.FC = () => {
    return (
        <>
            <div className="relative">
                <div className="radial-gradient_desktop zoom-0 left-[-350px] top-[-430px]"></div>
                <div className="relative z-10 flex items-center justify-around pt-10">
                    <h2 className="text46px_desktop  font-medium text-white">ЛИЧНЫЙ КАБИНЕТ</h2>
                    <Link
                        href="#"
                        className="text18px_desktop hover:bg-gradient-desktop hover:from-[#5F4AF3]hover:[#3B51A8] font-medium text-[#878797] decoration-transparent decoration-2 hover:bg-clip-text hover:text-transparent hover:underline hover:decoration-[#8333F3] hover:underline-offset-8"
                    >
                        КОРЗИНА
                    </Link>

                    <Link
                        href="#"
                        className="text18px_desktop hover:bg-gradient-desktop hover:from-[#5F4AF3]hover:[#3B51A8] font-medium text-[#878797] decoration-transparent decoration-2 hover:bg-clip-text hover:text-transparent hover:underline hover:decoration-[#8333F3] hover:underline-offset-8"
                    >
                        ТРЕБУЮЩИЕ ОПЛАТЫ
                    </Link>

                    <Link
                        href="#"
                        className="text18px_desktop hover:bg-gradient-desktop hover:from-[#5F4AF3]hover:[#3B51A8] font-medium text-[#878797] decoration-transparent decoration-2 hover:bg-clip-text hover:text-transparent hover:underline hover:decoration-[#8333F3] hover:underline-offset-8"
                    >
                        ПРЕДСТОЯЩИЕ СТАЖИРОВКИ
                    </Link>

                    <Link
                        href="#"
                        className="text18px_desktop hover:bg-gradient-desktop hover:from-[#5F4AF3]hover:[#3B51A8] font-medium text-[#878797] decoration-transparent decoration-2 hover:bg-clip-text hover:text-transparent hover:underline hover:decoration-[#8333F3] hover:underline-offset-8"
                    >
                        АРХИВ
                    </Link>

                    <Link
                        href="#"
                        className="text18px_desktop hover:bg-gradient-desktop hover:from-[#5F4AF3]hover:[#3B51A8] font-medium text-[#878797] decoration-transparent decoration-2 hover:bg-clip-text hover:text-transparent hover:underline hover:decoration-[#8333F3] hover:underline-offset-8"
                    >
                        МОЙ ПРОФИЛЬ
                    </Link>
                </div>

                <div className="mt-10 flex flex-col items-center pb-10">
                    <p className="mb-4 text-[#353652] hover:underline">Ваша корзина пуста</p>
                    <div className="bg-sub-title-gradient-mobi mx-auto flex w-1/5 items-center justify-center rounded-[50px] p-[3px]">
                        <button
                            type="button"
                            className="hover:bg-gradient-desktop-hover h-12 w-full rounded-[55px] bg-[#101030] text-3xl font-semibold
                            text-white"
                        >
                            Выбрать профессию
                        </button>
                    </div>
                </div>
                <RequiringPaymentDesktop />
            </div>
        </>
    )
}

export default PersonalAccountDesktop
