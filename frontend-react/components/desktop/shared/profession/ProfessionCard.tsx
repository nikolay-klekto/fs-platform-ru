'use client'

import React, { useState } from 'react'

import Modal from '@/components/ui/modal'

interface ProfessionCardProps {
    image: string
    title: string
    price: string
}

const ProfessionCard: React.FC<ProfessionCardProps> = ({ image, title, price }) => {
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
                className="flex flex-col justify-between bg-black bg-cover bg-center rounded-[50px] p-[10px] md:pt-[20px] md:pb-[18px] md:px-[30px] cursor-pointer 
        transition-all transform hover:scale-105 hover:shadow-[0_10px_20px_rgba(131,51,243,0.7),0_6px_6px_rgba(95,74,243,0.5)]"
                style={{ backgroundImage: `url(${image})` }}
                onClick={handleCardClick}
            >
                <p className="w-min lg:w-full bg-white bg-opacity-70 text-lg md:text-2xl lg:text-3xl text-[#101030] font-semibold py-1 px-2 md:py-2 md:px-8 rounded-[50px] truncate">
                    {title}
                </p>
                <p className="w-fit bg-white bg-opacity-70 text-base md:text-xl lg:text-2xl text-[#878797] font-medium py-2 px-4 rounded-[50px]">
                    от{' '}
                    <span className="bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] text-transparent bg-clip-text text-lg md:text-3xl lg:text-4xl">
                        {price} BYN/
                    </span>{' '}
                    неделя
                </p>
            </div>

            <Modal size="large" show={showModal} onClose={handleCloseModal}>
                <h3 className="bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] text-transparent bg-clip-text text-[46px] font-medium leading-[70px] mb-5">
                    {title}
                </h3>
                <p className="text-lg font-medium leading-[21.94px] text-[#878797] mb-[70px]">
                    Программист — человек, который создаёт компьютерные программы, сайты, веб-сервисы и мобильные
                    приложения с помощью языков программирования — Python, C, C++, Go, Java, JS, Swift и других.
                </p>
                <p className="text-[28px] font-medium leading-[34.13px] text-white">Компании для стажировки:</p>
            </Modal>
        </>
    )
}

export default ProfessionCard
