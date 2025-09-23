interface IContent {
    title: string
    image: string
    date: string
    address: string
    id: number
}

export const content: IContent[] = [
    {
        title: 'Длинное название мероприятия',
        image: '/images/events_1.png',
        date: '18 ноября',
        address: 'EPAM, Минск, ул. Тиражная 150',
        id: 1931293,
    },
    {
        title: 'Мероприятие',
        image: '/images/events_2.png',
        date: '10 ноября',
        address: 'EPAM, Минск, ул. Тиражная 150',
        id: 19345293,
    },
    {
        title: 'Очень длинное название мероприятия',
        image: '/images/events_3.png',
        date: '9 декабря',
        address: 'EPAM, Минск, ул. Тиражная 150',
        id: 1934535293,
    },
    {
        title: 'Название мероприятия',
        image: '/images/events_1.png',
        date: '19 декабря',
        address: 'EPAM, Минск, ул. Тиражная 150',
        id: 193654564563,
    },
    {
        title: 'Очень длинное название мероприятия невероятно длинное',
        image: '/images/events_3.png',
        date: '5 мая',
        address: 'EPAM, Минск, ул. Тиражная 150 и длинный адрес тоже тут',
        id: 1934543563,
    },
    {
        title: 'Мероприятие',
        image: '/images/events_2.png',
        date: '28 июня',
        address: 'EPAM, Минск, ул. Тиражная 150',
        id: 19345487887,
    },
]
