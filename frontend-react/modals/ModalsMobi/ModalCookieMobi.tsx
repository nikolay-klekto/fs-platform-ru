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
                <DialogPrimitive.Content className="modal-position-cookie-mobi h-fit w-full max-w-[375px] rounded-[25px] box-border flex flex-col justify-between overflow-hidden border border-transparent bg-[#101030E6] shadow-lg drop-shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-right-4 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-right-4 data-[state=open]:slide-in-from-bottom-4 sm:rounded-lg">
                    <div className="text10px_cookie_mobi mb-[18px] ml-[19px] mt-4 max-w-[346px] block break-words font-medium leading-snug text-white">
                        Разрешите нам использовать cookie-файлы, чтобы при вашем следующем визите не вводить пароль
                        повторно
                        <Link
                            href="#"
                            className="text10px_cookie_mobi static pl-0.5 leading-snug text-[#878797] underline"
                        >
                            Подробнее...
                        </Link>
                    </div>

                    <div className="mb-[30px] flex items-center justify-center gap-[30px] sm_s:gap-5 sm:gap-2">
                        <button
                            className="text12px_cookie_mobi font-medium underline text-[#FFFFFF] focus:outline-none"
                            onClick={handleClose}
                        >
                            Отклонить
                        </button>
                        <Button variant={'send_btn_mobi'} size={'cookie_btn_mobi'} onClick={handleClose}>
                            Облегчить задачу
                        </Button>
                    </div>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    )
}
