function getInDaysISO(days: number): string {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString().slice(0, 10)
}
function getTodayISO(): string {
    return getInDaysISO(0)
}
function getTomorrowISO(): string {
    return getInDaysISO(1)
}
function getThisWeekISO(): string {
    return getInDaysISO(3)
}
function getThisMonthISO(): string {
    return getInDaysISO(10)
}
function getInNext3MonthsISO(): string {
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
        date: getInNext3MonthsISO(),
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
    {
        id: '10',
        date: getInDaysISO(17),
        description: 'Воркшоп по созданию мобильных приложений с Flutter.',
        name: 'Flutter Mobile Camp',
        publicPlaceName: 'Tech Loft Минск',
        site: 'https://fluttercamp.by',
        price: '30 BYN',
        city: { id: '1', name: 'Минск' },
        time: '10:30',
        organizer: 'FlutterBY',
        eventCategory: { id: '3', category: 'Мастер-класс/семинар/тренинг' },
    },
    {
        id: '11',
        date: getTomorrowISO(),
        description: 'Открытый митап о новых трендах кибербезопасности.',
        name: 'CyberSecurity Meetup',
        publicPlaceName: 'IT-Кластер, Брест',
        site: 'https://cybermeet.by',
        price: 'Бесплатно',
        city: { id: '6', name: 'Брест' },
        time: '18:00',
        organizer: 'Brest Tech Space',
        eventCategory: { id: '2', category: 'Конференция' },
    },
    {
        id: '12',
        date: getInNext3MonthsISO(),
        description: 'День карьеры для студентов и выпускников IT-специальностей.',
        name: 'IT Career Day',
        publicPlaceName: 'Университет ИТ, Минск',
        site: 'https://itcareerday.by',
        price: 'Бесплатно',
        city: { id: '1', name: 'Минск' },
        time: '09:00',
        organizer: 'IT Belarus',
        eventCategory: { id: '6', category: 'Ярмарка вакансий' },
    },
    {
        id: '13',
        date: getThisWeekISO(),
        description: 'Семинар: автоматизация тестирования и QA-практики.',
        name: 'QA Automation Workshop',
        publicPlaceName: 'QA Hub Гомель',
        site: 'https://qaworkshop.by',
        price: '20 BYN',
        city: { id: '2', name: 'Гомель' },
        time: '13:00',
        organizer: 'Gomel QA Club',
        eventCategory: { id: '3', category: 'Мастер-класс/семинар/тренинг' },
    },
    {
        id: '14',
        date: getThisMonthISO(),
        description: 'Интенсив по веб-дизайну и UX/UI для начинающих.',
        name: 'Web Design Starter',
        publicPlaceName: 'Digital Studio Могилёв',
        site: 'https://webdesign.by',
        price: '10 BYN',
        city: { id: '3', name: 'Могилёв' },
        time: '15:30',
        organizer: 'Mogilev Devs',
        eventCategory: { id: '3', category: 'Мастер-класс/семинар/тренинг' },
    },
    {
        id: '15',
        date: getInDaysISO(12),
        description: 'Презентация стартапов и проектов в сфере HealthTech.',
        name: 'HealthTech Pitch Day',
        publicPlaceName: 'Startup Hub, Бобруйск',
        site: 'https://healthtech.by',
        price: 'Бесплатно',
        city: { id: '8', name: 'Бобруйск' },
        time: '11:00',
        organizer: 'Startup Hub',
        eventCategory: { id: '1', category: 'Выставка/презентация' },
    },
    {
        id: '16',
        date: getInDaysISO(5),
        description: 'Стажировка по Data Science: практика с реальными данными.',
        name: 'Data Science Internship',
        publicPlaceName: 'DataLab, Витебск',
        site: 'https://dsintern.by',
        price: 'Бесплатно (отбор по тестовому заданию)',
        city: { id: '4', name: 'Витебск' },
        time: '10:00',
        organizer: 'DataLab Vitebsk',
        eventCategory: { id: '4', category: 'Стажировка' },
    },
    {
        id: '17',
        date: getTomorrowISO(),
        description: 'День открытых дверей: Digital агентство “WebWizards”.',
        name: 'Web Agency Open Day',
        publicPlaceName: 'WebWizards офис, Гродно',
        site: 'https://webwizards.by',
        price: 'Бесплатно',
        city: { id: '5', name: 'Гродно' },
        time: '10:00',
        organizer: 'WebWizards',
        eventCategory: { id: '5', category: 'День открытых дверей' },
    },
    {
        id: '18',
        date: getThisMonthISO(),
        description: 'Региональный IT-хакатон для разработчиков и дизайнеров.',
        name: 'Regional IT Hackathon',
        publicPlaceName: 'Innovation Center, Барановичи',
        site: 'https://ithackathon.by',
        price: 'Бесплатно (по регистрации)',
        city: { id: '7', name: 'Барановичи' },
        time: '09:00',
        organizer: 'IT-Академия',
        eventCategory: { id: '2', category: 'Конференция' },
    },
    {
        id: '19',
        date: getInDaysISO(30),
        description: 'Фестиваль современных цифровых технологий и искусственного интеллекта.',
        name: 'Digital Future Fest',
        publicPlaceName: 'Digital Arena, Борисов',
        site: 'https://digitalfuture.by',
        price: '25 BYN',
        city: { id: '9', name: 'Борисов' },
        time: '17:00',
        organizer: 'Digital Belarus',
        eventCategory: { id: '1', category: 'Выставка/презентация' },
    },
]
