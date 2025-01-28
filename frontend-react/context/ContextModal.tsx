'use client'
import React, { createContext, useContext, useState, ReactNode, FC } from 'react'

type Modal = {
    id: string
    content: ReactNode | ((props: { onClose: () => void }) => ReactNode)
}

type ModalsByDevice = {
    desktop: Modal[]
    mobi: Modal[]
}

type ModalContextType = {
    openModal: (id: string, device: keyof ModalsByDevice) => void
    closeModal: () => void
    activeModal: Modal | null
}

type ModalProviderProps = {
    children: ReactNode
    modals: ModalsByDevice
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: FC<ModalProviderProps> = ({ children, modals }) => {
    const [activeModal, setActiveModal] = useState<Modal | null>(null)

    const openModal = (id: string, device: keyof ModalsByDevice) => {
        const modal = modals[device].find((modal) => modal.id === id)
        if (modal) setActiveModal(modal)
    }
    const closeModal = () => {
        setActiveModal(null)
    }
    return (
        <ModalContext.Provider value={{ openModal, closeModal, activeModal }}>
            {children}
            {activeModal && (
                <div className=" flex justify-center bg-black/50">
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
