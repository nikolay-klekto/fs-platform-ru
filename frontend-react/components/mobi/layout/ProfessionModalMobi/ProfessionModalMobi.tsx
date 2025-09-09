'use client'

import React from 'react'
import Modal from '@/components/ui/modal'
import InternshipCompaniesModalMobi from './InternshipCompaniesModalMobi'
import ReviewsModalMobi from './ReviewsModalMobi'
import { useDataContext } from '@/context/DataContext'

interface IProfessionModal {
    onClose: () => void
    profession: string
    professionId: string
}

const ProfessionModalMobi: React.FC<IProfessionModal> = ({ onClose, profession, professionId }) => {
    const { professions } = useDataContext()

    const description = professions.find((item) => item.id === professionId)?.description || ''

    return (
        <Modal onClose={onClose} showCloseButton={false} className="px-[15px]">
            <div className="sm_s:py-8 sm_s:gap-8 flex flex-col gap-10 py-10 sm:gap-8 sm:py-8">
                <div className="sm_s:gap-[25px] flex flex-col justify-center gap-[30px] px-3 sm:gap-[25px]">
                    <h2 className="text28px_mobi text-gradient_desktop_custom text-center font-medium uppercase">
                        {profession} 
                    </h2>
                        <p className="text14px_mobi text-[#878797]">
                            {description}
                        </p>
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
