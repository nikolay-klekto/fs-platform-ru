'use client'
import ModalCallDesktop from '@/modals/ModalsDesktop/ModalCallDesktop'
import RegistrationModalDesktop from '@/modals/ModalsDesktop/RegistrationModalDesktop'
import LoginModalDesktop from '@/modals/ModalsDesktop/LoginModalDesktop'
import ModalCallMobi from '@/modals/ModalsMobi/ModalCallMobi'
import RegistrationModalMobi from '@/modals/ModalsMobi/RegistrationModalMobi'
import LoginModalMobi from '@/modals/ModalsMobi/LoginModalMobi'

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
    ],
    mobi: [
        {
            id: 'modalcall_mobi',
            content: ({ onClose }: { onClose: () => void }) => <ModalCallMobi isOpen={true} onClose={onClose} />,
        },
        {
            id: 'registration_mobi',
            content: <RegistrationModalMobi isOpen={true} />,
        },
        {
            id: 'login_mobi',
            content: ({ onClose }: { onClose: () => void }) => <LoginModalMobi isOpen={true} onClose={onClose} />,
        },
    ],
}
