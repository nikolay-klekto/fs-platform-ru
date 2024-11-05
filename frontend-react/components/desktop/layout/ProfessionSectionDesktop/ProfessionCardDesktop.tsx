'use client'

import React, { useState } from 'react'

import Modal from '@/components/ui/modal'

interface ProfessionCardProps {
    profession: string
    image: string
    price: string
}

const ProfessionCardDesktop: React.FC<ProfessionCardProps> = ({ image, profession, price }) => {
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
                className="flex flex-col justify-between bg-cover bg-center rounded-[50px] cursor-pointer py-[20px] 3xl:px-[20px] 2xl:px-[15px] px-[30px] hover:shadow_desktop_custom"
                style={{ backgroundImage: `url(${image})` }}
                onClick={handleCardClick}
            >
                <p className="w-fit bg-white bg-opacity-70 text-10xl 3xl:text-8xl 2xl:text-6xl 3xl:px-[20px] 2xl:px-[15px] text-[#101030] font-semibold py-[4px] px-[30px] rounded-[50px] truncate">
                    {profession}
                </p>
                <p className="w-fit bg-white bg-opacity-100 text-[24px] text-[#878797] py-[5px] font-medium px-[15px] 2xl:px-[10px] rounded-[50px] 3xl:text-[22px] 2xl:text-[20px]">
                    от{' '}
                    <span className="bg-gradient-desktop text-transparent font-medium bg-clip-text text-[36px] 3xl:text-[33px] 2xl:text-[26px]">
                        {price} BYN/
                    </span>
                    неделя
                </p>
            </div>

            <Modal size="large" show={showModal} onClose={handleCloseModal}>
                <h3 className="mb-5 bg-gradient-to-r from-[#8333F3] via-[#5F4AF3] to-[#3B51A8] bg-clip-text text-[46px] font-medium leading-[70px] text-transparent">
                    {profession}
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
