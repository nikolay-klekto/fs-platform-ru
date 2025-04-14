import { ReactNode } from 'react'

import { InstagramIconMobi, TelegramIconMobi, LinkedInIconMobi, PhoneIconMobi } from '@/components/assets/iconsMobi'

interface IContacts {
    id: number
    title: string
    value: string
    href?: string
}

interface ISocialContactFirst {
    id: number
    icon: ReactNode
    name: string
    href: string
}

interface ISocialContactSecond {
    id: number
    icon: ReactNode
    name: string
    href: string
}

export const contentContactsMobi: IContacts[] = [
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

export const contentSocialContactsFirstMobi: ISocialContactFirst[] = [
    {
        id: 1,
        icon: <InstagramIconMobi width={15} height={15} />,
        name: 'Instagram с мемами',
        href: '#',
    },
    {
        id: 2,
        icon: <TelegramIconMobi width={17} height={17} />,
        name: 'Telegram канал с полезными статьями',
        href: '#',
    },
]

export const contentSocialContactsSecondMobi: ISocialContactSecond[] = [
    {
        id: 1,
        icon: <PhoneIconMobi width={15} height={15} />,
        name: '+375 (29) 000 00 00',
        href: 'tel:+375290000000',
    },
    {
        id: 2,
        icon: <LinkedInIconMobi width={15} height={15} />,
        name: 'LinkedIn с открытыми вакансиями',
        href: '#',
    },
]
