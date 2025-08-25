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

export function getImagePath<T extends ImageMapCategory>(category: T, name: string): string {
    const normalizedName = name.toLowerCase().trim().replace(/\s+/g, ' ')
    const fileName = imageMaps[category][normalizedName as ImageMapKey<T>] ?? 'default.webp'

    return `/api/photo/${category}/${fileName}`
}
