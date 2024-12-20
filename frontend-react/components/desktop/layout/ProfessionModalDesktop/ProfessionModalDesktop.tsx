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
        <Modal show={true} onClose={closeModal} size="large" showCloseButton={false}>
            <div className="flex flex-col pt-[50px] pl-[88px] pb-[51px] border border-red-500">
                <button onClick={closeModal} className="absolute top-[23px] right-[36px] border border-red-500">
                    <X size={41} className="color-[#878797] opacity-50 hover:opacity-80"></X>
                </button>
                <h2 className="mb-7 4xl:mb-6 3xl:mb-5 2xl:mb-4 text46px_desktop font-medium text-gradient_desktop_custom uppercase">
                    {profession}
                </h2>
                <p>{contentProfessionAbout.map((item) => item.text)}</p>
            </div>
        </Modal>
    )
}

export default ProfessionModalDesktop
