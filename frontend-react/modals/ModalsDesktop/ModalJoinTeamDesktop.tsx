import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PhoneInputDesktop from '@/components/desktop/shared/formInput/PhoneInputDesktop'
import { AttachFileIconDesktop } from '@/components/assets/icons'

interface IFormData {
    name: string
    phoneNumber: string
    proffesion: string
    agree: boolean
}

interface IModalContent {
    onClose: () => void
}

const ModalJoinTeamDesktop: React.FC<IModalContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        phoneNumber: '',
        proffesion: '',
        agree: false,
    })

    return (
        <Modal onClose={onClose} size="large" showCloseButton={true}>
            <div className="flex items-center justify-center p-[100px]">
                <h2 className="text36px_desktop text-gradient_desktop_custom font-medium uppercase leading-[100%] tracking-normal ">
                    Хотите работать у нас?
                </h2>
                <p className="treacking-[0] text-[#878797]text-[28px] leading-[100%]">
                    Заполните поля – и мы с вами свяжемся
                </p>
                <form onSubmit={handleSubmit}>
                    <EnhancedInput />
                    <PhoneInputDesktop />
                    <EnhancedInput />
                    <p className="text-[18px] font-medium leading-[100%] tracking-normal text-[#353652]">
                        *Обязательное поле для ввода
                    </p>
                    <div className="flex gap-[12px] align-middle">
                        <AttachFileIconDesktop />
                        <p className="text-[24px] font-semibold leading-[100%] tracking-normal text-[#FFFFFF]">
                            Прикрепите резюме
                        </p>
                    </div>
                    <EnhancedInput />
                    <p className="text-[24px] font-medium leading-[100%] tracking-normal text-[#353652]">
                        Защита от спама reCAPTCHA <a href="/example">Конфиденциальность</a> и
                        <a href="/example">Условия использования</a>
                    </p>
                    <Button>Оставить заявку</Button>
                </form>
            </div>
        </Modal>
    )
}

export default ModalJoinTeamDesktop
