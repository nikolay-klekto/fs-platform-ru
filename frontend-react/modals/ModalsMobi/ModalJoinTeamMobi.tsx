import React, { useState, useRef } from 'react'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PhoneInputMobi from '@/components/mobi/shared/formInput/PhoneInputMobi'
import { AttachFileIconMobi } from '@/components/assets/iconsMobi'

interface IFormData {
    name: string
    phoneNumber: string
    profession: string
    consent: boolean
}

interface IModalContent {
    onClose: () => void
}

const ModalJoinTeamMobi: React.FC<IModalContent> = ({ onClose }) => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        phoneNumber: '',
        profession: '',
        consent: false,
    })

    const [errors, setErrors] = useState<{
        name: boolean
        phoneNumber: boolean
        profession: boolean
        consent: boolean
        fileError: string | null
    }>({
        name: false,
        phoneNumber: false,
        profession: false,
        consent: false,
        fileError: null,
    })

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }
    const MAX_FILE_SIZE_MB = 0.005
    const ALLOWED_FILE_TYPES = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const isFileSizeValid = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024
        if (!isFileSizeValid) {
            setErrors((prev) => ({ ...prev, fileError: 'Файл слишком большой. Максимальный размер 5MB.' }))
            return
        }

        const isFileTypeValid = ALLOWED_FILE_TYPES.includes(file.type)
        if (!isFileTypeValid) {
            setErrors((prev) => ({ ...prev, fileError: 'Неверный формат файла. Разрешены только PDF, DOC, DOCX.' }))
            return
        }

        setSelectedFile(file)
        setErrors((prev) => ({ ...prev, fileError: null }))
    }

    const validateForm = () => {
        const newErrors = {
            name: !formData.name.trim(),
            phoneNumber: !formData.phoneNumber.trim(),
            profession: !formData.profession.trim(),
            consent: !formData.consent,
            fileError: null,
        }

        setErrors(newErrors)

        return !Object.values(newErrors).some(Boolean)
    }

    const handleBlur = (field: keyof IFormData) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: !formData[field],
        }))
    }

    const handleChange = (field: keyof IFormData) => (value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: field === 'consent' ? value === 'true' : value,
        }))

        setErrors((prev) => ({
            ...prev,
            [field]: field === 'consent' ? !(value === 'true') : !value.trim(),
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = validateForm()
        if (!isValid) return

        const cleanedPhone = normalizePhone(formData.phoneNumber)
    }

    const normalizePhone = (value: string) => {
        return value.replace(/[^\d+]/g, '')
    }

    const renderErrors = () => {
        const hasFieldErrors = errors.name || errors.phoneNumber || errors.profession || errors.consent
        const hasFileError = !!errors.fileError

        return (
            <>
                {hasFieldErrors && (
                    <p className="mb-[8px] text-[18px] font-medium leading-[100%] tracking-normal text-[#bc8070]">
                        Заполните обязательные поля
                    </p>
                )}
                {hasFileError && (
                    <p className="mb-[8px] text-[18px] font-medium leading-[100%] tracking-normal text-[#bc8070]">
                        {errors.fileError}
                    </p>
                )}
                {!hasFieldErrors && !hasFileError && (
                    <p className="mb-[14px] text-[18px] font-medium leading-[100%] tracking-normal text-[#353652]">
                        *Обязательное поле для ввода
                    </p>
                )}
            </>
        )
    }

    return (
        <Modal onClose={onClose} size="large" showCloseButton={false}>
            <button onClick={onClose} className="absolute right-[30px] top-[30px]">
                <X size={71} color="#878797" className="opacity-50 hover:opacity-100" />
            </button>
            <div className="flex flex-col p-[100px]">
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
                        value={formData.name}
                        onBlur={() => handleBlur('name')}
                        onChange={handleChange('name')}
                        className={`${
                            errors.name ? 'border-[#bc8070]' : 'border-[#878797]'
                        } mb-[24px] h-10 w-full rounded-[50px] border-2 bg-transparent p-3 text-xl font-medium text-white placeholder:text-[#353652] focus-visible:ring-offset-0`}
                        label="Ваше имя*"
                        labelClassName="font-semibold text-[20px] text-white mb-[16px] leading-[100%] tracking-normal"
                        placeholder="Ваше имя*"
                        wrapperClassName="w-full"
                    />
                    <PhoneInputMobi
                        value={formData.phoneNumber}
                        className={`mb-[24px] ${errors.phoneNumber ? 'border-[#bc8070]' : 'border-[#878797]'}`}
                        onBlur={() => handleBlur('phoneNumber')}
                        onChange={handleChange('phoneNumber')}
                        onError={() => {}}
                        labelClassName="font-semibold text-[20px] text-white mb-[16px] leading-[100%] tracking-normal"
                    />
                    <EnhancedInput
                        type="text"
                        name="profession"
                        value={formData.profession}
                        className={`${
                            errors.profession ? 'border-[#bc8070]' : 'border-[#878797]'
                        } mb-[24px] h-10 w-full rounded-[50px] border-2 bg-transparent p-3 text-xl font-medium text-white placeholder:text-[#353652] focus-visible:ring-offset-0`}
                        onBlur={() => handleBlur('profession')}
                        onChange={handleChange('profession')}
                        label="Укажите профессию*"
                        labelClassName="font-semibold text-[20px] text-white mb-[16px] leading-[100%] tracking-normal"
                        placeholder="Укажите вашу профессию"
                        wrapperClassName="w-full"
                    />
                    <div>{renderErrors()}</div>
                    <div className="mb-[44px] flex items-center gap-[12px]">
                        <button
                            type="button"
                            onClick={openFileDialog}
                            className="bg-gradient-desktop hover:bg-gradient-desktop-hover flex size-[58px] items-center justify-center rounded-full"
                        >
                            <AttachFileIconMobi className="text-white" />
                        </button>
                        {selectedFile ? (
                            <p className="text-[24px] font-semibold leading-[100%] tracking-normal text-[#FFFFFF]">
                                Файл прикреплен
                            </p>
                        ) : (
                            <p className="text-[24px] font-semibold leading-[100%] tracking-normal text-[#FFFFFF]">
                                Прикрепите резюме
                            </p>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                        />
                    </div>
                    <div className="mb-[14px]">
                        <EnhancedInput
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onBlur={() => handleBlur('consent')}
                            onChange={handleChange('consent')}
                            label="Я согласен(а) на обработку персональных данных"
                            labelClassName={`${formData.consent ? 'text-white' : 'text-[#878797]'}`}
                        />
                    </div>
                    {errors.consent ? (
                        <p className="mb-[31px] text-[18px] font-medium leading-[100%] tracking-normal text-[#bc8070]">
                            Подтвердите согласие на обработку данных
                        </p>
                    ) : (
                        ''
                    )}
                    <p className="mb-[40px] text-[24px] font-medium leading-[100%] tracking-normal text-[#353652]">
                        Защита от спама reCAPTCHA{' '}
                        <a href="/example" className="underline">
                            Конфиденциальность
                        </a>{' '}
                        и
                        <a href="/example" className="underline">
                            {' '}
                            Условия использования
                        </a>
                    </p>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        variant={'header_desktop_btn_gradient'}
                        size={'select_btn_desktop'}
                        disabled={Object.values(errors).some(Boolean)}
                        className={`*:treacking-0 mx-auto block text-[32px] font-semibold leading-[100%] ${Object.values(errors).some(Boolean) ? 'bg-[#878797] disabled:opacity-100' : 'bg-gradient-desktop hover:bg-gradient-desktop-hover'}`}
                    >
                        Оставить заявку
                    </Button>
                </form>
            </div>
        </Modal>
    )
}

export default ModalJoinTeamMobi
