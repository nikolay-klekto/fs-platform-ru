interface FooterLink {
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
            { name: 'Политика конфиденциальности', href: '#' },
            { name: 'Условия оплаты', href: '#' },
        ],
    },
    {
        id: 2,
        title: 'Контакты',
        links: [
            { name: '+375 (29) 123 45 67', href: 'tel:+375291234567' },
            { name: 'abcd@mail.com', href: 'mailto:abcd@mail.com' },
        ],
    },
]
