'use client'
import React from 'react'
import { useModal } from '@/context/ContextModal'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { modalContentMobi } from './content'

interface ModalContractTerminatedProps {
    isOpen: boolean
    onClose: () => void
}

const ModalContractTerminatedMobi: React.FC<ModalContractTerminatedProps> = ({ isOpen }) => {
    const { title, text } = modalContentMobi.contractTerminatedMobi
    const { closeModal } = useModal()

    return (
        <Modal show={isOpen} onClose={closeModal} size="medium" showCloseButton={false}>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-[70%]">
                <div className="relative mx-4 w-full max-w-lg">
                    <button
                        onClick={closeModal}
                        className="absolute right-0 top-0 rounded-[30px] bg-[#101030] bg-opacity-[80%] p-px"
                    >
                        <X size={24} color="#878797" />
                    </button>
                    <div className="rounded-[40px] bg-[url('/background/Subtract_modalCall_png.png')] bg-cover bg-[right_top] bg-no-repeat px-3 py-[40px]">
                        <h1 className="bg-sub-title-gradient-mobi bg-clip-text pb-4 text-center text-4xl font-semibold text-transparent md:text-5xl">
                            {title}
                        </h1>
                        <p className="mb-1 text-center text-xl font-medium text-[#878797] md:text-2xl">{text}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalContractTerminatedMobi
