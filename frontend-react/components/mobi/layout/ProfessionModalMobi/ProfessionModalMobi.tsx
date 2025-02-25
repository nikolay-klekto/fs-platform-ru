'use client'

import React from 'react'
import Modal from '@/components/ui/modal'
import { contentProfessionAboutMobi } from './content'
import InternshipCompaniesModalMobi from './InternshipCompaniesModalMobi'
import ReviewsModalMobi from './ReviewsModalMobi'

interface ProfessionModalMobiProps {
    onClose: () => void
    profession: string
    professionId: number | null
}

const ProfessionModalMobi: React.FC<ProfessionModalMobiProps> = ({ onClose, profession }) => {
    return (
        <Modal onClose={onClose} showCloseButton={false} className="px-[15px]">
            <div className="sm_s:py-8 sm_s:gap-8 flex flex-col gap-10 py-10 sm:gap-8 sm:py-8">
                <div className="sm_s:gap-[25px] flex flex-col justify-center gap-[30px] px-3 sm:gap-[25px]">
                    <h2 className="text28px_mobi text-gradient_desktop_custom text-center font-medium uppercase">
                        {profession}
                    </h2>
                    {contentProfessionAboutMobi.map((item) => (
                        <p key={item.id} className="text14px_mobi text-[#878797]">
                            {item.text}
                        </p>
                    ))}
                </div>
                <div className="sm_s:gap-5 flex flex-col gap-6 pl-3 sm:gap-5">
                    <h3 className="text18px_mobi font-semibold uppercase text-white">компании для стажировки:</h3>
                    <InternshipCompaniesModalMobi />
                </div>
                <div className="sm_s:gap-5 flex flex-col gap-6 pl-3 sm:gap-5">
                    <h3 className="text18px_mobi font-semibold uppercase text-white">отзывы о профессии</h3>
                    <ReviewsModalMobi />
                </div>
            </div>
        </Modal>
    )
}

export default ProfessionModalMobi
