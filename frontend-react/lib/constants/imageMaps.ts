export const imageMaps = {
    companies: {
        Сбербанк: '45.webp',
        Innowise: '78.webp',
        Epam: '79.webp',
    },
    professions: {
        Сбербанк: '45.webp',
        Innowise: '78.webp',
        Epam: '79.webp',
    },
} as const
export type ImageMapCategory = keyof typeof imageMaps
export type ImageMapKey<T extends ImageMapCategory> = keyof (typeof imageMaps)[T]

export function getImagePath<T extends ImageMapCategory>(category: T, name: string): string {
    return `/api/photo/${category}/facade/${imageMaps[category][name as ImageMapKey<T>] ?? 'default.webp'}`
}
