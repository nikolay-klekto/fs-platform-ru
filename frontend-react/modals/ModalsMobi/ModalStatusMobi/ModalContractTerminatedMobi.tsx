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
        <Modal variant="mobile" size="mobile-346" onClose={onClose} bgClass="bg-auto">
            <h2 className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-5xl">
                {title}
            </h2>
            <p className="mb-1 text-center text-xl font-medium text-[#878797] md:text-2xl">{text}</p>
        </Modal>
    )
}

export default ModalContractTerminatedMobi
