export function isToday(dateStr: string) {
    const now = new Date()
    const d = new Date(dateStr)
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate()
}

export function isTomorrow(dateStr: string) {
    const now = new Date()
    const d = new Date(dateStr)
    const tomorrow = new Date(now)
    tomorrow.setDate(now.getDate() + 1)
    return (
        d.getFullYear() === tomorrow.getFullYear() &&
        d.getMonth() === tomorrow.getMonth() &&
        d.getDate() === tomorrow.getDate()
    )
}

export function isThisWeek(dateStr: string) {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const d = new Date(dateStr)
    d.setHours(0, 0, 0, 0)
    const end = new Date(now)
    end.setDate(now.getDate() + 7)
    return d >= now && d < end
}

export function isThisMonth(dateStr: string) {
    const now = new Date()
    const d = new Date(dateStr)
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

export function isInNext3Months(dateStr: string) {
    const now = new Date()
    const d = new Date(dateStr)
    const in3Months = new Date(now)
    in3Months.setMonth(now.getMonth() + 3)
    return d >= now && d <= in3Months
}

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

interface IContent {
    name: string
    imagePath: string
    date: string
    id: string
}

export const contentEventsSection: IContent[] = [
    {
        name: 'Длинное название мероприятия',
        imagePath: '/images/events_1.png',
        date: getTodayISO(),
        id: '1931293',
    },
    {
        name: 'Мероприятие длинное еще одно',
        imagePath: '/images/events_2.png',
        date: getThisMonthISO(),
        id: '19345293',
    },
    {
        name: 'Очень длинное название мероприятия супердлинное название',
        imagePath: '/images/events_3.png',
        date: getThisMonthISO(),
        id: '1934535293',
    },
    {
        name: 'Название мероприятия',
        imagePath: '/images/events_1.png',
        date: getTomorrowISO(),
        id: '193654564563',
    },
    {
        name: 'Очень длинное название мероприятия',
        imagePath: '/images/events_3.png',
        date: getInNext3MonthsISO(),
        id: '1934543563',
    },
    {
        name: 'Мероприятие',
        imagePath: '/images/events_2.png',
        date: getThisWeekISO(),
        id: '19345487887',
    },
]
