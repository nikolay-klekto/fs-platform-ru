export const imageMaps = {
    companies: {
        Сбербанк: '45.webp',
        Innowise: '78.webp',
        Epam: '79.webp',
    },
    professions: {
        'Бизнес-аналитик': '10.webp',
        'Маркетолог': '11.webp',
        'Программист': '12.webp',
        'Финансист': '13.webp',
    },
} as const

const SUBDIR: Record<ImageMapCategory, string> = {
    companies: 'facade',
    professions: '',
}

const norm = (s: string) => s.toLowerCase().trim().replace(/\s+/g, ' ')

export function getImagePath(category: ImageMapCategory, name: string): string {
    const map = imageMaps[category] as Record<string, string>
    const match = Object.entries(map).find(([k]) => norm(k) === norm(name))
    const file = match?.[1] ?? 'default.webp'
    const sub = SUBDIR[category]
    return `/api/photo/${category}${sub ? `/${sub}` : ''}/${file}`
}
