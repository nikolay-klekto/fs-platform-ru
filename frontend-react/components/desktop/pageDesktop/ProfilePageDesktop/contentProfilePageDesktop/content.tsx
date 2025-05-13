interface IContent {
    dates: string[]
    months: string[]
    years: string[]
    education: string[]
    employment: string[]
}
const dates: string[] = []
for (let i = 1; i <= 31; i++) {
    dates.push(String(i))
}
const years: string[] = []
for (let i = 1990; i <= 2010; i++) {
    years.push(String(i))
}

const content: IContent = {
    dates: dates,
    months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
    years: years,
    education: ['Высшее', 'Высшее незаконченное', 'Общее среднее', 'Среднее специальное', 'Среднее незаконченное'],
    employment: ['Полная', 'Неполная', 'Частичная', 'Такая-то', 'Может еще какая-то будет'],
}

export default content
