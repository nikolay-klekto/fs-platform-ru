export interface IContent {
    title: string
    subtitle: string
    image: string
    date: string
    time: string
    city: string
    place: string
    companyUrl: string
    mapImage: string
    mapUrl: string
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
        companyUrl: 'https://www.epam.com/',
        mapImage: '/images/internship_map.png',
        mapUrl: 'https://www.google.com/maps/',
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
        companyUrl: 'https://www.epam.com/',
        mapImage: '/images/internship_map.png',
        mapUrl: 'https://www.google.com/maps/',
        id: 2,
    },
]
