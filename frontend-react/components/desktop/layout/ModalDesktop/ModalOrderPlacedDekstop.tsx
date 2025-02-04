import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'

interface ModalOrderPlacedDekstopProps {
    closeModal: () => void
}

const ModalOrderPlacedDekstop: React.FC<ModalOrderPlacedDekstopProps> = ({ closeModal }) => {
    return (
        <Modal show={true} onClose={closeModal} size="medium" showCloseButton={false}>
            <div>
                <button onClick={closeModal} className="absolute right-6 top-5">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className="mx-auto min-h-[228px] flex max-w-[466px] flex-col">
                <h3 className="bg-gradient-desktop bg-clip-text text-center text-13xl font-medium mt-[54px] leading-[44px] text-transparent uppercase">
                    Заказ оформлен
                </h3>
                <p className="text-center mt-4 text18px_modal_desktop leading-[22px] custom-grey">
                    Мы уже занимаемся вашим заказом.
                </p>
                <p className="text-center text18px_modal_desktop font-medium leading-[22px] custom-grey">
                    Свяжемся с вами в ближайшее время
                </p>
            </div>
        </Modal>
    )
}

export default ModalOrderPlacedDekstop
