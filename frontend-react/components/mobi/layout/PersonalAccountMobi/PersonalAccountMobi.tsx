import React, { useState } from 'react'
import Modal from '@/components/ui/Modal'

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
        <div className="flex justify-center flex-col items-center bg-[#101030] relative min-h-screen">
            <h2 className="title28px_mobi_custom mb-4">ЛИЧНЫЙ КАБИНЕТ</h2>

            <div
                className="text-text22px_mobi text-[#878797] mb-12 relative
                hover:bg-sub-title-gradient-mobi hover:bg-clip-text hover:text-transparent cursor-pointer "
            >
                <button className="hover:underline cursor-pointer flex items-center" onClick={() => setMenuOpen(true)}>
                    {selectedOption} <span className="ml-1 text-text18px_mobi">&#9660;</span>
                </button>
            </div>

            <p
                className="text-text22px_mobi text-center text-[#353652] mb-6
            hover:bg-sub-title-gradient-mobi hover:bg-clip-text hover:text-transparent cursor-pointer"
            >
                {getContentText()}
            </p>
            <div className="flex justify-center items-center w-4/5 mx-auto p-[3px] rounded-[50px] bg-sub-title-gradient-mobi">
                <button type="button" className="w-full h-12 bg-[#101030] rounded-[55px] text-text16px_mobi text-white">
                    Выбрать стажировку
                </button>
            </div>
            <Modal show={menuOpen} onClose={() => setMenuOpen(false)} size="small" showCloseButton={false}>
                <div className="p-6 text-center space-y-4">
                    {options.map((option) => (
                        <div
                            key={option}
                            onClick={() => handleSelectOption(option)}
                            className="block text-text18px_mobi text-white 
hover:bg-sub-title-gradient-mobi hover:bg-clip-text hover:text-transparent cursor-pointer"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    )
}

export default PersonalAccountMobi
