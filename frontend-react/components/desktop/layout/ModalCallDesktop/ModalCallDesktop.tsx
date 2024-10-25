import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'

export default function ModalCallFDesktop() {
    const [isModalOpen, setModalOpen] = useState(false)

    const handleOpenModal = () => setModalOpen(true)
    const handleCloseModal = () => setModalOpen(false)

    return (
        <div>
            <button onClick={handleOpenModal}>открыть модальное окно</button>
            <Modal show={isModalOpen} onClose={handleCloseModal} size="medium" showCloseButton={true}>
                <h1>Заказать звонок</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name">Ваше имя*</label>
                        <input type="text" id="name" name="name" placeholder="Введите ваше имя" />
                    </div>
                    <div>
                        <label htmlFor="phone">Номер телефона*</label>
                        <input type="tel" id="phone" name="phone" placeholder="+375 (__) ___-__-__" />
                    </div>
                    <div>
                        <label htmlFor="time">Удобное время для звонка</label>
                        <input type="text" id="time" name="time" placeholder="Введите удобное время для звонка" />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="consent" className="mr-2" />
                        <label htmlFor="consent" className="text-sm text-[#A9A9C4]">
                            Я согласен(а) на обработку персональных данных
                        </label>
                    </div>

                    <Button type="submit" variant="default" size="default" className="w-full">
                        Оставить заявку
                    </Button>
                </form>
            </Modal>
        </div>
    )
}
