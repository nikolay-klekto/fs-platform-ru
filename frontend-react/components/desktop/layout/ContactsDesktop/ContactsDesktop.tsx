import React from 'react'

import { Button } from '@/components/ui/button'

const ContactsDesktop: React.FC = () => {
    return (
        <>
            <div className="flex justify-between pt-52 pb-[297px] border border-red-500">
                <div className="flex flex-col gap-7 max-w-[541px] border border-red-500">
                    <h2 className="text-26xl font-semibold">Cвяжитесь с нами</h2>
                    <Button variant="select_desktop" size="contacts_btn">
                        Хочу в команду
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ContactsDesktop
