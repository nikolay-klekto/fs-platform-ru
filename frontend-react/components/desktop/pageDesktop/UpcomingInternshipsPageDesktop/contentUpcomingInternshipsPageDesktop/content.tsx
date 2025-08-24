export interface IContent {
    title: string
    subtitle: string
    image: string
    date: string
    time: string
    city: string
    place: string
    note: string
    mapImage: string
    id: number
}

export const content: IContent[] = [
    {
        title: 'Стажировка Программиста в компании EPAM',
        subtitle: 'Стажировка наблюдателя',
        image: '/images/epam.png',
        date: '18.10.2023 - 25.10.2023',
        time: '9:00',
        city: 'Минск',
        place: 'ул. Тиражная 150, корпус 4, оф. 506',
        note: '!Возьмите с собой паспорт и ознакомьтесь с компанией на официальном сайте',
        mapImage: '/images/internship_map.png',
        id: 1,
    },
    {
        title: 'Стажировка Программиста в компании EPAM',
        subtitle: 'Стажировка наблюдателя',
        image: '/images/epam.png',
        date: '18.10.2023 - 25.10.2023',
        time: '9:00',
        city: 'Минск',
        place: 'ул. Тиражная 150, корпус 4, оф. 506',
        note: '!Возьмите с собой паспорт и ознакомьтесь с компанией на официальном сайте',
        mapImage: '/images/internship_map.png',
        id: 2,
    },
]
