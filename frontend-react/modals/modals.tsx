'use client'
import TestModalDesktop from '@/modals/ModalsDesktop/TestModalDesktop'
import TestModalMobi from '@/modals/ModalsMobi/TestModalMobi'
import ModalCallDesktop from '@/modals/ModalsDesktop/ModalCallDesktop'
import RegistrationModalDesktop from '@/modals/ModalsDesktop/RegistrationModalDesktop'
import LoginModalDesktop from '@/modals/ModalsDesktop/LoginModalDesktop'

export const modals = {
    desktop: [
        { id: 'test_desktop', content: <TestModalDesktop /> },
        {
            id: 'modalcall_desktop',
            content: ({ onClose }: { onClose: () => void }) => <ModalCallDesktop isOpen={true} onClose={onClose} />,
        },
        {
            id: 'registration_desktop',
            content: ({ onClose }: { onClose: () => void }) => (
                <RegistrationModalDesktop isOpen={true} onClose={onClose} />
            ),
        },
        {
            id: 'login_desktop',
            content: ({ onClose }: { onClose: () => void }) => <LoginModalDesktop isOpen={true} onClose={onClose} />,
        },
    ],
    mobi: [
        { id: 'test_mobi', content: <TestModalMobi /> },
        {
            id: 'modalcall_mobi',
            content: ({ onClose }: { onClose: () => void }) => <ModalCallDesktop isOpen={true} onClose={onClose} />,
        },
        {
            id: 'registration_mobi',
            content: ({ onClose }: { onClose: () => void }) => (
                <RegistrationModalDesktop isOpen={true} onClose={onClose} />
            ),
        },
        {
            id: 'login_mobi',
            content: ({ onClose }: { onClose: () => void }) => <LoginModalDesktop isOpen={true} onClose={onClose} />,
        },
    ],
}
