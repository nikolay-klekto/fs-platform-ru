'use client'

import Link from 'next/link'
import RequiringPaymentDesktop from '../RequiringPaymentDesktop/RequiringPaymentDesktop'

const PersonalAccountDesktop: React.FC = () => {
    return (
        <>
            <div className="relative overflow-hidden">
                <div className="radial-gradient_desktop left-[-369px] top-[-330px]"></div>
                <div className="radial-gradient_desktop right-[50px] top-[933px]"></div>

                <div className="container">
                    <div className="relative z-10 flex items-center justify-between pt-10 ">
                        <h2 className="text46px_desktop font-medium text-white">ЛИЧНЫЙ КАБИНЕТ</h2>
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
                    <RequiringPaymentDesktop />
                </div>
            </div>
        </>
    )
}

export default PersonalAccountDesktop
