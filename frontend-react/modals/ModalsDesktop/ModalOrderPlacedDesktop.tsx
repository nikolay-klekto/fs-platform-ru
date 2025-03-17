import React from 'react'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'

interface IModalContent {
    onClose: () => void
}

const ModalOrderPlacedDesktop: React.FC<IModalContent> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} size="medium" showCloseButton={false}>
            <div>
                <button onClick={onClose} className="absolute right-7 top-6">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className="mx-auto flex max-w-[426px] flex-col">
                <h3 className="bg-gradient-desktop text-13xl mt-[54px] bg-clip-text text-center font-medium uppercase leading-[44px] text-transparent">
                    Заказ оформлен
                </h3>
                <p className="custom-grey mt-4 text-center text-4xl font-medium leading-[22px]">
                    Мы уже занимаемся вашим заказом.
                </p>
                <p className="custom-grey mb-[61px] text-center text-4xl font-medium leading-[22px]">
                    Свяжемся с вами в ближайшее время
                </p>
            </div>
        </Modal>
    )
}

export default ModalOrderPlacedDesktop
