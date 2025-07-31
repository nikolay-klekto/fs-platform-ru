import React, { useState, useRef } from 'react'
import { X } from 'lucide-react'
import Modal from '@/components/ui/modal'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PhoneInputDesktop from '@/components/desktop/shared/formInput/PhoneInputDesktop'
import { AttachFileIconDesktop } from '@/components/assets/iconsDesktop'

interface IFormData {
    name: string
    phoneNumber: string
    profession: string
    consent: boolean
}

interface IModalContent {
    onClose: () => void
}

const ModalJoinTeamDesktop: React.FC<IModalContent> = ({ onClose }) => {
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
                    <p className="mb-[14px] text-4xl font-medium leading-[100%] tracking-normal text-[#bc8070]">
                        Заполните обязательные поля
                    </p>
                )}
                {hasFileError && (
                    <p className="mb-[14px] text-4xl font-medium leading-[100%] tracking-normal text-[#bc8070]">
                        {errors.fileError}
                    </p>
                )}
                {!hasFieldErrors && !hasFileError && (
                    <p className="mb-[14px] text-4xl font-medium leading-[100%] tracking-normal text-[#353652]">
                        *Обязательное поле для ввода
                    </p>
                )}
            </>
        )
    }

    return (
        <Modal onClose={onClose} size="large-lg" showCloseButton={false}>
            <button onClick={onClose} className="absolute right-[30px] top-[30px]">
                <X size={71} color="white" className="opacity-[80%]" />
            </button>
            <div className="flex flex-col p-[100px]">
                <h2 className="text-gradient_desktop_custom 3xl:text-17xl text-18xl 2xl:text-15xl mb-[10px] text-center font-medium uppercase leading-[100%] tracking-normal">
                    Хотите работать у нас?
                </h2>
                <p className="treacking-[0] 3xl:text-7xl mb-[33px] text-9xl leading-[100%] text-[#878797] 2xl:text-7xl">
                    Заполните поля – и мы с вами свяжемся
                </p>
                <form>
                    <EnhancedInput
                        type="text"
                        name="name"
                        value={formData.name}
                        onBlur={() => handleBlur('name')}
                        onChange={handleChange('name')}
                        className={`mb-6 h-20 w-full items-center rounded-[50px] border-2 bg-transparent pl-8 text-9xl font-medium text-white placeholder:text-9xl placeholder:text-[#353652] focus-visible:ring-offset-0 ${
                            errors.name ? 'border-[#bc8070]' : 'border-[#878797]'
                        }`}
                        label="Ваше имя*"
                        labelClassName="font-semibold text-[20px] text-white mb-[10px] leading-[100%] tracking-normal"
                        placeholder="Ваше имя"
                        wrapperClassName="w-full"
                    />
                    <PhoneInputDesktop
                        value={formData.phoneNumber}
                        className={`mb-6 h-20 items-center pl-8 text-9xl placeholder:text-9xl ${errors.phoneNumber ? 'border-[#bc8070]' : 'border-[#878797]'}`}
                        onBlur={() => handleBlur('phoneNumber')}
                        onChange={handleChange('phoneNumber')}
                        onError={() => {}}
                        labelClassName="font-semibold text-[20px] text-white mb-[10px] leading-[100%] tracking-normal"
                    />
                    <EnhancedInput
                        type="text"
                        name="profession"
                        value={formData.profession}
                        className={`mb-6 h-20 w-full items-center rounded-[50px] border-2 bg-transparent pl-8 text-9xl font-medium text-white placeholder:text-9xl placeholder:text-[#353652] focus-visible:ring-offset-0 ${
                            errors.profession ? 'border-[#bc8070]' : 'border-[#878797]'
                        }`}
                        onBlur={() => handleBlur('profession')}
                        onChange={handleChange('profession')}
                        label="Укажите профессию*"
                        labelClassName="font-semibold text-[20px] text-white mb-[10px] leading-[100%] tracking-normal"
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
                            <AttachFileIconDesktop className="text-white" />
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
                            labelClassName={`text-[23px] 2xl:text-[21px] ${formData.consent ? 'text-white' : 'text-[#878797]'}`}
                            checkboxIconSize="w-[28px]"
                            wrapperClassName="gap-4"
                            hasError={errors.consent}
                        />
                    </div>
                    <p className="mb-[40px] text-[24px] font-medium leading-[100%] tracking-normal text-[#353652] ">
                        Защита от спама reCAPTCHA{' '}
                        <a href="/privacy-policy" className="leading-[100%] underline underline-offset-[5px]">
                            Конфиденциальность
                        </a>{' '}
                        и{' '}
                        <a href="/example" className="leading-[100%] underline underline-offset-[5px]">
                            Условия использования
                        </a>
                    </p>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        variant={'header_desktop_btn_gradient'}
                        size={'join_team_btn_desktop'}
                        disabled={Object.values(errors).some(Boolean)}
                        className={`*:treacking-0 text-11xl mx-auto block font-semibold leading-[100%] ${Object.values(errors).some(Boolean) ? 'bg-[#878797] disabled:opacity-100' : 'bg-gradient-desktop hover:bg-gradient-desktop-hover'}`}
                    >
                        Оставить заявку
                    </Button>
                </form>
            </div>
        </Modal>
    )
}

export default ModalJoinTeamDesktop
