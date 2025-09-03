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

export type ImageMapCategory = keyof typeof imageMaps
export type ImageMapKey<T extends ImageMapCategory> = keyof (typeof imageMaps)[T]

const norm = (s: string) => s.toLowerCase().trim().replace(/\s+/g, ' ')
const SUBDIR: Record<ImageMapCategory, string | undefined> = {
    companies: 'facade',
    professions: undefined,
}
const joinUrl = (...parts: Array<string | undefined>) =>
    parts
        .filter(Boolean)
        .map((p) => p!.replace(/^\/+|\/+$/g, ''))
        .join('/')

export function getImagePath<T extends ImageMapCategory>(category: T, name: string): string {
    const map = imageMaps[category] as Record<string, string>
    const file = Object.entries(map).find(([k]) => norm(k) === norm(name))?.[1]

    return '/' + joinUrl('api/photo', category, SUBDIR[category], file)
}
