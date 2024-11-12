//файл предыдущей разработки
'use client'

import React, { useState } from 'react'

import Modal from '@/components/ui/modal'

interface ProfessionCardProps {
    image: string
    title: string
    price: string
}

const ProfessionCardDesktop: React.FC<ProfessionCardProps> = ({ image, title, price }) => {
    const [showModal, setShowModal] = useState(false)

    const handleCardClick = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div
                className="flex cursor-pointer flex-col justify-between rounded-[50px] bg-black bg-cover bg-center p-[10px] transition-all hover:scale-105 hover:shadow-[0_10px_20px_rgba(131,51,243,0.7),0_6px_6px_rgba(95,74,243,0.5)] 
        md:px-[30px] md:pb-[18px] md:pt-[20px]"
                style={{ backgroundImage: `url(${image})` }}
                onClick={handleCardClick}
            >
                <p className="w-min truncate rounded-[50px] bg-white bg-opacity-70 px-2 py-1 text-lg font-semibold text-[#101030] md:px-8 md:py-2 md:text-2xl lg:w-full lg:text-3xl">
                    {title}
                </p>
                <p className="w-fit rounded-[50px] bg-white bg-opacity-70 px-4 py-2 text-base font-medium text-[#878797] md:text-xl lg:text-2xl">
                    от{' '}
                    <span className="bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] bg-clip-text text-lg text-transparent md:text-3xl lg:text-4xl">
                        {price} BYN/
                    </span>{' '}
                    неделя
                </p>
            </div>

            <Modal size="large" show={showModal} onClose={handleCloseModal}>
                <h3 className="mb-5 bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] bg-clip-text text-[46px] font-medium leading-[70px] text-transparent">
                    {title}
                </h3>
                <p className="mb-[70px] text-lg font-medium leading-[21.94px] text-[#878797]">
                    Программист — человек, который создаёт компьютерные программы, сайты, веб-сервисы и мобильные
                    приложения с помощью языков программирования — Python, C, C++, Go, Java, JS, Swift и других.
                </p>
                <p className="text-[28px] font-medium leading-[34.13px] text-white">Компании для стажировки:</p>
            </Modal>
        </>
    )
}

export default ProfessionCardDesktop
