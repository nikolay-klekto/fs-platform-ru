'use client'
import React, { createContext, useContext, useState, ReactNode, FC } from 'react'

type Modal = {
    id: string
    content: ReactNode | ((props: { onClose: () => void }) => ReactNode)
}

type ModalsByDevice = {
    desktop?: Modal[]
    mobi?: Modal[]
}

interface ModalContextType {
    isOpen: boolean
    openModal: (id: string, device: keyof ModalsByDevice) => void
    closeModal: () => void
    isNotifyModalOpen: boolean 
    setNotifyModalOpen: (isOpen: boolean) => void 
}

type ModalProviderProps = {
    children: ReactNode
    modals: ModalsByDevice
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: FC<ModalProviderProps> = ({ children, modals }) => {
    const [activeModal, setActiveModal] = useState<Modal | null>(null)
    const [isNotifyModalOpen, setNotifyModalOpen] = useState(false) 

    const openModal = (id: string, device: keyof ModalsByDevice) => {
        const modalsArray = modals[device] || []
        const modal = modalsArray.find((modal) => modal.id === id)

        if (!modal) {
            console.error(`Модальное окно с id "${id}" для ${device} не найдено.`)
    return
        }

        setActiveModal(modal)
    }

    const closeModal = () => {
        setActiveModal(null)
        setNotifyModalOpen(false) 
    }

    return (
        <ModalContext.Provider value={{ 
                isOpen: !!activeModal || isNotifyModalOpen, 
                openModal, 
                closeModal, 
                isNotifyModalOpen, 
                setNotifyModalOpen 
            }}
        >
            {children}
            {activeModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    {typeof activeModal.content === 'function'
                        ? activeModal.content({ onClose: closeModal })
                        : activeModal.content}
                </div>
            )}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext)
    if (!context) throw new Error('useModal must be used within a ModalProvider')
    return context
}
