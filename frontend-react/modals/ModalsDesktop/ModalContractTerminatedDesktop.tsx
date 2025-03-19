import React from 'react'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'

interface IModalContent {
    onClose: () => void
}

const ModalContractTerminatedDesktop: React.FC<IModalContent> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} size="extra-medium" showCloseButton={false}>
            <div>
                <button onClick={onClose} className="absolute right-[22px] top-[18px]">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className="mx-auto flex max-w-[383px] flex-col">
                <h3 className="bg-gradient-desktop mt-[62px] bg-clip-text text-center text-9xl font-medium uppercase leading-[44px] text-transparent">
                    Договор расторгнут
                </h3>
                <p className="custom-grey mt-4 text-center text-4xl font-medium leading-[22px]">
                    Выберите стажировку и возвращайтесь
                </p>
                <p className="custom-grey mb-[73px] text-center text-4xl font-medium leading-[22px]">
                    Мы будем вас ждать
                </p>
            </div>
        </Modal>
    )
}

export default ModalContractTerminatedDesktop
