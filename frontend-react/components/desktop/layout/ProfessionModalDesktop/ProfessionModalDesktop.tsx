'use client'

import React from 'react'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { contentProfessionAboutDesktop } from './content'
import InternshipCompaniesModalDesktop from './InternshipCompaniesModalDesktop'
import ReviewsModalDesktop from './ReviewsModalDesktop'

interface IProfessionModal {
    onClose: () => void
    profession: string
    professionId: number | null
}

const ProfessionModalDesktop: React.FC<IProfessionModal> = ({ onClose, profession }) => {
    return (
        <Modal onClose={onClose} size="large-l" showCloseButton={false} className="px-[clamp(180px,_14vw,_277px)]">
            <div className="modal-padding-content-lg-dsk flex flex-col">
                <button onClick={onClose} className="absolute right-[36px] top-[23px]">
                    <X size={41} className="color-[#878797] opacity-50 hover:opacity-80"></X>
                </button>
                <h2 className="text46px_desktop text-gradient_desktop_custom mb-[5px] font-medium uppercase">
                    {profession}
                </h2>
                {contentProfessionAboutDesktop.map((item) => (
                    <p
                        key={item.id}
                        className="text18px_modal_desktop mr-[clamp(56px,_4.6vw,_88px)] max-w-[1190px] text-[#878797]"
                    >
                        {item.text}
                    </p>
                ))}
                <h3 className="text28px_modal_desktop mb-[clamp(25px,_2vw,_39px)] mt-[clamp(33px,_2.7vw,_52px)] uppercase">
                    компании для стажировки:
                </h3>
                <InternshipCompaniesModalDesktop />
                <h3 className="text28px_modal_desktop mb-[clamp(26px,_2vw,_40px)] mt-[clamp(32px,_2.6vw,_50px)] uppercase">
                    отзывы о профессии
                </h3>
                <ReviewsModalDesktop />
            </div>
        </Modal>
    )
}

export default ProfessionModalDesktop
