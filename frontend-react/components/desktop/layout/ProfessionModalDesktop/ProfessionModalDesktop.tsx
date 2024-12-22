'use client'

import React from 'react'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { contentProfessionAbout } from './content'

interface ProfessionModalDesktopProps {
    closeModal: () => void
    profession: string
    professionId: number | null
}

const ProfessionModalDesktop: React.FC<ProfessionModalDesktopProps> = ({ closeModal, profession, professionId }) => {
    console.log('Номер id: ', { professionId })

    return (
        <Modal
            show={true}
            onClose={closeModal}
            size="large-l"
            showCloseButton={false}
            className="custom_modal_large_padding_desktop"
        >
            <div className="flex flex-col custom_modal_large_padding_content_desktop border border-red-500">
                <button onClick={closeModal} className="absolute top-[23px] right-[36px] border border-red-500">
                    <X size={41} className="color-[#878797] opacity-50 hover:opacity-80"></X>
                </button>
                <h2 className="mb-[5px] text46px_desktop font-medium text-gradient_desktop_custom uppercase border border-red-500">
                    {profession}
                </h2>
                {contentProfessionAbout.map((item) => (
                    <p
                        key={item.id}
                        className="max-w-[1190px] custom_modal_large_margin_content_desktop text18px_modal_text_desktop border border-red-500"
                    >
                        {item.text}
                    </p>
                ))}
            </div>
        </Modal>
    )
}

export default ProfessionModalDesktop
