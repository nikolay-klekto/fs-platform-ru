import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PhoneInputDesktop from '@/components/desktop/shared/formInput/PhoneInputDesktop'
import { AttachFileIconDesktop, CloseModalBtnDesktop } from '@/components/assets/icons'

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
        <Modal onClose={onClose} size="large" showCloseButton={false}>
            <div className="absolute right-[36px] top-[36px]">
                <CloseModalBtnDesktop />
            </div>
            <div className="flex flex-col  p-[100px]">
                <h2 className="text-gradient_desktop_custom mb-[10px] text-center text-[48px] font-medium uppercase leading-[100%] tracking-normal">
                    Хотите работать у нас?
                </h2>
                <p className="treacking-[0] mb-[33px] text-[28px] leading-[100%] text-[#878797]">
                    Заполните поля – и мы с вами свяжемся
                </p>
                <form>
                    <EnhancedInput
                        type="text"
                        name="name"
                        className={`${
                            inputTouched.name && validateNameDesktop(formData.name).styleError
                                ? 'border-[#bc8070]'
                                : 'border-[#878797]'
                        } mb-[24px] h-10 w-full rounded-[50px] border-2 bg-transparent p-3 text-xl font-medium text-white focus-visible:ring-offset-0`}
                        label="Ваше имя"
                        labelClassName="font-semibold text-[20px] text-white mb-[16px] leading-[100%] tracking-normal"
                        placeholder="Ваше имя*"
                        wrapperClassName="w-full"
                    />
                    <PhoneInputDesktop
                        className="mb-[24px]"
                        labelClassName="font-semibold text-[20px] text-white mb-[16px] leading-[100%] tracking-normal"
                    />
                    <EnhancedInput
                        type="text"
                        name="profession"
                        className="mb-[15px]"
                        label="Укажите профессию*"
                        labelClassName="font-semibold text-[20px] text-white mb-[16px] leading-[100%] tracking-normal"
                        placeholder="Укажите вашу профессию"
                        wrapperClassName="w-full"
                    />
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
