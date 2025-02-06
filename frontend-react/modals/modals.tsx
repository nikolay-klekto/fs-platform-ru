import TestModalDesktop from '@/modals/ModalsDesktop/TestModalDesktop'
import TestModalMobi from '@/modals/ModalsMobi/TestModalMobi'
import ModalContractTerminatedMobi from './ModalsMobi/ModalContractTerminatedMobi'
import ModalOrderAcceptedMobi from './ModalsMobi/ModalOrderAcceptedMobi'

export const modals = {
    desktop: [{ id: 'test_desktop', content: <TestModalDesktop /> }],
    mobi: [
        { id: 'test_mobi', content: <TestModalMobi /> },
        {
            id: 'contract_terminated_mobi',
            content: ({ onClose }: { onClose: () => void }) => <ModalContractTerminatedMobi closeModal={onClose} />,
        },

        {
            id: 'order_accepted_mobi',
            content: ({ onClose }: { onClose: () => void }) => <ModalOrderAcceptedMobi closeModal={onClose} />,
        },
    ],
}
