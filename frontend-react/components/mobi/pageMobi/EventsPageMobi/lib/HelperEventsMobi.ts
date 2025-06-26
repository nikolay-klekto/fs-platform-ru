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
