'use client'

import Link from 'next/link'

const PersonalAccountDesktop: React.FC = () => {
    return (
        <>
            <div className="relative">
                <div className="radial-gradient_desktop left-[-350px] top-[-430px] zoom-0"></div>
                <div
                    className="flex items-center py-6  gap-80 3xl:gap-40 
                2xl:gap-44 z-10 relative"
                >
                    <h2 className="text46px_desktop font-medium text-white ml-20 ">ЛИЧНЫЙ КАБИНЕТ</h2>
                    <div className="flex gap-20 3l:gap-10 2xl:gap-10 ">
                        <Link
                            href="#"
                            className="text18px_desktop text-[#878797] font-medium relative 
                             hover:bg-gradient-desktop hover:bg-clip-text hover:text-transparent"
                        >
                            КОРЗИНА
                        </Link>

                        <Link
                            href="#"
                            className="text18px_desktop text-[#878797] font-medium hover:bg-gradient-desktop hover:bg-clip-text hover:text-transparent"
                        >
                            ТРЕБУЮЩИЕ ОПЛАТЫ
                        </Link>

                        <Link
                            href="#"
                            className="text18px_desktop text-[#878797] font-medium hover:bg-gradient-desktop hover:bg-clip-text hover:text-transparent"
                        >
                            ПРЕДСТОЯЩИЕ СТАЖИРОВКИ
                        </Link>

                        <Link
                            href="#"
                            className="text18px_desktop text-[#878797] font-medium hover:underline hover:bg-gradient-desktop hover:bg-clip-text hover:text-transparent"
                        >
                            АРХИВ
                        </Link>

                        <Link
                            href="#"
                            className="text18px_desktop text-[#878797] font-medium hover:underline hover:bg-gradient-desktop hover:bg-clip-text hover:text-transparent"
                        >
                            МОЙ ПРОФИЛЬ
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center pb-10 mt-10">
                    <p className="text-[#353652] mb-4 hover:underline">Ваша корзина пуста</p>
                    <div className="flex justify-center items-center w-1/5 mx-auto p-[3px] rounded-[50px] bg-sub-title-gradient-mobi">
                        <button
                            type="button"
                            className="w-full h-12 bg-[#101030] rounded-[55px] text-3xl font-semibold text-white
                            hover:bg-gradient-desktop-hover "
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
