import RequiringPaymentDesktop from '../RequiringPaymentDesktop/RequiringPaymentDesktop'
import OrderPaymentDesktop from '../OrderPaymentDesktop/OrderPaymentDesktop'

interface IPersAccountNavigation {
    title: string
    component: React.ComponentType<{ id: number }>
    id: number
}

export const content: IPersAccountNavigation[] = [
    {
        title: 'КОРЗИНА',
        component: RequiringPaymentDesktop,
        id: 1,
    },
    {
        title: 'ТРЕБУЮЩИЕ ОПЛАТЫ',
        component: OrderPaymentDesktop,
        id: 2,
    },
    {
        title: 'ПРЕДСТОЯЩИЕ СТАЖИРОВКИ',
        component: RequiringPaymentDesktop,
        id: 3,
    },
    {
        title: 'АРХИВ',
        component: RequiringPaymentDesktop,
        id: 4,
    },
    {
        title: 'МОЙ ПРОФИЛЬ',
        component: RequiringPaymentDesktop,
        id: 5,
    },
]
