export function getInDaysISO(days: number): string {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString().slice(0, 10)
}
export function getTodayISO(): string {
    return getInDaysISO(0)
}
export function getTomorrowISO(): string {
    return getInDaysISO(1)
}
export function getThisWeekISO(): string {
    return getInDaysISO(3)
}
export function getThisMonthISO(): string {
    return getInDaysISO(10)
}
export function getInNext3MonthsISO(): string {
    return getInDaysISO(40)
}

export interface IEventApiContent {
    id: string
    date: string
    description: string
    name: string
    publicPlaceName: string
    site: string
    price: string
    city: {
        id: string
        name: string
    }
    time: string
    organizer: string
    eventCategory: {
        id: string
        category: string
    }
}

export const fakeEvents: IEventApiContent[] = [
    {
        id: '1',
        date: getTodayISO(),
        description: 'IT выставка о современных технологиях и инновациях.',
        name: 'Tech Expo 2025',
        publicPlaceName: 'Технопарк Минск',
        site: 'https://techexpominsk.by',
        price: 'Бесплатно',
        city: { id: '1', name: 'Минск' },
        time: '10:00',
        organizer: 'IT Belarus',
        eventCategory: { id: '1', category: 'Выставка/презентация' },
    },
    {
        id: '2',
        date: getThisMonthISO(),
        description: 'Ведущая конференция по искусственному интеллекту и data science.',
        name: 'AI Future Conference',
        publicPlaceName: 'Дворец искусств',
        site: 'https://aifuture.by',
        price: '25 BYN',
        city: { id: '2', name: 'Гомель' },
        time: '11:00',
        organizer: 'Gomel Tech Club',
        eventCategory: { id: '2', category: 'Конференция' },
    },
    {
        id: '3',
        date: getThisMonthISO(),
        description: 'Семинар для начинающих разработчиков: React & Next.js.',
        name: 'Frontend Boost',
        publicPlaceName: 'IT-центр Могилёв',
        site: 'https://frontendboost.by',
        price: '15 BYN',
        city: { id: '3', name: 'Могилёв' },
        time: '12:30',
        organizer: 'Mogilev Devs',
        eventCategory: { id: '3', category: 'Мастер-класс/семинар/тренинг' },
    },
    {
        id: '4',
        date: getTomorrowISO(),
        description: 'День открытых дверей: офис EPAM Systems.',
        name: 'Open IT Day',
        publicPlaceName: 'EPAM офис, Витебск',
        site: 'https://openitday.by',
        price: 'Бесплатно',
        city: { id: '4', name: 'Витебск' },
        time: '10:00',
        organizer: 'EPAM',
        eventCategory: { id: '5', category: 'День открытых дверей' },
    },
    {
        id: '5',
        date: getThisMonthISO(),
        description: 'Стажировка для студентов: Python backend.',
        name: 'Python Internship',
        publicPlaceName: 'Гродно Айти Хаб',
        site: 'https://internshippython.by',
        price: 'Бесплатно (отбор по резюме)',
        city: { id: '5', name: 'Гродно' },
        time: '09:30',
        organizer: 'Grodno IT Hub',
        eventCategory: { id: '4', category: 'Стажировка' },
    },
    {
        id: '6',
        date: getTomorrowISO(),
        description: 'Ярмарка вакансий для разработчиков и тестировщиков.',
        name: 'IT Job Fair 2025',
        publicPlaceName: 'Брест Конференц Центр',
        site: 'https://itjobfair.by',
        price: 'Бесплатно',
        city: { id: '6', name: 'Брест' },
        time: '13:00',
        organizer: 'HR IT Group',
        eventCategory: { id: '6', category: 'Ярмарка вакансий' },
    },
    {
        id: '7',
        date: '2025-07-01',
        description: 'Тренинг: управление проектами для junior IT специалистов.',
        name: 'Project Management Basics',
        publicPlaceName: 'IT-Академия, Барановичи',
        site: 'https://pmtrain.by',
        price: '10 BYN',
        city: { id: '7', name: 'Барановичи' },
        time: '16:00',
        organizer: 'IT-Академия',
        eventCategory: { id: '3', category: 'Мастер-класс/семинар/тренинг' },
    },
    {
        id: '8',
        date: getInDaysISO(40),
        description: 'День открытых дверей в стартап-инкубаторе.',
        name: 'Startup Day',
        publicPlaceName: 'Startup Hub, Бобруйск',
        site: 'https://startupday.by',
        price: 'Бесплатно',
        city: { id: '8', name: 'Бобруйск' },
        time: '14:00',
        organizer: 'Startup Hub',
        eventCategory: { id: '5', category: 'День открытых дверей' },
    },
    {
        id: '9',
        date: getThisWeekISO(),
        description: 'Презентация новых IT-решений от лидеров рынка.',
        name: 'Digital Solutions Expo',
        publicPlaceName: 'Борисов Digital Hall',
        site: 'https://digitalexpo.by',
        price: '20 BYN',
        city: { id: '9', name: 'Борисов' },
        time: '10:00',
        organizer: 'Digital Belarus',
        eventCategory: { id: '1', category: 'Выставка/презентация' },
    },
]
