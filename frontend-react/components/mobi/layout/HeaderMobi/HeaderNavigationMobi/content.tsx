interface IHeaderNavigationDesktop {
    title: string
    link: string
    id: string
}

export const content: IHeaderNavigationDesktop[] = [
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
    /* {
        title: 'Компании',
        link: '/companies',
        id: '3',
    },*/
    {
        title: 'Личный профиль',
        link: '/profile',
        id: '4',
    },
    {
        title: 'Мероприятия',
        link: '/profevents',
        id: '5',
    },
    {
        title: 'Наши контакты',
        link: '/contacts',
        id: '6',
    },
]
