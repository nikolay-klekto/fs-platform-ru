import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { ChevronLeft } from 'lucide-react'
import RequiringPaymentMobi from '@/components/mobi/pageMobi/PersonalAccountPageMobi/components/RequiringPaymentMobi/RequiringPaymentMobi'
import OrderPaymentMobi from '@/components/mobi/pageMobi/PersonalAccountPageMobi/components/OrderPaymentMobi/OrderPaymentMobi'
import HeaderMobi from '../../layout/HeaderMobi/HeaderMobi'
import FooterMobi from '../../layout/FooterMobi/FooterMobi'

const ProfilePageMobi: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('КОРЗИНА')

    const options = ['МОЙ ПРОФИЛЬ', 'ТРЕБУЮЩИЕ ОПЛАТЫ', 'ПРЕДСТОЯЩИЕ СТАЖИРОВКИ', 'АРХИВ', 'КОРЗИНА']

    const handleSelectOption = (option: string) => {
        setSelectedOption(option)
        setMenuOpen(false)
    }

    const getContentText = () => {
        switch (selectedOption) {
            case 'МОЙ ПРОФИЛЬ':
                return 'Раздел с информацией'
            case 'ТРЕБУЮЩИЕ ОПЛАТЫ':
                return <OrderPaymentMobi />
            case 'КОРЗИНА':
                return <RequiringPaymentMobi />
            default:
                return 'Информация отсутствует'
        }
    }

    return (
        <>
            <HeaderMobi />
            <main className="flex flex-col items-center justify-center bg-[#101030] px-[15px] pt-[40px]">
                <h2 className="title28px_mobi_custom mb-4">ЛИЧНЫЙ КАБИНЕТ</h2>

                <div
                    className="text-text22px_mobi hover:bg-sub-title-gradient-mobi relative 
                cursor-pointer text-[#878797] hover:bg-clip-text hover:text-transparent "
                >
                    <button
                        className="bg-sub-title-gradient-mobi flex items-center bg-clip-text text-transparent underline decoration-[#6C41F3] decoration-1 underline-offset-4"
                        onClick={() => setMenuOpen(true)}
                    >
                        {selectedOption}
                        <div className="-rotate-90">
                            <ChevronLeft size={30} color="#8333F3" />
                        </div>
                    </button>
                </div>

                <p className="text-text22px_mobi text-center text-[#353652]">{getContentText()}</p>
                {menuOpen && (
                    <Modal onClose={() => setMenuOpen(false)} size="small" showCloseButton={false}>
                        <div className="z-50 flex flex-col space-y-4 py-[36px] text-center">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleSelectOption(option)}
                                    className="hover:bg-gradient-desktop text18px_mobi cursor-pointer  text-[#878797] hover:bg-clip-text hover:text-transparent hover:underline"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </Modal>
                )}
            </main>
            <FooterMobi />
        </>
    )
}

export default ProfilePageMobi
