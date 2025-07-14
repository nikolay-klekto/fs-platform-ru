export interface IAccountNavigation {
    label: string
    href: string
}

export const content: IAccountNavigation[] = [
    { label: 'Корзина', href: '/cart' },
    { label: 'Требующие оплаты', href: '/due-payments' },
    { label: 'Предстоящие стажировки', href: '/upcoming-internships' },
    { label: 'Архив', href: '/archive' },
    { label: 'Мой профиль', href: '/profile' },
]
