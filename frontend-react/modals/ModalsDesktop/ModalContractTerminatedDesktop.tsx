import React from 'react'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'

interface ModalContractTerminatedDesktopProps {
    closeModal: () => void
}

const ModalContractTerminatedDesktop: React.FC<ModalContractTerminatedDesktopProps> = ({ closeModal }) => {
    return (
        <Modal show={true} onClose={closeModal} size="max-w-md" showCloseButton={false}>
            <div>
                <button onClick={closeModal} className="absolute right-[22px] top-[18px]">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className="mx-auto max-w-[383px] flex flex-col">
                <h3 className="bg-gradient-desktop bg-clip-text text-center mt-[62px] text-9xl font-medium leading-[44px] text-transparent uppercase">
                    Договор расторгнут
                </h3>
                <p className="text-center mt-4 font-medium text-4xl leading-[22px] custom-grey">
                    Выберите стажировку и возвращайтесь
                </p>
                <p className="text-center mb-[73px] font-medium text-4xl leading-[22px] custom-grey">
                    Мы будем вас ждать
                </p>
            </div>
        </Modal>
    )
}

export default ModalContractTerminatedDesktop
