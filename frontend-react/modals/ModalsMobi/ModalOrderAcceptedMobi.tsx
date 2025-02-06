'use client'
import React from 'react'
import { X } from 'lucide-react'
import { modalContentMobi } from './content'

interface ModalOrderAcceptedMobiProps {
    closeModal: () => void
}

const ModalOrderAcceptedMobi: React.FC<ModalOrderAcceptedMobiProps> = ({ closeModal }) => {
    const { title, text, buttonText } = modalContentMobi.orderAcceptedMobi
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[70%]">
            <div className="relative mx-4 w-full max-w-md">
                <button
                    onClick={closeModal}
                    className="absolute right-0 top-0 rounded-[30px] bg-[#101030] bg-opacity-[80%] p-px "
                >
                    <X size={24} color="#878797" />
                </button>
                <div className="rounded-[35px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat px-3 py-[40px]">
                    <h1 className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-5xl">
                        {title}
                    </h1>
                    <p className="mb-1 px-1 pb-[18px] text-justify font-medium text-[#878797] md:text-lg">{text}</p>
                    <div className="bg-sub-title-gradient-mobi mx-auto my-2 flex w-4/5 items-center justify-center rounded-[50px] p-[3px]">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="h-12 w-full rounded-[50px] bg-[#101030] text-3xl font-semibold text-white transition-colors hover:bg-transparent hover:text-white"
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalOrderAcceptedMobi
