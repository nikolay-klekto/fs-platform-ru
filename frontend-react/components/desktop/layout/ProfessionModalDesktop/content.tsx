interface ProfessionAbout {
    id: number
    text: string
}

export const contentProfessionAbout: ProfessionAbout[] = [
    {
        id: 1,
        text: 'Программист создаёт компьютерные программы, сайты, веб-сервисы и мобильные приложения с помощью различных языков программирования — Python, C, C++, Go, Java, JS, Swift и других.',
    },
]

interface InternshipCompanies {
    id: number
    image: {
        src: string
        alt: string
        width: number
        height: number
    }
    price: number
}

export const contentInternshipCompanies: InternshipCompanies[] = [
    {
        id: 1,
        image: {
            src: '/images/epamLogo.png',
            alt: 'epam-logo',
            width: 104,
            height: 40,
        },
        price: 24,
    },
    {
        id: 2,
        image: {
            src: '/images/iconFooter_1.png',
            alt: 'epam-logo',
            width: 160,
            height: 40,
        },
        price: 36,
    },
    {
        id: 3,
        image: {
            src: '/images/iconFooter_2.png',
            alt: 'epam-logo',
            width: 60,
            height: 40,
        },
        price: 40,
    },
    {
        id: 4,
        image: {
            src: '/images/iconFooter_10.png',
            alt: 'epam-logo',
            width: 200,
            height: 60,
        },
        price: 26,
    },
    {
        id: 5,
        image: {
            src: '/images/epamLogo.png',
            alt: 'epam-logo',
            width: 104,
            height: 40,
        },
        price: 30,
    },
    {
        id: 6,
        image: {
            src: '/images/epamLogo.png',
            alt: 'epam-logo',
            width: 104,
            height: 40,
        },
        price: 35,
    },
    {
        id: 7,
        image: {
            src: '/images/epamLogo.png',
            alt: 'epam-logo',
            width: 104,
            height: 40,
        },
        price: 46,
    },
]

interface Reviews {
    id: number
    question: string
    answer: string
}

export const contentReviews: Reviews[] = [
    {
        id: 1,
        question: 'Необычные моменты произошедшие с Вами в процессе работы?',
        answer: '“Учитывая ключевые сценарии поведения, сложившаяся структура организации прекрасно подходит для реализации анализа существующих паттернов поведения.”',
    },
    {
        id: 2,
        question: 'Почему Вам нравится работать в этой профессии?',
        answer: '“Учитывая ключевые сценарии поведения, сложившаяся структура организации прекрасно подходит для реализации анализа существующих паттернов поведения. А ещё диаграммы связей ограничены исключительно образом мышления ключевые сценарии поведения, сложившаяся структура организации прекрасно подходит для реализации”',
    },
    {
        id: 3,
        question: 'Необычные моменты произошедшие с Вами в процессе работы?',
        answer: '“Учитывая ключевые сценарии поведения, сложившаяся структура организации прекрасно подходит для реализации анализа существующих паттернов поведения.”',
    },
    {
        id: 4,
        question: 'Почему Вам нравится работать в этой профессии?',
        answer: '“Учитывая ключевые сценарии поведения, сложившаяся структура организации прекрасно подходит для реализации анализа существующих паттернов поведения. А ещё диаграммы связей ограничены исключительно образом мышления ключевые сценарии поведения, сложившаяся структура организации прекрасно подходит для реализации”',
    },
    {
        id: 5,
        question: 'Почему Вам нравится работать в этой профессии?',
        answer: '“Учитывая ключевые сценарии поведения, сложившаяся структура организации прекрасно подходит для реализации анализа существующих паттернов поведения. А ещё диаграммы связей ограничены исключительно образом мышления ключевые сценарии поведения, сложившаяся структура организации прекрасно подходит для реализации”',
    },
]
