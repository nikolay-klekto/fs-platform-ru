'use client'

import Link from 'next/link'

const PersonalAccountDesktop: React.FC = () => {
    return (
        <>
            <div className="relative">
                <div className="radial-gradient_desktop left-[10px] top-[-430px]"></div>

                <div
                    className="flex items-center py-6  gap-80 3xl:gap-50 
                2xl:gap-44"
                >
                    <h2 className="text46px_desktop font-medium text-white ml-20 ">ЛИЧНЫЙ КАБИНЕТ</h2>
                    <div className="flex gap-20 3l:gap-10 2xl:gap-10 ">
                        <Link
                            href="#"
                            className="text18px_desktop font-semibold
                            underline
                            bg-sub-title-gradient-mobi bg-clip-text text-transparent cursor-pointer
                            hover:underline"
                        >
                            КОРЗИНА
                        </Link>

                        <Link href="#" className="text18px_desktop text-[#878797] font-medium">
                            ТРЕБУЮЩИЕ ОПЛАТЫ
                        </Link>

                        <Link href="#" className="text18px_desktop text-[#878797] font-medium">
                            ПРЕДСТОЯЩИЕ СТАЖИРОВКИ
                        </Link>

                        <Link href="#" className="text18px_desktop text-[#878797] font-medium">
                            АРХИВ
                        </Link>

                        <Link href="#" className="text18px_desktop text-[#878797] font-medium">
                            МОЙ ПРОФИЛЬ
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-center pb-10 mt-10">
                    <p className="text-[#353652] mb-4">Ваша корзина пуста</p>
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
