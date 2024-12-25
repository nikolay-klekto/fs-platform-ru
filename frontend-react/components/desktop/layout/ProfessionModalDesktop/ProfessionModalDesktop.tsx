'use client'

import React from 'react'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { contentProfessionAboutDesktop } from './content'
import InternshipCompaniesModalDesktop from './InternshipCompaniesModalDesktop'
import ReviewsModalDesktop from './ReviewsModalDesktop'

interface ProfessionModalDesktopProps {
    closeModal: () => void
    profession: string
    professionId: number | null
}

const ProfessionModalDesktop: React.FC<ProfessionModalDesktopProps> = ({ closeModal, profession, professionId }) => {
    return (
        <Modal
            show={true}
            onClose={closeModal}
            size="large-l"
            showCloseButton={false}
            className="px-[clamp(180px,_14vw,_277px)]"
        >
            <div className="flex flex-col modal-padding-content-lg-dsk">
                <button onClick={closeModal} className="absolute top-[23px] right-[36px]">
                    <X size={41} className="color-[#878797] opacity-50 hover:opacity-80"></X>
                </button>
                <h2 className="mb-[5px] text46px_desktop font-medium text-gradient_desktop_custom uppercase">
                    {profession}
                </h2>
                {contentProfessionAboutDesktop.map((item) => (
                    <p
                        key={item.id}
                        className="max-w-[1190px] mr-[clamp(56px,_4.6vw,_88px)] text18px_modal_desktop text-[#878797]"
                    >
                        {item.text}
                    </p>
                ))}
                <h3 className="mt-[clamp(33px,_2.7vw,_52px)] mb-[clamp(25px,_2vw,_39px)] text28px_modal_desktop uppercase">
                    компании для стажировки:
                </h3>
                <InternshipCompaniesModalDesktop />
                <h3 className="mt-[clamp(32px,_2.6vw,_50px)] mb-[clamp(26px,_2vw,_40px)] text28px_modal_desktop uppercase">
                    отзывы о профессии
                </h3>
                <ReviewsModalDesktop />
            </div>
        </Modal>
    )
}

export default ProfessionModalDesktop
