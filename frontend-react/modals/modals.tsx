'use client'
import ModalCallDesktop from '@/modals/ModalsDesktop/ModalCallDesktop'
import RegistrationModalDesktop from '@/modals/ModalsDesktop/RegistrationModalDesktop'
import LoginModalDesktop from '@/modals/ModalsDesktop/LoginModalDesktop'
import ModalCallMobi from '@/modals/ModalsMobi/ModalCallMobi'
import RegistrationModalMobi from '@/modals/ModalsMobi/RegistrationModalMobi'
import LoginModalMobi from '@/modals/ModalsMobi/LoginModalMobi'
import ModalOrderPlacedDekstop from '@/modals/ModalsDesktop/ModalOrderPlacedDekstop'
import ModalContractTerminatedDesktop from '@/modals/ModalsDesktop/ModalContractTerminatedDesktop'
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
            id: 'order_placed_dekstop',
            content: ({ onClose }: { onClose: () => void }) => <ModalOrderPlacedDekstop closeModal={onClose} />,
        },
        {
            id: 'contract_terminated_desktop',
            content: ({ onClose }: { onClose: () => void }) => <ModalContractTerminatedDesktop closeModal={onClose} />,
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
    ],
}
