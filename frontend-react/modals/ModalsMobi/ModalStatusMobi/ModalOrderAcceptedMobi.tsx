'use client'
import React from 'react'
import Modal from '@/components/ui/modal'
import { modalContentMobi } from './content'

interface IModalContent {
    onClose: () => void
}

const ModalOrderAcceptedMobi: React.FC<IModalContent> = ({ onClose }) => {
    const { title, text, buttonText } = modalContentMobi.orderAcceptedMobi

    return (
        <Modal variant="mobile" size="mobile-346" onClose={onClose} bgClass="bg-auto">
            <h2 className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-5xl">
                {title}
            </h2>
            <p className="mb-1 px-1 pb-[18px] text-justify font-medium text-[#878797] md:text-lg">{text}</p>
            <div className="bg-sub-title-gradient-mobi mx-auto my-2 flex w-4/5 items-center justify-center rounded-[50px] p-[3px]">
                <button
                    type="button"
                    onClick={onClose}
                    className="h-12 w-full rounded-[50px] bg-[#101030] text-3xl font-semibold text-white transition-colors hover:bg-transparent hover:text-white"
                >
                    {buttonText}
                </button>
            </div>
        </Modal>
    )
}

export default ModalOrderAcceptedMobi
