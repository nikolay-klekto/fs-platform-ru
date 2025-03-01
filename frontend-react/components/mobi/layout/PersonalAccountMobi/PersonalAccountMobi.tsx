import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { ChevronLeft } from 'lucide-react'

const PersonalAccountMobi: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('КОРЗИНА')

    const options = ['КОРЗИНА', 'МОЙ ПРОФИЛЬ', 'ТРЕБУЮЩИЕ ОПЛАТЫ', 'ПРЕДСТОЯЩИЕ СТАЖИРОВКИ', 'АРХИВ']

    const handleSelectOption = (option: string) => {
        setSelectedOption(option)
        setMenuOpen(false)
    }

    const getContentText = () => {
        switch (selectedOption) {
            case 'КОРЗИНА':
                return 'Ваша корзина пуста'
            case 'МОЙ ПРОФИЛЬ':
                return 'Раздел с информацией'
            case 'ТРЕБУЮЩИЕ ОПЛАТЫ':
                return 'Нет счетов'
            default:
                return 'Информация отсутствует'
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-[#101030] ">
            <h2 className="title28px_mobi_custom mb-4">ЛИЧНЫЙ КАБИНЕТ</h2>

            <div
                className="text-text22px_mobi hover:bg-sub-title-gradient-mobi relative mb-12
                cursor-pointer text-[#878797] hover:bg-clip-text hover:text-transparent "
            >
                <button
                    className="bg-sub-title-gradient-mobi flex cursor-pointer items-center bg-clip-text text-transparent"
                    onClick={() => setMenuOpen(true)}
                >
                    {selectedOption}
                    <div className="-rotate-90">
                        <ChevronLeft size={30} color="#8333F3" />
                    </div>
                </button>
            </div>

            <p className="text-text22px_mobi mb-6 text-center text-[#353652]">{getContentText()}</p>
            <div className="bg-sub-title-gradient-mobi mx-auto flex w-4/5 items-center justify-center rounded-[50px] p-[3px]">
                <button type="button" className="text-text16px_mobi h-12 w-full rounded-[55px] bg-[#101030] text-white">
                    Выбрать стажировку
                </button>
            </div>
            {menuOpen && (
                <Modal onClose={() => setMenuOpen(false)} size="small" showCloseButton={false}>
                    <div className="z-50 flex flex-col space-y-4 p-6 text-center">
                        {options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSelectOption(option)}
                                className="hover:bg-gradient-desktop cursor-pointer text-[#878797]  hover:bg-clip-text hover:text-transparent hover:underline
                            "
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default PersonalAccountMobi
