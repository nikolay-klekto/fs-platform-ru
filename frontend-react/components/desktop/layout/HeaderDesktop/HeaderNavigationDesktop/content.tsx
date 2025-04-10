interface IHeaderNavigation {
    title: string
    link: string
    id: string
}

export const content: IHeaderNavigation[] = [
    {
        title: 'Главная',
        link: '/',
        id: '1',
    },
    {
        title: 'Профессии',
        link: '/professions',
        id: '2',
    },
    {
        title: 'Компании',
        link: '/companies',
        id: '3',
    },
    {
        title: 'Мероприятия',
        link: '/profevents',
        id: '4',
    },
    {
        title: 'Наши контакты',
        link: '/contacts',
        id: '5',
    },
]
