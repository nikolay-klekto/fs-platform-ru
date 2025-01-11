'use client'

import Link from 'next/link'

const PersonalAccountDesktop: React.FC = () => {
    return (
        <>
            <div className="relative">
                <div className="radial-gradient_desktop left-[-350px] top-[-430px] zoom-0"></div>
                <div className="flex justify-around items-center z-10 relative pt-10">
                    <h2 className="text46px_desktop  font-medium text-white">ЛИЧНЫЙ КАБИНЕТ</h2>
                    <Link
                        href="#"
                        className="text18px_desktop text-[#878797] font-medium hover:underline decoration-2 decoration-transparent hover:decoration-[#8333F3] hover:bg-gradient-desktop hover:from-[#5F4AF3]hover:[#3B51A8] hover:bg-clip-text hover:text-transparent hover:underline-offset-8"
                    >
                        КОРЗИНА
                    </Link>

                    <Link
                        href="#"
                        className="text18px_desktop text-[#878797] font-medium hover:underline decoration-2 decoration-transparent hover:decoration-[#8333F3] hover:bg-gradient-desktop hover:from-[#5F4AF3]hover:[#3B51A8] hover:bg-clip-text hover:text-transparent hover:underline-offset-8"
                    >
                        ТРЕБУЮЩИЕ ОПЛАТЫ
                    </Link>

                    <Link
                        href="#"
                        className="text18px_desktop text-[#878797] font-medium hover:underline decoration-2 decoration-transparent hover:decoration-[#8333F3] hover:bg-gradient-desktop hover:from-[#5F4AF3]hover:[#3B51A8] hover:bg-clip-text hover:text-transparent hover:underline-offset-8"
                    >
                        ПРЕДСТОЯЩИЕ СТАЖИРОВКИ
                    </Link>

                    <Link
                        href="#"
                        className="text18px_desktop text-[#878797] font-medium hover:underline decoration-2 decoration-transparent hover:decoration-[#8333F3] hover:bg-gradient-desktop hover:from-[#5F4AF3]hover:[#3B51A8] hover:bg-clip-text hover:text-transparent hover:underline-offset-8"
                    >
                        АРХИВ
                    </Link>

                    <Link
                        href="#"
                        className="text18px_desktop text-[#878797] font-medium hover:underline decoration-2 decoration-transparent hover:decoration-[#8333F3] hover:bg-gradient-desktop hover:from-[#5F4AF3]hover:[#3B51A8] hover:bg-clip-text hover:text-transparent hover:underline-offset-8"
                    >
                        МОЙ ПРОФИЛЬ
                    </Link>
                </div>

                <div className="flex flex-col items-center pb-10 mt-10">
                    <p className="text-[#353652] mb-4 hover:underline">Ваша корзина пуста</p>
                    <div className="flex justify-center items-center w-1/5 mx-auto p-[3px] rounded-[50px] bg-sub-title-gradient-mobi">
                        <button
                            type="button"
                            className="w-full h-12 bg-[#101030] rounded-[55px] text-3xl font-semibold text-white
                            hover:bg-gradient-desktop-hover"
                        >
                            Выбрать профессию
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalAccountDesktop
