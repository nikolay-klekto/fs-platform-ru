'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'

interface LoginFormData {
    email: string
    password: string
}

interface LoginModalDesktopProps {
    triggerOpen?: (openModal: () => void) => void
}
const LoginModalDesktop: React.FC<LoginModalDesktopProps> = ({ triggerOpen }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    })
    const [showModal, setShowModal] = useState(false)

    const handleOpen = () => setShowModal(true)
    const handleClose = () => setShowModal(false)

    const handleChange = (field: keyof LoginFormData, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Валидацию добавить CЮДА!!!!
        console.log('Данные формы:', formData)
        handleClose()
    }

    useEffect(() => {
        if (triggerOpen) {
            triggerOpen(handleOpen)
        }
    }, [triggerOpen])

    return (
        <div className="flex justify-center">
            <Modal show={showModal} onClose={handleClose} size="medium">
                <h2 className="mb-1 text-13xl font-medium bg-gradient-desktop bg-clip-text text-transparent uppercase">
                    Вход
                </h2>
                <form onSubmit={handleSubmit}>
                    <EnhancedInput
                        label="Почта"
                        type="email"
                        placeholder="Почта"
                        value={formData.email}
                        onChange={(value) => handleChange('email', value)}
                        required
                    />
                    <EnhancedInput
                        label="Пароль"
                        type="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={(value) => handleChange('password', value)}
                        required
                    />
                    <button className="bg-transparent border-transparent">Забыли пароль?</button>
                    <div>
                        <p className="text-[#878797]">
                            Защита от спама reCAPTCHA.{' '}
                            <Link href="/contacts" target="_blank" rel="noopener noreferrer" className="underline">
                                Конфиденциальность
                            </Link>{' '}
                            и{' '}
                            <Link href="/" target="_blank" rel="noopener noreferrer" className="underline">
                                Условия использования
                            </Link>
                        </p>
                    </div>
                    <Button
                        type="submit"
                        variant="default"
                        size="btn_modal_desktop"
                        className="px-20 mx-auto bg-gradient-desktop text-5xl font-semibold rounded-full py-8 mt-1 hover:bg-gradient-desktop-hover"
                    >
                        Войти
                    </Button>
                </form>
                <div className="flex justify-center">
                    <p>Нет аккаунта?</p>
                    <button className="underline bg-transparent border-transparent">Зарегистрироваться</button>
                    {/* <Link href="#" className="underline">
                        Зарегистрироваться
                    </Link> */}
                </div>
            </Modal>
        </div>
    )
}

export default LoginModalDesktop
