import { IDataLoader } from '@/types/services/types'

export type LoaderMap<L extends readonly IDataLoader[]> = {
    [P in L[number] as P['key']]: Awaited<ReturnType<P['loader']>> | []
}

export async function loadInitialDataServer<L extends readonly IDataLoader[]>(loaders: L): Promise<LoaderMap<L>> {
    const results = await Promise.allSettled(loaders.map((item) => item.loader()))

    return loaders.reduce((acc, { key }, index) => {
        const result = results[index]

        acc[key as keyof LoaderMap<L>] =
            result.status === 'fulfilled'
                ? (result.value as LoaderMap<L>[keyof LoaderMap<L>])
                : ([] as LoaderMap<L>[keyof LoaderMap<L>])

        return acc
    }, {} as LoaderMap<L>)
}
