'use client'
import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ModalFeedbackDesktopProps {
    onClose: () => void
}

const ModalFeedbackDesktop: React.FC<ModalFeedbackDesktopProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<string>('')
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
        onClose()
    }
    const borderColor = error || formData.length === 500 ? 'border-[#BC8070]' : 'border-[#878797]'
    const counterColor = error || formData.length === 500 ? '#BC8070' : '#878797'
    return (
        <>
            <Modal onClose={onClose} size="semilarge" showCloseButton={false}>
                <div>
                    <button onClick={onClose} className="absolute right-[23px] top-6">
                        <X size={41} color="white" className="opacity-70" />
                    </button>
                </div>
                <div className="mx-auto mt-[60px] flex min-w-[578px] max-w-lg flex-col  items-start rounded-lg">
                    <h2 className="bg-gradient-desktop bg-clip-text text-[36px] font-medium leading-[44px] text-transparent">
                        ОТЗЫВ О СТАЖИРОВКЕ
                    </h2>
                    <p className="text-[24px] font-medium text-white  ">Программист в компании EPAM</p>
                    <p className="pt-2.5 text-[15px] font-medium  text-[#878797]">
                        25.10.2023 - 18.10.2023, Стажировка наблюдателя
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-5 flex flex-col items-center px-5">
                    <div className="relative mb-5 flex flex-col">
                        <textarea
                            name="text"
                            value={formData}
                            onChange={handleChange}
                            maxLength={500}
                            className={`min-h-[192px] min-w-[578px] rounded-3xl border-2 bg-transparent p-[15px] ${borderColor} overflow-hidden text-[15px] font-medium leading-[18px] text-[#878797] outline-none`}
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
