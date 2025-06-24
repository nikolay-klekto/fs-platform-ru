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
                <DialogPrimitive.Content className="fixed bottom-5 right-5 sm_xl:right-[15px] sm_l:right-[15px] sm_s:right-[15px] sm:right-0 z-50 box-border flex md:h-[195px] sm_xl:h-fit sm_l:h-fit sm_s:h-fit sm:h-fit h-[204px] md:max-w-[90%] sm_xl:max-w-[93%] sm_l:max-w-[92%] sm_s:max-w-[92%] sm:w-full w-[596px] flex-col justify-between overflow-hidden rounded-[50px] border border-transparent bg-[#101030E6] px-6 py-4 shadow-lg drop-shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-right-4 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-right-4 data-[state=open]:slide-in-from-bottom-4 sm:rounded-lg">
                    <div className="mb-1 mt-4 break-words md:text-[15px] sm_xl:text-[14px] sm_l:text-[14px] sm_l:text-[14px] sm_s:text-[13px] sm:text-[12px] text-[17.41px] font-medium leading-snug text-white">
                        Разрешите нам использовать cookie-файлы, чтобы при вашем следующем визите не вводить пароль
                        повторно
                        <Link
                            href="#"
                            className="my-2 mt-1 block md:text-[15px] sm_xl:text-[14px] sm_l:text-[14px] sm_s:text-[13px] sm:text-[12px] text-[17px] text-[#878797]"
                        >
                            Подробнее...
                        </Link>
                    </div>

                    <div className="mr-4 sm_xl:mr-0 sm_l:mr-0 sm_s:mr-0 sm:mr-0 flex sm_xl:flex-col sm_l:flex-col sm_s:flex-col sm:flex-col items-center justify-end gap-[50px] md:gap-[25px] sm_xl:gap-[15px] sm_l:gap-[15px] sm_s:gap-[15px] sm:gap-[15px]">
                        <button
                            className="md:text-[15px] sm_xl:text-[14px] sm_l:text-[14px] sm_s:text-[13px] sm:text-[12px] text-[17px] font-medium text-[#878797] underline hover:text-[#FFFFFF] focus:outline-none"
                            onClick={handleClose}
                        >
                            Отклонить
                        </button>

                        <Button
                            variant={'send_btn_mobi'}
                            size={'cookie_btn_mobi'}
                            className="text-[17px]"
                            onClick={handleClose}
                        >
                            Облегчить мне задачу
                        </Button>
                    </div>
                </DialogPrimitive.Content>
            </DialogPortal>
        </Dialog>
    )
}
