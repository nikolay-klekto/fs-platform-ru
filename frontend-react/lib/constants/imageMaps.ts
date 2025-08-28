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

export function getImagePath<T extends ImageMapCategory>(category: T, name: string): string {
    const normalizedName = norm(name)
    const fileName =
        Object.entries(imageMaps[category]).find(([key]) => norm(key) === normalizedName)?.[1] ?? 'default.webp'

    const folder = category === 'companies' ? 'facade' : ''

    return `/api/photo/${category}/${folder}/${fileName}`
}
