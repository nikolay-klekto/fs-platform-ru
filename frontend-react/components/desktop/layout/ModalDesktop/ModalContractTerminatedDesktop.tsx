import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'

interface ModalContractTerminatedDesktopProps {
    closeModal: () => void
}

const ModalContractTerminatedDesktop: React.FC<ModalContractTerminatedDesktopProps> = ({ closeModal }) => {
    return (
        <Modal show={true} onClose={closeModal} size="medium" showCloseButton={false}>
            <div>
                <button onClick={closeModal} className="absolute right-6 top-5">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className="mx-auto min-h-[228px] flex max-w-[466px] flex-col">
                <h3 className="bg-gradient-desktop bg-clip-text text-center text-9xl font-medium mt-[62px] leading-[44px] text-transparent uppercase">
                    Договор расторгнут
                </h3>
                <p className="text-center mt-4 text18px_modal_desktop leading-[22px] custom-grey">
                    Выберите стажировку и возвращайтесь.
                </p>
                <p className="text-center text18px_modal_desktop font-medium leading-[22px] custom-grey">
                    Мы будем вас ждать
                </p>
            </div>
        </Modal>
    )
}

export default ModalContractTerminatedDesktop
