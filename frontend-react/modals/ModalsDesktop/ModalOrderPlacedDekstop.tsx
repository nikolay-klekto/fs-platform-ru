import React from 'react'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'

interface ModalOrderPlacedDekstopProps {
    closeModal: () => void
}

const ModalOrderPlacedDekstop: React.FC<ModalOrderPlacedDekstopProps> = ({ closeModal }) => {
    return (
        <Modal show={true} onClose={closeModal} size="medium" showCloseButton={false}>
            <div>
                <button onClick={closeModal} className="absolute right-7 top-6">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className="mx-auto flex max-w-[426px] flex-col">
                <h3 className="text-center bg-gradient-desktop bg-clip-text text-13xl font-medium mt-[54px] leading-[44px] text-transparent uppercase">
                    Заказ оформлен
                </h3>
                <p className="text-center mt-4 font-medium text-4xl leading-[22px] custom-grey">
                    Мы уже занимаемся вашим заказом.
                </p>
                <p className="text-center mb-[61px] font-medium text-4xl leading-[22px] custom-grey">
                    Свяжемся с вами в ближайшее время
                </p>
            </div>
        </Modal>
    )
}

export default ModalOrderPlacedDekstop
