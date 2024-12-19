'use client'

import React, { useState } from 'react'
import { Dialog, DialogPortal } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ModalCookieDesktop() {
    const [open, setOpen] = useState(true)

    const handleClose = () => setOpen(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogPortal>
                <div className="fixed bottom-5 right-5 z-50 box-border flex h-[204px] w-[596px] flex-col justify-between overflow-hidden rounded-[50px] border border-transparent bg-[#101030E6] px-6 py-4 shadow-lg drop-shadow-2xl">
                    <div className="mb-1 mt-4 break-words text-[17.41px] font-medium leading-snug text-white">
                        Разрешите нам использовать cookie-файлы, чтобы при вашем следующем визите не вводить пароль
                        повторно
                        <Link href="#" className="my-2 mt-1 block text-[17.41px] text-[#878797]">
                            Подробнее...
                        </Link>
                    </div>

                    <div className="mr-4 flex items-center justify-end gap-0 space-x-4">
                        <Button
                            variant="ghost"
                            className="box-border flex h-[53.55px] w-[237px] rounded-[41.94px] bg-transparent p-2 text-[16.77px] font-medium text-[#878797] underline"
                            onClick={handleClose}
                        >
                            Отклонить
                        </Button>

                        <Button
                            className="button-border-desktop flex h-[53.55px] w-[237px] rounded-[41.94px] px-4 py-2 text-[16.77px] font-semibold"
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
