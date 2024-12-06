interface FooterLink {
    id: number
    name: string
    href: string
}

interface FooterSection {
    id: number
    title: string
    links: FooterLink[]
}

export const contentFooterMobi: FooterSection[] = [
    {
        id: 1,
        title: 'Правила и документы',
        links: [
            { id: 1, name: 'Политика конфиденциальности', href: '#' },
            { id: 2, name: 'Условия оплаты', href: '#' },
        ],
    },
    {
        id: 2,
        title: 'Контакты',
        links: [
            { id: 3, name: '+375 (29) 123 45 67', href: 'tel:+375291234567' },
            { id: 4, name: 'abcd@mail.com', href: 'mailto:abcd@mail.com' },
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

export const contentFooterMobiImages: FooterImage[] = [
    { id: 1, src: '/images/iconFooter_1.png', alt: 'icon-1', width: 63, height: 21 },
    { id: 2, src: '/images/iconFooter_2.png', alt: 'icon-2', width: 30, height: 30 },
    { id: 3, src: '/images/iconFooter_3.png', alt: 'icon-3', width: 145, height: 30 },
    { id: 4, src: '/images/iconFooter_4.png', alt: 'icon-4', width: 42, height: 28 },
    { id: 5, src: '/images/iconFooter_6.png', alt: 'icon-6', width: 41, height: 46 },
    { id: 6, src: '/images/iconFooter_7.png', alt: 'icon-7', width: 57, height: 24 },
    { id: 7, src: '/images/iconFooter_8.png', alt: 'icon-8', width: 50, height: 20 },
    { id: 8, src: '/images/iconFooter_9.png', alt: 'icon-9', width: 62, height: 30 },
    { id: 9, src: '/images/iconFooter_10.png', alt: 'icon-10', width: 106, height: 21 },
    { id: 10, src: '/images/iconFooter_5.png', alt: 'icon-5', width: 78, height: 30 },
]
