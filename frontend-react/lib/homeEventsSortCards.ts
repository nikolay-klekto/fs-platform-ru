export const MONTHS = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
]

export function parseEventDate(dateStr: string): Date | null {
    const iso = new Date(dateStr)
    if (!isNaN(iso.getTime())) return iso
    const [dayRaw, monthRaw] = dateStr.split(' ')
    const day = Number(dayRaw)
    const monthIndex = MONTHS.findIndex((m) => m.toLowerCase() === (monthRaw ?? '').toLowerCase())
    if (!isNaN(day) && monthIndex >= 0) {
        const year = new Date().getFullYear()
        return new Date(year, monthIndex, day)
    }
    return null
}

export function getEventsToShow<T extends { date: string }>(events: T[], EVENTS_TO_SHOW_COUNT = 6): T[] {
    return events
        .slice()
        .sort((a, b) => {
            const dateA = parseEventDate(a.date)
            const dateB = parseEventDate(b.date)
            if (!dateA || !dateB) return 0
            return dateA.getTime() - dateB.getTime()
        })
        .slice(0, EVENTS_TO_SHOW_COUNT)
}
