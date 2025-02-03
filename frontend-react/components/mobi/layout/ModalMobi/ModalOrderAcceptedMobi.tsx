'use client'
import React, { useState } from 'react'
import { X } from 'lucide-react'

const ModalOrderAcceptedMobi: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false)

    const handleOpenModal = () => {
        setModalOpen(true)
    }

    const handleCloseModal = () => setModalOpen(false)

    return (
        <>
            {/* Кнопка для открытия модального окна (для тестирования) */}
            <button
                onClick={handleOpenModal}
                className="bg-sub-title-gradient-mobi mx-auto mt-[30px] h-12 w-4/5 rounded-[50px] text-3xl font-semibold text-white md:text-4xl"
            >
                Открыть модальное окно
            </button>

            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[70%]">
                    <div className="relative mx-4 w-full max-w-md">
                        <button
                            onClick={handleCloseModal}
                            className="absolute right-0 top-0 rounded-[50px] bg-[#101030] bg-opacity-[80%] p-[6px]"
                        >
                            <X size={20} color="#878797" />
                        </button>

                        <div className="rounded-[50px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat px-3 py-[40px]">
                            {/* Заголовок */}
                            <h1 className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-5xl">
                                ЗАКАЗ ОФОРМЛЕН
                            </h1>

                            <p className="mb-1 px-3 pb-[18px] text-justify font-medium text-[#878797] md:text-lg">
                                Пожалуйста, ожидайте звонка в течение 5 минут для оформления договора.
                            </p>

                            <div className="bg-sub-title-gradient-mobi mx-auto my-2 flex w-4/5 items-center justify-center rounded-[50px] p-[3px]">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="h-12 w-full rounded-[50px] bg-[#101030] text-3xl font-semibold text-white"
                                >
                                    Ожидать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalOrderAcceptedMobi
