interface IOrganizer {
    name: string
    link: string
}

interface IDate {
    data: string
    day: string
}

interface ITime {
    begin: string
    end: string
}

interface IEvents {
    id: number
    image: string
    title: string
    description: string
    location: string
    organizer: IOrganizer
    date: IDate
    price: string
    time: ITime
    googleCalendarLink: string
    moreInfoLink: string
}

export const contentModalEvents: IEvents[] = [
    {
        id: 1,
        image: '/images/events_modal_1.png',
        title: 'Название мероприятия',
        description:
            'Учитывая ключевые сценарии поведения, сложившаяся структура организации прекрасно подходит для реализации анализа существующих паттернов поведения. А ещё диаграммы связей ограничены исключительно образом мышления ключевые сценарии поведения, сложившаяся структура организации прекрасно подходит для реализации.',
        location: 'Минск, Тиражная 150',
        organizer: {
            name: 'EPAM',
            link: 'https://example.com/ЕРАМ',
        },
        date: {
            data: '12.03.2025',
            day: 'Среда',
        },
        price: '20',
        time: {
            begin: '18:00',
            end: '22:00',
        },
        googleCalendarLink: 'https://calendar.google.com',
        moreInfoLink: 'https://example.com/event1',
    },
]
