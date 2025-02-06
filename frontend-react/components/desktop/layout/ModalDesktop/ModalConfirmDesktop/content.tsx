interface Message {
    message: string
    action: string
    id: string
}

export const confirmMessage: Message[] = [
    {
        message: 'Вы действительно хотите удалить заказ из корзины?',
        action: 'Удалить',
        id: 'delete',
    },
    {
        message: 'Вы действительно хотите расторгнуть договор? Отменить это действие нельзя',
        action: 'Расторгнуть',
        id: 'avoid',
    },
    {
        message: 'Вы действительно хотите удалить заказ? Отменить это действие нельзя',
        action: 'Удалить заказ',
        id: 'cancel',
    },
]
