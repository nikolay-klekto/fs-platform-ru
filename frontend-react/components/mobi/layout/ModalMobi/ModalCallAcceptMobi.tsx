'use client'
import React from 'react'
import { X } from 'lucide-react'

interface ModalCallAcceptMobiProps {
    isOpen: boolean
    onClose: () => void
}

const ModalCallAcceptMobi: React.FC<ModalCallAcceptMobiProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div
                className="relative rounded-[50px] bg-[url('/images/Subtract_modallCallAccept.png')] bg-cover bg-no-repeat px-2
                sm_s:mx-2
                sm_l:mx-4
                sm_xl:mx-10
                md:px-4 md:mx-15"
            >
                <button
                    onClick={onClose}
                    className="absolute -top-1 -right-1 rounded-[50px] bg-[#101030] bg-opacity-80"
                >
                    <X size={30} color="#878797" />
                </button>
                <h1 className="text-4xl font-semibold text-center bg-sub-title-gradient-mobi bg-clip-text text-transparent mt-6 mb-3">
                    ЗАЯВКА ПРИНЯТА
                </h1>
                <p className="mb-1 pl-3 text-base font-medium text-[#878797]">
                    Мы с вами свяжемся в ближайшее время,
                    <br />а пока вы можете ознакомиться с нашими
                    <br />
                    услугами на сайте.
                </p>
                <div className="flex justify-center items-center w-4/5 mx-auto p-[3px] rounded-[50px] bg-sub-title-gradient-mobi mb-2 mt-2">
                    <button
                        type="button"
                        className="w-full h-12 bg-[#101030] rounded-[55px] text-3xl font-semibold text-white"
                    >
                        Смотреть
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalCallAcceptMobi
