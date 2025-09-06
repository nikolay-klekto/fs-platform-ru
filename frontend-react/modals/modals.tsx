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
import ProfessionModalDesktop from '@/components/desktop/pageDesktop/ProfessionsModalDesktop/ProfessionModalDesktop'
import ProfessionModalMobi from '@/components/mobi/layout/ProfessionModalMobi/ProfessionModalMobi'
import ModalOrderPlacedDesktop from '@/modals/ModalsDesktop/ModalOrderPlacedDesktop'
import ModalContractTerminatedDesktop from '@/modals/ModalsDesktop/ModalContractTerminatedDesktop'
import ModalContractTerminatedMobi from './ModalsMobi/ModalStatusMobi/ModalContractTerminatedMobi'
import ModalOrderAcceptedMobi from './ModalsMobi/ModalStatusMobi/ModalOrderAcceptedMobi'
import ModalFeedbackDesktop from './ModalsDesktop/ModalFeedbackDesktop'
import ModalEventsDesktop from './ModalsDesktop/ModalEventsDesktop/ModalEventsDesktop'
import ModalForgotPasswordDesktop from './ModalsDesktop/ModalForgotPasswordDesktop'
import ModalForgotPasswordMobi from './ModalsMobi/ModalForgotPasswordMobi'
import ModalCookieDesktop from './ModalsDesktop/ModalCookieDesktop'
import ModalJoinTeamDesktop from './ModalsDesktop/ModalJoinTeamDesktop'
import ModalCompanyNotifyDesktop from './ModalsDesktop/ModalCompanyNotifyDesktop'
import ModalCookieMobi from './ModalsMobi/ModalCookieMobi'

interface IModalContent {
    onClose: () => void
    modalProps?: Record<string, unknown>
}

export const modals = {
    desktop: [
        {
            id: 'modalcall_desktop',
            content: ({ onClose }: IModalContent) => <ModalCallDesktop onClose={onClose} />,
        },
        {
            id: 'registration_desktop',
            content: ({ onClose }: IModalContent) => <RegistrationModalDesktop onClose={onClose} />,
        },
        {
            id: 'login_desktop',
            content: ({ onClose }: IModalContent) => <LoginModalDesktop onClose={onClose} />,
        },
        {
            id: 'profession_modal_desktop',
            content: ({ onClose, modalProps }: IModalContent) => {
                const { profession, professionId } = modalProps as { profession: string; professionId: number | null }
                return <ProfessionModalDesktop onClose={onClose} profession={profession} professionId={professionId} />
            },
        },
        {
            id: 'confirm_avoid_contract_desktop',
            content: ({ onClose }: IModalContent) => <ModalConfirmAvoidContractDesktop onClose={onClose} />,
        },
        {
            id: 'confirm_order_cancel_desktop',
            content: ({ onClose }: IModalContent) => <ModalConfirmOrderCancelDesktop onClose={onClose} />,
        },
        {
            id: 'confirm_order_delete_desktop',
            content: ({ onClose }: IModalContent) => <ModalConfirmOrderDeleteDesktop onClose={onClose} />,
        },
        {
            id: 'order_placed_desktop',
            content: ({ onClose }: IModalContent) => <ModalOrderPlacedDesktop onClose={onClose} />,
        },
        {
            id: 'contract_terminated_desktop',
            content: ({ onClose }: IModalContent) => <ModalContractTerminatedDesktop onClose={onClose} />,
        },
        {
            id: 'feedback_desktop',
            content: ({ onClose }: IModalContent) => <ModalFeedbackDesktop onClose={onClose} />,
        },
        {
            id: 'events_desktop',
            content: ({ onClose }: IModalContent) => <ModalEventsDesktop onClose={onClose} />,
        },
        {
            id: 'forgot_password_desktop',
            content: ({ onClose }: IModalContent) => <ModalForgotPasswordDesktop onClose={onClose} />,
        },
        {
            id: 'cookie_desktop',
            content: ({ onClose }: IModalContent) => <ModalCookieDesktop onClose={onClose} />,
        },
        {
            id: 'join_team_modal_desktop',
            content: ({ onClose }: IModalContent) => <ModalJoinTeamDesktop onClose={onClose} />,
        },
        {
            id: 'modal_company_notify_desktop',
            content: ({ onClose }: IModalContent) => <ModalCompanyNotifyDesktop onClose={onClose} />,
        },
    ],
    mobi: [
        {
            id: 'modalcall_mobi',
            content: ({ onClose }: IModalContent) => <ModalCallMobi onClose={onClose} />,
        },
        {
            id: 'registration_mobi',
            content: ({ onClose }: IModalContent) => <RegistrationModalMobi onClose={onClose} />,
        },
        {
            id: 'login_mobi',
            content: ({ onClose }: IModalContent) => <LoginModalMobi onClose={onClose} />,
        },
        {
            id: 'profession_modal_mobi',
            content: ({ onClose, modalProps }: IModalContent) => {
                const { profession, professionId } = modalProps as { profession: string; professionId: number | null }
                return <ProfessionModalMobi onClose={onClose} profession={profession} professionId={professionId} />
            },
        },
        {
            id: 'contract_terminated_mobi',
            content: ({ onClose }: IModalContent) => <ModalContractTerminatedMobi onClose={onClose} />,
        },
        {
            id: 'order_accepted_mobi',
            content: ({ onClose }: IModalContent) => <ModalOrderAcceptedMobi onClose={onClose} />,
        },
        {
            id: 'forgot_password_mobi',
            content: ({ onClose }: IModalContent) => <ModalForgotPasswordMobi onClose={onClose} />,
        },
        {
            id: 'cookie_mobi',
            content: ({ onClose }: IModalContent) => <ModalCookieMobi onClose={onClose} />,
        },
    ],
}
