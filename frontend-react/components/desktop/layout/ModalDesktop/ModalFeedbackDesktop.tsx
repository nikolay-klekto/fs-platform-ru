'use client'
import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

const ModalFeedbackDesktop: React.FC = () => {
    const [formData, setFormData] = useState<string>('')
    const [isModalOpen, setModalOpen] = useState(true)
    const handleOpenModal = () => setModalOpen(true)
    const handleCloseModal = () => setModalOpen(false)
    const [error, setError] = useState<string | null>(null)
    const [isTyping, setIsTyping] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        if (value.length <= 500) {
            setFormData(value)
            setError(null)
            setIsTyping(value.length > 0)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.trim()) {
            setError('Пожалуйста, введите текст отзыва')
            return
        }
        setFormData('')
        setIsTyping(false)
        handleCloseModal()
    }
    const borderColor = error || formData.length === 500 ? 'border-[#BC8070]' : 'border-[#878797]'
    const counterColor = error || formData.length === 500 ? '#BC8070' : '#878797'
    return (
        <>
            <Modal show={isModalOpen} onClose={handleCloseModal} size="semilarge" showCloseButton={false}>
                <div>
                    <button onClick={handleCloseModal} className="absolute top-6 right-[23px]">
                        <X size={41} color="white" className="opacity-70" />
                    </button>
                </div>
                <div className="flex flex-col rounded-lg max-w-lg mx-auto items-start  min-w-[578px] mt-[60px]">
                    <h2 className="text-[36px] font-medium bg-gradient-desktop bg-clip-text text-transparent leading-[44px]">
                        ОТЗЫВ О СТАЖИРОВКЕ
                    </h2>
                    <p className="text-[24px] font-medium text-[#fff]  ">Программист в компании EPAM</p>
                    <p className="text-[15px] font-medium text-[#878797]  pt-2.5">
                        25.10.2023 - 18.10.2023, Стажировка наблюдателя
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center pl-5 pr-5 mt-5">
                    <div className="relative flex flex-col mb-5">
                        <textarea
                            name="text"
                            value={formData}
                            onChange={handleChange}
                            maxLength={500}
                            className={`rounded-3xl min-w-[578px] min-h-[192px] px-[15px] py-[15px] bg-transparent border-[2px] ${borderColor} text-[#878797] text-[15px] font-medium leading-[18px] overflow-hidden outline-none`}
                            style={{ backgroundColor: isTyping ? '#1f203f' : 'transparent' }}
                        />
                        <span className="absolute bottom-[15px] right-5 text-[10px]" style={{ color: counterColor }}>
                            {formData.length}/500
                        </span>
                    </div>
                    <Button
                        type="submit"
                        variant={'send_btn_desktop'}
                        size={'gradient_btn_desktop'}
                        className="mb-10 hover:border"
                    >
                        Сохранить отзыв
                    </Button>
                </form>
            </Modal>
        </>
    )
}
export default ModalFeedbackDesktop
