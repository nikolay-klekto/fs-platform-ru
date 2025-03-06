'use client'

import React, { useState } from 'react'
import { Dialog, DialogPortal } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ModalCookieDesktopProps {
    onClose: () => void
}

export default function ModalCookieDesktop({ onClose }: ModalCookieDesktopProps) {
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogPortal>
                <div className="fixed bottom-5 right-5 z-50 box-border flex h-[204px] w-[596px] flex-col justify-between overflow-hidden rounded-[50px] border border-transparent bg-[#101030E6] px-6 py-4 shadow-lg drop-shadow-2xl">
                    <div className="mb-1 mt-4 break-words text-[17.41px] font-medium leading-snug text-white">
                        Разрешите нам использовать cookie-файлы, чтобы при вашем следующем визите не вводить пароль
                        повторно
                        <Link href="#" className="my-2 mt-1 block text-[17px] text-[#878797]">
                            Подробнее...
                        </Link>
                    </div>

                    <div className="mr-4 flex items-center justify-end gap-[50px] space-x-4">
                        <button
                            className="text-[17px] font-medium text-[#878797] underline hover:text-[#FFFFFF]"
                            onClick={handleClose}
                        >
                            Отклонить
                        </button>

                        <Button
                            variant={'send_btn_desktop'}
                            size={'cookie_btn_desktop'}
                            className="text-[17px]"
                            onClick={handleClose}
                        >
                            Облегчить мне задачу
                        </Button>
                    </div>
                </div>
            </DialogPortal>
        </Dialog>
    )
}
