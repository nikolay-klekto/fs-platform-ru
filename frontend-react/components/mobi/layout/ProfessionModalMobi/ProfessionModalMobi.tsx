'use client'

import React from 'react'
import Modal from '@/components/ui/modal'
import { contentProfessionAboutMobi } from './content'
import InternshipCompaniesModalMobi from './InternshipCompaniesModalMobi'
import ReviewsModalMobi from './ReviewsModalMobi'

interface ProfessionModalMobiProps {
    closeModal: () => void
    profession: string
    professionId: number | null
}

const ProfessionModalMobi: React.FC<ProfessionModalMobiProps> = ({ closeModal, profession, professionId }) => {
    return (
        <Modal show={true} onClose={closeModal} showCloseButton={false} className="px-[15px]">
            <div className="flex flex-col py-10 gap-10 sm_s:py-8 sm_s:gap-8 sm:py-8 sm:gap-8">
                <div className="flex flex-col justify-center px-3 gap-[30px] sm_s:gap-[25px] sm:gap-[25px]">
                    <h2 className="text28px_mobi font-medium text-gradient_desktop_custom uppercase text-center">
                        {profession}
                    </h2>
                    {contentProfessionAboutMobi.map((item) => (
                        <p key={item.id} className="text14px_mobi text-[#878797]">
                            {item.text}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col pl-3 gap-6 sm_s:gap-5 sm:gap-5">
                    <h3 className="text18px_mobi font-semibold text-white uppercase">компании для стажировки:</h3>
                    <InternshipCompaniesModalMobi />
                </div>
                <div className="flex flex-col pl-3 gap-6 sm_s:gap-5 sm:gap-5">
                    <h3 className="text18px_mobi font-semibold text-white uppercase">отзывы о профессии</h3>
                    <ReviewsModalMobi />
                </div>
            </div>
        </Modal>
    )
}

export default ProfessionModalMobi
