'use client'

import React, { useState } from 'react'
import { Dialog, DialogPortal } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as DialogPrimitive from '@radix-ui/react-dialog'

interface IModalCookieMobi {
    onClose: () => void
}

export default function ModalCookieMobi({ onClose }: IModalCookieMobi) {
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false)
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogPortal>
                <DialogPrimitive.Content className="modal-position-cookie-mobi modal-size-cookie-mobi box-border flex flex-col justify-between overflow-hidden rounded-[50px] border border-transparent bg-[#101030E6] px-6 py-4 shadow-lg drop-shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-right-4 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-right-4 data-[state=open]:slide-in-from-bottom-4 sm:rounded-lg">
                    <div className="text13px_cookie_mobi mb-1 mt-4 break-words font-medium leading-snug text-white">
                        Разрешите нам использовать cookie-файлы, чтобы при вашем следующем визите не вводить пароль
                        повторно
                        <Link href="#" className="text13px_cookie_mobi my-2 mt-1 block text-[#878797] underline">
                            Подробнее...
                        </Link>
                    </div>

                    <div className="md:mr-4 lg:mr-4 xl:mr-4 2xl:mr-4 flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center justify-end gap-[15px] md:gap-[25px] lg:gap-[50px] xl:gap-[50px] 2xl:gap-[50px]">
                        <button
                            className="text13px_cookie_mobi font-medium underline text-[#FFFFFF] focus:outline-none"
                            onClick={handleClose}
                        >
                            Отклонить
                        </button>
                        <Button variant={'send_btn_mobi'} size={'cookie_btn_mobi'} onClick={handleClose}>
                            Облегчить мне задачу
                        </Button>
                    </div>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    )
}
