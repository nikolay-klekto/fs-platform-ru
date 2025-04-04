import { ReactNode } from 'react'

import {
    InstagramIconDesktop,
    TelegramIconDesktop,
    LinkedInIconDesktop,
    PhoneIconDesktop,
} from '@/components/assets/iconsDesktop'

interface IContacts {
    id: number
    title: string
    value: string
    href?: string
}

export const contentContactsDesktop: IContacts[] = [
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

interface ISocialContacts {
    id: number
    icon: ReactNode
    name: string
    href: string
}

export const contentSocialContactsDesktop: ISocialContacts[] = [
    {
        id: 1,
        icon: <InstagramIconDesktop width={34} height={34} />,
        name: 'Instagram с мемами',
        href: '#',
    },
    {
        id: 2,
        icon: <TelegramIconDesktop width={44} height={40} />,
        name: 'Telegram канал с полезными статьями',
        href: '#',
    },
    {
        id: 3,
        icon: <LinkedInIconDesktop width={30} height={30} />,
        name: 'LinkedIn с открытыми вакансиями',
        href: '#',
    },
    {
        id: 4,
        icon: <PhoneIconDesktop />,
        name: '+375 (29) 000 00 00',
        href: 'tel:+375290000000',
    },
]
