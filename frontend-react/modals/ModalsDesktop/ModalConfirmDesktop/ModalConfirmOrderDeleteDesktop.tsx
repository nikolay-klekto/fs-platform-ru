'use client'

import { useModal } from '@/context/ContextModal'
import Modal from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { modalContent } from './content'

interface OrderDeleteDesktopProps {
    isOpen: boolean
}

const ModalConfirmOrderDeleteDesktop: React.FC<OrderDeleteDesktopProps> = ({ isOpen }) => {
    const { closeModal } = useModal()
    const content = modalContent['orderDelete']
    
    return (
        <Modal show={isOpen} onClose={closeModal} size="medium" showCloseButton={false}>
            <div>
                <button onClick={closeModal} className="absolute right-7 top-6">
                    <X size={41} color="white" className="opacity-50 hover:opacity-100" />
                </button>
            </div>
            <div className="mx-auto mt-[40px] flex max-w-[426px] flex-col">
                <h3 className="text-13xl bg-gradient-desktop bg-clip-text text-center font-medium leading-[44px] text-transparent">
                    {content.title}
                </h3>
                <p className="pt-10 text-4xl font-medium leading-[22px] text-[#878797]">{content.message}</p>
            </div>
            <div className="mx-auto mb-[57px] mt-[23px] flex max-w-[426px] items-center justify-between">
                <Button type="button" variant="cancel_btn_desktop" className="p-0" onClick={closeModal}>
                    {content.cancelButton}
                </Button>
                <Button type="button" variant="send_btn_desktop" size="confirm_btn_desktop">
                    {content.confirmButton}
                </Button>
            </div>
        </Modal>
    )
}

export default ModalConfirmOrderDeleteDesktop
