'use client'
import React from 'react'
import Modal from '@/components/ui/modal'
import { modalContentMobi } from './content'

interface IModalContent {
    onClose: () => void
}

const ModalContractTerminatedMobi: React.FC<IModalContent> = ({ onClose }) => {
    const { title, text } = modalContentMobi.contractTerminatedMobi

    return (
        <Modal
            variant="mobile"
            onClose={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[70%]"
            bgClass="bg-auto"
        >
            <h1 className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-5xl">
                {title}
            </h1>
            <p className="mb-1 text-center text-xl font-medium text-[#878797] md:text-2xl">{text}</p>
        </Modal>
    )
}

export default ModalContractTerminatedMobi
