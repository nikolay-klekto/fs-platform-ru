interface IContent {
    title: string
    category: string
    image: string
    date: string
    week: string
    time: string
    city: string
    place: string
    company: string
    id: number
}

export const content: IContent[] = [
    {
        title: 'выставка “длиное НАЗВАНИЕ МЕРОПРИЯТИЯ”',
        category: 'Выставки/презентации',
        image: '/images/events_1.png',
        date: '02.06.2025',
        time: '23:59',
        week: 'Пятница',
        city: 'Минск',
        place: 'ул. Тиражная 150',
        company: 'EPAM',
        id: 1,
    },
    {
        title: 'выставка “длиное НАЗВАНИЕ МЕРОПРИЯТИЯ”',
        category: 'Выставки/презентации',
        image: '/images/events_1.png',
        date: '03.06.2025',
        time: '11:00',
        week: 'Пятница',
        city: 'Минск',
        place: 'ул. Тиражная 150',
        company: 'EPAM',
        id: 2,
    },
    {
        title: 'выставка “длиное НАЗВАНИЕ МЕРОПРИЯТИЯ”',
        category: 'Выставки/презентации',
        image: '/images/events_1.png',
        date: '01.07.2025',
        time: '11:00',
        week: 'Вторник',
        city: 'Минск',
        place: 'ул. Тиражная 150',
        company: 'EPAM',
        id: 3,
    },
    {
        title: 'выставка “длиное НАЗВАНИЕ МЕРОПРИЯТИЯ”',
        category: 'Выставки/презентации',
        image: '/images/events_1.png',
        date: '30.07.2025',
        time: '11:00',
        week: 'Среда',
        city: 'Минск',
        place: 'ул. Тиражная 150',
        company: 'EPAM',
        id: 4,
    },
    {
        title: 'выставка “длиное НАЗВАНИЕ МЕРОПРИЯТИЯ”',
        category: 'Выставки/презентации',
        image: '/images/events_1.png',
        date: '28.08.2025',
        time: '11:00',
        week: 'Пятница',
        city: 'Минск',
        place: 'ул. Тиражная 150',
        company: 'EPAM',
        id: 5,
    },
    {
        title: 'выставка “длиное НАЗВАНИЕ МЕРОПРИЯТИЯ”',
        category: 'Выставки/презентации',
        image: '/images/events_1.png',
        date: '11.08.2025',
        time: '11:00',
        week: 'Понедельник',
        city: 'Минск',
        place: 'ул. Тиражная 150',
        company: 'EPAM',
        id: 6,
    },
    {
        title: 'выставка “длиное НАЗВАНИЕ МЕРОПРИЯТИЯ”',
        category: 'Выставки/презентации',
        image: '/images/events_1.png',
        date: '09.09.2025',
        time: '11:00',
        week: 'ВТорник',
        city: 'Минск',
        place: 'ул. Тиражная 150',
        company: 'EPAM',
        id: 7,
    },
    {
        title: 'выставка “длиное НАЗВАНИЕ МЕРОПРИЯТИЯ”',
        category: 'Выставки/презентации',
        image: '/images/events_1.png',
        date: '17.09.2025',
        time: '11:00',
        week: 'Среда',
        city: 'Минск',
        place: 'ул. Тиражная 150',
        company: 'EPAM',
        id: 8,
    },
]

export const categoryLabelBySlug: Record<string, string> = {
    fairs: 'Выставки/презентации',
    open_days: 'Дни открытых дверей',
    conferences: 'Конференции',
    master_classes: 'Мастер‑классы/семинары/тренинги',
    internships: 'Стажировки',
    job_fairs: 'Ярмарки вакансий',
}

export const categoryOptions = Object.entries(categoryLabelBySlug).map(([value, label]) => ({ value, label }))

export const cityLabelBySlug: Record<string, string> = {
    minsk: 'Минск',
    brest: 'Брест',
    vitebsk: 'Витебск',
    gomel: 'Гомель',
    grodno: 'Гродно',
    mogilev: 'Могилев',
}

export const cityOptions = Object.entries(cityLabelBySlug).map(([value, label]) => ({
    value,
    label,
}))
