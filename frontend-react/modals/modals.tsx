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
import ProfessionModalDesktop from '@/components/desktop/layout/ProfessionModalDesktop/ProfessionModalDesktop'
import ProfessionModalMobi from '@/components/mobi/layout/ProfessionModalMobi/ProfessionModalMobi'
import ModalOrderPlacedDesktop from '@/modals/ModalsDesktop/ModalOrderPlacedDesktop'
import ModalContractTerminatedDesktop from '@/modals/ModalsDesktop/ModalContractTerminatedDesktop'
import ModalContractTerminatedMobi from './ModalsMobi/ModalStatusMobi/ModalContractTerminatedMobi'
import ModalOrderAcceptedMobi from './ModalsMobi/ModalStatusMobi/ModalOrderAcceptedMobi'

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
        {
            id: 'order_placed_desktop',
            content: ({ onClose }: { onClose: () => void }) => <ModalOrderPlacedDesktop closeModal={onClose} />,
        },
        {
            id: 'contract_terminated_desktop',
            content: ({ onClose }: { onClose: () => void }) => <ModalContractTerminatedDesktop closeModal={onClose} />,
        },
    ],
    mobi: [
        { id: 'test_mobi', content: <TestModalMobi /> },
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

        {
            id: 'contract_terminated_mobi',
            content: ({ onClose }: { onClose: () => void }) => (
                <ModalContractTerminatedMobi isOpen={true} onClose={onClose} />
            ),
        },
        {
            id: 'order_accepted_mobi',
            content: ({ onClose }: { onClose: () => void }) => (
                <ModalOrderAcceptedMobi isOpen={true} onClose={onClose} />
            ),
        },
    ],
}
