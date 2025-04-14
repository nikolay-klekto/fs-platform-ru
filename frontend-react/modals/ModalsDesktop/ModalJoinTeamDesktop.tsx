import React, { useState } from 'react'
import Modal from '@/components/ui/modal'
import { EnhancedInput } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
                <h2 className="text36px_desktop text-gradient_desktop_custom line- font-medium uppercase ">
                    Хотите работать у нас?
                </h2>
            </div>
        </Modal>
    )
}

export default ModalJoinTeamDesktop
