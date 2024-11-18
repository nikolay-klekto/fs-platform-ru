import { ReactNode } from 'react'

import { TelegramIconDesktop, InstagramIconDesktop, VkIconDesktop } from '@/components/assets/icons'

interface FooterIconLink {
    id: number
    name: ReactNode
    href: string
}

interface FooterLink {
    id: number
    name: string
    href: string
}

interface FooterSection {
    id: number
    title: string
    links: FooterLink[]
    icons?: FooterIconLink[]
}

export const contentFooterDesktop: FooterSection[] = [
    {
        id: 1,
        title: 'Информация',
        links: [
            { id: 1, name: 'Главная', href: '/' },
            { id: 2, name: 'Профессии', href: '/professions' },
            { id: 3, name: 'Компании', href: '/companies' },
            { id: 4, name: 'Мероприятия', href: '/profevents' },
        ],
    },
    {
        id: 2,
        title: 'Личный кабинет',
        links: [
            { id: 5, name: 'Корзина', href: '#' },
            { id: 6, name: 'Предстоящие стажировки', href: '#' },
            { id: 7, name: 'Архив', href: '#' },
            { id: 8, name: 'Мой профиль', href: '#' },
        ],
    },
    {
        id: 3,
        title: 'Контакты',
        links: [
            { id: 9, name: '+375 (29) 123 45 67', href: 'tel:+375291234567' },
            { id: 10, name: 'abcd@mail.com', href: 'mailto:abcd@mail.com' },
        ],
        icons: [
            { id: 11, name: <TelegramIconDesktop />, href: '#' },
            { id: 12, name: <InstagramIconDesktop />, href: '#' },
            { id: 13, name: <VkIconDesktop />, href: '#' },
        ],
    },
    {
        id: 4,
        title: 'Документы',
        links: [
            { id: 14, name: 'Политика конфиденциальности', href: '#' },
            { id: 15, name: 'Условия оплаты', href: '#' },
        ],
    },
]

interface FooterImage {
    id: number
    src: string
    alt: string
    width: number
    height: number
}

export const contentFooterDesktopImages: FooterImage[] = [
    { id: 1, src: '/images/iconFooter_1.png', alt: 'icon-1', width: 63, height: 21 },
    { id: 2, src: '/images/iconFooter_2.png', alt: 'icon-2', width: 30, height: 30 },
    { id: 3, src: '/images/iconFooter_3.png', alt: 'icon-3', width: 145, height: 30 },
    { id: 4, src: '/images/iconFooter_4.png', alt: 'icon-4', width: 42, height: 28 },
    { id: 5, src: '/images/iconFooter_5.png', alt: 'icon-5', width: 78, height: 30 },
    { id: 6, src: '/images/iconFooter_6.png', alt: 'icon-6', width: 41, height: 46 },
    { id: 7, src: '/images/iconFooter_7.png', alt: 'icon-7', width: 57, height: 24 },
    { id: 8, src: '/images/iconFooter_8.png', alt: 'icon-8', width: 50, height: 20 },
    { id: 9, src: '/images/iconFooter_9.png', alt: 'icon-9', width: 62, height: 30 },
    { id: 10, src: '/images/iconFooter_10.png', alt: 'icon-10', width: 106, height: 21 },
]
