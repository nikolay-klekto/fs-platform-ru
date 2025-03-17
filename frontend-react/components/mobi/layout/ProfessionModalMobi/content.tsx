interface IProfessionAbout {
    id: number
    text: string
}

interface IInternshipCompanies {
    id: number
    image: {
        src: string
        alt: string
        width: number
        height: number
    }
}

interface IReviews {
    id: number
    question: string
    answer: string
}

export const contentProfessionAboutMobi: IProfessionAbout[] = [
    {
        id: 1,
        text: 'Программист создаёт компьютерные программы, сайты, веб-сервисы и мобильные приложения с помощью различных языков программирования — Python, C, C++, Go, Java, JS, Swift и других.',
    },
]

export const contentInternshipCompaniesMobi: IInternshipCompanies[] = [
    {
        id: 1,
        image: {
            src: '/images/epamLogo.png',
            alt: 'company-logo',
            width: 53,
            height: 20,
        },
    },
    {
        id: 2,
        image: {
            src: '/images/epamLogo.png',
            alt: 'company-logo',
            width: 53,
            height: 20,
        },
    },
    {
        id: 3,
        image: {
            src: '/images/epamLogo.png',
            alt: 'company-logo',
            width: 53,
            height: 20,
        },
    },
    {
        id: 4,
        image: {
            src: '/images/epamLogo.png',
            alt: 'company-logo',
            width: 53,
            height: 20,
        },
    },
    {
        id: 5,
        image: {
            src: '/images/epamLogo.png',
            alt: 'company-logo',
            width: 53,
            height: 20,
        },
    },
    {
        id: 6,
        image: {
            src: '/images/epamLogo.png',
            alt: 'company-logo',
            width: 53,
            height: 20,
        },
    },
    {
        id: 7,
        image: {
            src: '/images/epamLogo.png',
            alt: 'company-logo',
            width: 53,
            height: 20,
        },
    },
]

export const contentReviewsMobi: IReviews[] = [
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
