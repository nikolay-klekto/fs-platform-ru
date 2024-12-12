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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        if (value.length <= 500) {
            setFormData(value)
            setError(null)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.trim()) {
            setError('Пожалуйста, введите текст отзыва')
            return
        }
        setFormData('')
        handleCloseModal()
    }

    return (
        <>
            <Modal show={isModalOpen} onClose={handleCloseModal} size="semilarge" showCloseButton={false}>
                <div>
                    <button onClick={handleCloseModal} className="absolute top-4 right-4">
                        <X size={35} color="white" className="opacity-70" />
                    </button>
                </div>
                <div className="flex flex-col rounded-lg max-w-lg mx-auto items-start  min-w-[578px] mt-[46px]">
                    <h1 className="text-13xl font-medium bg-gradient-desktop bg-clip-text text-transparent ">
                        ОТЗЫВ О СТАЖИРОВКЕ
                    </h1>
                    <p className="text-7xl font-medium text-[#fff] shadow-md ">Программист в компании EPAM</p>
                    <p className="text-xl font-medium text-[#878797] shadow-md pt-2.5">
                        25.10.2023 -18.10.2023, Стажировка наблюдателя
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col items-center pl-5 pr-5 mt-5">
                    <div className="relative flex flex-col mb-5">
                        <textarea
                            name="text"
                            id=""
                            value={formData}
                            onChange={handleChange}
                            maxLength={500}
                            className="rounded-3xl min-w-[578px] min-h-[192px] px-4 py-5 bg-transparent border border-[#878797]  outline-[#878797] "
                        />
                        <span className="absolute bottom-4 right-4 text-sm text-gray-500">{formData.length}/500</span>
                    </div>
                    {error && <p className="mb-3 text-2xl text-[red] self-center">{error}</p>}
                    <Button type="submit" variant={'select_desktop'} size={'gradient_border_btn'} className="mb-4">
                        Сохранить отзыв
                    </Button>
                </form>
            </Modal>
        </>
    )
}
export default ModalFeedbackDesktop
