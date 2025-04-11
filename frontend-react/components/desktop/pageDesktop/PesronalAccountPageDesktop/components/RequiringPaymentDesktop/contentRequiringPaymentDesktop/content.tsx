interface IContent {
    profession: string
    company_name: string
    start_day: string
    end_day: string
    category: string
    location: string
    image: string
    price: number
    id: number
}

export const content: IContent[] = [
    {
        profession: 'Программист',
        company_name: 'EPAM',
        start_day: '18.03.2025',
        end_day: '18.04.2025',
        category: 'Стажировка наблюдателя ',
        location: 'Минск, ул. Тиражная 150',
        image: '/images/epam.png',
        price: 100,
        id: 1,
    },
    {
        profession: 'Программист',
        company_name: 'EPAM',
        start_day: '18.03.2025',
        end_day: '18.04.2025',
        category: 'Стажировка наблюдателя ',
        location: 'Минск, ул. Тиражная 150',
        image: '/images/epam.png',
        price: 100,
        id: 2,
    },
    {
        profession: 'Программист',
        company_name: 'EPAM',
        start_day: '18.03.2025',
        end_day: '18.04.2025',
        category: 'Стажировка наблюдателя ',
        location: 'Минск, ул. Тиражная 150',
        image: '/images/epam.png',
        price: 100,
        id: 3,
    },
]
