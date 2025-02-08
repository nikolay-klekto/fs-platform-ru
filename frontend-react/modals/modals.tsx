'use client'
import ModalCallDesktop from '@/modals/ModalsDesktop/ModalCallDesktop'
import RegistrationModalDesktop from '@/modals/ModalsDesktop/RegistrationModalDesktop'
import LoginModalDesktop from '@/modals/ModalsDesktop/LoginModalDesktop'
import ModalConfirmAvoidContractDesktop from '@/modals/ModalsDesktop/ModalConfirmDesktop/ModalConfirmAvoidContractDesktop'
import ModalConfirmOrderCancelDesktop from '@/modals/ModalsDesktop/ModalConfirmDesktop/ModalConfirmOrderCancelDesktop'
import ModalConfirmOrderDeleteDesktop from '@/modals/ModalsDesktop/ModalConfirmDesktop/ModalConfirmOrderDeleteDesktop'
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
        {
            id: 'confirm_avoid_contract_desktop',
            content: <ModalConfirmAvoidContractDesktop />,
        },
        {
            id: 'confirm_order_cancel_desktop',
            content: <ModalConfirmOrderCancelDesktop />,
        },
        {
            id: 'confirm_order_delete_desktop',
            content: <ModalConfirmOrderDeleteDesktop />,
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
