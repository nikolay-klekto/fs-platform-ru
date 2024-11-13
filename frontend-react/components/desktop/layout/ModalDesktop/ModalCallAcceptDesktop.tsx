import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'

interface ModalCallAcceptDesktopProps {
    isOpen: boolean
    onClose: () => void
}

const ModalCallAcceptDesktop: React.FC<ModalCallAcceptDesktopProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null

    return (
        <Modal show={isOpen} onClose={onClose} size="medium" showCloseButton={false}>
            <div>
                <button onClick={onClose} className="absolute top-4 right-4">
                    <X size={35} color="white" className="opacity-70" />
                </button>
                <div className="flex flex-col p-3 rounded-lg max-w-md mx-auto">
                    <h1 className="mb-1 text-13xl font-medium bg-gradient-desktop bg-clip-text text-transparent text-center">
                        ЗАЯВКА ПРИНЯТА
                    </h1>
                    <p className="text-4xl font-medium text-[#878797] shadow-md text-center">
                        Мы с вами свяжемся в ближайшее время, а пока вы можете ознакомиться с нашими услугами на сайте
                    </p>
                </div>
                <div className="flex justify-center items-center mb-6">
                    <Link href="href">
                        <Button
                            variant="default"
                            size="btn_modal_desktop"
                            className="px-20 mx-auto bg-gradient-desktop text-5xl font-semibold rounded-full py-8 mt-1 hover:bg-gradient-desktop-hover"
                        >
                            Смотреть професии
                        </Button>
                    </Link>
                </div>
            </div>
        </Modal>
    )
}

export default ModalCallAcceptDesktop
