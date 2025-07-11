'use client'

import React, { useState } from 'react'
import { Dialog, DialogPortal } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
                <div className="fixed bottom-0 md:right-0 z-50 box-border flex h-[128px] w-max-[375px] flex-col justify-between items-center overflow-hidden rounded-[25px] border border-transparent bg-[#101030E6] px-3 shadow-lg drop-shadow-2xl font-medium">
                    <div className="break-words text-xs text-center leading-snug text-white pt-4 pb-1">
                        Разрешите нам использовать cookie-файлы, чтобы при вашем следующем визите не вводить пароль
                        повторно
                        <Link href="#" className="ml-1 text-[#878797] underline">
                            Подробнее...
                        </Link>
                    </div>

                    <div className="flex items-center gap-7 pb-7 margin-auto">
                        <button
                            className="text-base font-medium text-white underline hover:text-[#FFFFFF]"
                            onClick={handleClose}
                        >
                            Отклонить
                        </button>

                        <Button
                            variant={'cookie_btn_mobi'}
                            size={'select_mobi'}
                            className="text-2xl px-5"
                            onClick={handleClose}
                        >
                            Облегчить задачу
                        </Button>
                    </div>
                </div>
            </DialogPortal>
        </Dialog>
    )
}
