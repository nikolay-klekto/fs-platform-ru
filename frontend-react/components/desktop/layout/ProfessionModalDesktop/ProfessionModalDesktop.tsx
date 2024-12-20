'use client'

import React from 'react'
import Modal from '@/components/ui/modal'

interface ProfessionModalDesktopProps {
    closeModal: () => void
}

const ProfessionModalDesktop: React.FC<ProfessionModalDesktopProps> = ({ closeModal }) => {
    console.log('Модальное окно открылось')
    return (
        <Modal show={true} onClose={closeModal} size="medium" showCloseButton={false}>
            <h2 className="text-white">ТУТ ОТКРОЕТСЯ МОДАЛЬНОЕ ОКНО</h2>
        </Modal>
    )
}

export default ProfessionModalDesktop
