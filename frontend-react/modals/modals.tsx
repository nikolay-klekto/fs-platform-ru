'use client'
import ModalCallDesktop from '@/modals/ModalsDesktop/ModalCallDesktop'
import RegistrationModalDesktop from '@/modals/ModalsDesktop/RegistrationModalDesktop'
import LoginModalDesktop from '@/modals/ModalsDesktop/LoginModalDesktop'
import ModalCallMobi from '@/modals/ModalsMobi/ModalCallMobi'
import RegistrationModalMobi from '@/modals/ModalsMobi/RegistrationModalMobi'
import LoginModalMobi from '@/modals/ModalsMobi/LoginModalMobi'
import ProfessionModalDesktop from '@/components/desktop/layout/ProfessionModalDesktop/ProfessionModalDesktop'
import ProfessionModalMobi from '@/components/mobi/layout/ProfessionModalMobi/ProfessionModalMobi'

export const modals = {
    desktop: [
        {
            id: 'modalcall_desktop',
            content: ({ onClose }: { onClose: () => void }) => <ModalCallDesktop isOpen={true} onClose={onClose} />,
        },
        {
            id: 'registration_desktop',
            content: <RegistrationModalDesktop isOpen={true} />,
        },
        {
            id: 'login_desktop',
            content: <LoginModalDesktop isOpen={true} />,
        },
        {
            id: 'profession_modal_desktop',
            content: ({
                onClose,
                profession,
                professionId,
            }: {
                onClose: () => void
                profession: string
                professionId: number | null
            }) => <ProfessionModalDesktop closeModal={onClose} profession={profession} professionId={professionId} />,
        },
    ],
    mobi: [
        {
            id: 'modalcall_mobi',
            content: <ModalCallMobi isOpen={true} />,
        },
        {
            id: 'registration_mobi',
            content: <RegistrationModalMobi isOpen={true} />,
        },
        {
            id: 'login_mobi',
            content: ({ onClose }: { onClose: () => void }) => <LoginModalMobi isOpen={true} onClose={onClose} />,
        },
        {
            id: 'profession_modal_mobi',
            content: ({
                onClose,
                profession,
                professionId,
            }: {
                onClose: () => void
                profession: string
                professionId: number | null
            }) => <ProfessionModalMobi closeModal={onClose} profession={profession} professionId={professionId} />,
        },
    ],
}
