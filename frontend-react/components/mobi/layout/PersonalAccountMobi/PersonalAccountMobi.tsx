import React, { useState } from 'react'
import Modal from '@/components/ui/Modal'
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
        <div className="flex justify-center flex-col items-center bg-[#101030] ">
            <h2 className="title28px_mobi_custom mb-4">ЛИЧНЫЙ КАБИНЕТ</h2>

            <div
                className="text-text22px_mobi text-[#878797] mb-12 relative
                hover:bg-sub-title-gradient-mobi hover:bg-clip-text hover:text-transparent cursor-pointer "
            >
                <button
                    className="cursor-pointer flex items-center
                     bg-sub-title-gradient-mobi bg-clip-text text-transparent"
                    onClick={() => setMenuOpen(true)}
                >
                    {selectedOption}
                    <div className="-rotate-90">
                        <ChevronLeft size={30} color="#8333F3" />
                    </div>
                </button>
            </div>

            <p
                className="text-text22px_mobi text-center text-[#353652] mb-6
             "
            >
                {getContentText()}
            </p>
            <div className="flex justify-center items-center w-4/5 mx-auto p-[3px] rounded-[50px] bg-sub-title-gradient-mobi">
                <button type="button" className="w-full h-12 bg-[#101030] rounded-[55px] text-text16px_mobi text-white">
                    Выбрать стажировку
                </button>
            </div>
            <Modal show={menuOpen} onClose={() => setMenuOpen(false)} size="small" showCloseButton={false}>
                <div className="flex flex-col p-6 text-center space-y-4 z-50">
                    {options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSelectOption(option)}
                            className="text-[#878797] cursor-pointer hover:underline  hover:bg-gradient-desktop hover:bg-clip-text hover:text-transparent
                            "
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </Modal>
        </div>
    )
}

export default PersonalAccountMobi
