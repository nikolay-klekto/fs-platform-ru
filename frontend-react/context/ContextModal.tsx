'use client'
import React, { createContext, useContext, useState, ReactNode, FC } from 'react'

type Modal = {
    id: string
    content: (props: { onClose: () => void; modalProps?: Record<string, unknown> }) => ReactNode
}

type ModalsByDevice = {
    desktop: Modal[]
    mobi: Modal[]
}

type ModalContextType = {
    openModal: (id: string, device: keyof ModalsByDevice, props?: Record<string, unknown>) => void
    closeModal: () => void
    activeModal: Modal | null
    modalProps?: Record<string, unknown>
}

type ModalProviderProps = {
    children: ReactNode
    modals: ModalsByDevice
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider: FC<ModalProviderProps> = ({ children, modals }) => {
    const [activeModal, setActiveModal] = useState<Modal | null>(null)
    const [modalProps, setModalProps] = useState<Record<string, unknown> | undefined>(undefined)

    const openModal = (id: string, device: keyof ModalsByDevice, props?: Record<string, unknown>) => {
        const modal = modals[device].find((modal) => modal.id === id)
        if (modal) {
            setActiveModal(modal)
            setModalProps(props)
        }
    }
    const closeModal = () => {
        setActiveModal(null)
        setModalProps(undefined)
    }
    return (
        <ModalContext.Provider value={{ openModal, closeModal, activeModal, modalProps }}>
            {children}
            {activeModal && (
                <div className=" flex justify-center bg-black/50">
                    {activeModal.content({ onClose: closeModal, modalProps })}
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
