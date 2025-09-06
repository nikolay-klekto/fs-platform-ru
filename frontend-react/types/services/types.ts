import { initialLoaders } from '@/lib/servicesServer/initialLoader'
import { LoaderMap } from '@/lib/servicesServer/loadInitialDataServer'

export interface IDataLoader<K extends string = string, T = unknown> {
    key: K
    loader: () => Promise<T>
}
export type InitialData = LoaderMap<typeof initialLoaders>
