interface ModalContent {
    id: number
    title: string
    message: string
    cancelButton: string
    confirmButton: string
}

export const modalContent: Record<string, ModalContent> = {
    avoidContract: {
        id: 1,
        title: 'ПОДТВЕРЖДЕНИЕ',
        message: 'Вы действительно хотите расторгнуть договор? Отменить это действие нельзя',
        cancelButton: 'Отмена',
        confirmButton: 'Расторгнуть',
    },
    orderCancel: {
        id: 2,
        title: 'ПОДТВЕРЖДЕНИЕ',
        message: 'Вы действительно хотите удалить заказ? Отменить это действие нельзя',
        cancelButton: 'Отмена',
        confirmButton: 'Удалить заказ',
    },
    orderDelete: {
        id: 3,
        title: 'ПОДТВЕРЖДЕНИЕ',
        message: 'Вы действительно хотите удалить заказ из корзины?',
        cancelButton: 'Отмена',
        confirmButton: 'Удалить',
    },
}
