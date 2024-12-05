'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { EyeOffPasswordDesktop } from '@/components/assets/icons'
import { EyeOnPasswordDesktop } from '@/components/assets/icons'
import Link from 'next/link'
import { EnhancedInput } from '@/components/ui/input'
import { validateEmailDesktop } from '../../commonDesktop/validate/validateEmailDesktop'

interface LoginFormData {
    email: string
    password: string
}

interface LoginModalDesktopProps {
    closeModal: () => void
    openRegistrationModal: () => void
}

const LoginModalDesktop: React.FC<LoginModalDesktopProps> = ({ closeModal, openRegistrationModal }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    })

    // const [showModal, setShowModal] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // const handleOpen = () => setShowModal(true)
    // const handleClose = () => setShowModal(false)

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
        // handleClose()
        closeModal()
    }

    return (
        <Modal show={true} onClose={closeModal} size="medium" showCloseButton={false}>
            <div className="flex flex-col justify-center items-center pt-[40px] pb-[30px] w-[73%] mx-auto">
                <button onClick={closeModal} className="absolute top-[5%] right-[5%] w-[7%]">
                    <X size={41} color="white" className="opacity-70 w-full" />
                </button>
                <h2 className="mb-7 text36px_desktop font-medium text-gradient_desktop_custom uppercase inline">
                    Вход
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col align-middle w-full">
                    <EnhancedInput
                        label="Почта"
                        type="email"
                        placeholder="Почта"
                        value={formData.email}
                        onChange={(value) => handleChange('email', value)}
                        validate={(value) => validateEmailDesktop(value)}
                        className="mt-1 text-white border text-[18px] 4xl:text-2xl 3xl:text-xl 2xl:text-lg border-[#878797] bg-[#101030] rounded-[50px] p-4 placeholder:text18px_desktop  placeholder:font-medium placeholder:text-[#353652] focus:border focus:border-[#878797] focus:outline-none
  focus:bg-[#1f203f]"
                        labelClassName="text-white text-2xl 4xl:text-lg 3xl:text-base 2xl:text-base font-semibold"
                    />
                    <div className="relative mt-5">
                        <EnhancedInput
                            label="Пароль"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Пароль"
                            value={formData.password}
                            onChange={(value) => handleChange('password', value)}
                            className="mt-1 text-white border text-[18px] 4xl:text-2xl 3xl:text-xl 2xl:text-lg border-[#878797] bg-[#101030] rounded-[50px] p-4 placeholder:text18px_desktop  placeholder:font-medium placeholder:text-[#353652] focus:border focus:border-[#878797] focus:outline-none
  focus:bg-[#1f203f]"
                            labelClassName="text-white text-2xl 4xl:text-lg 3xl:text-base 2xl:text-base font-semibold"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute bottom-[10%] right-4 flex items-center text-[#878797]"
                        >
                            {showPassword ? <EyeOnPasswordDesktop /> : <EyeOffPasswordDesktop />}
                        </button>
                    </div>
                    <button className="mt-3 bg-transparent border-transparent self-end text-[#878797] font-semibold text-2xl 4xl:text-lg 3xl:text-base 2xl:text-base">
                        Забыли пароль?
                    </button>
                    <div className="w-[95%]">
                        <p className="mt-3 text-[#353652] font-medium text-2xl 4xl:text-lg 3xl:text-base 2xl:text-base">
                            Защита от спама reCAPTCHA{' '}
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
                        className="mx-auto bg-gradient-desktop text-5xl 4xl:text-3xl 3xl:text-2xl 2xl:text-lg font-semibold rounded-[50px] mt-6 hover:bg-gradient-desktop-hover w-[64%]"
                    >
                        Войти
                    </Button>
                </form>
                <div className="mt-5 flex justify-center text-2xl 4xl:text-lg 3xl:text-base 2xl:text-base">
                    <p className="mr-2 text-[#878797] font-medium">Нет аккаунта?</p>
                    <button
                        className="underline bg-transparent border-transparent text-white font-medium"
                        onClick={openRegistrationModal}
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default LoginModalDesktop
