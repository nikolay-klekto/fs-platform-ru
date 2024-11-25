import { ReactNode } from 'react'

interface Contacts {
    id: number
    title: string
    value: string
    href?: string
}

export const contentContactsMobi: Contacts[] = [
    {
        id: 1,
        title: 'Для клиентов и партнеров',
        value: 'abcd@mail.com',
        href: 'mailto:abcd@mail.com',
    },
    {
        id: 2,
        title: 'Для клиентов и партнеров',
        value: 'abcd@mail.com',
        href: 'mailto:abcd@mail.com',
    },
    {
        id: 3,
        title: 'Для соискателей',
        value: 'jobs@funscurt.com',
        href: 'mailto:jobs@funscurt.com',
    },
    {
        id: 4,
        title: 'Минск',
        value: 'ул. Петруся Бровки, д.8',
    },
]
