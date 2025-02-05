import { useState } from 'react'
import Modal from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

const ModalConfirmAvoidContractDesktop: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(true)
    const handleCloseModal = () => setModalOpen(false)

    return (
        <Modal show={isModalOpen} onClose={handleCloseModal} size="medium" showCloseButton={false}>
            <div>
                <button onClick={handleCloseModal} className="absolute right-7 top-6">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className="mx-auto mt-[40px] flex max-w-[426px] flex-col">
                <h3 className="text-13xl bg-gradient-desktop bg-clip-text text-center font-medium leading-[44px] text-transparent">
                    ПОДТВЕРЖДЕНИЕ
                </h3>
                <p className="pt-10 text-4xl font-medium leading-[22px] text-[#878797]">
                    Вы действительно хотите расторгнуть договор? Отменить это действие нельзя
                </p>
            </div>
            <div className="mx-auto mb-[57px] mt-[23px] flex max-w-[426px] items-center justify-between">
                <Button type="button" variant="cancel_btn_desktop" className="p-0" onClick={handleCloseModal}>
                    Отмена
                </Button>
                <Button type="button" variant="send_btn_desktop" size="confirm_btn_desktop">
                    Расторгнуть
                </Button>
            </div>
        </Modal>
    )
}

export default ModalConfirmAvoidContractDesktop
