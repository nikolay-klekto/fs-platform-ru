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
import ModalForgotPasswordDesktop from '@/modals/ModalsDesktop/ModalForgotPasswordDesktop'
import ModalForgotPasswordMobi from '@/modals/ModalsMobi/ModalForgotPasswordMobi'
interface ModalContentProps {
    onClose: () => void
    modalProps?: Record<string, unknown>
}

export const modals = {
    desktop: [
        {
            id: 'modalcall_desktop',
            content: ({ onClose }: ModalContentProps) => <ModalCallDesktop onClose={onClose} />,
        },
        {
            id: 'registration_desktop',
            content: ({ onClose }: ModalContentProps) => <RegistrationModalDesktop onClose={onClose} />,
        },
        {
            id: 'login_desktop',
            content: ({ onClose }: ModalContentProps) => <LoginModalDesktop onClose={onClose} />,
        },
        {
            id: 'profession_modal_desktop',
            content: ({ onClose, modalProps }: ModalContentProps) => {
                const { profession, professionId } = modalProps as { profession: string; professionId: number | null }
                return <ProfessionModalDesktop onClose={onClose} profession={profession} professionId={professionId} />
            },
        },
        {
            id: 'confirm_avoid_contract_desktop',
            content: ({ onClose }: ModalContentProps) => <ModalConfirmAvoidContractDesktop onClose={onClose} />,
        },
        {
            id: 'confirm_order_cancel_desktop',
            content: ({ onClose }: ModalContentProps) => <ModalConfirmOrderCancelDesktop onClose={onClose} />,
        },
        {
            id: 'confirm_order_delete_desktop',
            content: ({ onClose }: ModalContentProps) => <ModalConfirmOrderDeleteDesktop onClose={onClose} />,
        },
        {
            id: 'order_placed_desktop',
            content: ({ onClose }: ModalContentProps) => <ModalOrderPlacedDesktop onClose={onClose} />,
        },
        {
            id: 'contract_terminated_desktop',
            content: ({ onClose }: ModalContentProps) => <ModalContractTerminatedDesktop onClose={onClose} />,
        },
        {
            id: 'forgot_password_desktop',
            content: ({ onClose }: ModalContentProps) => <ModalForgotPasswordDesktop onClose={onClose} />,
        },
    ],
    mobi: [
        {
            id: 'modalcall_mobi',
            content: ({ onClose }: ModalContentProps) => <ModalCallMobi onClose={onClose} />,
        },
        {
            id: 'registration_mobi',
            content: ({ onClose }: ModalContentProps) => <RegistrationModalMobi onClose={onClose} />,
        },
        {
            id: 'login_mobi',
            content: ({ onClose }: ModalContentProps) => <LoginModalMobi onClose={onClose} />,
        },
        {
            id: 'profession_modal_mobi',
            content: ({ onClose, modalProps }: ModalContentProps) => {
                const { profession, professionId } = modalProps as { profession: string; professionId: number | null }
                return <ProfessionModalMobi onClose={onClose} profession={profession} professionId={professionId} />
            },
        },
        {
            id: 'forgot_password_mobi',
            content: ({ onClose }: ModalContentProps) => <ModalForgotPasswordMobi onClose={onClose} />,
        },
    ],
}
